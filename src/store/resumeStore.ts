import { create } from 'zustand';
import {
  type Resume,
  type PersonalInfo,
  type Experience,
  type Education,
  type SkillCategory,
  type Project,
  type Certification,
  type Achievement,
  type Language,
  type Award,
  type VolunteerExperience,
  type CustomSection,
  type ResumeSettings,
  type SectionKey,
  type TemplateType,
  createEmptyResume,
} from '../types/resume';

interface ResumeState {
  // Current resume being edited
  resume: Resume;
  // Current active step in the builder
  activeStep: SectionKey | 'template' | 'review';
  // Whether preview is visible on mobile
  showPreview: boolean;
  // Dirty flag for unsaved changes
  isDirty: boolean;

  // ─── Resume-level actions ────────────────────────────────────
  setResume: (resume: Resume) => void;
  resetResume: (name?: string) => void;
  setResumeName: (name: string) => void;
  setTemplate: (template: TemplateType) => void;
  setSettings: (settings: Partial<ResumeSettings>) => void;

  // ─── Section visibility & ordering ───────────────────────────
  setSectionVisibility: (key: SectionKey, visible: boolean) => void;
  setSectionOrder: (order: string[]) => void;

  // ─── Navigation ──────────────────────────────────────────────
  setActiveStep: (step: SectionKey | 'template' | 'review') => void;
  setShowPreview: (show: boolean) => void;

  // ─── Personal Info ───────────────────────────────────────────
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;

  // ─── Summary ─────────────────────────────────────────────────
  updateSummary: (summary: string) => void;

  // ─── Experience ──────────────────────────────────────────────
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (experiences: Experience[]) => void;

  // ─── Education ───────────────────────────────────────────────
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  reorderEducation: (education: Education[]) => void;

  // ─── Skills ──────────────────────────────────────────────────
  addSkillCategory: (cat: SkillCategory) => void;
  updateSkillCategory: (id: string, cat: Partial<SkillCategory>) => void;
  removeSkillCategory: (id: string) => void;
  reorderSkillCategories: (categories: SkillCategory[]) => void;

  // ─── Projects ────────────────────────────────────────────────
  addProject: (proj: Project) => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  removeProject: (id: string) => void;
  reorderProjects: (projects: Project[]) => void;

  // ─── Certifications ─────────────────────────────────────────
  addCertification: (cert: Certification) => void;
  updateCertification: (id: string, cert: Partial<Certification>) => void;
  removeCertification: (id: string) => void;

  // ─── Achievements ───────────────────────────────────────────
  addAchievement: (ach: Achievement) => void;
  updateAchievement: (id: string, ach: Partial<Achievement>) => void;
  removeAchievement: (id: string) => void;

  // ─── Languages ──────────────────────────────────────────────
  addLanguage: (lang: Language) => void;
  updateLanguage: (id: string, lang: Partial<Language>) => void;
  removeLanguage: (id: string) => void;

  // ─── Awards ─────────────────────────────────────────────────
  addAward: (award: Award) => void;
  updateAward: (id: string, award: Partial<Award>) => void;
  removeAward: (id: string) => void;

  // ─── Volunteer ──────────────────────────────────────────────
  addVolunteer: (vol: VolunteerExperience) => void;
  updateVolunteer: (id: string, vol: Partial<VolunteerExperience>) => void;
  removeVolunteer: (id: string) => void;

  // ─── Custom Sections ────────────────────────────────────────
  addCustomSection: (section: CustomSection) => void;
  updateCustomSection: (id: string, section: Partial<CustomSection>) => void;
  removeCustomSection: (id: string) => void;
}

const touch = (resume: Resume): Resume => ({
  ...resume,
  updatedAt: new Date().toISOString(),
});

