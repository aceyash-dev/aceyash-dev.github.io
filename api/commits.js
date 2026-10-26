export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.GITHUB_PAT;
  if (!token) {
    return res.status(503).json({ error: 'Commit feed is temporarily unavailable' });
  }

  try {
    const query = encodeURIComponent('author:aceyash-dev');
    const commitsResponse = await fetch(
      `https://api.github.com/search/commits?q=${query}&sort=committer-date&order=desc&per_page=3`,
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
    const commits = data.items
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

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json(commits);
  } catch (error) {
    console.error('Recent commits:', error);
    return res.status(502).json({ error: 'Unable to load recent commits' });
  }
}
