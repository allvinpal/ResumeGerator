import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import type { Resume, WorkExperience, Education, SkillCategory, Project } from '../types/resume';
import { createEmptyResume } from '../types/resume';

// Set up pdf.js worker using unpkg CDN fallback or bundled worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

/**
 * Extract raw text from a PDF file
 */
export async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
  const pageTexts: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(' ');
    pageTexts.push(pageText);
  }

  return pageTexts.join('\n\n');
}

/**
 * Extract raw text from a DOCX file
 */
export async function extractTextFromDOCX(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value || '';
}

/**
 * Extract text from a TXT file
 */
export async function extractTextFromTXT(file: File): Promise<string> {
  return await file.text();
}

/**
 * Parse structured resume data from unstructured text
 */
export function parseResumeFromText(rawText: string, fallbackName = 'My Resume'): Resume {
  const resume = createEmptyResume(fallbackName);
  if (!rawText || !rawText.trim()) return resume;

  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  // 1. Contact & Socials extraction via RegEx
  const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) resume.personalInfo.email = emailMatch[0];

  const phoneMatch = rawText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/);
  if (phoneMatch && phoneMatch[0].replace(/\D/g, '').length >= 7) {
    resume.personalInfo.phone = phoneMatch[0].trim();
  }

  const linkedinMatch = rawText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i);
  if (linkedinMatch) {
    resume.personalInfo.linkedinUrl = linkedinMatch[0].startsWith('http')
      ? linkedinMatch[0]
      : `https://${linkedinMatch[0]}`;
  }

  const githubMatch = rawText.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i);
  if (githubMatch) {
    resume.personalInfo.githubUrl = githubMatch[0].startsWith('http')
      ? githubMatch[0]
      : `https://${githubMatch[0]}`;
  }

  // 2. Name & Title extraction from early lines
  const headerLines = lines.slice(0, 6).filter((l) => {
    const isContact = l.includes('@') || l.includes('linkedin.com') || l.includes('github.com');
    const isGeneric = /^(resume|curriculum vitae|cv|page \d+)/i.test(l);
    return !isContact && !isGeneric && l.length > 2 && l.length < 50;
  });

  if (headerLines.length > 0) {
    resume.personalInfo.fullName = headerLines[0];
    resume.name = `${headerLines[0]}'s Resume`;
  }
  if (headerLines.length > 1) {
    // Second clean line is often professional title
    if (!headerLines[1].includes(',') && headerLines[1].length < 40) {
      resume.personalInfo.professionalTitle = headerLines[1];
    }
  }

  // 3. Section Segmentation
  const sectionKeywords = [
    { key: 'summary', regex: /^(professional summary|summary|about me|profile|objective)/i },
    { key: 'experience', regex: /^(work experience|experience|employment history|professional experience|work history)/i },
    { key: 'education', regex: /^(education|academic background|academics|qualifications)/i },
    { key: 'skills', regex: /^(skills|technical skills|skills & competencies|core competencies|technologies)/i },
    { key: 'projects', regex: /^(projects|personal projects|key projects|academic projects)/i },
    { key: 'certifications', regex: /^(certifications|certificates|licenses & certifications|credentials)/i },
  ];

  type SectionKey = 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'other';
  const sectionBlocks: { section: SectionKey; lines: string[] }[] = [];
  let currentSection: SectionKey = 'other';
  let currentLines: string[] = [];

  for (const line of lines) {
    const matched = sectionKeywords.find((s) => s.regex.test(line));
    if (matched) {
      if (currentLines.length > 0) {
        sectionBlocks.push({ section: currentSection, lines: currentLines });
      }
      currentSection = matched.key as SectionKey;
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }
  if (currentLines.length > 0) {
    sectionBlocks.push({ section: currentSection, lines: currentLines });
  }

  // 4. Populate each section
  for (const block of sectionBlocks) {
    if (block.section === 'summary') {
      resume.summary = block.lines.join(' ');
      resume.sectionVisibility.summary = true;
    } else if (block.section === 'experience') {
      resume.experience = parseExperience(block.lines);
      if (resume.experience.length > 0) resume.sectionVisibility.experience = true;
    } else if (block.section === 'education') {
      resume.education = parseEducation(block.lines);
      if (resume.education.length > 0) resume.sectionVisibility.education = true;
    } else if (block.section === 'skills') {
      resume.skills = parseSkills(block.lines);
      if (resume.skills.length > 0) resume.sectionVisibility.skills = true;
    } else if (block.section === 'projects') {
      resume.projects = parseProjects(block.lines);
      if (resume.projects.length > 0) resume.sectionVisibility.projects = true;
    } else if (block.section === 'certifications') {
      resume.certifications = parseCertifications(block.lines);
      if (resume.certifications.length > 0) resume.sectionVisibility.certifications = true;
    }
  }

  return resume;
}

