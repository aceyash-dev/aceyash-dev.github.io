const RATE_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 30;
const MAX_RATE_KEYS = 5_000;
const requestBuckets = new Map();

// The per-IP limiter above protects this function from one noisy visitor. It
// does not protect the shared GITHUB_PAT: GitHub's commit-search quota is 30
// requests per minute *per token*, so every extra visitor would spend from the
// same budget. These constants cap what this process actually sends upstream.
const MAX_UPSTREAM_PER_WINDOW = 20;
const FEED_TTL_MS = 120_000;
const upstreamCalls = [];
let cachedFeed = null;
let inflightFeed = null;

function enforceRequestLimit(req, res) {
  // Vercel supplies x-real-ip; ignore client-controlled X-Forwarded-For.
  const rawIp = req.headers?.['x-real-ip'];
  const ip = String(Array.isArray(rawIp) ? rawIp[0] : rawIp || 'unknown').trim().slice(0, 128) || 'unknown';
  const now = Date.now();
  const active = (requestBuckets.get(ip) || []).filter(time => now - time < RATE_WINDOW_MS);
  if (active.length >= MAX_REQUESTS_PER_WINDOW) {
    requestBuckets.set(ip, active);
    const retryAfter = Math.max(1, Math.ceil((active[0] + RATE_WINDOW_MS - now) / 1000));
    res.setHeader('Retry-After', String(retryAfter));
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    req.method === 'HEAD' ? res.status(429).end() : res.status(429).json({ error: 'Too many requests', retryAfter });
    return false;
  }
  active.push(now);
  requestBuckets.delete(ip);
  requestBuckets.set(ip, active);
  while (requestBuckets.size > MAX_RATE_KEYS) requestBuckets.delete(requestBuckets.keys().next().value);
  return true;
}

function upstreamBudgetAvailable(now) {
  while (upstreamCalls.length && now - upstreamCalls[0] >= RATE_WINDOW_MS) upstreamCalls.shift();
  return upstreamCalls.length < MAX_UPSTREAM_PER_WINDOW;
}

async function requestCommits(token) {
  const query = encodeURIComponent('author:aceyash-dev');
  const commitsResponse = await fetch(
    `https://api.github.com/search/commits?q=${query}&sort=committer-date&order=desc&per_page=30`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  );

  if (!commitsResponse.ok) {
    throw new Error(`GitHub commit search failed: ${commitsResponse.status}`);
  }

  const data = await commitsResponse.json();
  if (!Array.isArray(data.items)) {
    throw new Error('GitHub did not return commit search results');
  }

  // GitHub search can include private repositories when this endpoint uses a
  // personal access token. Never expose their commit messages, dates, or URLs
  // through this public feed; filter before mapping any private metadata.
  return data.items
    .filter(item => {
      const repo = item.repository;
      return repo?.visibility === 'public' || repo?.private === false;
    })
    .slice(0, 3)
    .map(item => {
      const repo = item.repository || {};
      return {
        repo: repo.name || repo.full_name || 'repository',
        repoUrl: repo.html_url || null,
        public: true,
        message: String(item.commit?.message || item.commit?.title || '').split('\n')[0],
        date: item.commit?.author?.date || item.commit?.committer?.date || null,
        url: item.html_url || null
      };
    });
}

// Serves every visitor from one short-lived cache and one in-flight request, so
// a burst of traffic costs a single upstream call instead of one per visitor.
async function getCommits(token) {
  const now = Date.now();
  if (cachedFeed && now - cachedFeed.at < FEED_TTL_MS) return cachedFeed.commits;
  if (inflightFeed) return inflightFeed;

  if (!upstreamBudgetAvailable(now)) {
    // A slightly old reading beats a broken section.
    if (cachedFeed) return cachedFeed.commits;
    const error = new Error('Upstream commit-search budget exhausted');
    error.status = 503;
    throw error;
  }

  upstreamCalls.push(now);
  inflightFeed = requestCommits(token)
    .then(commits => {
      cachedFeed = { commits, at: Date.now() };
      return commits;
    })
    .finally(() => {
      inflightFeed = null;
    });
  return inflightFeed;
}

export default async function handler(req, res) {
  const allow = 'GET, HEAD, OPTIONS';
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', allow);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(204).end();
  }
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.setHeader('Allow', allow);
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!enforceRequestLimit(req, res)) return;
  const token = process.env.GITHUB_PAT;
  if (!token) {
    return req.method === 'HEAD' ? res.status(503).end() : res.status(503).json({ error: 'Commit feed is temporarily unavailable' });
  }

  try {
    const commits = await getCommits(token);
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=1200');
    return req.method === 'HEAD' ? res.status(200).end() : res.status(200).json(commits);
  } catch (error) {
    console.error('Recent commits:', error);
    if (error.status === 503) {
      res.setHeader('Retry-After', '60');
      return req.method === 'HEAD' ? res.status(503).end() : res.status(503).json({ error: 'Commit feed is busy, try again shortly' });
    }
    return req.method === 'HEAD' ? res.status(502).end() : res.status(502).json({ error: 'Unable to load recent commits' });
  }
}
