import { useCallback, useEffect, useRef, useState } from 'react';
import { GitCommitIcon } from '@solar-icons/react/linear/git-commit';
import { LockKeyholeIcon } from '@solar-icons/react/linear/lock-keyhole';
import { ArrowRightUpIcon } from '@solar-icons/react/linear/arrow-right-up';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import {
  fetchLatestCommits,
  fetchPublicCommitsFallback,
  shouldWarnAboutPrimaryFeed,
  type Commit
} from '../lib/commits';
import { formatAbsoluteDate, formatRelativeDate, toIsoString } from '../lib/format';

type FeedStatus = 'loading' | 'ready' | 'error';
type FeedSource = 'primary' | 'fallback' | null;

type CommitCardProps = {
  commit: Commit;
  index: number;
  now: number;
};

function CommitCard({ commit, index, now }: CommitCardProps) {
  const isPublic = commit.public !== false;
  const relative = formatRelativeDate(commit.date, now);
  const absolute = formatAbsoluteDate(commit.date);
  const timestamp = toIsoString(commit.date);

  const content = (
    <div className="commit-row">
      <span className="commit-icon" aria-hidden="true">
        {isPublic ? <GitCommitIcon size={20} /> : <LockKeyholeIcon size={19} />}
      </span>
      <div className="commit-body">
        <span className="commit-label">Recent commit {index + 1}</span>
        <span className="commit-message">{commit.message || '—'}</span>
        <span className="commit-repo">
          in <b>{commit.repo}</b>
          {!isPublic ? ' · Private repository' : ''}
        </span>
      </div>
      <div className="commit-side">
        {timestamp ? (
          <time className="commit-time" dateTime={timestamp}>
            {relative}
          </time>
        ) : (
          <span className="commit-time">{relative}</span>
        )}
        <span className="commit-date">{absolute}</span>
        {!isPublic ? <span className="commit-date">Private repo</span> : <ArrowRightUpIcon size={15} aria-hidden="true" style={{ alignSelf: 'flex-end', color: 'var(--muted)' }} />}
      </div>
    </div>
  );

  if (!isPublic) {
    return (
      <div className="commit-wrap private" role="group" aria-label={`${commit.message} in private repository`}>
        {content}
      </div>
    );
  }

  return (
    <a
      className="commit-wrap"
      href={commit.url || commit.repoUrl || '#'}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open commit: ${commit.message || 'latest commit'}`}
    >
      {content}
    </a>
  );
}

export function CommitFeed() {
  const [status, setStatus] = useState<FeedStatus>('loading');
  const [source, setSource] = useState<FeedSource>(null);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [now, setNow] = useState(() => Date.now());
  const abortRef = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStatus('loading');
    setSource(null);

    try {
      const items = await fetchLatestCommits(controller.signal);
      if (controller.signal.aborted) return;
      if (items.length) {
        setCommits(items);
        setSource('primary');
        setStatus('ready');
        return;
      }
      throw new Error('Primary commit feed was empty');
    } catch (error) {
      if (controller.signal.aborted) return;
      if (shouldWarnAboutPrimaryFeed(error)) {
        console.warn('Authenticated commit feed unavailable; trying public fallback:', error);
      }
    }

    try {
      const items = await fetchPublicCommitsFallback(controller.signal);
      if (controller.signal.aborted) return;
      if (!items.length) throw new Error('Public commit fallback was empty');

      setCommits(items);
      setSource('fallback');
      setStatus('ready');
    } catch (error) {
      if (controller.signal.aborted) return;
      console.warn('Public commit fallback:', error);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    void load();
    return () => abortRef.current?.abort();
  }, [load]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="section activity-section" id="activity" aria-labelledby="activity-title">
      <div className="container">
      <SectionHeading
        id="activity-title"
        index="02"
        label="Activity"
        title="Last"
        accent="commit"
        meta="Live from GitHub — public work only"
      />

      <div className="commit-panel">
        {status === 'loading' ? (
        <div
          className="commit-skeleton"
          aria-hidden="true"
        >
          {[0, 1, 2].map((row) => (
            <div className="commit-skeleton__row" key={row}>
              <span className="commit-skeleton__icon" />
              <div className="commit-skeleton__bars">
                <span />
                <span />
                <span />
              </div>
              <div className="commit-skeleton__time">
                <span />
                <span />
              </div>
            </div>
          ))}
        </div>
        ) : null}

        <div className="commit-content" aria-live="polite">
          {status === 'ready' ? (
            <>
              {source === 'fallback' ? (
                <div className="commit-note" role="status">
                  Public commits only · fallback feed
                </div>
              ) : null}
              <div className="commit-list">
                {commits.slice(0, 3).map((commit, index) => (
                  <Reveal key={`${commit.url || commit.repo}-${index}`} delay={index * 0.08} y={16}>
                    <CommitCard commit={commit} index={index} now={now} />
                  </Reveal>
                ))}
              </div>
            </>
          ) : null}

          {status === 'error' ? (
            <div className="commit-state" role="status">
              Latest commit unavailable{' '}
              <button className="commit-retry" type="button" onClick={() => void load()}>
                Retry
              </button>
            </div>
          ) : null}

          {status === 'loading' ? <span className="sr-only">Loading recent commits…</span> : null}
        </div>
      </div>
      </div>
    </section>
  );
}
