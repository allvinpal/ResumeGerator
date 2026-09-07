import type { Resume } from '../../../types/resume';
import { Mail, Phone, MapPin, Link2, Globe } from 'lucide-react';

interface TemplateProps {
  resume: Resume;
}

export default function CorporateTemplate({ resume }: TemplateProps) {
  const { personalInfo: info, settings, sectionVisibility, sectionOrder } = resume;
  const accentColor = settings.accentColor || '#1e3a8a';

  const baseFontSize = '11px';
  const lineHeight = 1.45;

  const renderSectionMap: Record<string, () => React.ReactNode> = {
    summary: () => resume.summary && sectionVisibility.summary ? (
      <CorporateSection title="Executive Summary" accentColor={accentColor}>
        <p style={{ fontSize: baseFontSize, lineHeight, color: '#334155' }}>
          {resume.summary}
        </p>
      </CorporateSection>
    ) : null,

    experience: () => resume.experience.length > 0 && sectionVisibility.experience ? (
      <CorporateSection title="Professional Background" accentColor={accentColor}>
        {resume.experience.map((exp) => (
          <div key={exp.id} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#1e293b' }}>{exp.jobTitle}</span>
              <span style={{ fontSize: '10.5px', color: '#64748b' }}>
                {exp.startMonth && `${exp.startMonth} `}{exp.startYear}{exp.startYear && ' – '}
                {exp.currentlyWorking ? 'Present' : `${exp.endMonth ? `${exp.endMonth} ` : ''}${exp.endYear}`}
              </span>
            </div>
            <p style={{ fontSize: '11px', color: accentColor, margin: '1px 0 3px 0', fontWeight: 600 }}>
              {exp.company}{exp.location ? ` | ${exp.location}` : ''}
            </p>
            {exp.description && <p style={{ fontSize: baseFontSize, color: '#334155', margin: '2px 0' }}>{exp.description}</p>}
            {exp.achievements.filter(a => a.trim()).length > 0 && (
              <ul style={{ margin: '2px 0 0 0', paddingLeft: '16px', listStyle: 'disc' }}>
                {exp.achievements.filter(a => a.trim()).map((ach, i) => (
                  <li key={i} style={{ fontSize: baseFontSize, color: '#1e293b', marginBottom: '2px' }}>{ach}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </CorporateSection>
    ) : null,

    education: () => resume.education.length > 0 && sectionVisibility.education ? (
      <CorporateSection title="Academic History" accentColor={accentColor}>
        {resume.education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>{edu.degree}</span>
              <span style={{ fontSize: '10.5px', color: '#64748b' }}>{edu.startYear}{edu.startYear && edu.endYear && ' – '}{edu.endYear}</span>
            </div>
            <p style={{ fontSize: '11px', color: '#475569', margin: '1px 0' }}>{edu.university}{edu.location ? ` | ${edu.location}` : ''}</p>
          </div>
        ))}
      </CorporateSection>
    ) : null,

    skills: () => resume.skills.length > 0 && sectionVisibility.skills ? (
      <CorporateSection title="Expertise & Skills" accentColor={accentColor}>
        {resume.skills.filter(cat => cat.skills.length > 0).map((cat) => (
          <div key={cat.id} style={{ marginBottom: '4px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600, color: '#1e293b' }}>{cat.name}: </span>
            <span style={{ fontSize: baseFontSize, color: '#475569' }}>{cat.skills.join(', ')}</span>
          </div>
        ))}
      </CorporateSection>
    ) : null,

    projects: () => resume.projects.length > 0 && sectionVisibility.projects ? (
      <CorporateSection title="Key Initiatives" accentColor={accentColor}>
        {resume.projects.map((proj) => (
          <div key={proj.id} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>{proj.name}</span>
              <span style={{ fontSize: '10.5px', color: '#64748b' }}>{proj.startDate}{proj.startDate && proj.endDate && ' – '}{proj.endDate}</span>
            </div>
            {proj.description && <p style={{ fontSize: baseFontSize, color: '#334155', margin: '2px 0' }}>{proj.description}</p>}
          </div>
        ))}
      </CorporateSection>
    ) : null,

    certifications: () => resume.certifications.length > 0 && sectionVisibility.certifications ? (
      <CorporateSection title="Certifications" accentColor={accentColor}>
        {resume.certifications.map((cert) => (
          <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600, color: '#1e293b' }}>
              {cert.name}{cert.issuingOrganization ? ` — ${cert.issuingOrganization}` : ''}
            </span>
            <span style={{ fontSize: '10.5px', color: '#64748b' }}>{cert.date}</span>
          </div>
        ))}
      </CorporateSection>
    ) : null,

    achievements: () => resume.achievements.length > 0 && sectionVisibility.achievements ? (
      <CorporateSection title="Achievements" accentColor={accentColor}>
        {resume.achievements.map((ach) => (
          <div key={ach.id} style={{ marginBottom: '3px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600, color: '#1e293b' }}>{ach.title}</span>
            {ach.description && <span style={{ fontSize: baseFontSize, color: '#475569' }}> — {ach.description}</span>}
          </div>
        ))}
      </CorporateSection>
    ) : null,

    languages: () => resume.languages.length > 0 && sectionVisibility.languages ? (
      <CorporateSection title="Languages" accentColor={accentColor}>
        <p style={{ fontSize: baseFontSize, color: '#334155' }}>
          {resume.languages.map(l => `${l.language} (${l.proficiency})`).join(' • ')}
        </p>
      </CorporateSection>
    ) : null,

    awards: () => resume.awards.length > 0 && sectionVisibility.awards ? (
      <CorporateSection title="Honors & Awards" accentColor={accentColor}>
        {resume.awards.map((award) => (
          <div key={award.id} style={{ marginBottom: '3px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600 }}>{award.title}</span>
            {award.organization && <span> — {award.organization}</span>}
          </div>
        ))}
      </CorporateSection>
    ) : null,

    volunteerExperience: () => resume.volunteerExperience.length > 0 && sectionVisibility.volunteerExperience ? (
      <CorporateSection title="Community Involvement" accentColor={accentColor}>
        {resume.volunteerExperience.map((vol) => (
          <div key={vol.id} style={{ marginBottom: '4px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600 }}>{vol.role}</span> — {vol.organization}
          </div>
        ))}
      </CorporateSection>
    ) : null,

    customSections: () => resume.customSections.length > 0 && sectionVisibility.customSections ? (
      <>
        {resume.customSections.map((cs) => (
          <CorporateSection key={cs.id} title={cs.title} accentColor={accentColor}>
            {cs.items.map((item) => (
              <div key={item.id} style={{ marginBottom: '4px' }}>
                {item.content && <p style={{ fontSize: baseFontSize }}>{item.content}</p>}
              </div>
            ))}
          </CorporateSection>
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
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: baseFontSize,
        lineHeight,
        padding: '16mm 20mm',
        color: '#1e293b',
      }}
    >
      {/* Header with left-border block */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: `2px solid ${accentColor}`, paddingBottom: '12px', marginBottom: '14px' }}>
        <div>
          {info.fullName && (
            <h1 style={{
              fontSize: '22px',
              fontWeight: 800,
              color: '#0f172a',
              margin: '0 0 2px 0',
            }}>
              {info.fullName}
            </h1>
          )}
          {info.professionalTitle && (
            <p style={{
              fontSize: '12.5px',
              color: accentColor,
              fontWeight: 600,
              margin: 0,
            }}>
              {info.professionalTitle}
            </p>
          )}
        </div>
        {contactItems.length > 0 && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '2px',
            fontSize: '9.5px',
            color: '#64748b',
          }}>
            {contactItems.map((item, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {item.text}
                <item.icon size={10} />
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
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

function CorporateSection({ title, accentColor, children }: { title: string; accentColor: string; children: React.ReactNode }) {
  return (
    <div>
      <h2
        style={{
          fontSize: '12px',
          fontWeight: 700,
          color: accentColor,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          borderBottom: '1px solid #cbd5e1',
          paddingBottom: '3px',
          marginBottom: '6px',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
