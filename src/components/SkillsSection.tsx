import { ImmersiveCard } from './ImmersiveCard';
import { DotPattern } from './vendor/magicui/DotPattern';
import { BlurFade } from './vendor/magicui/BlurFade';
import { AnimatedTabs } from './vendor/animate-ui/Tabs';
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
    <BlurFade delay={index * 0.06} yOffset={12}>
      <ImmersiveCard
        className="skill-group"
        spotlightColor="rgba(240, 120, 54, 0.22)"
        maxTilt={5}
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
      </ImmersiveCard>
    </BlurFade>
  );
}

/** Capabilities grouped across Web, Systems/Mobile, and Tooling with Animate UI Tabs + DotPattern. */
export function SkillsSection() {
  const tabItems = [
    {
      value: 'all',
      label: 'All capabilities',
      content: (
        <div className="skills-grid skills-grid--three">
          {skillGroups.map((group, index) => (
            <GroupCard key={group.id} group={group} index={index} />
          ))}
        </div>
      )
    },
    ...skillGroups.map((group) => ({
      value: group.id,
      label: group.label,
      content: (
        <div className="skills-grid">
          <GroupCard group={group} index={0} />
        </div>
      )
    }))
  ];

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
        <AnimatedTabs items={tabItems} defaultValue="all" />
      </div>
    </section>
  );
}
