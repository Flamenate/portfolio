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
  degree: string
  institution: string
  start: Date
  end: Date
  notes?: string
}

export type WorkExperience = {
  role: string
  company: string
  location: string
  start: Date
  end: Date | null
  technologies: TechnologyStack
  achievements: string[]
}

export type Project = {
  title: string
  period: {
    start: Date
    end: Date | null
  }
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
  role: string
  organization: string
  start: Date
  end: Date | null
  achievements: string[]
}

export type Resume = {
  name: string
  headline: string
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
  headline: 'Full-stack Developer',
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
      role: 'Lead Software Engineer',
      company: 'Dink USA',
      location: 'Remote',
      start: new Date('2024-10-01'),
      end: new Date('2025-05-01'),
      technologies: {
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
      title: 'Portfolio Website',
      period: {
        start: new Date('2024-06-01'),
        end: null,
      },
      summary: 'resume_project_portfolio_summary',
      tech: {
        frontend: [
          'Tanstack Start',
          'React',
          'TailwindCSS',
          'Tanstack Router',
          'Zustand',
        ],
        backend: [],
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
      title: 'Event Pitch Website',
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
      title: 'Stock Management Dashboard',
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
      title: 'Sento Kaishi Application',
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
      title: 'Economy Bot',
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
      title: 'Matchmaking Bot',
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
      title: 'Meeting Manager',
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
      name: 'Microsoft Certified: Azure AI Fundamentals (AI-900)',
      issuer: 'Microsoft',
      date: new Date('2024-10-01'),
    },
    {
      name: 'EF SET English Certificate',
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
export const skills = projects.reduce<{
  frontend: Set<string>
  backend: Set<string>
  databases: Set<string>
}>(
  (acc, project) => {
    for (const category of ['frontend', 'backend', 'databases'] as const) {
      for (const tech of project.tech[category]) {
        acc[category].add(tech)
      }
    }
    return acc
  },
  { frontend: new Set(), backend: new Set(), databases: new Set() },
)
for (const exp of resume.experience) {
  for (const category of ['frontend', 'backend', 'databases'] as const) {
    for (const tech of exp.technologies[category]) {
      skills[category].add(tech)
    }
  }
}
