import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import type { Resume, Experience, Education, SkillCategory, Project, Certification, Language, LanguageProficiency } from '../types/resume';
import { createEmptyResume } from '../types/resume';

// Set up pdf.js worker using bundled worker or unpkg fallback
if (typeof window !== 'undefined') {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url
    ).toString();
  } catch {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
  }
}

/**
 * Extract raw text from a PDF file with OCR fallback for scanned or vector-flattened documents
 */
export async function extractTextFromPDF(
  file: File,
  onProgress?: (status: string) => void
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
  const pageTexts: string[] = [];

  // Step 1: Standard digital text extraction via PDF.js
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str || '')
      .filter(Boolean)
      .join(' ');
    if (pageText.trim()) {
      pageTexts.push(pageText.trim());
    }
  }

  const directText = pageTexts.join('\n\n').trim();

  // If sufficient text was extracted, return it immediately
  if (directText.length >= 60) {
    return directText;
  }

  // Step 2: Fallback to OCR using Tesseract.js for scanned, flattened, or vector-rendered PDFs
  if (onProgress) {
    onProgress(`Initializing OCR scanner (detected scanned/vector document)...`);
  }

  try {
    const { createWorker } = await import('tesseract.js');
    const worker = await createWorker('eng');
    // PSM 4: Assume a single column of text of variable sizes (ideal for modern resumes)
    await worker.setParameters({ tessedit_pageseg_mode: '4' as any });

    const ocrTexts: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      if (onProgress) {
        onProgress(`Extracting text with OCR (page ${i} of ${pdf.numPages})...`);
      }
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2.0 });

      // Create an offscreen canvas and render page with solid white background
      const canvas = document.createElement('canvas');
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({
          canvasContext: ctx,
          viewport,
          canvas,
        } as any).promise;

        const result = await worker.recognize(canvas);
        if (result.data && result.data.text && result.data.text.trim()) {
          ocrTexts.push(result.data.text.trim());
        }
      }
    }

    await worker.terminate();

    const fullOcrText = ocrTexts.join('\n\n').trim();
    if (fullOcrText.length > 0) {
      return fullOcrText;
    }
  } catch (ocrError) {
    console.error('OCR processing failed:', ocrError);
  }

  return directText;
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

  // Clean and split lines
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

  // Location extraction (e.g. "Noida, Uttar Pradesh, India" or "San Francisco, CA")
  const headerSearchBlock = lines.slice(0, 10).join(' ');
  const locationMatch = headerSearchBlock.match(/([A-Z][a-zA-Z\s]+),\s*([A-Z][a-zA-Z\s]+)(?:,\s*([A-Z][a-zA-Z\s]+))?/);
  if (locationMatch) {
    const locParts = [locationMatch[1], locationMatch[2], locationMatch[3]].filter(Boolean).map((s) => s.trim());
    if (locParts.length >= 2 && !locParts[0].toLowerCase().includes('consultancy') && !locParts[0].toLowerCase().includes('university')) {
      resume.personalInfo.city = locParts[0];
      resume.personalInfo.state = locParts[1];
      if (locParts[2]) resume.personalInfo.country = locParts[2];
    }
  }

  // 2. Name & Title extraction from early lines
  const headerLines = lines.slice(0, 8).filter((l) => {
    const isContact = l.includes('@') || l.includes('linkedin.com') || l.includes('github.com') || /\+?\d{7,}/.test(l.replace(/[\s-]/g, ''));
    const isGeneric = /^(resume|curriculum vitae|cv|page \d+)/i.test(l);
    return !isContact && !isGeneric && l.length > 2 && l.length < 60;
  });

  if (headerLines.length > 0) {
    const rawName = headerLines[0].replace(/[«»•|]/g, '').trim();
    resume.personalInfo.fullName = rawName;
    resume.name = `${rawName}'s Resume`;
  }
  if (headerLines.length > 1) {
    const rawTitle = headerLines[1].replace(/[«»]/g, '•').replace(/\s+/g, ' ').trim();
    if (!rawTitle.includes(',') && rawTitle.length < 65) {
      resume.personalInfo.professionalTitle = rawTitle;
    }
  }

  // 3. Section Segmentation
  const sectionKeywords = [
    { key: 'summary', regex: /^(?:professional\s+)?summary|about\s+me|profile|objective/i },
    { key: 'experience', regex: /^(?:work\s+)?experience|employment\s+history|professional\s+experience|work\s+history/i },
    { key: 'education', regex: /^education|academic\s+background|academics|qualifications/i },
    { key: 'skills', regex: /^skills|technical\s+skills|core\s+competencies|technologies/i },
    { key: 'projects', regex: /^projects|personal\s+projects|key\s+projects|academic\s+projects/i },
    { key: 'certifications', regex: /^certifications|certificates|licenses\s+(&|and)\s+certifications|credentials/i },
    { key: 'languages', regex: /^languages|language\s+proficiency/i },
  ];

  type SectionKey = 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'languages' | 'other';
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
    } else if (block.section === 'languages') {
      resume.languages = parseLanguages(block.lines);
      if (resume.languages.length > 0) resume.sectionVisibility.languages = true;
    }
  }

  return resume;
}

