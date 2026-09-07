import { z } from 'zod';

// ─── Zod Schemas ───────────────────────────────────────────────

export const personalInfoSchema = z.object({
  fullName: z.string().default(''),
  professionalTitle: z.string().default(''),
  email: z.string().default(''),
  phone: z.string().default(''),
  city: z.string().default(''),
  state: z.string().default(''),
  country: z.string().default(''),
  linkedinUrl: z.string().default(''),
  githubUrl: z.string().default(''),
  portfolioUrl: z.string().default(''),
  otherWebsite: z.string().default(''),
  profilePhoto: z.string().default(''),
});

export const experienceSchema = z.object({
  id: z.string(),
  jobTitle: z.string().default(''),
  company: z.string().default(''),
  location: z.string().default(''),
  employmentType: z.enum(['full-time', 'part-time', 'contract', 'freelance', 'internship', 'other']).default('full-time'),
  startMonth: z.string().default(''),
  startYear: z.string().default(''),
  endMonth: z.string().default(''),
  endYear: z.string().default(''),
  currentlyWorking: z.boolean().default(false),
  description: z.string().default(''),
  achievements: z.array(z.string()).default([]),
});

export const educationSchema = z.object({
  id: z.string(),
  degree: z.string().default(''),
  university: z.string().default(''),
  location: z.string().default(''),
  startYear: z.string().default(''),
  endYear: z.string().default(''),
  gpa: z.string().default(''),
  relevantCoursework: z.string().default(''),
  description: z.string().default(''),
});

export const skillCategorySchema = z.object({
  id: z.string(),
  name: z.string().default(''),
  skills: z.array(z.string()).default([]),
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string().default(''),
  role: z.string().default(''),
  technologies: z.array(z.string()).default([]),
  startDate: z.string().default(''),
  endDate: z.string().default(''),
  projectUrl: z.string().default(''),
  description: z.string().default(''),
  achievements: z.array(z.string()).default([]),
});

export const certificationSchema = z.object({
  id: z.string(),
  name: z.string().default(''),
  issuingOrganization: z.string().default(''),
  date: z.string().default(''),
  credentialId: z.string().default(''),
  credentialUrl: z.string().default(''),
});

export const achievementSchema = z.object({
  id: z.string(),
  title: z.string().default(''),
  description: z.string().default(''),
  date: z.string().default(''),
});

export const languageSchema = z.object({
  id: z.string(),
  language: z.string().default(''),
  proficiency: z.enum(['native', 'fluent', 'advanced', 'intermediate', 'beginner']).default('intermediate'),
});

export const awardSchema = z.object({
  id: z.string(),
  title: z.string().default(''),
  organization: z.string().default(''),
  date: z.string().default(''),
  description: z.string().default(''),
});

export const volunteerSchema = z.object({
  id: z.string(),
  role: z.string().default(''),
  organization: z.string().default(''),
  startDate: z.string().default(''),
  endDate: z.string().default(''),
  description: z.string().default(''),
  achievements: z.array(z.string()).default([]),
});

export const customSectionSchema = z.object({
  id: z.string(),
  title: z.string().default(''),
  items: z.array(z.object({
    id: z.string(),
    content: z.string().default(''),
    bullets: z.array(z.string()).default([]),
  })).default([]),
});

export const resumeSettingsSchema = z.object({
  fontFamily: z.enum(['Inter', 'Arial', 'Calibri', 'Georgia', 'Times New Roman', 'Roboto']).default('Inter'),
  fontSize: z.number().min(9).max(14).default(11),
  headingSize: z.number().min(12).max(24).default(16),
  lineSpacing: z.enum(['compact', 'normal', 'relaxed']).default('normal'),
  margins: z.enum(['narrow', 'normal', 'wide']).default('normal'),
  accentColor: z.string().default('#1a56db'),
  sectionSpacing: z.enum(['compact', 'normal', 'relaxed']).default('normal'),
});

export const sectionVisibilitySchema = z.object({
  personalInfo: z.boolean().default(true),
  summary: z.boolean().default(true),
  experience: z.boolean().default(true),
  education: z.boolean().default(true),
  skills: z.boolean().default(true),
  projects: z.boolean().default(true),
  certifications: z.boolean().default(true),
  achievements: z.boolean().default(false),
  languages: z.boolean().default(false),
  awards: z.boolean().default(false),
  volunteerExperience: z.boolean().default(false),
  customSections: z.boolean().default(false),
});

