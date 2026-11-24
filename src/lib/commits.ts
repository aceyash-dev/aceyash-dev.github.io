export type Commit = {
  repo: string;
  repoUrl: string | null;
  public: boolean;
  message: string;
  date: string | null;
  url: string | null;
};

type GitHubRepository = {
  name?: string;
  full_name?: string;
  html_url?: string;
  visibility?: string;
  private?: boolean;
};

type GitHubCommitSearchItem = {
  repository?: GitHubRepository;
  commit?: {
    message?: string;
    title?: string;
    author?: { date?: string };
    committer?: { date?: string };
  };
  html_url?: string;
};

type GitHubCommitSearchResponse = {
  items?: GitHubCommitSearchItem[];
};

class ExpectedMissingApiError extends Error {
  expected = true;
}

function isExpectedMissingApi(error: unknown): boolean {
  return error instanceof Error && 'expected' in error && error.expected === true;
}

function normalizeCommit(data: unknown): Commit | null {
  if (!data || typeof data !== 'object') return null;
  const value = data as Partial<Commit>;

  return {
    repo: String(value.repo || 'repository'),
    repoUrl: typeof value.repoUrl === 'string' ? value.repoUrl : null,
    public: value.public !== false,
    message: String(value.message || '—').split('\n')[0],
    date: typeof value.date === 'string' ? value.date : null,
    url: typeof value.url === 'string' ? value.url : null
  };
}

function normalizeSearchItem(item: GitHubCommitSearchItem): Commit {
  const repository = item.repository || {};

  return {
    repo: repository.name || repository.full_name || 'repository',
    repoUrl: repository.html_url || null,
    public: true,
    message: String(item.commit?.message || item.commit?.title || '—').split('\n')[0],
    date: item.commit?.author?.date || item.commit?.committer?.date || null,
    url: item.html_url || null
  };
}

export async function fetchLatestCommits(signal: AbortSignal): Promise<Commit[]> {
  const response = await fetch('/api/commits', {
    headers: { Accept: 'application/json' },
    cache: 'default',
    credentials: 'same-origin',
    signal
  });

  const contentType = response.headers.get('content-type') || '';

  if (response.status === 404 || !contentType.includes('json')) {
    // GitHub Pages returns 404; Vite's SPA fallback can return index.html with
    // 200. Neither host has the optional serverless API, so both are expected.
    throw new ExpectedMissingApiError('No commit API on this host');
  }
  if (!response.ok) throw new Error(`Commit feed ${response.status}`);

  const payload: unknown = await response.json();
  if (!Array.isArray(payload)) throw new Error('Invalid commit feed');

  return payload
    .slice(0, 3)
    .map(normalizeCommit)
    .filter((commit): commit is Commit => commit !== null);
}

export async function fetchPublicCommitsFallback(signal: AbortSignal): Promise<Commit[]> {
  const url = new URL('https://api.github.com/search/commits');
  url.searchParams.set('q', 'author:aceyash-dev');
  url.searchParams.set('sort', 'committer-date');
  url.searchParams.set('order', 'desc');
  url.searchParams.set('per_page', '30');

  const response = await fetch(url.toString(), {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    },
    cache: 'no-store',
    signal
  });

  if (!response.ok) throw new Error(`Public GitHub fallback ${response.status}`);

  const payload = (await response.json()) as GitHubCommitSearchResponse;
  if (!Array.isArray(payload.items)) throw new Error('Invalid public GitHub fallback');

  return payload.items
    .filter((item) => item.repository?.visibility === 'public' || item.repository?.private === false)
    .slice(0, 3)
    .map(normalizeSearchItem);
}

export function shouldWarnAboutPrimaryFeed(error: unknown): boolean {
  return !isExpectedMissingApi(error);
}
