import type { Resume } from '../../../types/resume';

interface TemplateProps {
  resume: Resume;
}

export default function ATSTemplate({ resume }: TemplateProps) {
  const { personalInfo: info, sectionVisibility, sectionOrder } = resume;

  const baseFontSize = '11px';
  const lineHeight = 1.45;

  const renderSectionMap: Record<string, () => React.ReactNode> = {
    summary: () => resume.summary && sectionVisibility.summary ? (
      <ATSSection title="Professional Summary">
        <p style={{ fontSize: baseFontSize, lineHeight, color: '#000' }}>
          {resume.summary}
        </p>
      </ATSSection>
    ) : null,

    experience: () => resume.experience.length > 0 && sectionVisibility.experience ? (
      <ATSSection title="Work Experience">
        {resume.experience.map((exp) => (
          <div key={exp.id} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: '12px', color: '#000' }}>{exp.jobTitle}</strong>
              <span style={{ fontSize: '11px', color: '#000' }}>
                {exp.startMonth && `${exp.startMonth} `}{exp.startYear}{exp.startYear && ' – '}
                {exp.currentlyWorking ? 'Present' : `${exp.endMonth ? `${exp.endMonth} ` : ''}${exp.endYear}`}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#333' }}>
              <span>{exp.company}</span>
              <span>{exp.location}</span>
            </div>
            {exp.description && (
              <p style={{ fontSize: baseFontSize, color: '#111', margin: '3px 0' }}>{exp.description}</p>
            )}
            {exp.achievements.filter(a => a.trim()).length > 0 && (
              <ul style={{ margin: '3px 0 0 0', paddingLeft: '18px', listStyle: 'disc' }}>
                {exp.achievements.filter(a => a.trim()).map((ach, i) => (
                  <li key={i} style={{ fontSize: baseFontSize, color: '#000', marginBottom: '2px' }}>{ach}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ATSSection>
    ) : null,

    education: () => resume.education.length > 0 && sectionVisibility.education ? (
      <ATSSection title="Education">
        {resume.education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: '11.5px', color: '#000' }}>{edu.degree}</strong>
              <span style={{ fontSize: '11px', color: '#000' }}>
                {edu.startYear}{edu.startYear && edu.endYear && ' – '}{edu.endYear}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#333' }}>
              <span>{edu.university}</span>
              <span>{edu.location}</span>
            </div>
            {edu.gpa && <p style={{ fontSize: baseFontSize, color: '#111', margin: '1px 0' }}>GPA: {edu.gpa}</p>}
            {edu.relevantCoursework && (
              <p style={{ fontSize: baseFontSize, color: '#111', margin: '1px 0' }}>Relevant Coursework: {edu.relevantCoursework}</p>
            )}
          </div>
        ))}
      </ATSSection>
    ) : null,

    skills: () => resume.skills.length > 0 && sectionVisibility.skills ? (
      <ATSSection title="Skills">
        {resume.skills.filter(cat => cat.skills.length > 0).map((cat) => (
          <div key={cat.id} style={{ marginBottom: '3px' }}>
            <strong style={{ fontSize: baseFontSize, color: '#000' }}>{cat.name}: </strong>
            <span style={{ fontSize: baseFontSize, color: '#111' }}>{cat.skills.join(', ')}</span>
          </div>
        ))}
      </ATSSection>
    ) : null,

    projects: () => resume.projects.length > 0 && sectionVisibility.projects ? (
      <ATSSection title="Projects">
        {resume.projects.map((proj) => (
          <div key={proj.id} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: '11.5px', color: '#000' }}>{proj.name}</strong>
              <span style={{ fontSize: '11px', color: '#000' }}>
                {proj.startDate}{proj.startDate && proj.endDate && ' – '}{proj.endDate}
              </span>
            </div>
            {proj.technologies.length > 0 && (
              <p style={{ fontSize: '10.5px', color: '#333', margin: '1px 0' }}>Technologies: {proj.technologies.join(', ')}</p>
            )}
            {proj.description && <p style={{ fontSize: baseFontSize, color: '#111', margin: '2px 0' }}>{proj.description}</p>}
            {proj.achievements.filter(a => a.trim()).length > 0 && (
              <ul style={{ margin: '2px 0 0 0', paddingLeft: '18px', listStyle: 'disc' }}>
                {proj.achievements.filter(a => a.trim()).map((ach, i) => (
                  <li key={i} style={{ fontSize: baseFontSize, color: '#000', marginBottom: '2px' }}>{ach}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ATSSection>
    ) : null,

    certifications: () => resume.certifications.length > 0 && sectionVisibility.certifications ? (
      <ATSSection title="Certifications">
        {resume.certifications.map((cert) => (
          <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
            <span style={{ fontSize: baseFontSize, color: '#000' }}>
              <strong>{cert.name}</strong>{cert.issuingOrganization ? ` | ${cert.issuingOrganization}` : ''}
            </span>
            <span style={{ fontSize: '11px', color: '#000' }}>{cert.date}</span>
          </div>
        ))}
      </ATSSection>
    ) : null,

    achievements: () => resume.achievements.length > 0 && sectionVisibility.achievements ? (
      <ATSSection title="Achievements">
        {resume.achievements.map((ach) => (
          <div key={ach.id} style={{ marginBottom: '3px' }}>
            <strong style={{ fontSize: baseFontSize }}>{ach.title}</strong>
            {ach.description && <span style={{ fontSize: baseFontSize }}> — {ach.description}</span>}
          </div>
        ))}
      </ATSSection>
    ) : null,

    languages: () => resume.languages.length > 0 && sectionVisibility.languages ? (
      <ATSSection title="Languages">
        <p style={{ fontSize: baseFontSize, color: '#000' }}>
          {resume.languages.map(l => `${l.language} (${l.proficiency})`).join(', ')}
        </p>
      </ATSSection>
    ) : null,

    awards: () => resume.awards.length > 0 && sectionVisibility.awards ? (
      <ATSSection title="Awards">
        {resume.awards.map((award) => (
          <div key={award.id} style={{ marginBottom: '3px' }}>
            <strong style={{ fontSize: baseFontSize }}>{award.title}</strong>
            {award.organization && <span>, {award.organization}</span>}
          </div>
        ))}
      </ATSSection>
    ) : null,

    volunteerExperience: () => resume.volunteerExperience.length > 0 && sectionVisibility.volunteerExperience ? (
      <ATSSection title="Volunteering">
        {resume.volunteerExperience.map((vol) => (
          <div key={vol.id} style={{ marginBottom: '4px' }}>
            <strong style={{ fontSize: baseFontSize }}>{vol.role}</strong> — {vol.organization}
            {vol.description && <p style={{ fontSize: baseFontSize }}>{vol.description}</p>}
          </div>
        ))}
      </ATSSection>
    ) : null,

    customSections: () => resume.customSections.length > 0 && sectionVisibility.customSections ? (
      <>
        {resume.customSections.map((cs) => (
          <ATSSection key={cs.id} title={cs.title}>
            {cs.items.map((item) => (
              <div key={item.id} style={{ marginBottom: '4px' }}>
                {item.content && <p style={{ fontSize: baseFontSize }}>{item.content}</p>}
              </div>
            ))}
          </ATSSection>
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
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: baseFontSize,
        lineHeight,
        padding: '16mm 18mm',
        color: '#000',
      }}
    >
      {/* ATS Header */}
      <div style={{ textAlign: 'center', marginBottom: '14px', borderBottom: '1px solid #000', paddingBottom: '8px' }}>
        {info.fullName && (
          <h1 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#000',
            margin: '0 0 2px 0',
            textTransform: 'uppercase',
          }}>
            {info.fullName}
          </h1>
        )}
        {info.professionalTitle && (
          <p style={{ fontSize: '12px', color: '#000', margin: '0 0 4px 0', fontWeight: 600 }}>
            {info.professionalTitle}
          </p>
        )}
        {contactList.length > 0 && (
          <p style={{ fontSize: '10.5px', color: '#000', margin: 0 }}>
            {contactList.join(' | ')}
          </p>
        )}
      </div>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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

function ATSSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2
        style={{
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#000',
          textTransform: 'uppercase',
          borderBottom: '1px solid #000',
          paddingBottom: '2px',
          marginBottom: '5px',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
