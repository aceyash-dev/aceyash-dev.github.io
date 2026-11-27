import SpotlightCard from './vendor/reactbits/SpotlightCard';
import { DotPattern } from './vendor/magicui/DotPattern';
import { Reveal } from './Reveal';
import { CodeIcon } from '@solar-icons/react/linear/code';
import { SmartphoneIcon } from '@solar-icons/react/linear/smartphone';
import { Pen2Icon } from '@solar-icons/react/linear/pen-2';
import { CheckCircleIcon } from '@solar-icons/react/linear/check-circle';
import { SectionHeading } from './SectionHeading';
import { skillGroups, type SkillGroup } from '../data/site';

const groupIcons: Record<string, typeof CodeIcon> = {
  web: CodeIcon,
  native: SmartphoneIcon,
  tools: Pen2Icon
};

function GroupCard({ group, index }: { group: SkillGroup; index: number }) {
  const Icon = groupIcons[group.id] ?? CodeIcon;

  return (
    <Reveal delay={index * 0.08} y={16}>
      <SpotlightCard
        className="skill-group"
        theme="light"
        spotlightColor="rgba(240, 120, 54, 0.22)"
        spotlightSize={280}
        ambient={false}
        flare={false}
      >
        <div className="skill-group__head">
          <span className="skill-group__icon" aria-hidden="true">
            <Icon size={22} />
          </span>
          <h3>{group.label}</h3>
        </div>
        <p className="skill-group__note">{group.note}</p>
        <ul className="skill-list">
          {group.items.map((item) => (
            <li key={item}>
              <CheckCircleIcon size={16} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </SpotlightCard>
    </Reveal>
  );
}

/** Capabilities grouped across Web, Systems/Mobile, and Tooling over a subtle DotPattern. */
export function SkillsSection() {
  return (
    <section className="section section--patterned" id="skills" aria-labelledby="skills-title">
      <DotPattern width={22} height={22} cr={1.1} />
      <div className="container">
        <SectionHeading
          id="skills-title"
          index="05"
          label="Skills"
          title="Tools I"
          accent="reach for"
          meta="No percentages — just what I use, and why."
        />
        <div className="skills-grid skills-grid--three">
          {skillGroups.map((group, index) => (
            <GroupCard key={group.id} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
