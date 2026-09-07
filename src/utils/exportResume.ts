import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import type { Resume } from '../types/resume';

/**
 * Direct file download: renders the active resume into a crisp PDF file and saves directly to disk
 */
export async function exportToPDFDirect(resume: Resume): Promise<void> {
  const element = document.querySelector('.resume-page') as HTMLElement;
  if (!element) {
    exportToPDF(resume);
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: element.scrollWidth,
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.98);
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = 210;
  const pdfHeight = 297;
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
  heightLeft -= pdfHeight;

  while (heightLeft > 5) {
    position -= pdfHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;
  }

  const fileName = `${(resume.personalInfo.fullName || 'Resume').trim().replace(/\s+/g, '_')}_Resume.pdf`;
  pdf.save(fileName);
}

/**
 * Browser Print / Save as PDF
 */
export function exportToPDF(resume: Resume) {
  const originalTitle = document.title;
  const name = resume.personalInfo.fullName.trim() || 'My';
  document.title = `${name.replace(/\s+/g, '_')}_Resume`;

  setTimeout(() => {
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  }, 250);
}

/**
 * Export resume as an editable Microsoft Word (.docx) document
 */
export async function exportToDocx(resume: Resume) {
  const { personalInfo: info, summary, experience, education, skills, projects, certifications, languages, awards, volunteerExperience } = resume;
  const children: Paragraph[] = [];

  // Helper to create a section heading
  const createSectionHeader = (title: string) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120 },
      border: {
        bottom: {
          color: '2563eb',
          space: 2,
          style: BorderStyle.SINGLE,
          size: 12,
        },
      },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 24, // 12pt
          color: '111827',
          font: 'Arial',
        }),
      ],
    });
  };

  // 1. Header: Full Name
  if (info.fullName) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        children: [
          new TextRun({
            text: info.fullName,
            bold: true,
            size: 40, // 20pt
            color: '111827',
            font: 'Arial',
          }),
        ],
      }),
    );
  }

  // Header: Professional Title
  if (info.professionalTitle) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        children: [
          new TextRun({
            text: info.professionalTitle,
            bold: true,
            size: 24, // 12pt
            color: '2563eb',
            font: 'Arial',
          }),
        ],
      }),
    );
  }

  // Header: Contact Info
  const contactDetails = [
    info.email,
    info.phone,
    [info.city, info.state, info.country].filter(Boolean).join(', '),
    info.linkedinUrl,
    info.githubUrl,
    info.portfolioUrl,
  ].filter(Boolean);

  if (contactDetails.length > 0) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: contactDetails.join('  •  '),
            size: 19, // 9.5pt
            color: '4b5563',
            font: 'Arial',
          }),
        ],
      }),
    );
  }

  // 2. Summary
  if (summary && resume.sectionVisibility.summary) {
    children.push(createSectionHeader('Professional Summary'));
    children.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: summary,
            size: 21, // 10.5pt
            color: '374151',
            font: 'Arial',
          }),
        ],
      }),
    );
  }

  // 3. Work Experience
  if (experience.length > 0 && resume.sectionVisibility.experience) {
    children.push(createSectionHeader('Work Experience'));
    for (const exp of experience) {
      const dates = [
        exp.startMonth && `${exp.startMonth} `,
        exp.startYear,
        exp.startYear && ' – ',
        exp.currentlyWorking ? 'Present' : `${exp.endMonth ? `${exp.endMonth} ` : ''}${exp.endYear}`,
      ].filter(Boolean).join('');

      // Job Title & Company
      children.push(
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: [
            new TextRun({
              text: exp.jobTitle,
              bold: true,
              size: 22,
              font: 'Arial',
            }),
            new TextRun({
              text: ` — ${exp.company}${exp.location ? ` (${exp.location})` : ''}`,
              bold: true,
              color: '2563eb',
              size: 22,
              font: 'Arial',
            }),
            new TextRun({
              text: dates ? `\t${dates}` : '',
              italics: true,
              color: '6b7280',
              size: 20,
              font: 'Arial',
            }),
          ],
        }),
      );

      // Description
      if (exp.description) {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: exp.description,
                size: 21,
                font: 'Arial',
              }),
            ],
          }),
        );
      }

      // Achievements bullets
      for (const ach of exp.achievements.filter((a) => a.trim())) {
        children.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: ach,
                size: 21,
                font: 'Arial',
              }),
            ],
          }),
        );
      }
    }
  }

  // 4. Education
  if (education.length > 0 && resume.sectionVisibility.education) {
    children.push(createSectionHeader('Education'));
    for (const edu of education) {
      const dates = `${edu.startYear ? `${edu.startYear} – ` : ''}${edu.endYear}`;
      children.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [
            new TextRun({
              text: edu.degree,
              bold: true,
              size: 22,
              font: 'Arial',
            }),
            new TextRun({
              text: ` — ${edu.university}${edu.location ? ` (${edu.location})` : ''}`,
              color: '2563eb',
              size: 22,
              font: 'Arial',
            }),
            new TextRun({
              text: dates ? `\t${dates}` : '',
              italics: true,
              color: '6b7280',
              size: 20,
              font: 'Arial',
            }),
          ],
        }),
      );
      if (edu.gpa) {
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: `GPA: ${edu.gpa}`,
                size: 20,
                color: '4b5563',
                font: 'Arial',
              }),
            ],
          }),
        );
      }
    }
  }

  // 5. Skills
  if (skills.length > 0 && resume.sectionVisibility.skills) {
    children.push(createSectionHeader('Skills'));
    for (const cat of skills.filter((c) => c.skills.length > 0)) {
      children.push(
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: `${cat.name}: `,
              bold: true,
              size: 21,
              font: 'Arial',
            }),
            new TextRun({
              text: cat.skills.join(', '),
              size: 21,
              font: 'Arial',
            }),
          ],
        }),
      );
    }
  }

  // 6. Projects
  if (projects.length > 0 && resume.sectionVisibility.projects) {
    children.push(createSectionHeader('Projects'));
    for (const proj of projects) {
      children.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [
            new TextRun({
              text: proj.name,
              bold: true,
              size: 22,
              font: 'Arial',
            }),
            proj.technologies.length > 0
              ? new TextRun({
                  text: ` (${proj.technologies.join(', ')})`,
                  color: '6b7280',
                  size: 20,
                  font: 'Arial',
                })
              : new TextRun({ text: '' }),
          ],
        }),
      );
      if (proj.description) {
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [new TextRun({ text: proj.description, size: 21, font: 'Arial' })],
          }),
        );
      }
      for (const ach of proj.achievements.filter((a) => a.trim())) {
        children.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 40 },
            children: [new TextRun({ text: ach, size: 21, font: 'Arial' })],
          }),
        );
      }
    }
  }

  // 7. Certifications
  if (certifications.length > 0 && resume.sectionVisibility.certifications) {
    children.push(createSectionHeader('Certifications'));
    for (const cert of certifications) {
      children.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({ text: cert.name, bold: true, size: 21, font: 'Arial' }),
            cert.issuingOrganization ? new TextRun({ text: ` — ${cert.issuingOrganization}`, size: 21, font: 'Arial' }) : new TextRun({ text: '' }),
            cert.date ? new TextRun({ text: ` (${cert.date})`, color: '6b7280', size: 20, font: 'Arial' }) : new TextRun({ text: '' }),
          ],
        }),
      );
    }
  }

  // 8. Languages
  if (languages.length > 0 && resume.sectionVisibility.languages) {
    children.push(createSectionHeader('Languages'));
    children.push(
      new Paragraph({
        spacing: { after: 60 },
        children: [
          new TextRun({
            text: languages.map((l) => `${l.language} (${l.proficiency})`).join('  •  '),
            size: 21,
            font: 'Arial',
          }),
        ],
      }),
    );
  }

  // 9. Awards
  if (awards.length > 0 && resume.sectionVisibility.awards) {
    children.push(createSectionHeader('Awards & Honors'));
    for (const award of awards) {
      children.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({ text: award.title, bold: true, size: 21, font: 'Arial' }),
            award.organization ? new TextRun({ text: ` — ${award.organization}`, size: 21, font: 'Arial' }) : new TextRun({ text: '' }),
            award.date ? new TextRun({ text: ` (${award.date})`, color: '6b7280', size: 20, font: 'Arial' }) : new TextRun({ text: '' }),
          ],
        }),
      );
    }
  }

  // 10. Volunteering
  if (volunteerExperience.length > 0 && resume.sectionVisibility.volunteerExperience) {
    children.push(createSectionHeader('Volunteering'));
    for (const vol of volunteerExperience) {
      children.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({ text: `${vol.role} — ${vol.organization}`, bold: true, size: 21, font: 'Arial' }),
          ],
        }),
      );
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1000,
              right: 1000,
              bottom: 1000,
              left: 1000,
            },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `${(info.fullName || 'Resume').replace(/\s+/g, '_')}_Resume.docx`;
  saveAs(blob, fileName);
}

