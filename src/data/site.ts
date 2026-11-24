export type Project = {
  id: string;
  name: string;
  category: string;
  tag: string;
  description: string;
  tech: string[];
  href: string;
  external: boolean;
  accent: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type ProfileRow = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  icon?: string;
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
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  links?: FaqLink[];
};

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
  className?: string;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export const site = {
  name: 'Yash',
  fullName: 'Ace Yash',
  location: 'Varanasi, India',
  email: 'hello@ace-base.cc',
  github: 'https://github.com/aceyash-dev',
  instagram: 'https://instagram.com/archives.of.yash',
  instagramHandle: '@archives.of.yash',
  aceBase: 'https://ace-base.cc/',
  docs: 'https://docs.ace-base.cc/',
  typace: 'https://typace.ace-base.cc/'
} as const;

export const navLinks: NavLink[] = [
  { label: 'Work', href: '#work' },
  { label: 'Activity', href: '#activity' },
  { label: 'Profile', href: '#profile' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

export const projects: Project[] = [
  {
    id: 'ace-base',
    name: 'The Ace Base',
    category: 'Product studio',
    tag: 'Platform',
    description:
      'Software and digital infrastructure across web applications, typography, developer tools, and user interfaces.',
    tech: ['Product', 'Web', 'Infrastructure'],
    href: site.aceBase,
    external: true,
    accent: '#ff5a1c'
  },
  {
    id: 'typace',
    name: 'Typace',
    category: 'Typography organizer',
    tag: 'TypeScript · React',
    description:
      'A focused typography organizer and public product in the Ace Base ecosystem.',
    tech: ['TypeScript', 'React', 'Typography'],
    href: site.typace,
    external: true,
    accent: '#ffb07a'
  },
  {
    id: 'acemail',
    name: 'AceMail',
    category: 'SMTP / IMAP client',
    tag: 'Native Android',
    description:
      'An email client built for native Android with Kotlin and Java.',
    tech: ['Kotlin', 'Java', 'Android'],
    href: 'https://github.com/tab-gl/AceMail',
    external: true,
    accent: '#f2ede4'
  },
  {
    id: 'widgets',
    name: 'Browser widgets',
    category: 'Standalone tools',
    tag: 'HTML · CSS · JS',
    description:
      'Small, standalone utilities for live weather, local time, and a calendar.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    href: '/widgets/',
    external: false,
    accent: '#ff7a3d'
  }
];

export const profileRows: ProfileRow[] = [
  { label: 'Based in', value: site.location },
  {
    label: 'Instagram',
    value: site.instagramHandle,
    href: site.instagram,
    external: true,
    icon: '↗'
  },
  { label: 'Role', value: 'Founder & CEO · The Ace Base' },
  { label: 'Focus', value: 'Web · Native · Interfaces' }
];

export const skillsRail = [
  'JavaScript',
  'Go',
  'HTML5',
  'React',
  'TypeScript',
  'CSS3',
  'Node.js',
  'Tailwind CSS'
];

export const skillGroups: SkillGroup[] = [
  {
    id: 'web',
    label: 'Web',
    note: 'Close to the platform, with typed React when the interface earns it.',
    items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Motion', 'Responsive UI']
  },
  {
    id: 'native',
    label: 'Native',
    note: 'Native Android work, plus web-to-native bridges when they are the right tool.',
    items: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'Capacitor', 'C++', 'Python']
  },
  {
    id: 'tools',
    label: 'Tools',
    note: 'A practical workflow for design, shipping, debugging, and keeping code understandable.',
    items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma', 'GitHub Actions', 'Vite']
  }
];

export const faqs: FaqItem[] = [
  {
    id: 'ace-yash',
    question: 'What does Ace Yash build?',
    answer:
      'Ace Yash is a developer and the founder and CEO of The Ace Base, building web products, native Android software, interfaces, and developer-focused tools.'
  },
  {
    id: 'ace-base',
    question: 'What does The Ace Base build?',
    answer:
      'The Ace Base builds software and digital infrastructure across web applications, application infrastructure, typography, developer tools, and user interfaces.'
  },
  {
    id: 'projects',
    question: 'Where can I learn about the projects?',
    answer:
      'Public project information is available through The Ace Base website and its documentation site, including Typace and other active projects.',
    links: [
      { label: 'The Ace Base', href: site.aceBase },
      { label: 'Docs', href: site.docs },
      { label: 'Typace', href: site.typace }
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
      { label: 'GitHub', href: site.github, external: true, className: 'u-url' },
      { label: 'Instagram', href: site.instagram, external: true },
      { label: 'The Ace Base', href: site.aceBase, external: true },
      { label: 'Documentation', href: site.docs, external: true },
      { label: 'Browser widgets', href: '/widgets/' }
    ]
  },
  {
    title: 'Direct',
    links: [{ label: site.email, href: `mailto:${site.email}` }]
  }
];

export const statusWords = ['building', 'shipping', 'shaping'] as const;
