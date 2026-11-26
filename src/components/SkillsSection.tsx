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

function GroupCard({ group }: { group: SkillGroup }) {
  const Icon = groupIcons[group.id] ?? CodeIcon;

  return (
    <div className="skill-group">
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
    </div>
  );
}

/** Capabilities grouped the way the work actually happens — web, native, tooling. */
export function SkillsSection() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          id="skills-title"
          index="05"
          label="Skills"
          title="Tools I"
          accent="reach for"
          meta="No percentages — just what I use, and why."
        />
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
