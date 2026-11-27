import SpotlightCard from './vendor/reactbits/SpotlightCard';
import { ArrowRightUpIcon } from '@solar-icons/react/linear/arrow-right-up';
import { SectionHeading } from './SectionHeading';
import { projects, type Project } from '../data/site';

const layoutClass: Record<string, string> = {
  'ace-base': 'project--featured',
  typace: 'project--half'
};

function ProjectBody({ project, index }: { project: Project; index: number }) {
  const number = String(index + 1).padStart(2, '0');

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
    </>
  );
}

/**
 * Selected public work in an asymmetric editorial grid.
 */
export function ProjectGrid() {
  const [featured, ...rest] = projects;

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading
          id="work-title"
          index="01"
          label="Work"
          title="Selected"
          accent="work"
          meta="Selected products and work."
        />

        <div className="projects">
          {[featured, ...rest].map((project, index) => (
            <SpotlightCard
              key={project.id}
              className={`project ${layoutClass[project.id] ?? 'project--half'}`}
              theme="light"
              spotlightColor="rgba(240, 120, 54, 0.33)"
              spotlightSize={340}
              ambient={false}
              flare={false}
            >
              <ProjectBody project={project} index={index} />
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
