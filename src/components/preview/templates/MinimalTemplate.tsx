import type { Resume } from '../../../types/resume';

interface TemplateProps {
  resume: Resume;
}

export default function MinimalTemplate({ resume }: TemplateProps) {
  const { personalInfo: info, settings, sectionVisibility, sectionOrder } = resume;
  const accentColor = settings.accentColor || '#374151';

  const baseFontSize = '11px';
  const lineHeight = 1.5;

  const renderSectionMap: Record<string, () => React.ReactNode> = {
    summary: () => resume.summary && sectionVisibility.summary ? (
      <MinimalSection title="About">
        <p style={{ fontSize: baseFontSize, lineHeight, color: '#4b5563' }}>
          {resume.summary}
        </p>
      </MinimalSection>
    ) : null,

    experience: () => resume.experience.length > 0 && sectionVisibility.experience ? (
      <MinimalSection title="Experience">
        {resume.experience.map((exp) => (
          <div key={exp.id} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#111827' }}>{exp.jobTitle}</span>
              <span style={{ fontSize: '10px', color: '#9ca3af' }}>
                {exp.startMonth && `${exp.startMonth} `}{exp.startYear}{exp.startYear && ' — '}
                {exp.currentlyWorking ? 'Present' : `${exp.endMonth ? `${exp.endMonth} ` : ''}${exp.endYear}`}
              </span>
            </div>
            <p style={{ fontSize: '11px', color: '#6b7280', margin: '1px 0 4px 0' }}>{exp.company}{exp.location ? ` / ${exp.location}` : ''}</p>
            {exp.description && <p style={{ fontSize: baseFontSize, color: '#4b5563', margin: '3px 0' }}>{exp.description}</p>}
            {exp.achievements.filter(a => a.trim()).length > 0 && (
              <ul style={{ margin: '3px 0 0 0', paddingLeft: '14px', listStyle: 'square' }}>
                {exp.achievements.filter(a => a.trim()).map((ach, i) => (
                  <li key={i} style={{ fontSize: baseFontSize, color: '#4b5563', marginBottom: '2px' }}>{ach}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </MinimalSection>
    ) : null,

    education: () => resume.education.length > 0 && sectionVisibility.education ? (
      <MinimalSection title="Education">
        {resume.education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#111827' }}>{edu.degree}</span>
              <span style={{ fontSize: '10px', color: '#9ca3af' }}>{edu.startYear}{edu.startYear && edu.endYear && ' — '}{edu.endYear}</span>
            </div>
            <p style={{ fontSize: '11px', color: '#6b7280', margin: '1px 0' }}>{edu.university}</p>
            {edu.gpa && <p style={{ fontSize: '10.5px', color: '#9ca3af', margin: '1px 0' }}>GPA {edu.gpa}</p>}
          </div>
        ))}
      </MinimalSection>
    ) : null,

    skills: () => resume.skills.length > 0 && sectionVisibility.skills ? (
      <MinimalSection title="Skills">
        {resume.skills.filter(cat => cat.skills.length > 0).map((cat) => (
          <div key={cat.id} style={{ marginBottom: '4px' }}>
            <span style={{ fontSize: baseFontSize, color: '#9ca3af' }}>{cat.name} / </span>
            <span style={{ fontSize: baseFontSize, color: '#374151' }}>{cat.skills.join(', ')}</span>
          </div>
        ))}
      </MinimalSection>
    ) : null,

    projects: () => resume.projects.length > 0 && sectionVisibility.projects ? (
      <MinimalSection title="Projects">
        {resume.projects.map((proj) => (
          <div key={proj.id} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#111827' }}>{proj.name}</span>
              <span style={{ fontSize: '10px', color: '#9ca3af' }}>{proj.startDate}{proj.startDate && proj.endDate && ' — '}{proj.endDate}</span>
            </div>
            {proj.technologies.length > 0 && (
              <p style={{ fontSize: '10px', color: '#9ca3af', margin: '1px 0' }}>{proj.technologies.join(' · ')}</p>
            )}
            {proj.description && <p style={{ fontSize: baseFontSize, color: '#4b5563', margin: '2px 0' }}>{proj.description}</p>}
          </div>
        ))}
      </MinimalSection>
    ) : null,

    certifications: () => resume.certifications.length > 0 && sectionVisibility.certifications ? (
      <MinimalSection title="Certifications">
        {resume.certifications.map((cert) => (
          <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
            <span style={{ fontSize: baseFontSize, color: '#374151' }}>{cert.name}</span>
            <span style={{ fontSize: '10px', color: '#9ca3af' }}>{cert.date}</span>
          </div>
        ))}
      </MinimalSection>
    ) : null,

    achievements: () => resume.achievements.length > 0 && sectionVisibility.achievements ? (
      <MinimalSection title="Achievements">
        {resume.achievements.map((ach) => (
          <div key={ach.id} style={{ marginBottom: '3px' }}>
            <span style={{ fontSize: baseFontSize, color: '#111827', fontWeight: 500 }}>{ach.title}</span>
            {ach.description && <span style={{ fontSize: baseFontSize, color: '#6b7280' }}> — {ach.description}</span>}
          </div>
        ))}
      </MinimalSection>
    ) : null,

    languages: () => resume.languages.length > 0 && sectionVisibility.languages ? (
      <MinimalSection title="Languages">
        <p style={{ fontSize: baseFontSize, color: '#4b5563' }}>
          {resume.languages.map(l => `${l.language} (${l.proficiency})`).join(' · ')}
        </p>
      </MinimalSection>
    ) : null,

    awards: () => resume.awards.length > 0 && sectionVisibility.awards ? (
      <MinimalSection title="Awards">
        {resume.awards.map((award) => (
          <div key={award.id} style={{ marginBottom: '3px' }}>
            <span style={{ fontSize: baseFontSize, color: '#111827' }}>{award.title}</span>
            {award.organization && <span style={{ fontSize: baseFontSize, color: '#6b7280' }}>, {award.organization}</span>}
          </div>
        ))}
      </MinimalSection>
    ) : null,

    volunteerExperience: () => resume.volunteerExperience.length > 0 && sectionVisibility.volunteerExperience ? (
      <MinimalSection title="Volunteer">
        {resume.volunteerExperience.map((vol) => (
          <div key={vol.id} style={{ marginBottom: '4px' }}>
            <span style={{ fontSize: baseFontSize, color: '#111827' }}>{vol.role}</span> — {vol.organization}
          </div>
        ))}
      </MinimalSection>
    ) : null,

    customSections: () => resume.customSections.length > 0 && sectionVisibility.customSections ? (
      <>
        {resume.customSections.map((cs) => (
          <MinimalSection key={cs.id} title={cs.title}>
            {cs.items.map((item) => (
              <div key={item.id} style={{ marginBottom: '4px' }}>
                {item.content && <p style={{ fontSize: baseFontSize, color: '#4b5563' }}>{item.content}</p>}
              </div>
            ))}
          </MinimalSection>
        ))}
      </>
    ) : null,
  };

  const contactList = [
    info.email,
    info.phone,
    [info.city, info.state, info.country].filter(Boolean).join(', '),
    info.linkedinUrl,
    info.githubUrl,
    info.portfolioUrl,
  ].filter(Boolean);

  return (
    <div
      className="resume-page"
      style={{
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: baseFontSize,
        lineHeight,
        padding: '20mm 22mm',
        color: '#111827',
      }}
    >
      {/* Minimal Header */}
      <div style={{ marginBottom: '22px' }}>
        {info.fullName && (
          <h1 style={{
            fontSize: '22px',
            fontWeight: 300,
            color: '#111827',
            margin: '0 0 4px 0',
            letterSpacing: '-0.5px',
          }}>
            {info.fullName}
          </h1>
        )}
        {info.professionalTitle && (
          <p style={{ fontSize: '12px', color: accentColor, margin: '0 0 8px 0', fontWeight: 500 }}>
            {info.professionalTitle}
          </p>
        )}
        {contactList.length > 0 && (
          <p style={{ fontSize: '10px', color: '#9ca3af', margin: 0, letterSpacing: '0.2px' }}>
            {contactList.join('   /   ')}
          </p>
        )}
      </div>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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

function MinimalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2
        style={{
          fontSize: '10px',
          fontWeight: 600,
          color: '#9ca3af',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          marginBottom: '6px',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