export const resumeSchema = z.object({
  id: z.string(),
  name: z.string().default('Untitled Resume'),
  createdAt: z.string(),
  updatedAt: z.string(),
  template: z.enum(['modern', 'classic', 'ats', 'minimal', 'executive', 'tech', 'corporate', 'creative']).default('modern'),
  settings: resumeSettingsSchema.default({}),
  sectionOrder: z.array(z.string()).default([
    'personalInfo',
    'summary',
    'experience',
    'education',
    'skills',
    'projects',
    'certifications',
    'achievements',
    'languages',
    'awards',
    'volunteerExperience',
    'customSections',
  ]),
  sectionVisibility: sectionVisibilitySchema.default({}),
  personalInfo: personalInfoSchema.default({ fullName: '' }),
  summary: z.string().default(''),
  experience: z.array(experienceSchema).default([]),
  education: z.array(educationSchema).default([]),
  skills: z.array(skillCategorySchema).default([]),
  projects: z.array(projectSchema).default([]),
  certifications: z.array(certificationSchema).default([]),
  achievements: z.array(achievementSchema).default([]),
  languages: z.array(languageSchema).default([]),
  awards: z.array(awardSchema).default([]),
  volunteerExperience: z.array(volunteerSchema).default([]),
  customSections: z.array(customSectionSchema).default([]),
});

// ─── TypeScript Types (inferred from Zod) ──────────────────────

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type SkillCategory = z.infer<typeof skillCategorySchema>;
export type Project = z.infer<typeof projectSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Achievement = z.infer<typeof achievementSchema>;
export type Language = z.infer<typeof languageSchema>;
export type Award = z.infer<typeof awardSchema>;
export type VolunteerExperience = z.infer<typeof volunteerSchema>;
export type CustomSection = z.infer<typeof customSectionSchema>;
export type ResumeSettings = z.infer<typeof resumeSettingsSchema>;
export type SectionVisibility = z.infer<typeof sectionVisibilitySchema>;
export type Resume = z.infer<typeof resumeSchema>;

export type TemplateType = Resume['template'];
export type FontFamily = ResumeSettings['fontFamily'];
export type LineSpacing = ResumeSettings['lineSpacing'];
export type MarginSize = ResumeSettings['margins'];
export type EmploymentType = Experience['employmentType'];
export type LanguageProficiency = Language['proficiency'];

export type SectionKey = keyof SectionVisibility;

// ─── Section metadata for UI rendering ─────────────────────────

export interface SectionMeta {
  key: SectionKey;
  label: string;
  icon: string;
  required: boolean;
}

export const SECTION_METADATA: SectionMeta[] = [
  { key: 'personalInfo', label: 'Personal Information', icon: 'User', required: true },
  { key: 'summary', label: 'Professional Summary', icon: 'FileText', required: false },
  { key: 'experience', label: 'Work Experience', icon: 'Briefcase', required: false },
  { key: 'education', label: 'Education', icon: 'GraduationCap', required: false },
  { key: 'skills', label: 'Skills', icon: 'Wrench', required: false },
  { key: 'projects', label: 'Projects', icon: 'FolderOpen', required: false },
  { key: 'certifications', label: 'Certifications', icon: 'Award', required: false },
  { key: 'achievements', label: 'Achievements', icon: 'Trophy', required: false },
  { key: 'languages', label: 'Languages', icon: 'Globe', required: false },
  { key: 'awards', label: 'Awards', icon: 'Medal', required: false },
  { key: 'volunteerExperience', label: 'Volunteer Experience', icon: 'Heart', required: false },
  { key: 'customSections', label: 'Custom Sections', icon: 'Plus', required: false },
];

// ─── Template metadata ─────────────────────────────────────────

export interface TemplateMeta {
  id: TemplateType;
  name: string;
  description: string;
  tags: string[];
}

export const TEMPLATE_METADATA: TemplateMeta[] = [
  { id: 'modern', name: 'Modern', description: 'Clean and contemporary design with a sidebar accent.', tags: ['Popular', 'ATS-Friendly'] },
  { id: 'classic', name: 'Classic', description: 'Traditional resume format trusted by recruiters.', tags: ['Traditional', 'ATS-Friendly'] },
  { id: 'ats', name: 'ATS Professional', description: 'Optimized for Applicant Tracking Systems with no columns or graphics.', tags: ['ATS-Optimized', 'Safe'] },
  { id: 'minimal', name: 'Minimal', description: 'Elegant minimalist design with subtle typography.', tags: ['Clean', 'Modern'] },
  { id: 'executive', name: 'Executive', description: 'Sophisticated layout for senior professionals and executives.', tags: ['Senior', 'Professional'] },
  { id: 'tech', name: 'Tech', description: 'Designed for engineers and developers with skills prominence.', tags: ['Developer', 'Technical'] },
  { id: 'corporate', name: 'Corporate', description: 'Polished corporate format for business professionals.', tags: ['Business', 'Formal'] },
  { id: 'creative', name: 'Creative', description: 'Distinctive design for creative professionals and designers.', tags: ['Design', 'Unique'] },
];

