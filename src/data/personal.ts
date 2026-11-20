import type { TranslationKey } from '@/lib/localize'

export type Link = {
  label: string
  url: string
}

export type ContactInfo = {
  location: string
  email: string
  phone: string
  links: Link[]
}

export type TechnologyStack = {
  frontend: string[]
  backend: string[]
  databases: string[]
}

export type EducationEntry = {
  degree: TranslationKey
  institution: string
  start: Date
  end: Date
  notes?: TranslationKey
}

export type Period = {
  start: Date
  end: Date | null
}

export type WorkExperience = {
  role: TranslationKey
  company: string
  location: string
  period: Period
  tech: TechnologyStack
  achievements: string[]
}

export type Project = {
  title: TranslationKey
  period: Period
  summary: string
  tech: TechnologyStack
  details?: string[]
  status?: 'ongoing' | 'completed'
  links?: Link[]
}

export type Certificate = {
  name: string
  issuer?: string
  date: Date
  details?: string
}

export type Extracurricular = {
  role: TranslationKey
  organization: string
  start: Date
  end: Date | null
  achievements: string[]
}

export type Resume = {
  name: string
  headline: TranslationKey
  focusAreas: string[]
  summary: string
  contact: ContactInfo
  education: EducationEntry[]
  experience: WorkExperience[]
  projects: Project[]
  certificates: Certificate[]
  extracurricular: Extracurricular[]
}