/**
 * Export resume data as JSON backup
 */
export function exportToJSON(resume: Resume) {
  const jsonStr = JSON.stringify(resume, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const fileName = `${(resume.personalInfo.fullName || 'Resume').replace(/\s+/g, '_')}_Backup.json`;
  saveAs(blob, fileName);
}

/**
 * Export resume as plain text
 */
export function exportToTXT(resume: Resume) {
  const { personalInfo: info, summary, experience, education, skills, projects } = resume;
  const lines: string[] = [];

  if (info.fullName) lines.push(info.fullName.toUpperCase());
  if (info.professionalTitle) lines.push(info.professionalTitle);
  const contact = [info.email, info.phone, [info.city, info.state, info.country].filter(Boolean).join(', '), info.linkedinUrl, info.githubUrl].filter(Boolean).join(' | ');
  if (contact) lines.push(contact);
  lines.push('\n' + '='.repeat(60) + '\n');

  if (summary) {
    lines.push('PROFESSIONAL SUMMARY');
    lines.push('-'.repeat(30));
    lines.push(summary + '\n');
  }

  if (experience.length > 0) {
    lines.push('WORK EXPERIENCE');
    lines.push('-'.repeat(30));
    for (const exp of experience) {
      lines.push(`${exp.jobTitle} - ${exp.company} (${exp.startYear} - ${exp.currentlyWorking ? 'Present' : exp.endYear})`);
      if (exp.description) lines.push(exp.description);
      for (const a of exp.achievements.filter(Boolean)) {
        lines.push(`• ${a}`);
      }
      lines.push('');
    }
  }

  if (education.length > 0) {
    lines.push('EDUCATION');
    lines.push('-'.repeat(30));
    for (const edu of education) {
      lines.push(`${edu.degree} - ${edu.university} (${edu.endYear})`);
    }
    lines.push('');
  }

  if (skills.length > 0) {
    lines.push('SKILLS');
    lines.push('-'.repeat(30));
    for (const cat of skills) {
      if (cat.skills.length > 0) {
        lines.push(`${cat.name}: ${cat.skills.join(', ')}`);
      }
    }
    lines.push('');
  }

  if (projects.length > 0) {
    lines.push('PROJECTS');
    lines.push('-'.repeat(30));
    for (const p of projects) {
      lines.push(`${p.name} (${p.technologies.join(', ')})`);
      if (p.description) lines.push(p.description);
      for (const a of p.achievements.filter(Boolean)) {
        lines.push(`• ${a}`);
      }
      lines.push('');
    }
  }

  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const fileName = `${(info.fullName || 'Resume').replace(/\s+/g, '_')}_Resume.txt`;
  saveAs(blob, fileName);
}
