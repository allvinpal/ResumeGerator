import type { Resume } from '../../../types/resume';
import { Mail, Phone, MapPin, Link2, Globe } from 'lucide-react';

interface TemplateProps {
  resume: Resume;
}

export default function ClassicTemplate({ resume }: TemplateProps) {
  const { personalInfo: info, settings, sectionVisibility, sectionOrder } = resume;
  const accentColor = settings.accentColor || '#1e3a5f';

  const fontSizeMap = {
    9: '9.5px', 10: '10.5px', 11: '11.5px', 12: '12.5px', 13: '13.5px', 14: '14.5px',
  };

  const marginMap = {
    narrow: '14mm 16mm',
    normal: '20mm 20mm',
    wide: '26mm 24mm',
  };

  const baseFontSize = fontSizeMap[settings.fontSize as keyof typeof fontSizeMap] || '11.5px';
  const lineHeight = settings.lineSpacing === 'compact' ? 1.35 : settings.lineSpacing === 'relaxed' ? 1.7 : 1.5;
  const sectionGap = settings.sectionSpacing === 'compact' ? '12px' : settings.sectionSpacing === 'relaxed' ? '22px' : '16px';

  const renderSectionMap: Record<string, () => React.ReactNode> = {
    summary: () => resume.summary && sectionVisibility.summary ? (
      <ClassicSection title="Summary">
        <p style={{ fontSize: baseFontSize, lineHeight, color: '#222', textAlign: 'justify' }}>
          {resume.summary}
        </p>
      </ClassicSection>
    ) : null,

    experience: () => resume.experience.length > 0 && sectionVisibility.experience ? (
      <ClassicSection title="Professional Experience">
        {resume.experience.map((exp) => (
          <div key={exp.id} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#111' }}>
                {exp.jobTitle}, <span style={{ fontWeight: 600, fontStyle: 'italic', color: '#333' }}>{exp.company}</span>
              </span>
              <span style={{ fontSize: '10.5px', color: '#555', fontStyle: 'italic' }}>
                {exp.startMonth && `${exp.startMonth} `}{exp.startYear}{exp.startYear && ' – '}
                {exp.currentlyWorking ? 'Present' : `${exp.endMonth ? `${exp.endMonth} ` : ''}${exp.endYear}`}
              </span>
            </div>
            {exp.location && (
              <p style={{ fontSize: '10.5px', color: '#666', margin: '1px 0' }}>{exp.location}</p>
            )}
            {exp.description && (
              <p style={{ fontSize: baseFontSize, color: '#333', margin: '3px 0', lineHeight }}>{exp.description}</p>
            )}
            {exp.achievements.filter(a => a.trim()).length > 0 && (
              <ul style={{ margin: '3px 0 0 0', paddingLeft: '18px', listStyle: 'disc' }}>
                {exp.achievements.filter(a => a.trim()).map((ach, i) => (
                  <li key={i} style={{ fontSize: baseFontSize, color: '#222', lineHeight, marginBottom: '2px' }}>{ach}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ClassicSection>
    ) : null,

    education: () => resume.education.length > 0 && sectionVisibility.education ? (
      <ClassicSection title="Education">
        {resume.education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#111' }}>
                {edu.degree}, <span style={{ fontWeight: 500, fontStyle: 'italic' }}>{edu.university}</span>
              </span>
              <span style={{ fontSize: '10.5px', color: '#555', fontStyle: 'italic' }}>
                {edu.startYear}{edu.startYear && edu.endYear && ' – '}{edu.endYear}
              </span>
            </div>
            {edu.gpa && <p style={{ fontSize: baseFontSize, color: '#444', margin: '1px 0' }}>GPA: {edu.gpa}</p>}
            {edu.relevantCoursework && (
              <p style={{ fontSize: baseFontSize, color: '#444', margin: '1px 0' }}>Coursework: {edu.relevantCoursework}</p>
            )}
          </div>
        ))}
      </ClassicSection>
    ) : null,

    skills: () => resume.skills.length > 0 && sectionVisibility.skills ? (
      <ClassicSection title="Skills & Competencies">
        {resume.skills.filter(cat => cat.skills.length > 0).map((cat) => (
          <div key={cat.id} style={{ marginBottom: '4px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 700, color: '#111' }}>{cat.name}: </span>
            <span style={{ fontSize: baseFontSize, color: '#333' }}>{cat.skills.join(', ')}</span>
          </div>
        ))}
      </ClassicSection>
    ) : null,

    projects: () => resume.projects.length > 0 && sectionVisibility.projects ? (
      <ClassicSection title="Key Projects">
        {resume.projects.map((proj) => (
          <div key={proj.id} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#111' }}>
                {proj.name} {proj.role && <span style={{ fontWeight: 400, fontStyle: 'italic' }}>— {proj.role}</span>}
              </span>
              <span style={{ fontSize: '10.5px', color: '#555' }}>
                {proj.startDate}{proj.startDate && proj.endDate && ' – '}{proj.endDate}
              </span>
            </div>
            {proj.technologies.length > 0 && (
              <p style={{ fontSize: '10px', color: '#555', margin: '1px 0', fontStyle: 'italic' }}>
                Tools: {proj.technologies.join(', ')}
              </p>
            )}
            {proj.description && (
              <p style={{ fontSize: baseFontSize, color: '#333', margin: '2px 0', lineHeight }}>{proj.description}</p>
            )}
            {proj.achievements.filter(a => a.trim()).length > 0 && (
              <ul style={{ margin: '2px 0 0 0', paddingLeft: '18px', listStyle: 'disc' }}>
                {proj.achievements.filter(a => a.trim()).map((ach, i) => (
                  <li key={i} style={{ fontSize: baseFontSize, color: '#222', lineHeight, marginBottom: '2px' }}>{ach}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ClassicSection>
    ) : null,

    certifications: () => resume.certifications.length > 0 && sectionVisibility.certifications ? (
      <ClassicSection title="Certifications">
        {resume.certifications.map((cert) => (
          <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600 }}>
              {cert.name}{cert.issuingOrganization ? ` — ${cert.issuingOrganization}` : ''}
            </span>
            <span style={{ fontSize: '10.5px', color: '#555' }}>{cert.date}</span>
          </div>
        ))}
      </ClassicSection>
    ) : null,

    achievements: () => resume.achievements.length > 0 && sectionVisibility.achievements ? (
      <ClassicSection title="Honors & Achievements">
        {resume.achievements.map((ach) => (
          <div key={ach.id} style={{ marginBottom: '4px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600 }}>{ach.title}</span>
            {ach.date && <span style={{ fontSize: '10.5px', color: '#666', marginLeft: '6px' }}>({ach.date})</span>}
            {ach.description && <p style={{ fontSize: baseFontSize, color: '#444', margin: '1px 0' }}>{ach.description}</p>}
          </div>
        ))}
      </ClassicSection>
    ) : null,

    languages: () => resume.languages.length > 0 && sectionVisibility.languages ? (
      <ClassicSection title="Languages">
        <p style={{ fontSize: baseFontSize, color: '#333' }}>
          {resume.languages.map(l => `${l.language} (${l.proficiency})`).join(' • ')}
        </p>
      </ClassicSection>
    ) : null,

    awards: () => resume.awards.length > 0 && sectionVisibility.awards ? (
      <ClassicSection title="Awards">
        {resume.awards.map((award) => (
          <div key={award.id} style={{ marginBottom: '4px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600 }}>{award.title}</span>
            {award.organization && <span> — {award.organization}</span>}
            {award.date && <span style={{ fontSize: '10.5px', color: '#666' }}> ({award.date})</span>}
          </div>
        ))}
      </ClassicSection>
    ) : null,

    volunteerExperience: () => resume.volunteerExperience.length > 0 && sectionVisibility.volunteerExperience ? (
      <ClassicSection title="Volunteer & Community">
        {resume.volunteerExperience.map((vol) => (
          <div key={vol.id} style={{ marginBottom: '6px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600 }}>{vol.role}, {vol.organization}</span>
            {vol.description && <p style={{ fontSize: baseFontSize, color: '#444' }}>{vol.description}</p>}
          </div>
        ))}
      </ClassicSection>
    ) : null,

    customSections: () => resume.customSections.length > 0 && sectionVisibility.customSections ? (
      <>
        {resume.customSections.map((cs) => (
          <ClassicSection key={cs.id} title={cs.title}>
            {cs.items.map((item) => (
              <div key={item.id} style={{ marginBottom: '6px' }}>
                {item.content && <p style={{ fontSize: baseFontSize }}>{item.content}</p>}
              </div>
            ))}
          </ClassicSection>
        ))}
      </>
    ) : null,
  };

  const contactItems = [
    info.email && { icon: Mail, text: info.email },
    info.phone && { icon: Phone, text: info.phone },
    (info.city || info.state || info.country) && {
      icon: MapPin,
      text: [info.city, info.state, info.country].filter(Boolean).join(', '),
    },
    info.linkedinUrl && { icon: Link2, text: 'LinkedIn' },
    info.githubUrl && { icon: Link2, text: 'GitHub' },
    info.portfolioUrl && { icon: Globe, text: 'Portfolio' },
  ].filter(Boolean) as { icon: any; text: string }[];

  return (
    <div
      className="resume-page"
      style={{
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: baseFontSize,
        lineHeight,
        padding: marginMap[settings.margins],
        color: '#111',
      }}
    >
      {/* Centered Classic Header */}
      <div style={{ textAlign: 'center', marginBottom: sectionGap, borderBottom: `1.5px solid ${accentColor}`, paddingBottom: '10px' }}>
        {info.fullName && (
          <h1 style={{
            fontSize: `${settings.headingSize + 6}px`,
            fontWeight: 700,
            color: '#111827',
            margin: '0 0 4px 0',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            {info.fullName}
          </h1>
        )}
        {info.professionalTitle && (
          <p style={{
            fontSize: '13px',
            fontStyle: 'italic',
            color: '#4b5563',
            margin: '0 0 6px 0',
          }}>
            {info.professionalTitle}
          </p>
        )}
        {contactItems.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '14px',
            fontSize: '10.5px',
            color: '#444',
          }}>
            {contactItems.map((item, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <item.icon size={11} />
                {item.text}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Sections in order */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: sectionGap }}>
        {sectionOrder
          .filter((key) => key !== 'personalInfo')
          .map((key) => {
            const renderer = renderSectionMap[key];
            return renderer ? <div key={key}>{renderer()}</div> : null;
          })}
      </div>
    </div>
  );
}

function ClassicSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2
        style={{
          fontSize: '13px',
          fontWeight: 700,
          color: '#111827',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          borderBottom: '1px solid #999',
          paddingBottom: '2px',
          marginBottom: '6px',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