/**
 * Experience parser: detects job titles, companies, dates, achievements
 */
function parseExperience(lines: string[]): WorkExperience[] {
  const experiences: WorkExperience[] = [];
  let currentExp: Partial<WorkExperience> | null = null;

  for (const line of lines) {
    const dateMatch = line.match(/(20\d\d|19\d\d)\s*(?:-|–|to)\s*(present|current|20\d\d|19\d\d)/i);
    const isBullet = /^[•\-\*–]\s*/.test(line) || /^\d+\.\s*/.test(line);

    if (dateMatch && !isBullet) {
      if (currentExp && currentExp.jobTitle) {
        experiences.push(finalizeExperience(currentExp));
      }
      currentExp = {
        id: crypto.randomUUID(),
        jobTitle: line.replace(dateMatch[0], '').replace(/[|•–-]/g, ' ').trim() || 'Software Professional',
        company: 'Company',
        location: '',
        startYear: dateMatch[1],
        endYear: dateMatch[2].toLowerCase().includes('present') || dateMatch[2].toLowerCase().includes('current') ? '' : dateMatch[2],
        currentlyWorking: dateMatch[2].toLowerCase().includes('present') || dateMatch[2].toLowerCase().includes('current'),
        description: '',
        achievements: [],
      };
    } else if (isBullet && currentExp) {
      const bulletText = line.replace(/^[•\-\*–]\s*/, '').replace(/^\d+\.\s*/, '').trim();
      if (bulletText) currentExp.achievements = [...(currentExp.achievements || []), bulletText];
    } else if (currentExp) {
      if (!currentExp.company || currentExp.company === 'Company') {
        currentExp.company = line;
      } else {
        currentExp.description = currentExp.description ? `${currentExp.description} ${line}` : line;
      }
    } else {
      // Create first experience if date was not yet found
      currentExp = {
        id: crypto.randomUUID(),
        jobTitle: line,
        company: '',
        location: '',
        startYear: '',
        endYear: '',
        currentlyWorking: false,
        description: '',
        achievements: [],
      };
    }
  }

  if (currentExp && currentExp.jobTitle) {
    experiences.push(finalizeExperience(currentExp));
  }

  return experiences;
}

function finalizeExperience(exp: Partial<WorkExperience>): WorkExperience {
  return {
    id: exp.id || crypto.randomUUID(),
    jobTitle: exp.jobTitle || 'Role',
    company: exp.company || 'Company',
    location: exp.location || '',
    startMonth: '',
    startYear: exp.startYear || '',
    endMonth: '',
    endYear: exp.endYear || '',
    currentlyWorking: exp.currentlyWorking || false,
    description: exp.description || '',
    achievements: exp.achievements || [],
  };
}

/**
 * Education parser: detects degrees, universities, graduation years
 */
