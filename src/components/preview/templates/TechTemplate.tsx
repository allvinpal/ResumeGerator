import type { Resume } from '../../../types/resume';
import { Mail, Phone, MapPin, Link2, Globe, Terminal } from 'lucide-react';

interface TemplateProps {
  resume: Resume;
}

export default function TechTemplate({ resume }: TemplateProps) {
  const { personalInfo: info, settings, sectionVisibility, sectionOrder } = resume;
  const accentColor = settings.accentColor || '#0284c7';

  const baseFontSize = '11px';
  const lineHeight = 1.45;

  const renderSectionMap: Record<string, () => React.ReactNode> = {
    summary: () => resume.summary && sectionVisibility.summary ? (
      <TechSection title="About" icon={<Terminal size={12} />} accentColor={accentColor}>
        <p style={{ fontSize: baseFontSize, lineHeight, color: '#334155' }}>
          {resume.summary}
        </p>
      </TechSection>
    ) : null,

    skills: () => resume.skills.length > 0 && sectionVisibility.skills ? (
      <TechSection title="Technical Stack" accentColor={accentColor}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {resume.skills.filter(cat => cat.skills.length > 0).map((cat) => (
            <div key={cat.id}>
              <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#0f172a', marginRight: '6px' }}>{cat.name}:</span>
              <span style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '4px' }}>
                {cat.skills.map(s => (
                  <span
                    key={s}
                    style={{
                      fontSize: '10px',
                      backgroundColor: '#f1f5f9',
                      color: '#0f172a',
                      padding: '1px 6px',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </TechSection>
    ) : null,

    experience: () => resume.experience.length > 0 && sectionVisibility.experience ? (
      <TechSection title="Experience" accentColor={accentColor}>
        {resume.experience.map((exp) => (
          <div key={exp.id} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>{exp.jobTitle}</span>
              <span style={{ fontSize: '10.5px', color: '#64748b', fontFamily: 'monospace' }}>
                {exp.startMonth && `${exp.startMonth} `}{exp.startYear}{exp.startYear && ' – '}
                {exp.currentlyWorking ? 'Present' : `${exp.endMonth ? `${exp.endMonth} ` : ''}${exp.endYear}`}
              </span>
            </div>
            <p style={{ fontSize: '11px', color: accentColor, margin: '1px 0 4px 0', fontWeight: 600 }}>
              {exp.company}{exp.location ? ` // ${exp.location}` : ''}
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
      </TechSection>
    ) : null,

    projects: () => resume.projects.length > 0 && sectionVisibility.projects ? (
      <TechSection title="Projects & Open Source" accentColor={accentColor}>
        {resume.projects.map((proj) => (
          <div key={proj.id} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>{proj.name}</span>
              <span style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>{proj.startDate}{proj.startDate && proj.endDate && ' – '}{proj.endDate}</span>
            </div>
            {proj.technologies.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', margin: '2px 0 4px 0' }}>
                {proj.technologies.map(t => (
                  <span key={t} style={{ fontSize: '9px', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '1px 5px', borderRadius: '3px' }}>
                    {t}
                  </span>
                ))}
              </div>
            )}
            {proj.description && <p style={{ fontSize: baseFontSize, color: '#334155', margin: '2px 0' }}>{proj.description}</p>}
            {proj.achievements.filter(a => a.trim()).length > 0 && (
              <ul style={{ margin: '2px 0 0 0', paddingLeft: '16px', listStyle: 'disc' }}>
                {proj.achievements.filter(a => a.trim()).map((ach, i) => (
                  <li key={i} style={{ fontSize: baseFontSize, color: '#1e293b', marginBottom: '2px' }}>{ach}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </TechSection>
    ) : null,

    education: () => resume.education.length > 0 && sectionVisibility.education ? (
      <TechSection title="Education" accentColor={accentColor}>
        {resume.education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>{edu.degree}</span>
              <span style={{ fontSize: '10.5px', color: '#64748b', fontFamily: 'monospace' }}>{edu.startYear}{edu.startYear && edu.endYear && ' – '}{edu.endYear}</span>
            </div>
            <p style={{ fontSize: '11px', color: '#475569', margin: '1px 0' }}>{edu.university}</p>
          </div>
        ))}
      </TechSection>
    ) : null,

    certifications: () => resume.certifications.length > 0 && sectionVisibility.certifications ? (
      <TechSection title="Certifications" accentColor={accentColor}>
        {resume.certifications.map((cert) => (
          <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600, color: '#0f172a' }}>{cert.name}</span>
            <span style={{ fontSize: '10.5px', color: '#64748b' }}>{cert.date}</span>
          </div>
        ))}
      </TechSection>
    ) : null,

    achievements: () => resume.achievements.length > 0 && sectionVisibility.achievements ? (
      <TechSection title="Achievements" accentColor={accentColor}>
        {resume.achievements.map((ach) => (
          <div key={ach.id} style={{ marginBottom: '3px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600, color: '#0f172a' }}>{ach.title}</span>
            {ach.description && <span style={{ fontSize: baseFontSize, color: '#475569' }}> — {ach.description}</span>}
          </div>
        ))}
      </TechSection>
    ) : null,

    languages: () => resume.languages.length > 0 && sectionVisibility.languages ? (
      <TechSection title="Languages" accentColor={accentColor}>
        <p style={{ fontSize: baseFontSize, color: '#334155' }}>
          {resume.languages.map(l => `${l.language} (${l.proficiency})`).join(' // ')}
        </p>
      </TechSection>
    ) : null,

    awards: () => resume.awards.length > 0 && sectionVisibility.awards ? (
      <TechSection title="Awards" accentColor={accentColor}>
        {resume.awards.map((award) => (
          <div key={award.id} style={{ marginBottom: '3px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600 }}>{award.title}</span>
            {award.organization && <span> // {award.organization}</span>}
          </div>
        ))}
      </TechSection>
    ) : null,

    volunteerExperience: () => resume.volunteerExperience.length > 0 && sectionVisibility.volunteerExperience ? (
      <TechSection title="Volunteer" accentColor={accentColor}>
        {resume.volunteerExperience.map((vol) => (
          <div key={vol.id} style={{ marginBottom: '4px' }}>
            <span style={{ fontSize: baseFontSize, fontWeight: 600 }}>{vol.role}</span> — {vol.organization}
          </div>
        ))}
      </TechSection>
    ) : null,

    customSections: () => resume.customSections.length > 0 && sectionVisibility.customSections ? (
      <>
        {resume.customSections.map((cs) => (
          <TechSection key={cs.id} title={cs.title} accentColor={accentColor}>
            {cs.items.map((item) => (
              <div key={item.id} style={{ marginBottom: '4px' }}>
                {item.content && <p style={{ fontSize: baseFontSize }}>{item.content}</p>}
              </div>
            ))}
          </TechSection>
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
    info.githubUrl && { icon: Link2, text: 'github' },
    info.linkedinUrl && { icon: Link2, text: 'linkedin' },
    info.portfolioUrl && { icon: Globe, text: 'portfolio' },
  ].filter(Boolean) as { icon: any; text: string }[];

  return (
    <div
      className="resume-page"
      style={{
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: baseFontSize,
        lineHeight,
        padding: '16mm 18mm',
        color: '#0f172a',
      }}
    >
      {/* Tech Header */}
      <div style={{ marginBottom: '14px', borderLeft: `4px solid ${accentColor}`, paddingLeft: '12px' }}>
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
            fontFamily: 'monospace',
            fontWeight: 600,
            margin: '0 0 6px 0',
          }}>
            &lt;{info.professionalTitle} /&gt;
          </p>
        )}
        {contactItems.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '10px',
            color: '#64748b',
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

function TechSection({
  title,
  icon,
  accentColor,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', borderBottom: `1px solid ${accentColor}`, paddingBottom: '3px', marginBottom: '6px' }}>
        {icon}
        <h2
          style={{
            fontSize: '11.5px',
            fontWeight: 700,
            color: '#0f172a',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
