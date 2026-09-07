import type { Resume } from '../../../types/resume';
import { Mail, Phone, MapPin, Link2, Globe } from 'lucide-react';

interface TemplateProps {
  resume: Resume;
}

export default function ModernTemplate({ resume }: TemplateProps) {
  const { personalInfo: info, settings, sectionVisibility, sectionOrder } = resume;
  const accentColor = settings.accentColor || '#1a56db';

  const fontSizeMap = {
    9: '9px', 10: '10px', 11: '11px', 12: '12px', 13: '13px', 14: '14px',
  };

  const marginMap = {
    narrow: '12mm 14mm',
    normal: '18mm 18mm',
    wide: '24mm 22mm',
  };

  const lineHeightMap = {
    compact: 1.3,
    normal: 1.5,
    relaxed: 1.7,
  };

  const sectionGapMap = {
    compact: '12px',
    normal: '18px',
    relaxed: '24px',
  };

  const baseFontSize = fontSizeMap[settings.fontSize as keyof typeof fontSizeMap] || '11px';
  const lineHeight = lineHeightMap[settings.lineSpacing] || 1.5;
  const sectionGap = sectionGapMap[settings.sectionSpacing || 'normal'];

  // Section rendering map
  const renderSectionMap: Record<string, () => React.ReactNode> = {
    summary: () => resume.summary && sectionVisibility.summary ? (
      <Section title="Professional Summary" accentColor={accentColor}>
        <p style={{ fontSize: baseFontSize, lineHeight, color: '#374151' }}>
          {resume.summary}
        </p>
      </Section>
    ) : null,

    experience: () => resume.experience.length > 0 && sectionVisibility.experience ? (
      <Section title="Work Experience" accentColor={accentColor}>
        {resume.experience.map((exp) => (
          <div key={exp.id} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#111827', margin: 0 }}>{exp.jobTitle}</h3>
              <span style={{ fontSize: '11px', color: '#6b7280' }}>
                {exp.startMonth && `${exp.startMonth} `}{exp.startYear}{exp.startYear && ' – '}
                {exp.currentlyWorking ? 'Present' : `${exp.endMonth ? `${exp.endMonth} ` : ''}${exp.endYear}`}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: accentColor, margin: '1px 0 4px 0', fontWeight: 500 }}>
              {exp.company}{exp.location ? ` • ${exp.location}` : ''}
            </p>
            {exp.description && (
              <p style={{ fontSize: baseFontSize, color: '#4b5563', margin: '4px 0', lineHeight }}>{exp.description}</p>
            )}
            {exp.achievements.filter(a => a.trim()).length > 0 && (
              <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', listStyle: 'disc' }}>
                {exp.achievements.filter(a => a.trim()).map((ach, i) => (
                  <li key={i} style={{ fontSize: baseFontSize, color: '#374151', lineHeight, marginBottom: '2px' }}>{ach}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </Section>
    ) : null,

    education: () => resume.education.length > 0 && sectionVisibility.education ? (
      <Section title="Education" accentColor={accentColor}>
        {resume.education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#111827', margin: 0 }}>{edu.degree}</h3>
              <span style={{ fontSize: '11px', color: '#6b7280' }}>
                {edu.startYear}{edu.startYear && edu.endYear && ' – '}{edu.endYear}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: accentColor, margin: '1px 0', fontWeight: 500 }}>
              {edu.university}{edu.location ? ` • ${edu.location}` : ''}
            </p>
            {edu.gpa && <p style={{ fontSize: baseFontSize, color: '#4b5563', margin: '2px 0' }}>GPA: {edu.gpa}</p>}
            {edu.relevantCoursework && (
              <p style={{ fontSize: baseFontSize, color: '#4b5563', margin: '2px 0' }}>
                <strong>Coursework:</strong> {edu.relevantCoursework}
              </p>
            )}
          </div>
        ))}
      </Section>
    ) : null,

    skills: () => resume.skills.length > 0 && sectionVisibility.skills ? (
      <Section title="Skills" accentColor={accentColor}>
        {resume.skills.filter(cat => cat.skills.length > 0).map((cat) => (
          <div key={cat.id} style={{ marginBottom: '6px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600, color: '#1f2937' }}>{cat.name}: </span>
            <span style={{ fontSize: baseFontSize, color: '#374151' }}>{cat.skills.join(', ')}</span>
          </div>
        ))}
      </Section>
    ) : null,

    projects: () => resume.projects.length > 0 && sectionVisibility.projects ? (
      <Section title="Projects" accentColor={accentColor}>
        {resume.projects.map((proj) => (
          <div key={proj.id} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#111827', margin: 0 }}>{proj.name}</h3>
              <span style={{ fontSize: '11px', color: '#6b7280' }}>
                {proj.startDate}{proj.startDate && proj.endDate && ' – '}{proj.endDate}
              </span>
            </div>
            {proj.role && (
              <p style={{ fontSize: '12px', color: accentColor, margin: '1px 0', fontWeight: 500 }}>{proj.role}</p>
            )}
            {proj.technologies.length > 0 && (
              <p style={{ fontSize: '10px', color: '#6b7280', margin: '2px 0' }}>
                {proj.technologies.join(' • ')}
              </p>
            )}
            {proj.description && (
              <p style={{ fontSize: baseFontSize, color: '#4b5563', margin: '4px 0', lineHeight }}>{proj.description}</p>
            )}
            {proj.achievements.filter(a => a.trim()).length > 0 && (
              <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', listStyle: 'disc' }}>
                {proj.achievements.filter(a => a.trim()).map((ach, i) => (
                  <li key={i} style={{ fontSize: baseFontSize, color: '#374151', lineHeight, marginBottom: '2px' }}>{ach}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </Section>
    ) : null,

    certifications: () => resume.certifications.length > 0 && sectionVisibility.certifications ? (
      <Section title="Certifications" accentColor={accentColor}>
        {resume.certifications.map((cert) => (
          <div key={cert.id} style={{ marginBottom: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: baseFontSize, fontWeight: 600, color: '#1f2937' }}>{cert.name}</span>
              {cert.date && <span style={{ fontSize: '10px', color: '#6b7280' }}>{cert.date}</span>}
            </div>
            {cert.issuingOrganization && (
              <p style={{ fontSize: '11px', color: accentColor, margin: '1px 0' }}>{cert.issuingOrganization}</p>
            )}
          </div>
        ))}
      </Section>
    ) : null,

    achievements: () => resume.achievements.length > 0 && sectionVisibility.achievements ? (
      <Section title="Achievements" accentColor={accentColor}>
        {resume.achievements.map((ach) => (
          <div key={ach.id} style={{ marginBottom: '6px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600, color: '#1f2937' }}>{ach.title}</span>
            {ach.date && <span style={{ fontSize: '10px', color: '#6b7280', marginLeft: '8px' }}>{ach.date}</span>}
            {ach.description && <p style={{ fontSize: baseFontSize, color: '#4b5563', margin: '2px 0' }}>{ach.description}</p>}
          </div>
        ))}
      </Section>
    ) : null,

    languages: () => resume.languages.length > 0 && sectionVisibility.languages ? (
      <Section title="Languages" accentColor={accentColor}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {resume.languages.map((lang) => (
            <span key={lang.id} style={{ fontSize: baseFontSize, color: '#374151' }}>
              <strong>{lang.language}</strong>
              <span style={{ color: '#6b7280' }}> ({lang.proficiency})</span>
            </span>
          ))}
        </div>
      </Section>
    ) : null,

    awards: () => resume.awards.length > 0 && sectionVisibility.awards ? (
      <Section title="Awards" accentColor={accentColor}>
        {resume.awards.map((award) => (
          <div key={award.id} style={{ marginBottom: '6px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600, color: '#1f2937' }}>{award.title}</span>
            {award.organization && <span style={{ fontSize: '11px', color: accentColor }}> – {award.organization}</span>}
            {award.date && <span style={{ fontSize: '10px', color: '#6b7280', marginLeft: '8px' }}>{award.date}</span>}
          </div>
        ))}
      </Section>
    ) : null,

    volunteerExperience: () => resume.volunteerExperience.length > 0 && sectionVisibility.volunteerExperience ? (
      <Section title="Volunteer Experience" accentColor={accentColor}>
        {resume.volunteerExperience.map((vol) => (
          <div key={vol.id} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#111827', margin: 0 }}>{vol.role}</h3>
              <span style={{ fontSize: '11px', color: '#6b7280' }}>
                {vol.startDate}{vol.startDate && vol.endDate && ' – '}{vol.endDate}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: accentColor, margin: '1px 0', fontWeight: 500 }}>{vol.organization}</p>
            {vol.description && <p style={{ fontSize: baseFontSize, color: '#4b5563', margin: '4px 0', lineHeight }}>{vol.description}</p>}
          </div>
        ))}
      </Section>
    ) : null,

    customSections: () => resume.customSections.length > 0 && sectionVisibility.customSections ? (
      <>
        {resume.customSections.map((section) => (
          <Section key={section.id} title={section.title} accentColor={accentColor}>
            {section.items.map((item) => (
              <div key={item.id} style={{ marginBottom: '6px' }}>
                {item.content && <p style={{ fontSize: baseFontSize, color: '#374151', fontWeight: 500 }}>{item.content}</p>}
                {item.bullets.filter(b => b.trim()).length > 0 && (
                  <ul style={{ margin: '2px 0 0 0', paddingLeft: '16px', listStyle: 'disc' }}>
                    {item.bullets.filter(b => b.trim()).map((b, i) => (
                      <li key={i} style={{ fontSize: baseFontSize, color: '#374151', lineHeight }}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        ))}
      </>
    ) : null,
  };

  // Contact info items
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
        fontFamily: settings.fontFamily,
        fontSize: baseFontSize,
        lineHeight,
        padding: marginMap[settings.margins],
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: sectionGap }}>
        {info.fullName && (
          <h1 style={{
            fontSize: `${settings.headingSize + 4}px`,
            fontWeight: 700,
            color: '#111827',
            margin: '0 0 4px 0',
            letterSpacing: '0.5px',
          }}>
            {info.fullName}
          </h1>
        )}
        {info.professionalTitle && (
          <p style={{
            fontSize: '13px',
            color: accentColor,
            fontWeight: 500,
            margin: '0 0 8px 0',
          }}>
            {info.professionalTitle}
          </p>
        )}
        {contactItems.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            fontSize: '10px',
            color: '#6b7280',
          }}>
            {contactItems.map((item, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <item.icon size={10} />
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

// Section component
function Section({
  title,
  accentColor,
  children,
}: {
  title: string;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2
        style={{
          fontSize: '14px',
          fontWeight: 700,
          color: '#111827',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          borderBottom: `2px solid ${accentColor}`,
          paddingBottom: '4px',
          marginBottom: '8px',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
