import type { Resume } from '../../../types/resume';
import { Mail, Phone, MapPin, Link2, Globe } from 'lucide-react';

interface TemplateProps {
  resume: Resume;
}

export default function ExecutiveTemplate({ resume }: TemplateProps) {
  const { personalInfo: info, settings, sectionVisibility, sectionOrder } = resume;
  const accentColor = settings.accentColor || '#0f172a';

  const baseFontSize = '11px';
  const lineHeight = 1.45;

  const renderSectionMap: Record<string, () => React.ReactNode> = {
    summary: () => resume.summary && sectionVisibility.summary ? (
      <ExecutiveSection title="Executive Profile" accentColor={accentColor}>
        <p style={{ fontSize: baseFontSize, lineHeight, color: '#334155' }}>
          {resume.summary}
        </p>
      </ExecutiveSection>
    ) : null,

    experience: () => resume.experience.length > 0 && sectionVisibility.experience ? (
      <ExecutiveSection title="Career History & Leadership" accentColor={accentColor}>
        {resume.experience.map((exp) => (
          <div key={exp.id} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>{exp.jobTitle}</span>
              <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 600 }}>
                {exp.startMonth && `${exp.startMonth} `}{exp.startYear}{exp.startYear && ' – '}
                {exp.currentlyWorking ? 'Present' : `${exp.endMonth ? `${exp.endMonth} ` : ''}${exp.endYear}`}
              </span>
            </div>
            <p style={{ fontSize: '11.5px', color: accentColor, margin: '1px 0 4px 0', fontWeight: 600 }}>
              {exp.company}{exp.location ? ` | ${exp.location}` : ''}
            </p>
            {exp.description && <p style={{ fontSize: baseFontSize, color: '#334155', margin: '3px 0' }}>{exp.description}</p>}
            {exp.achievements.filter(a => a.trim()).length > 0 && (
              <ul style={{ margin: '3px 0 0 0', paddingLeft: '16px', listStyle: 'disc' }}>
                {exp.achievements.filter(a => a.trim()).map((ach, i) => (
                  <li key={i} style={{ fontSize: baseFontSize, color: '#1e293b', marginBottom: '2px' }}>{ach}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ExecutiveSection>
    ) : null,

    education: () => resume.education.length > 0 && sectionVisibility.education ? (
      <ExecutiveSection title="Education & Credentials" accentColor={accentColor}>
        {resume.education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>{edu.degree}</span>
              <span style={{ fontSize: '10.5px', color: '#64748b' }}>{edu.startYear}{edu.startYear && edu.endYear && ' – '}{edu.endYear}</span>
            </div>
            <p style={{ fontSize: '11px', color: '#475569', margin: '1px 0' }}>{edu.university}{edu.location ? ` | ${edu.location}` : ''}</p>
          </div>
        ))}
      </ExecutiveSection>
    ) : null,

    skills: () => resume.skills.length > 0 && sectionVisibility.skills ? (
      <ExecutiveSection title="Core Competencies" accentColor={accentColor}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
          {resume.skills.filter(cat => cat.skills.length > 0).map((cat) => (
            <div key={cat.id}>
              <strong style={{ fontSize: baseFontSize, color: '#0f172a' }}>{cat.name}: </strong>
              <span style={{ fontSize: baseFontSize, color: '#334155' }}>{cat.skills.join(', ')}</span>
            </div>
          ))}
        </div>
      </ExecutiveSection>
    ) : null,

    projects: () => resume.projects.length > 0 && sectionVisibility.projects ? (
      <ExecutiveSection title="Strategic Initiatives" accentColor={accentColor}>
        {resume.projects.map((proj) => (
          <div key={proj.id} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>{proj.name}</span>
              <span style={{ fontSize: '10.5px', color: '#64748b' }}>{proj.startDate}{proj.startDate && proj.endDate && ' – '}{proj.endDate}</span>
            </div>
            {proj.description && <p style={{ fontSize: baseFontSize, color: '#334155', margin: '2px 0' }}>{proj.description}</p>}
          </div>
        ))}
      </ExecutiveSection>
    ) : null,

    certifications: () => resume.certifications.length > 0 && sectionVisibility.certifications ? (
      <ExecutiveSection title="Board & Executive Certifications" accentColor={accentColor}>
        {resume.certifications.map((cert) => (
          <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600, color: '#0f172a' }}>
              {cert.name}{cert.issuingOrganization ? ` — ${cert.issuingOrganization}` : ''}
            </span>
            <span style={{ fontSize: '10.5px', color: '#64748b' }}>{cert.date}</span>
          </div>
        ))}
      </ExecutiveSection>
    ) : null,

    achievements: () => resume.achievements.length > 0 && sectionVisibility.achievements ? (
      <ExecutiveSection title="Key Accomplishments" accentColor={accentColor}>
        {resume.achievements.map((ach) => (
          <div key={ach.id} style={{ marginBottom: '3px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600, color: '#0f172a' }}>{ach.title}</span>
            {ach.description && <span style={{ fontSize: baseFontSize, color: '#475569' }}> — {ach.description}</span>}
          </div>
        ))}
      </ExecutiveSection>
    ) : null,

    languages: () => resume.languages.length > 0 && sectionVisibility.languages ? (
      <ExecutiveSection title="Languages" accentColor={accentColor}>
        <p style={{ fontSize: baseFontSize, color: '#334155' }}>
          {resume.languages.map(l => `${l.language} (${l.proficiency})`).join(' • ')}
        </p>
      </ExecutiveSection>
    ) : null,

    awards: () => resume.awards.length > 0 && sectionVisibility.awards ? (
      <ExecutiveSection title="Honors" accentColor={accentColor}>
        {resume.awards.map((award) => (
          <div key={award.id} style={{ marginBottom: '3px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600 }}>{award.title}</span>
            {award.organization && <span> — {award.organization}</span>}
          </div>
        ))}
      </ExecutiveSection>
    ) : null,

    volunteerExperience: () => resume.volunteerExperience.length > 0 && sectionVisibility.volunteerExperience ? (
      <ExecutiveSection title="Community & Board Service" accentColor={accentColor}>
        {resume.volunteerExperience.map((vol) => (
          <div key={vol.id} style={{ marginBottom: '4px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600 }}>{vol.role}</span> — {vol.organization}
          </div>
        ))}
      </ExecutiveSection>
    ) : null,

    customSections: () => resume.customSections.length > 0 && sectionVisibility.customSections ? (
      <>
        {resume.customSections.map((cs) => (
          <ExecutiveSection key={cs.id} title={cs.title} accentColor={accentColor}>
            {cs.items.map((item) => (
              <div key={item.id} style={{ marginBottom: '4px' }}>
                {item.content && <p style={{ fontSize: baseFontSize }}>{item.content}</p>}
              </div>
            ))}
          </ExecutiveSection>
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
        padding: 0,
        color: '#0f172a',
      }}
    >
      {/* Executive Dark Header Banner */}
      <div style={{ backgroundColor: accentColor, color: '#ffffff', padding: '24px 28px', marginBottom: '18px' }}>
        {info.fullName && (
          <h1 style={{
            fontSize: '24px',
            fontWeight: 800,
            color: '#ffffff',
            margin: '0 0 4px 0',
            letterSpacing: '0.5px',
          }}>
            {info.fullName}
          </h1>
        )}
        {info.professionalTitle && (
          <p style={{
            fontSize: '13px',
            color: '#cbd5e1',
            fontWeight: 500,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            margin: '0 0 10px 0',
          }}>
            {info.professionalTitle}
          </p>
        )}
        {contactItems.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            fontSize: '10px',
            color: '#94a3b8',
          }}>
            {contactItems.map((item, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <item.icon size={10} />
                {item.text}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Sections with margin */}
      <div style={{ padding: '0 28px 24px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
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

function ExecutiveSection({ title, accentColor, children }: { title: string; accentColor: string; children: React.ReactNode }) {
  return (
    <div>
      <h2
        style={{
          fontSize: '12.5px',
          fontWeight: 800,
          color: accentColor,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          borderBottom: `2px solid ${accentColor}`,
          paddingBottom: '3px',
          marginBottom: '8px',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