/**
 * Experience parser: detects job titles, companies, dates, achievements
 */
function parseExperience(lines: string[]): Experience[] {
  const experiences: Experience[] = [];
  let currentExp: Partial<Experience> | null = null;

  for (const line of lines) {
    // Detect date ranges e.g. "May 2022 - Present", "July 2021 - April 2022", "2020 - 2023"
    const dateMatch = line.match(/(?:([A-Za-z]{3,9})\s+)?(20\d\d|19\d\d)\s*(?:-|–|—|to)\s*(present|current|(?:([A-Za-z]{3,9})\s+)?(20\d\d|19\d\d))/i);
    const isBullet = /^[•\-*–—«+>]\s*/.test(line) || /^\d+\.\s*/.test(line);

    if (dateMatch && !isBullet) {
      if (currentExp && currentExp.jobTitle) {
        experiences.push(finalizeExperience(currentExp));
      }
      const isPresent = dateMatch[3].toLowerCase().includes('present') || dateMatch[3].toLowerCase().includes('current');
      const startMonth = dateMatch[1] || '';
      const startYear = dateMatch[2];
      const endMonth = isPresent ? '' : dateMatch[4] || '';
      const endYear = isPresent ? '' : (dateMatch[5] || dateMatch[3]);

      currentExp = {
        id: crypto.randomUUID(),
        jobTitle: line.replace(dateMatch[0], '').replace(/[|•–—«»]/g, ' ').replace(/\s+/g, ' ').trim() || 'Professional Role',
        company: '',
        location: '',
        employmentType: 'full-time',
        startMonth,
        startYear,
        endMonth,
        endYear,
        currentlyWorking: isPresent,
        description: '',
        achievements: [],
      };
    } else if (isBullet && currentExp) {
      const bulletText = line.replace(/^[•\-*–—«+>]\s*/, '').replace(/^\d+\.\s*/, '').trim();
      if (bulletText) {
        currentExp.achievements = [...(currentExp.achievements || []), bulletText];
      }
    } else if (currentExp) {
      if (!currentExp.company) {
        // Line might be "Company Name • Location" or "Company « Location"
        const splitComp = line.split(/[•«»|]/).map((s) => s.trim()).filter(Boolean);
        if (splitComp.length > 1) {
          currentExp.company = splitComp[0];
          currentExp.location = splitComp.slice(1).join(', ');
        } else {
          currentExp.company = line;
        }
      } else {
        currentExp.description = currentExp.description ? `${currentExp.description} ${line}` : line;
      }
    } else {
      currentExp = {
        id: crypto.randomUUID(),
        jobTitle: line,
        company: '',
        location: '',
        employmentType: 'full-time',
        startMonth: '',
        startYear: '',
        endMonth: '',
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

function finalizeExperience(exp: Partial<Experience>): Experience {
  return {
    id: exp.id || crypto.randomUUID(),
    jobTitle: exp.jobTitle || 'Role',
    company: exp.company || 'Company',
    location: exp.location || '',
    employmentType: exp.employmentType || 'full-time',
    startMonth: exp.startMonth || '',
    startYear: exp.startYear || '',
    endMonth: exp.endMonth || '',
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
    const yearMatch = line.match(/(20\d\d|19\d\d)(?:\s*(?:-|–|—|to)\s*(20\d\d|19\d\d))?/);
    const hasDegree = degreeKeywords.test(line);

    if (hasDegree) {
      if (currentEdu && currentEdu.degree) {
        educations.push(finalizeEducation(currentEdu));
      }
      currentEdu = {
        id: crypto.randomUUID(),
        degree: line.replace(yearMatch ? yearMatch[0] : '', '').replace(/[|•–—«»]/g, ' ').replace(/\s+/g, ' ').trim(),
        university: '',
        location: '',
        startYear: yearMatch && yearMatch[2] ? yearMatch[1] : '',
        endYear: yearMatch ? (yearMatch[2] || yearMatch[1]) : '',
        gpa: '',
        relevantCoursework: '',
        description: '',
      };
    } else if (line.toLowerCase().startsWith('coursework:')) {
      if (currentEdu) {
        currentEdu.relevantCoursework = line.replace(/^coursework:\s*/i, '').trim();
      }
    } else if (currentEdu) {
      if (!currentEdu.university) {
        const splitUni = line.split(/[•«»|]/).map((s) => s.trim()).filter(Boolean);
        if (splitUni.length > 1) {
          currentEdu.university = splitUni[0];
          currentEdu.location = splitUni.slice(1).join(', ');
        } else {
          currentEdu.university = line;
        }
      } else {
        currentEdu.description = currentEdu.description ? `${currentEdu.description} ${line}` : line;
      }
    } else if (line.length > 5) {
      currentEdu = {
        id: crypto.randomUUID(),
        degree: line,
        university: '',
        location: '',
        startYear: '',
        endYear: yearMatch ? yearMatch[0] : '',
        gpa: '',
        relevantCoursework: '',
        description: '',
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
    location: edu.location || '',
    startYear: edu.startYear || '',
    endYear: edu.endYear || '',
    gpa: edu.gpa || '',
    relevantCoursework: edu.relevantCoursework || '',
    description: edu.description || '',
  };
}

/**
 * Skills parser: splits by categories, colons, bullets, commas
 */
function parseSkills(lines: string[]): SkillCategory[] {
  const categories: SkillCategory[] = [];
  const allSkills: string[] = [];

  for (const line of lines) {
    const colonSplit = line.split(':');
    if (colonSplit.length === 2 && colonSplit[0].length < 40) {
      const catName = colonSplit[0].trim();
      const skillsInCat = colonSplit[1]
        .split(/[,|•«»]/)
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

    const items = line.split(/[,|•«»]/).map((s) => s.trim()).filter((s) => s.length > 0 && s.length < 35);
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
    const isBullet = /^[•\-*–—«+>]\s*/.test(line);
    const dateMatch = line.match(/(20\d\d|19\d\d)\s*(?:-|–|—|to)\s*(present|current|20\d\d|19\d\d)/i);

    if (!isBullet && (dateMatch || (line.length < 60 && !currentProj))) {
      if (currentProj && currentProj.name) {
        projects.push(finalizeProject(currentProj));
      }
      const projectName = dateMatch
        ? line.replace(dateMatch[0], '').replace(/[|•–—«»]/g, ' ').replace(/\s+/g, ' ').trim()
        : line;

      currentProj = {
        id: crypto.randomUUID(),
        name: projectName || 'Project',
        role: '',
        technologies: [],
        startDate: dateMatch ? dateMatch[1] : '',
        endDate: dateMatch ? dateMatch[2] : '',
        projectUrl: '',
        description: '',
        achievements: [],
      };
    } else if (isBullet && currentProj) {
      const ach = line.replace(/^[•\-*–—«+>]\s*/, '').trim();
      if (ach) currentProj.achievements = [...(currentProj.achievements || []), ach];
    } else if (currentProj) {
      if (!currentProj.role && (line.toLowerCase().includes('engineer') || line.toLowerCase().includes('developer') || line.toLowerCase().includes('lead') || line.length < 30)) {
        currentProj.role = line;
      } else if (currentProj.technologies && currentProj.technologies.length === 0 && (line.includes('+') || line.includes('«') || line.includes('»') || line.includes('•') || line.includes(','))) {
        currentProj.technologies = line.split(/[+«»•|,]/).map((s) => s.trim()).filter((s) => s.length > 0 && s.length < 30);
      } else {
        currentProj.description = currentProj.description ? `${currentProj.description} ${line}` : line;
      }
    }
  }

  if (currentProj && currentProj.name) {
    projects.push(finalizeProject(currentProj));
  }

  return projects;
}

function finalizeProject(proj: Partial<Project>): Project {
  return {
    id: proj.id || crypto.randomUUID(),
    name: proj.name || 'Project',
    role: proj.role || '',
    technologies: proj.technologies || [],
    startDate: proj.startDate || '',
    endDate: proj.endDate || '',
    projectUrl: proj.projectUrl || '',
    description: proj.description || '',
    achievements: proj.achievements || [],
  };
}

/**
 * Certifications parser
 */
function parseCertifications(lines: string[]): Certification[] {
  const certs: Certification[] = [];
  let currentCert: Partial<Certification> | null = null;

  for (const line of lines) {
    const yearMatch = line.match(/(20\d\d|19\d\d)/);
    const cleanLine = line.replace(/^[•\-*–—«+>]\s*/, '').trim();
    if (!cleanLine) continue;

    if (yearMatch || cleanLine.toLowerCase().includes('certified') || cleanLine.toLowerCase().includes('certificate')) {
      if (currentCert && currentCert.name) {
        certs.push({
          id: currentCert.id || crypto.randomUUID(),
          name: currentCert.name,
          issuingOrganization: currentCert.issuingOrganization || '',
          date: currentCert.date || '',
          credentialId: '',
          credentialUrl: '',
        });
      }
      currentCert = {
        id: crypto.randomUUID(),
        name: cleanLine.replace(yearMatch ? yearMatch[0] : '', '').trim(),
        issuingOrganization: '',
        date: yearMatch ? yearMatch[0] : '',
      };
    } else if (currentCert) {
      if (!currentCert.issuingOrganization) {
        currentCert.issuingOrganization = cleanLine;
      }
    }
  }

  if (currentCert && currentCert.name) {
    certs.push({
      id: currentCert.id || crypto.randomUUID(),
      name: currentCert.name,
      issuingOrganization: currentCert.issuingOrganization || '',
      date: currentCert.date || '',
      credentialId: '',
      credentialUrl: '',
    });
  }

  return certs;
}

/**
 * Languages parser: recognizes e.g. "English (fluent) Hindi (native)"
 */
function parseLanguages(lines: string[]): Language[] {
  const languages: Language[] = [];
  const text = lines.join(' ');
  const regex = /([A-Za-z]+)\s*\((native|fluent|advanced|intermediate|beginner)\)/gi;
  let match;

  while ((match = regex.exec(text)) !== null) {
    languages.push({
      id: crypto.randomUUID(),
      language: match[1],
      proficiency: match[2].toLowerCase() as LanguageProficiency,
    });
  }

  if (languages.length === 0) {
    const rawTokens = text.split(/[,|•«»]/).map((s) => s.trim()).filter((s) => s.length > 2 && s.length < 25);
    for (const token of rawTokens) {
      languages.push({
        id: crypto.randomUUID(),
        language: token,
        proficiency: 'intermediate',
      });
    }
  }

  return languages;
}
