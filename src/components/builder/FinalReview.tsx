import { useResumeStore } from '../../store/resumeStore';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Download, Printer, CheckCircle, AlertCircle } from 'lucide-react';

export default function FinalReview() {
  const { resume } = useResumeStore();
  const info = resume.personalInfo;

  const checks = [
    { label: 'Full Name', ok: !!info.fullName.trim(), critical: true },
    { label: 'Email Address', ok: !!info.email.trim(), critical: true },
    { label: 'Phone Number', ok: !!info.phone.trim(), critical: false },
    { label: 'Professional Summary', ok: !!resume.summary.trim(), critical: false },
    { label: 'Work Experience', ok: resume.experience.length > 0, critical: false },
    { label: 'Education', ok: resume.education.length > 0, critical: false },
    { label: 'Skills', ok: resume.skills.length > 0 && resume.skills.some(s => s.skills.length > 0), critical: false },
    { label: 'LinkedIn URL', ok: !!info.linkedinUrl.trim(), critical: false },
  ];

  const completedCount = checks.filter(c => c.ok).length;
  const percentage = Math.round((completedCount / checks.length) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-secondary-900">Final Review</h2>
        <p className="text-sm text-secondary-500 mt-1">Review your resume before downloading.</p>
      </div>

      {/* Completion score */}
      <div className="bg-secondary-50 rounded-xl p-5 border border-secondary-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-secondary-800">Resume Completeness</h3>
          <Badge variant={percentage >= 80 ? 'success' : percentage >= 50 ? 'warning' : 'danger'}>
            {percentage}%
          </Badge>
        </div>
        <div className="w-full bg-secondary-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              percentage >= 80 ? 'bg-green-500' : percentage >= 50 ? 'bg-amber-500' : 'bg-red-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-2">
        {checks.map((check) => (
          <div
            key={check.label}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg ${
              check.ok ? 'bg-green-50' : check.critical ? 'bg-red-50' : 'bg-amber-50'
            }`}
          >
            {check.ok ? (
              <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
            ) : (
              <AlertCircle size={18} className={`flex-shrink-0 ${check.critical ? 'text-red-500' : 'text-amber-500'}`} />
            )}
            <span className={`text-sm ${check.ok ? 'text-green-700' : check.critical ? 'text-red-700' : 'text-amber-700'}`}>
              {check.label}
            </span>
            {check.ok ? (
              <span className="ml-auto text-xs text-green-500">Complete</span>
            ) : (
              <span className={`ml-auto text-xs ${check.critical ? 'text-red-500' : 'text-amber-500'}`}>
                {check.critical ? 'Required' : 'Recommended'}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg border border-secondary-200 p-3 text-center">
          <p className="text-2xl font-bold text-secondary-900">{resume.experience.length}</p>
          <p className="text-xs text-secondary-500">Experiences</p>
        </div>
        <div className="bg-white rounded-lg border border-secondary-200 p-3 text-center">
          <p className="text-2xl font-bold text-secondary-900">{resume.education.length}</p>
          <p className="text-xs text-secondary-500">Education</p>
        </div>
        <div className="bg-white rounded-lg border border-secondary-200 p-3 text-center">
          <p className="text-2xl font-bold text-secondary-900">
            {resume.skills.reduce((sum, cat) => sum + cat.skills.length, 0)}
          </p>
          <p className="text-xs text-secondary-500">Skills</p>
        </div>
        <div className="bg-white rounded-lg border border-secondary-200 p-3 text-center">
          <p className="text-2xl font-bold text-secondary-900">{resume.projects.length}</p>
          <p className="text-xs text-secondary-500">Projects</p>
        </div>
      </div>

      {/* Download Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-secondary-200">
        <Button size="lg" icon={<Download size={18} />} fullWidth>
          Download PDF
        </Button>
        <Button variant="outline" size="lg" icon={<Download size={18} />} fullWidth>
          Download DOCX
        </Button>
        <Button
          variant="ghost"
          size="lg"
          icon={<Printer size={18} />}
          fullWidth
          onClick={() => window.print()}
        >
          Print
        </Button>
      </div>
    </div>
  );
}
