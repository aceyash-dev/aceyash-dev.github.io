import { useState } from 'react';
import { SegmentedControl } from 'glisse';
import SpotlightCard from './vendor/reactbits/SpotlightCard';
import { BorderBeam } from './vendor/magicui/BorderBeam';
import { BlurFade } from './vendor/magicui/BlurFade';
import { Terminal } from './vendor/magicui/Terminal';
import { CopyButton } from './vendor/animate-ui/CopyButton';
import { ArrowRightUpIcon } from '@solar-icons/react/linear/arrow-right-up';
import { SectionHeading } from './SectionHeading';
import { projects, site, type Project } from '../data/site';

const layoutClass: Record<string, string> = {
  'ace-base': 'project--featured',
  'ace-id': 'project--half',
  typace: 'project--half',
  'mahto-real-estate': 'project--wide'
};

const filterItems = [
  { value: 'all', label: 'All' },
  { value: 'ace-base', label: 'Studio' },
  { value: 'ace-id', label: 'Identity' },
  { value: 'typace', label: 'Typography' },
  { value: 'mahto-real-estate', label: 'Web & 3D' }
];

const ecosystemNodes = [
  { name: 'AceID', meta: 'OIDC & Passkeys', href: site.aceId },
  { name: 'AIDC', meta: 'Developer Console', href: site.aceConsole },
  { name: 'Typace', meta: 'Font Organizer', href: site.typace },
  { name: 'Docs', meta: 'Technical Guides', href: site.docs }
];

function ProjectVisual({ id }: { id: string }) {
  if (id === 'ace-base') {
    return (
      <div className="project-bento-visual">
        <div className="ecosystem-nodes">
          {ecosystemNodes.map((node) => (
            <a
              key={node.name}
              className="ecosystem-node"
              href={node.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="ecosystem-node__name">
                {node.name}
                <ArrowRightUpIcon size={13} aria-hidden="true" />
              </span>
              <span className="ecosystem-node__meta">{node.meta}</span>
            </a>
          ))}
        </div>
      </div>
    );
  }

  if (id === 'ace-id') {
    return (
      <div className="terminal-wrap" style={{ marginTop: '1.15rem', position: 'relative' }}>
        <div className="terminal-copy-float">
          <CopyButton content="npm i ace-id-sdk" label="Copy npm install command" />
        </div>
        <Terminal
          title="ace-id-sdk"
          lines={[
            { type: 'cmd', text: 'npm i ace-id-sdk' },
            { type: 'out', text: 'configuring OIDC & PKCE provider…' },
            { type: 'success', text: 'identity.ace-base.cc ready' }
          ]}
        />
      </div>
    );
  }

  if (id === 'typace') {
    return (
      <div className="project-bento-visual" style={{ padding: 0, border: 'none', background: 'transparent' }}>
        <div className="type-specimen">
          <span className="type-specimen__glyph">
            Aa <em>Bb</em> Cc
          </span>
          <div className="type-specimen__meta">
            <b>Editorial Specimen</b>
            <span>Serif · Sans · Mono</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function ProjectBody({ project, index }: { project: Project; index: number }) {
  const number = String(index + 1).padStart(2, '0');
  const isSplitLayout = project.id === 'ace-base';

  return (
    <>
      <a
        className="project__arrow"
        href={project.href}
        {...(project.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        aria-label={`Open ${project.name}`}
      >
        <ArrowRightUpIcon size={20} aria-hidden="true" />
      </a>

      <div className="project-bento-main">
        <div className="project__top">
          <span className="project__index">/{number}</span>
          <span className="project__category">{project.category}</span>
        </div>

        <h3>{project.name}</h3>
        <p className="project__tagline">{project.tagline}</p>
        <p className="project__desc">{project.description}</p>
        <p className="project__role">
          <b>Role —</b> {project.role}
        </p>

        {!isSplitLayout ? <ProjectVisual id={project.id} /> : null}

        <div className="project__foot">
          <ul className="chips" aria-label={`${project.name} stack`}>
            {project.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          <span className="project__links">
            {project.links.map((link) => (
              <a
                key={link.href}
                className="project__link"
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.label}
                <ArrowRightUpIcon size={14} aria-hidden="true" />
              </a>
            ))}
          </span>
        </div>
      </div>

      {isSplitLayout ? <ProjectVisual id={project.id} /> : null}
    </>
  );
}

/**
 * Selected public work in a Dribbble-inspired Bento grid with Glisse
 * SegmentedControl filtering, ReactBits SpotlightCard, MagicUI BorderBeam/BlurFade,
 * and Animate UI CopyButton.
 */
export function ProjectGrid() {
  const [filter, setFilter] = useState('all');
  const visibleProjects = filter === 'all' ? projects : projects.filter((p) => p.id === filter);

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading
          id="work-title"
          index="01"
          label="Work"
          title="Selected"
          accent="work"
          meta="Products, infrastructure, and studio craft."
        />

        <div className="glisse-filter-row">
          <SegmentedControl
            aria-label="Filter projects by category"
            items={filterItems}
            value={filter}
            onValueChange={(val) => setFilter(val || 'all')}
          />
        </div>

        <div className="projects">
          {visibleProjects.map((project, index) => (
            <BlurFade
              key={project.id}
              delay={index * 0.06}
              yOffset={14}
              className={filter === 'all' ? (layoutClass[project.id] ?? 'project--half') : 'project--featured'}
            >
              <SpotlightCard
                className={`project ${filter === 'all' ? (layoutClass[project.id] ?? 'project--half') : 'project--featured'}`}
                theme="light"
                spotlightColor="rgba(240, 120, 54, 0.30)"
                spotlightSize={360}
                ambient={false}
                flare={false}
              >
                {project.featured || filter !== 'all' ? (
                  <BorderBeam size={280} duration={11} colorFrom="#f07836" colorTo="#fde2cc" />
                ) : null}
                <ProjectBody project={project} index={index} />
              </SpotlightCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
