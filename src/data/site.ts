export type ProjectLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type Project = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  role: string;
  stack: string[];
  href: string;
  external: boolean;
  featured?: boolean;
  links: ProjectLink[];
};

export type NavLink = {
  label: string;
  href: string;
};

export type ProfileFact = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

export type SkillGroup = {
  id: string;
  label: string;
  note: string;
  items: string[];
};

export type FaqLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  links?: FaqLink[];
};

export type FooterColumn = {
  title: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
};

export const site = {
  name: 'Ace Yash',
  shortName: 'Yash',
  role: 'Developer',
  jobTitle: 'Developer',
  location: 'Varanasi, India',
  email: 'aceyash-dev@proton.me',
  github: 'https://github.com/aceyash-dev',
  instagram: 'https://instagram.com/yash.hits',
  instagramHandle: '@yash.hits',
  aceBase: 'https://ace-base.cc/',
  docs: 'https://docs.ace-base.cc/',
  typace: 'https://typace.ace-base.cc/',
  canonical: 'https://aceyash-dev.github.io/',
  portfolioRepo: 'https://github.com/aceyash-dev/aceyash-dev.github.io'
} as const;

export const navLinks: NavLink[] = [
  { label: 'Work', href: '#work' },
  { label: 'Activity', href: '#activity' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' }
];

export const projects: Project[] = [
  {
    id: 'ace-base',
    name: 'The Ace Base',
    category: 'Software studio',
    tagline: 'Software studio founded by Ace Yash.',
    description: 'The Ace Base builds web applications, typography tools, and developer software.',
    role: 'Founder & CEO',
    stack: ['Web applications', 'Typography', 'Developer tools'],
    href: site.aceBase,
    external: true,
    featured: true,
    links: [
      { label: 'ace-base.cc', href: site.aceBase, external: true },
      { label: 'Documentation', href: site.docs, external: true }
    ]
  },
  {
    id: 'typace',
    name: 'Typace',
    category: 'Typography tool',
    tagline: 'A typography organizer.',
    description: 'Typace is a typography organizer developed within The Ace Base ecosystem.',
    role: 'Designer & developer',
    stack: ['TypeScript', 'React', 'Typography'],
    href: site.typace,
    external: true,
    links: [{ label: 'typace.ace-base.cc', href: site.typace, external: true }]
  }
];

export const profileFacts: ProfileFact[] = [
  { label: 'Based in', value: site.location },
  { label: 'Role', value: 'Founder & CEO · The Ace Base', href: site.aceBase, external: true },
  { label: 'Focus', value: 'Web · Native Android · Interfaces' },
  { label: 'Elsewhere', value: site.instagramHandle, href: site.instagram, external: true }
];

export const skillsRail = [
  'JavaScript',
  'TypeScript',
  'React',
  'HTML5',
  'CSS3',
  'Node.js',
  'Tailwind CSS'
] as const;

export const skillGroups: SkillGroup[] = [
  {
    id: 'web',
    label: 'Web',
    note: 'Web interfaces and applications.',
    items: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Vite',
      'Responsive, accessible UI'
    ]
  },
  {
    id: 'tools',
    label: 'Tools & craft',
    note: 'Tools for building, testing, and shipping.',
    items: ['Git', 'GitHub', 'GitHub Actions', 'VS Code', 'Postman', 'Figma', 'Node.js']
  }
];

export const faqs: FaqItem[] = [
  {
    id: 'who-is-ace-yash',
    question: 'Who is Ace Yash?',
    answer:
      'Ace Yash is a developer based in Varanasi, India, and the founder and CEO of The Ace Base. He builds web products, native Android software, interfaces, and developer-focused tools, with a bias toward fast, deliberate, accessible interfaces.'
  },
  {
    id: 'what-does-ace-yash-do',
    question: 'What does Ace Yash do?',
    answer:
      'Ace Yash builds web applications and native Android software. He is the founder and CEO of The Ace Base, where he leads product and engineering.'
  },
  {
    id: 'ceo-of-the-ace-base',
    question: 'Who is the CEO of The Ace Base?',
    answer:
      'Ace Yash is the founder and CEO of The Ace Base, the software and digital-infrastructure studio behind ace-base.cc. He leads product, engineering, and interface direction there.'
  },
  {
    id: 'what-is-the-ace-base',
    question: 'What is The Ace Base?',
    answer:
      'The Ace Base builds software and digital infrastructure across web applications, typography, developer tools, and user interfaces. Its public footprint includes the documentation site at docs.ace-base.cc and Typace, the typography organizer at typace.ace-base.cc.',
    links: [
      { label: 'The Ace Base', href: site.aceBase, external: true },
      { label: 'Documentation', href: site.docs, external: true },
      { label: 'Typace', href: site.typace, external: true }
    ]
  },
  {
    id: 'technologies',
    question: 'What technologies does Ace Yash work with?',
    answer:
      'Ace Yash works with JavaScript, TypeScript, React, HTML5, CSS3, Tailwind CSS and Vite on the web, the Android SDK for native Android, and Node.js on the tooling side, with Git and GitHub Actions for delivery.'
  },
  {
    id: 'projects',
    question: 'What projects has Ace Yash developed?',
    answer:
      'Public work includes The Ace Base, Typace, and this portfolio. The Ace Base is his software studio; Typace is its typography organizer.',
    links: [
      { label: 'The Ace Base', href: site.aceBase, external: true },
      { label: 'Typace', href: site.typace, external: true }
    ]
  },
  {
    id: 'contact',
    question: 'How can someone contact Ace Yash?',
    answer:
      'The most direct route is email at aceyash-dev@proton.me. He is also reachable as @aceyash-dev on GitHub and @yash.hits on Instagram. For anything related to The Ace Base, the company site at ace-base.cc is the canonical starting point.',
    links: [
      { label: 'aceyash-dev@proton.me', href: `mailto:${site.email}` },
      { label: 'GitHub', href: site.github, external: true }
    ]
  }
];

export const footerColumns: FooterColumn[] = [
  {
    title: 'Sections',
    links: navLinks.map((link) => ({ label: link.label, href: link.href }))
  },
  {
    title: 'Elsewhere',
    links: [
      { label: 'The Ace Base', href: site.aceBase, external: true },
      { label: 'Documentation', href: site.docs, external: true },
      { label: 'GitHub', href: site.github, external: true },
      { label: 'Instagram', href: site.instagram, external: true },
    ]
  },
  {
    title: 'Direct',
    links: [{ label: site.email, href: `mailto:${site.email}` }]
  }
];