// ─── Default skill categories ──────────────────────────────────

export const DEFAULT_SKILL_CATEGORIES = [
  'Programming Languages',
  'Databases',
  'Cloud',
  'Big Data',
  'Data Engineering',
  'DevOps',
  'Tools',
  'Frameworks',
  'Soft Skills',
  'Other',
];

// ─── Helper: create empty resume ───────────────────────────────

export function createEmptyResume(name = 'Untitled Resume'): Resume {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    name,
    createdAt: now,
    updatedAt: now,
    template: 'modern',
    settings: {
      fontFamily: 'Inter',
      fontSize: 11,
      headingSize: 16,
      lineSpacing: 'normal',
      margins: 'normal',
      accentColor: '#1a56db',
      sectionSpacing: 'normal',
    },
    sectionOrder: [
      'personalInfo',
      'summary',
      'experience',
      'education',
      'skills',
      'projects',
      'certifications',
      'achievements',
      'languages',
      'awards',
      'volunteerExperience',
      'customSections',
    ],
    sectionVisibility: {
      personalInfo: true,
      summary: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
      certifications: true,
      achievements: false,
      languages: false,
      awards: false,
      volunteerExperience: false,
      customSections: false,
    },
    personalInfo: {
      fullName: '',
      professionalTitle: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      country: '',
      linkedinUrl: '',
      githubUrl: '',
      portfolioUrl: '',
      otherWebsite: '',
      profilePhoto: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [
      {
        id: crypto.randomUUID(),
        name: 'Technical Skills',
        skills: [],
      },
    ],
    projects: [],
    certifications: [],
    achievements: [],
    languages: [],
    awards: [],
    volunteerExperience: [],
    customSections: [],
  };
}

// ─── Helper: create empty entries ──────────────────────────────

export function createEmptyExperience(): Experience {
  return {
    id: crypto.randomUUID(),
    jobTitle: '',
    company: '',
    location: '',
    employmentType: 'full-time',
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    currentlyWorking: false,
    description: '',
    achievements: [''],
  };
}

export function createEmptyEducation(): Education {
  return {
    id: crypto.randomUUID(),
    degree: '',
    university: '',
    location: '',
    startYear: '',
    endYear: '',
    gpa: '',
    relevantCoursework: '',
    description: '',
  };
}

export function createEmptySkillCategory(name = ''): SkillCategory {
  return {
    id: crypto.randomUUID(),
    name,
    skills: [],
  };
}

export function createEmptyProject(): Project {
  return {
    id: crypto.randomUUID(),
    name: '',
    role: '',
    technologies: [],
    startDate: '',
    endDate: '',
    projectUrl: '',
    description: '',
    achievements: [''],
  };
}

export function createEmptyCertification(): Certification {
  return {
    id: crypto.randomUUID(),
    name: '',
    issuingOrganization: '',
    date: '',
    credentialId: '',
    credentialUrl: '',
  };
}

export function createEmptyAchievement(): Achievement {
  return {
    id: crypto.randomUUID(),
    title: '',
    description: '',
    date: '',
  };
}

export function createEmptyLanguage(): Language {
  return {
    id: crypto.randomUUID(),
    language: '',
    proficiency: 'intermediate',
  };
}

export function createEmptyAward(): Award {
  return {
    id: crypto.randomUUID(),
    title: '',
    organization: '',
    date: '',
    description: '',
  };
}

export function createEmptyVolunteer(): VolunteerExperience {
  return {
    id: crypto.randomUUID(),
    role: '',
    organization: '',
    startDate: '',
    endDate: '',
    description: '',
    achievements: [''],
  };
}

export function createEmptyCustomSection(): CustomSection {
  return {
    id: crypto.randomUUID(),
    title: '',
    items: [{
      id: crypto.randomUUID(),
      content: '',
      bullets: [''],
    }],
  };
}

// ─── Months list ───────────────────────────────────────────────

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const EMPLOYMENT_TYPES: { value: EmploymentType; label: string }[] = [
  { value: 'full-time', label: 'Full-Time' },
  { value: 'part-time', label: 'Part-Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'internship', label: 'Internship' },
  { value: 'other', label: 'Other' },
];

export const PROFICIENCY_LEVELS: { value: LanguageProficiency; label: string }[] = [
  { value: 'native', label: 'Native' },
  { value: 'fluent', label: 'Fluent' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'beginner', label: 'Beginner' },
];
