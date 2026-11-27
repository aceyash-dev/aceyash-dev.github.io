export type PageId = 'work' | 'about' | 'skills' | 'contact';

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
  id: PageId;
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
  aceId: 'https://identity.ace-base.cc/',
  aceConsole: 'https://console.ace-base.cc/',
  docs: 'https://docs.ace-base.cc/',
  typace: 'https://typace.ace-base.cc/',
  mahto: 'https://mahto-real-estate-agency.pages.dev/',
  canonical: 'https://aceyash-dev.github.io/',
  portfolioRepo: 'https://github.com/aceyash-dev/aceyash-dev.github.io'
} as const;

export const navLinks: NavLink[] = [
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'contact', label: 'Contact', href: '#contact' }
];

export const projects: Project[] = [
  {
    id: 'ace-base',
    name: 'The Ace Base',
    category: 'Software studio',
    tagline: 'Software studio founded by Ace Yash.',
    description:
      'The Ace Base builds web applications, identity infrastructure, typography tools, and developer software.',
    role: 'Founder & CEO',
    stack: ['Web applications', 'Identity', 'Typography', 'Developer tools'],
    href: site.aceBase,
    external: true,
    featured: true,
    links: [
      { label: 'ace-base.cc', href: site.aceBase, external: true },
      { label: 'Documentation', href: site.docs, external: true }
    ]
  },
  {
    id: 'ace-id',
    name: 'AceID',
    category: 'Identity & Auth',
    tagline: 'Fast & secure authentication for non-Googlers.',
    description:
      'An independent OIDC identity provider with a developer console (AIDC), TypeScript SDK, and Rust CLI.',
    role: 'Creator & Architect',
    stack: ['TypeScript', 'Go', 'Rust', 'OIDC'],
    href: site.aceId,
    external: true,
    links: [
      { label: 'identity.ace-base.cc', href: site.aceId, external: true },
      { label: 'Console', href: site.aceConsole, external: true }
    ]
  },
  {
    id: 'typace',
    name: 'Typace',
    category: 'Typography tool',
    tagline: 'Typography, beautifully organized.',
    description:
      'Open-source typography organizer and font discovery tool developed within The Ace Base ecosystem.',
    role: 'Designer & developer',
    stack: ['JavaScript', 'React', 'Typography'],
    href: site.typace,
    external: true,
    links: [
      { label: 'typace.ace-base.cc', href: site.typace, external: true },
      { label: 'GitHub', href: 'https://github.com/aceyash-dev/Typace', external: true }
    ]
  },
  {
    id: 'mahto-real-estate',
    name: 'Mahto Real Estate',
    category: 'Web & 3D platform',
    tagline: 'Property discovery with interactive 3D walkthroughs.',
    description:
      'Full-featured real estate platform connecting buyers and brokers with responsive property search and 3D spatial previews.',
    role: 'Lead Engineer',
    stack: ['JavaScript', '3D Walkthrough', 'Cloudflare Pages'],
    href: site.mahto,
    external: true,
    links: [{ label: 'mahto-real-estate-agency.pages.dev', href: site.mahto, external: true }]
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
  'Tailwind CSS',
  'Vite',
  'Go',
  'Rust',
  'Android SDK'
] as const;

export const skillGroups: SkillGroup[] = [
  {
    id: 'web',
    label: 'Web & Interfaces',
    note: 'Editorial layouts, motion, and accessible web apps.',
    items: [
      'HTML5 & Semantic Markup',
      'CSS3 & Design Systems',
      'JavaScript (ES2024+)',
      'TypeScript',
      'React & Vite',
      'Tailwind CSS',
      'Motion & Lenis'
    ]
  },
  {
    id: 'native',
    label: 'Systems & Mobile',
    note: 'Identity backends, CLIs, and native Android software.',
    items: [
      'Node.js',
      'Go (OIDC & APIs)',
      'Rust (CLI tooling)',
      'Native Android SDK',
      'REST & OAuth / OIDC'
    ]
  },
  {
    id: 'tools',
    label: 'Tools & Craft',
    note: 'Tools for designing, testing, and shipping fast.',
    items: [
      'Git & GitHub',
      'GitHub Actions CI/CD',
      'Cloudflare & Vercel',
      'Figma',
      'VS Code',
      'Postman'
    ]
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
      'Public work includes The Ace Base, AceID, Typace, and Mahto Real Estate. The Ace Base is his software studio; Typace is its typography organizer.',
    links: [
      { label: 'The Ace Base', href: site.aceBase, external: true },
      { label: 'AceID', href: site.aceId, external: true },
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
    title: 'Pages',
    links: navLinks.map((link) => ({ label: link.label, href: link.href }))
  },
  {
    title: 'Elsewhere',
    links: [
      { label: 'The Ace Base', href: site.aceBase, external: true },
      { label: 'Documentation', href: site.docs, external: true },
      { label: 'GitHub', href: site.github, external: true },
      { label: 'Instagram', href: site.instagram, external: true }
    ]
  },
  {
    title: 'Direct',
    links: [{ label: site.email, href: `mailto:${site.email}` }]
  }
];
