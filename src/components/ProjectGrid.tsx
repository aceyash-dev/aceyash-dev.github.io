import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { LearnMoreChevron } from './LearnMore';
import { SectionHeading } from './SectionHeading';
import { projects } from '../data/site';

export function ProjectGrid() {
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <section className="section projects-section" id="work" aria-labelledby="work-title">
      <SectionHeading
        id="work-title"
        number="02 / Orbit"
        title="Selected"
        accent="work"
        meta="Products · Tools · Experiments"
      />

      <div className="project-grid">
        {projects.map((project, index) => (
          <motion.div
            className="project-grid__item"
            key={project.id}
            initial={reducedMotion ? false : { opacity: 0, y: 28, filter: 'blur(14px)' }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: index * 0.08, ease: 'easeOut' }}
          >
            <m3e-card
              variant="outlined"
              className="project-card"
              style={{ '--project-accent': project.accent } as CSSProperties}
            >
              <a
                className="project-card__anchor t-learn"
                href={project.href}
                target={project.external ? '_blank' : undefined}
                rel={project.external ? 'noopener noreferrer' : undefined}
                aria-label={`Open ${project.name}`}
              >
                <div className="project-card__top" aria-hidden="true">
                  <span className="project-card__number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="project-card__orbit" />
                </div>

                <div className="project-card__body">
                  <span className="project-card__tag">{project.tag}</span>
                  <h3>{project.name}</h3>
                  <p className="project-card__category">{project.category}</p>
                  <p className="project-card__description">{project.description}</p>
                </div>

                <div className="project-card__bottom">
                  <ul className="project-card__tech" aria-label={`${project.name} technologies`}>
                    {project.tech.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                  <span className="project-card__cta">
                    {project.external ? 'Visit project' : 'Open tools'}
                    <LearnMoreChevron />
                  </span>
                </div>
              </a>
            </m3e-card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