export const useResumeStore = create<ResumeState>((set) => ({
  resume: createEmptyResume(),
  activeStep: 'personalInfo',
  showPreview: false,
  isDirty: false,

  // ─── Resume-level ────────────────────────────────────────────
  setResume: (resume) => set({ resume, isDirty: false }),
  resetResume: (name) => set({ resume: createEmptyResume(name), activeStep: 'personalInfo', isDirty: false }),
  setResumeName: (name) => set((s) => ({ resume: touch({ ...s.resume, name }), isDirty: true })),
  setTemplate: (template) => set((s) => ({ resume: touch({ ...s.resume, template }), isDirty: true })),
  setSettings: (settings) => set((s) => ({
    resume: touch({ ...s.resume, settings: { ...s.resume.settings, ...settings } }),
    isDirty: true,
  })),

  // ─── Section visibility & ordering ───────────────────────────
  setSectionVisibility: (key, visible) => set((s) => ({
    resume: touch({
      ...s.resume,
      sectionVisibility: { ...s.resume.sectionVisibility, [key]: visible },
    }),
    isDirty: true,
  })),
  setSectionOrder: (order) => set((s) => ({
    resume: touch({ ...s.resume, sectionOrder: order }),
    isDirty: true,
  })),

  // ─── Navigation ──────────────────────────────────────────────
  setActiveStep: (step) => set({ activeStep: step }),
  setShowPreview: (show) => set({ showPreview: show }),

  // ─── Personal Info ───────────────────────────────────────────
  updatePersonalInfo: (info) => set((s) => ({
    resume: touch({ ...s.resume, personalInfo: { ...s.resume.personalInfo, ...info } }),
    isDirty: true,
  })),

  // ─── Summary ─────────────────────────────────────────────────
  updateSummary: (summary) => set((s) => ({
    resume: touch({ ...s.resume, summary }),
    isDirty: true,
  })),

  // ─── Experience ──────────────────────────────────────────────
  addExperience: (exp) => set((s) => ({
    resume: touch({ ...s.resume, experience: [...s.resume.experience, exp] }),
    isDirty: true,
  })),
  updateExperience: (id, exp) => set((s) => ({
    resume: touch({
      ...s.resume,
      experience: s.resume.experience.map((e) => (e.id === id ? { ...e, ...exp } : e)),
    }),
    isDirty: true,
  })),
  removeExperience: (id) => set((s) => ({
    resume: touch({ ...s.resume, experience: s.resume.experience.filter((e) => e.id !== id) }),
    isDirty: true,
  })),
  reorderExperience: (experience) => set((s) => ({
    resume: touch({ ...s.resume, experience }),
    isDirty: true,
  })),

  // ─── Education ───────────────────────────────────────────────
  addEducation: (edu) => set((s) => ({
    resume: touch({ ...s.resume, education: [...s.resume.education, edu] }),
    isDirty: true,
  })),
  updateEducation: (id, edu) => set((s) => ({
    resume: touch({
      ...s.resume,
      education: s.resume.education.map((e) => (e.id === id ? { ...e, ...edu } : e)),
    }),
    isDirty: true,
  })),
  removeEducation: (id) => set((s) => ({
    resume: touch({ ...s.resume, education: s.resume.education.filter((e) => e.id !== id) }),
    isDirty: true,
  })),
  reorderEducation: (education) => set((s) => ({
    resume: touch({ ...s.resume, education }),
    isDirty: true,
  })),

  // ─── Skills ──────────────────────────────────────────────────
  addSkillCategory: (cat) => set((s) => ({
    resume: touch({ ...s.resume, skills: [...s.resume.skills, cat] }),
    isDirty: true,
  })),
  updateSkillCategory: (id, cat) => set((s) => ({
    resume: touch({
      ...s.resume,
      skills: s.resume.skills.map((c) => (c.id === id ? { ...c, ...cat } : c)),
    }),
    isDirty: true,
  })),
  removeSkillCategory: (id) => set((s) => ({
    resume: touch({ ...s.resume, skills: s.resume.skills.filter((c) => c.id !== id) }),
    isDirty: true,
  })),
  reorderSkillCategories: (categories) => set((s) => ({
    resume: touch({ ...s.resume, skills: categories }),
    isDirty: true,
  })),

  // ─── Projects ────────────────────────────────────────────────
  addProject: (proj) => set((s) => ({
    resume: touch({ ...s.resume, projects: [...s.resume.projects, proj] }),
    isDirty: true,
  })),
  updateProject: (id, proj) => set((s) => ({
    resume: touch({
      ...s.resume,
      projects: s.resume.projects.map((p) => (p.id === id ? { ...p, ...proj } : p)),
    }),
    isDirty: true,
  })),
  removeProject: (id) => set((s) => ({
    resume: touch({ ...s.resume, projects: s.resume.projects.filter((p) => p.id !== id) }),
    isDirty: true,
  })),
  reorderProjects: (projects) => set((s) => ({
    resume: touch({ ...s.resume, projects }),
    isDirty: true,
  })),

  // ─── Certifications ─────────────────────────────────────────
  addCertification: (cert) => set((s) => ({
    resume: touch({ ...s.resume, certifications: [...s.resume.certifications, cert] }),
    isDirty: true,
  })),
  updateCertification: (id, cert) => set((s) => ({
    resume: touch({
      ...s.resume,
      certifications: s.resume.certifications.map((c) => (c.id === id ? { ...c, ...cert } : c)),
    }),
    isDirty: true,
  })),
  removeCertification: (id) => set((s) => ({
    resume: touch({ ...s.resume, certifications: s.resume.certifications.filter((c) => c.id !== id) }),
    isDirty: true,
  })),

  // ─── Achievements ───────────────────────────────────────────
  addAchievement: (ach) => set((s) => ({
    resume: touch({ ...s.resume, achievements: [...s.resume.achievements, ach] }),
    isDirty: true,
  })),
  updateAchievement: (id, ach) => set((s) => ({
    resume: touch({
      ...s.resume,
      achievements: s.resume.achievements.map((a) => (a.id === id ? { ...a, ...ach } : a)),
    }),
    isDirty: true,
  })),
  removeAchievement: (id) => set((s) => ({
    resume: touch({ ...s.resume, achievements: s.resume.achievements.filter((a) => a.id !== id) }),
    isDirty: true,
  })),

  // ─── Languages ──────────────────────────────────────────────
  addLanguage: (lang) => set((s) => ({
    resume: touch({ ...s.resume, languages: [...s.resume.languages, lang] }),
    isDirty: true,
  })),
  updateLanguage: (id, lang) => set((s) => ({
    resume: touch({
      ...s.resume,
      languages: s.resume.languages.map((l) => (l.id === id ? { ...l, ...lang } : l)),
    }),
    isDirty: true,
  })),
  removeLanguage: (id) => set((s) => ({
    resume: touch({ ...s.resume, languages: s.resume.languages.filter((l) => l.id !== id) }),
    isDirty: true,
  })),

  // ─── Awards ─────────────────────────────────────────────────
  addAward: (award) => set((s) => ({
    resume: touch({ ...s.resume, awards: [...s.resume.awards, award] }),
    isDirty: true,
  })),
  updateAward: (id, award) => set((s) => ({
    resume: touch({
      ...s.resume,
      awards: s.resume.awards.map((a) => (a.id === id ? { ...a, ...award } : a)),
    }),
    isDirty: true,
  })),
  removeAward: (id) => set((s) => ({
    resume: touch({ ...s.resume, awards: s.resume.awards.filter((a) => a.id !== id) }),
    isDirty: true,
  })),

  // ─── Volunteer ──────────────────────────────────────────────
  addVolunteer: (vol) => set((s) => ({
    resume: touch({ ...s.resume, volunteerExperience: [...s.resume.volunteerExperience, vol] }),
    isDirty: true,
  })),
  updateVolunteer: (id, vol) => set((s) => ({
    resume: touch({
      ...s.resume,
      volunteerExperience: s.resume.volunteerExperience.map((v) => (v.id === id ? { ...v, ...vol } : v)),
    }),
    isDirty: true,
  })),
  removeVolunteer: (id) => set((s) => ({
    resume: touch({ ...s.resume, volunteerExperience: s.resume.volunteerExperience.filter((v) => v.id !== id) }),
    isDirty: true,
  })),

  // ─── Custom Sections ────────────────────────────────────────
  addCustomSection: (section) => set((s) => ({
    resume: touch({ ...s.resume, customSections: [...s.resume.customSections, section] }),
    isDirty: true,
  })),
  updateCustomSection: (id, section) => set((s) => ({
    resume: touch({
      ...s.resume,
      customSections: s.resume.customSections.map((cs) => (cs.id === id ? { ...cs, ...section } : cs)),
    }),
    isDirty: true,
  })),
  removeCustomSection: (id) => set((s) => ({
    resume: touch({ ...s.resume, customSections: s.resume.customSections.filter((cs) => cs.id !== id) }),
    isDirty: true,
  })),
}));
