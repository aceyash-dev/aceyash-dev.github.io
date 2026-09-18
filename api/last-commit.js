// api/last-commit.js
// Deployed at /api/last-commit by Vercel automatically.
// Reads GITHUB_PAT from Vercel's Environment Variables (server-side only).

const USERNAME = 'aceyash-dev';

export default async function handler(req, res) {
  const token = process.env.GITHUB_PAT || '';

  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'portfolio-last-commit',
    'X-GitHub-Api-Version': '2022-11-28'
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const reposUrl = token
      ? 'https://api.github.com/user/repos?affiliation=owner&sort=pushed&direction=desc&per_page=10'
      : `https://api.github.com/users/${USERNAME}/repos?type=owner&sort=pushed&direction=desc&per_page=10`;

    const reposRes = await fetch(reposUrl, { headers });
    if (!reposRes.ok) {
      const detail = await reposRes.text().catch(() => '');
      return res.status(reposRes.status).json({
        error: `GitHub repos ${reposRes.status}`,
        detail: detail.slice(0, 200)
      });
    }

    const repos = await reposRes.json();
    const candidates = repos.filter(r => !r.fork && !r.archived);

    for (const repo of candidates.slice(0, 5)) {
      const cRes = await fetch(
        `https://api.github.com/repos/${repo.full_name}/commits?per_page=1`,
        { headers }
      );
      if (!cRes.ok) continue;
      const commits = await cRes.json();
      if (!commits.length) continue;

      const c = commits[0];
      res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate=600');
      return res.status(200).json({
        repo: repo.name,
        repoUrl: repo.html_url,
        message: (c.commit.message || '').split('\n')[0],
        date: c.commit.author?.date || c.commit.committer?.date || null,
        url: c.html_url,
        sha: c.sha ? c.sha.slice(0, 7) : null
      });
    }

    return res.status(404).json({ error: 'No commits found' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}