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
  aceMail: 'https://github.com/tab-gl/AceMail',
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
    category: 'Product studio — Web & infrastructure',
    tagline: 'The software studio I founded and run.',
    description:
      'The Ace Base builds software and digital infrastructure across web applications, typography, developer tools, and user interfaces. It is the umbrella for my public products and internal tooling — from the website and documentation to Typace, the typography organizer.',
    role: 'Founder & CEO — product, engineering, and interface direction',
    stack: ['Web applications', 'Developer tools', 'Typography', 'User interfaces'],
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
    category: 'Typography — Organizer',
    tagline: 'A focused typography organizer.',
    description:
      'Typace is a focused typography organizer and the flagship public product in The Ace Base ecosystem. It exists to make building with type calmer and more deliberate — one of the things I care about most at the intersection of interface design and engineering.',
    role: 'Designer & developer',
    stack: ['TypeScript', 'React', 'Typography tooling'],
    href: site.typace,
    external: true,
    links: [{ label: 'typace.ace-base.cc', href: site.typace, external: true }]
  },
  {
    id: 'acemail',
    name: 'AceMail',
    category: 'Native Android — Email client',
    tagline: 'A native email client for Android.',
    description:
      'AceMail is an SMTP/IMAP email client built for native Android. It is the clearest example of my native work — deliberate performance, platform-idiomatic UI, and a focus on the everyday mechanics of email rather than reinventing it.',
    role: 'Developer — native Android',
    stack: ['Android SDK'],
    href: site.aceMail,
    external: true,
    links: [{ label: 'tab-gl/AceMail on GitHub', href: site.aceMail, external: true }]
  },
  {
    id: 'widgets',
    name: 'Browser widgets',
    category: 'Utilities — Standalone',
    tagline: 'Small, dependency-free browser utilities.',
    description:
      'A set of small, standalone browser widgets for live weather, local time, and a calendar. Built with plain HTML, CSS, and JavaScript — no framework, no build step — as a deliberate exercise in keeping things simple and fast.',
    role: 'Designer & developer',
    stack: ['HTML', 'CSS', 'JavaScript'],
    href: '/widgets/',
    external: false,
    links: [{ label: 'Open the widgets', href: '/widgets/' }]
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
    note: 'Close to the platform — typed React when the interface earns it.',
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
    note: 'A practical workflow for designing, shipping, and debugging.',
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
      'Ace Yash designs and builds software across the web and native Android: React and TypeScript web applications, native Android apps such as AceMail, typography tooling such as Typace, and small dependency-free web utilities.'
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
      'Public work includes The Ace Base itself, Typace (a typography organizer), AceMail (a native Android email client), a set of standalone browser widgets, and this portfolio — a React, TypeScript and Vite site hosted on GitHub Pages.',
    links: [
      { label: 'The Ace Base', href: site.aceBase, external: true },
      { label: 'AceMail on GitHub', href: site.aceMail, external: true }
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
      { label: 'Browser widgets', href: '/widgets/' }
    ]
  },
  {
    title: 'Direct',
    links: [{ label: site.email, href: `mailto:${site.email}` }]
  }
];
