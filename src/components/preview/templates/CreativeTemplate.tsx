import type { Resume } from '../../../types/resume';
import { Mail, Phone, MapPin, Link2, Globe, Sparkles } from 'lucide-react';

interface TemplateProps {
  resume: Resume;
}

export default function CreativeTemplate({ resume }: TemplateProps) {
  const { personalInfo: info, settings, sectionVisibility, sectionOrder } = resume;
  const accentColor = settings.accentColor || '#7c3aed';

  const baseFontSize = '11px';
  const lineHeight = 1.5;

  const renderSectionMap: Record<string, () => React.ReactNode> = {
    summary: () => resume.summary && sectionVisibility.summary ? (
      <CreativeSection title="Profile" accentColor={accentColor}>
        <p style={{ fontSize: baseFontSize, lineHeight, color: '#374151' }}>
          {resume.summary}
        </p>
      </CreativeSection>
    ) : null,

    experience: () => resume.experience.length > 0 && sectionVisibility.experience ? (
      <CreativeSection title="Work History" accentColor={accentColor}>
        {resume.experience.map((exp) => (
          <div key={exp.id} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>{exp.jobTitle}</span>
              <span style={{ fontSize: '10.5px', color: accentColor, fontWeight: 600 }}>
                {exp.startMonth && `${exp.startMonth} `}{exp.startYear}{exp.startYear && ' – '}
                {exp.currentlyWorking ? 'Present' : `${exp.endMonth ? `${exp.endMonth} ` : ''}${exp.endYear}`}
              </span>
            </div>
            <p style={{ fontSize: '11.5px', color: '#6b7280', margin: '1px 0 3px 0', fontWeight: 500 }}>
              {exp.company}{exp.location ? ` • ${exp.location}` : ''}
            </p>
            {exp.description && <p style={{ fontSize: baseFontSize, color: '#4b5563', margin: '3px 0' }}>{exp.description}</p>}
            {exp.achievements.filter(a => a.trim()).length > 0 && (
              <ul style={{ margin: '3px 0 0 0', paddingLeft: '16px', listStyle: 'disc' }}>
                {exp.achievements.filter(a => a.trim()).map((ach, i) => (
                  <li key={i} style={{ fontSize: baseFontSize, color: '#374151', marginBottom: '2px' }}>{ach}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </CreativeSection>
    ) : null,

    education: () => resume.education.length > 0 && sectionVisibility.education ? (
      <CreativeSection title="Education" accentColor={accentColor}>
        {resume.education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827' }}>{edu.degree}</span>
              <span style={{ fontSize: '10.5px', color: '#6b7280' }}>{edu.startYear}{edu.startYear && edu.endYear && ' – '}{edu.endYear}</span>
            </div>
            <p style={{ fontSize: '11px', color: '#4b5563', margin: '1px 0' }}>{edu.university}{edu.location ? ` • ${edu.location}` : ''}</p>
          </div>
        ))}
      </CreativeSection>
    ) : null,

    skills: () => resume.skills.length > 0 && sectionVisibility.skills ? (
      <CreativeSection title="Skills & Tools" accentColor={accentColor}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {resume.skills.filter(cat => cat.skills.length > 0).map((cat) => (
            <div key={cat.id}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#1f2937', marginRight: '6px' }}>{cat.name}:</span>
              <span style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '4px' }}>
                {cat.skills.map(s => (
                  <span
                    key={s}
                    style={{
                      fontSize: '10px',
                      backgroundColor: `${accentColor}15`,
                      color: accentColor,
                      padding: '1px 7px',
                      borderRadius: '12px',
                      fontWeight: 500,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </CreativeSection>
    ) : null,

    projects: () => resume.projects.length > 0 && sectionVisibility.projects ? (
      <CreativeSection title="Featured Work" accentColor={accentColor}>
        {resume.projects.map((proj) => (
          <div key={proj.id} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827' }}>{proj.name}</span>
              <span style={{ fontSize: '10px', color: '#6b7280' }}>{proj.startDate}{proj.startDate && proj.endDate && ' – '}{proj.endDate}</span>
            </div>
            {proj.description && <p style={{ fontSize: baseFontSize, color: '#4b5563', margin: '2px 0' }}>{proj.description}</p>}
          </div>
        ))}
      </CreativeSection>
    ) : null,

    certifications: () => resume.certifications.length > 0 && sectionVisibility.certifications ? (
      <CreativeSection title="Certifications" accentColor={accentColor}>
        {resume.certifications.map((cert) => (
          <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600, color: '#111827' }}>{cert.name}</span>
            <span style={{ fontSize: '10.5px', color: '#6b7280' }}>{cert.date}</span>
          </div>
        ))}
      </CreativeSection>
    ) : null,

    achievements: () => resume.achievements.length > 0 && sectionVisibility.achievements ? (
      <CreativeSection title="Achievements" accentColor={accentColor}>
        {resume.achievements.map((ach) => (
          <div key={ach.id} style={{ marginBottom: '3px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600, color: '#111827' }}>{ach.title}</span>
            {ach.description && <span style={{ fontSize: baseFontSize, color: '#4b5563' }}> — {ach.description}</span>}
          </div>
        ))}
      </CreativeSection>
    ) : null,

    languages: () => resume.languages.length > 0 && sectionVisibility.languages ? (
      <CreativeSection title="Languages" accentColor={accentColor}>
        <p style={{ fontSize: baseFontSize, color: '#374151' }}>
          {resume.languages.map(l => `${l.language} (${l.proficiency})`).join(' • ')}
        </p>
      </CreativeSection>
    ) : null,

    awards: () => resume.awards.length > 0 && sectionVisibility.awards ? (
      <CreativeSection title="Awards" accentColor={accentColor}>
        {resume.awards.map((award) => (
          <div key={award.id} style={{ marginBottom: '3px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600 }}>{award.title}</span>
            {award.organization && <span> — {award.organization}</span>}
          </div>
        ))}
      </CreativeSection>
    ) : null,

    volunteerExperience: () => resume.volunteerExperience.length > 0 && sectionVisibility.volunteerExperience ? (
      <CreativeSection title="Volunteer" accentColor={accentColor}>
        {resume.volunteerExperience.map((vol) => (
          <div key={vol.id} style={{ marginBottom: '4px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600 }}>{vol.role}</span> — {vol.organization}
          </div>
        ))}
      </CreativeSection>
    ) : null,

    customSections: () => resume.customSections.length > 0 && sectionVisibility.customSections ? (
      <>
        {resume.customSections.map((cs) => (
          <CreativeSection key={cs.id} title={cs.title} accentColor={accentColor}>
            {cs.items.map((item) => (
              <div key={item.id} style={{ marginBottom: '4px' }}>
                {item.content && <p style={{ fontSize: baseFontSize }}>{item.content}</p>}
              </div>
            ))}
          </CreativeSection>
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
        color: '#111827',
      }}
    >
      {/* Creative Header */}
      <div style={{ marginBottom: '18px', textAlign: 'center' }}>
        {info.fullName && (
          <h1 style={{
            fontSize: '24px',
            fontWeight: 800,
            background: `linear-gradient(135deg, ${accentColor}, #2563eb)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 2px 0',
            letterSpacing: '-0.3px',
          }}>
            {info.fullName}
          </h1>
        )}
        {info.professionalTitle && (
          <p style={{
            fontSize: '12px',
            color: '#6b7280',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
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
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <item.icon size={10} />
                {item.text}
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

function CreativeSection({ title, accentColor, children }: { title: string; accentColor: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
        <Sparkles size={12} color={accentColor} />
        <h2
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: '#111827',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            margin: 0,
          }}
        >
          {title}
        </h2>
        <div style={{ flex: 1, height: '1px', backgroundColor: `${accentColor}30`, marginLeft: '6px' }} />
      </div>
      {children}
    </div>
  );
}