function parseEducation(lines: string[]): Education[] {
  const educations: Education[] = [];
  const degreeKeywords = /(bachelor|master|b\.s\.|m\.s\.|b\.tech|m\.tech|b\.e\.|m\.e\.|ph\.d|mba|bba|diploma|associate|degree)/i;

  let currentEdu: Partial<Education> | null = null;

  for (const line of lines) {
    const yearMatch = line.match(/(20\d\d|19\d\d)/);
    const hasDegree = degreeKeywords.test(line);

    if (hasDegree) {
      if (currentEdu && currentEdu.degree) {
        educations.push(finalizeEducation(currentEdu));
      }
      currentEdu = {
        id: crypto.randomUUID(),
        degree: line.replace(/[|•–-]/g, ' ').trim(),
        university: '',
        fieldOfStudy: '',
        endYear: yearMatch ? yearMatch[0] : '',
      };
    } else if (currentEdu) {
      if (!currentEdu.university) {
        currentEdu.university = line;
      }
    } else if (line.length > 5) {
      currentEdu = {
        id: crypto.randomUUID(),
        degree: line,
        university: '',
        fieldOfStudy: '',
        endYear: yearMatch ? yearMatch[0] : '',
      };
    }
  }

  if (currentEdu && currentEdu.degree) {
    educations.push(finalizeEducation(currentEdu));
  }

  return educations;
}

function finalizeEducation(edu: Partial<Education>): Education {
  return {
    id: edu.id || crypto.randomUUID(),
    degree: edu.degree || 'Degree',
    university: edu.university || 'University',
    fieldOfStudy: edu.fieldOfStudy || '',
    location: '',
    startYear: '',
    endYear: edu.endYear || '',
    gpa: '',
    achievements: [],
  };
}

/**
 * Skills parser: splits by commas, bullets, pipes
 */
function parseSkills(lines: string[]): SkillCategory[] {
  const categories: SkillCategory[] = [];
  const allSkills: string[] = [];

  for (const line of lines) {
    const colonSplit = line.split(':');
    if (colonSplit.length === 2 && colonSplit[0].length < 30) {
      const catName = colonSplit[0].trim();
      const skillsInCat = colonSplit[1]
        .split(/[,|•]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0 && s.length < 35);

      if (skillsInCat.length > 0) {
        categories.push({
          id: crypto.randomUUID(),
          name: catName,
          skills: skillsInCat,
        });
        continue;
      }
    }

    const items = line.split(/[,|•]/).map((s) => s.trim()).filter((s) => s.length > 0 && s.length < 35);
    allSkills.push(...items);
  }

  if (categories.length === 0 && allSkills.length > 0) {
    categories.push({
      id: crypto.randomUUID(),
      name: 'Technical Skills',
      skills: Array.from(new Set(allSkills)).slice(0, 25),
    });
  }

  return categories;
}

/**
 * Projects parser
 */
function parseProjects(lines: string[]): Project[] {
  const projects: Project[] = [];
  let currentProj: Partial<Project> | null = null;

  for (const line of lines) {
    const isBullet = /^[•\-\*–]\s*/.test(line);

    if (!isBullet && line.length < 60) {
      if (currentProj && currentProj.name) {
        projects.push({
          id: currentProj.id || crypto.randomUUID(),
          name: currentProj.name,
          description: currentProj.description || '',
          technologies: currentProj.technologies || [],
          url: currentProj.url || '',
          achievements: currentProj.achievements || [],
        });
      }
      currentProj = {
        id: crypto.randomUUID(),
        name: line.replace(/[|•–-]/g, ' ').trim(),
        description: '',
        technologies: [],
        achievements: [],
      };
    } else if (isBullet && currentProj) {
      const ach = line.replace(/^[•\-\*–]\s*/, '').trim();
      if (ach) currentProj.achievements = [...(currentProj.achievements || []), ach];
    } else if (currentProj) {
      currentProj.description = currentProj.description ? `${currentProj.description} ${line}` : line;
    }
  }

  if (currentProj && currentProj.name) {
    projects.push({
      id: currentProj.id || crypto.randomUUID(),
      name: currentProj.name,
      description: currentProj.description || '',
      technologies: currentProj.technologies || [],
      url: currentProj.url || '',
      achievements: currentProj.achievements || [],
    });
  }

  return projects;
}

/**
 * Certifications parser
 */
function parseCertifications(lines: string[]) {
  return lines
    .map((l) => l.replace(/^[•\-\*–]\s*/, '').trim())
    .filter((l) => l.length > 3)
    .map((name) => ({
      id: crypto.randomUUID(),
      name,
      issuingOrganization: '',
      date: '',
      url: '',
    }));
}