export const resume: Resume = {
  name: 'Haythem Frikha',
  headline: 'software_engineer',
  focusAreas: ['Node.js', 'React / Next.js', 'Vue / Nuxt'],
  summary: 'resume_summary',
  contact: {
    location: 'Sfax, Tunisia',
    email: 'haythem.frikha@outlook.com',
    phone: '+21654502403',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Flamenate',
      },
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/haythem-frikha',
      },
    ],
  },
  education: [
    {
      degree: 'resume_education_enib_degree',
      institution: "ENIB - École Nationale d'Ingénieurs de Brest",
      start: new Date('2026-09-01'),
      end: new Date('2028-06-30'),
    },
    {
      degree: 'resume_education_enis_degree',
      institution: "ENIS - École Nationale d'Ingénieurs de Sfax",
      start: new Date('2024-08-01'),
      end: new Date('2028-06-30'),
    },
    {
      degree: 'resume_education_ipeis_degree',
      institution:
        "IPEIS - Institut Préparatoire aux Études d'Ingénieur de Sfax",
      start: new Date('2022-07-01'),
      end: new Date('2024-07-01'),
      notes: 'resume_education_ipeis_notes',
    },
    {
      degree: 'resume_education_lycee_degree',
      institution: 'Lycée Habib Thameur Sfax',
      start: new Date('2018-09-01'),
      end: new Date('2022-12-01'),
      notes: 'resume_education_lycee_notes',
    },
  ],
  experience: [
    {
      role: 'software_engineer',
      company: 'Dink USA',
      location: 'Remote',
      period: {
        start: new Date('2024-10-01'),
        end: new Date('2025-05-01'),
      },
      tech: {
        frontend: ['Vue.js', 'Nuxt.js', 'TailwindCSS'],
        backend: ['tRPC', 'Shopify', 'GraphQL', 'Express', 'Prisma'],
        databases: ['PostgreSQL'],
      },
      achievements: [
        'resume_experience_dink_achievement_1',
        'resume_experience_dink_achievement_2',
        'resume_experience_dink_achievement_3',
        'resume_experience_dink_achievement_4',
      ],
    },
  ],
  projects: [
    {
      title: 'portfolio_website',
      period: {
        start: new Date('2024-06-01'),
        end: null,
      },
      summary: 'resume_project_portfolio_summary',
      tech: {
        frontend: ['React', 'Tanstack Start', 'Tanstack Router', 'Zustand'],
        backend: ['Tanstack Start', 'Node.js'],
        databases: [],
      },
      details: [
        'resume_project_portfolio_detail_1',
        'resume_project_portfolio_detail_2',
      ],
      status: 'ongoing',
      links: [
        {
          label: 'resume_project_link_source',
          url: 'https://github.com/Flamenate',
        },
      ],
    },
    {
      title: 'event_pitch_website',
      period: {
        start: new Date('2024-10-01'),
        end: new Date('2024-10-31'),
      },
      summary: 'resume_project_event_pitch_summary',
      tech: {
        frontend: ['Angular', 'TailwindCSS'],
        backend: [],
        databases: [],
      },
      details: ['resume_project_event_pitch_detail_1'],
      status: 'completed',
    },
    {
      title: 'stock_management_dashboard',
      period: {
        start: new Date('2023-10-01'),
        end: new Date('2023-10-31'),
      },
      summary: 'resume_project_stock_dashboard_summary',
      tech: {
        frontend: ['Angular', 'TailwindCSS'],
        backend: ['Nest.js'],
        databases: ['MongoDB'],
      },
      details: ['resume_project_stock_dashboard_detail_1'],
      status: 'completed',
    },
    {
      title: 'sento_kaishi_application',
      period: {
        start: new Date('2023-01-01'),
        end: new Date('2023-12-31'),
      },
      summary: 'resume_project_sento_summary',
      tech: {
        frontend: ['Flutter'],
        backend: ['.NET Framework'],
        databases: ['PostgreSQL'],
      },
      details: [
        'resume_project_sento_detail_1',
        'resume_project_sento_detail_2',
        'resume_project_sento_detail_3',
      ],
      status: 'completed',
    },
    {
      title: 'economy_bot',
      period: {
        start: new Date('2022-01-01'),
        end: new Date('2022-12-31'),
      },
      summary: 'resume_project_economy_summary',
      tech: {
        frontend: [],
        backend: ['Node.js', 'Discord.js'],
        databases: ['MongoDB'],
      },
      details: [
        'resume_project_economy_detail_1',
        'resume_project_economy_detail_2',
        'resume_project_economy_detail_3',
      ],
      status: 'completed',
    },
    {
      title: 'matchmaking_bot',
      period: {
        start: new Date('2022-01-01'),
        end: new Date('2022-12-31'),
      },
      summary: 'resume_project_matchmaking_summary',
      tech: {
        frontend: [],
        backend: ['Node.js', 'Discord.js'],
        databases: ['MongoDB'],
      },
      details: [
        'resume_project_matchmaking_detail_1',
        'resume_project_matchmaking_detail_2',
      ],
      status: 'completed',
    },
    {
      title: 'meeting_manager',
      period: {
        start: new Date('2020-01-01'),
        end: new Date('2020-12-31'),
      },
      summary: 'resume_project_meeting_summary',
      tech: {
        frontend: ['Bootstrap'],
        backend: ['Python', 'Discord.py', 'Flask'],
        databases: ['MongoDB'],
      },
      details: [
        'resume_project_meeting_detail_1',
        'resume_project_meeting_detail_2',
        'resume_project_meeting_detail_3',
      ],
      status: 'completed',
    },
  ],
  certificates: [
    {
      name: 'Cisco Networking: DevNet Associate',
      issuer: 'Cisco',
      date: new Date('2026-09-01'),
    },
    {
      name: 'Cisco Networking: C Advanced',
      issuer: 'Cisco',
      date: new Date('2026-03-01'),
    },
    {
      name: 'Azure AI Fundamentals (AI-900)',
      issuer: 'Microsoft',
      date: new Date('2024-10-01'),
    },
    {
      name: 'C2 English Certificate',
      issuer: 'EF SET',
      date: new Date('2022-08-01'),
      details: 'resume_certificate_efset_details',
    },
  ],
  extracurricular: [
    {
      role: 'resume_extracurricular_mtc_role',
      organization: 'Microsoft Tech Club, ENIS',
      start: new Date('2024-09-01'),
      end: null,
      achievements: ['resume_extracurricular_mtc_achievement_1'],
    },
    {
      role: 'resume_extracurricular_teia_role',
      organization: 'TEIA',
      start: new Date('2017-10-01'),
      end: null,
      achievements: [
        'resume_extracurricular_teia_achievement_1',
        'resume_extracurricular_teia_achievement_2',
        'resume_extracurricular_teia_achievement_3',
        'resume_extracurricular_teia_achievement_4',
      ],
    },
    {
      role: 'resume_extracurricular_japano_role',
      organization: 'Japano-Sfaxian Culture',
      start: new Date('2019-12-01'),
      end: new Date('2023-04-01'),
      achievements: [
        'resume_extracurricular_japano_achievement_1',
        'resume_extracurricular_japano_achievement_2',
        'resume_extracurricular_japano_achievement_3',
      ],
    },
  ],
}

export const projects: Project[] = resume.projects

export type Skills = {
  frontend: string[]
  backend: string[]
  databases: string[]
  soft: TranslationKey[]
}

// Curated by hand: not every tool used in a project counts as a skill.
export const skills: Skills = {
  frontend: [
    'React',
    'Tanstack Start',
    'Tanstack Router',
    'Angular',
    'Vue.js',
    'Nuxt.js',
  ],
  backend: [
    'Tanstack Start',
    'Node.js',
    'Nest.js',
    'Python',
    'tRPC',
    'Shopify',
    'GraphQL',
    'Express',
    'Prisma',
  ],
  databases: ['MongoDB', 'PostgreSQL'],
  soft: [
    'soft_skill_analytical_thinking',
    'soft_skill_attention_to_detail',
    'soft_skill_adaptability',
    'soft_skill_fast_learning',
    'soft_skill_communication',
    'soft_skill_autonomy',
    'soft_skill_problem_solving',
  ],
}
