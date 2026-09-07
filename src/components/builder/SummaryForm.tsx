import { useResumeStore } from '../../store/resumeStore';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { Sparkles, Target, Minimize2 } from 'lucide-react';

const SUMMARY_TIPS = [
  'Start with your years of experience and job title',
  'Mention 2-3 key technical skills or areas of expertise',
  'Include a notable achievement with measurable impact',
  'Keep it between 2-4 sentences',
  'Tailor it to the job you\'re applying for',
];

export default function SummaryForm() {
  const { resume, updateSummary } = useResumeStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-secondary-900">Professional Summary</h2>
        <p className="text-sm text-secondary-500 mt-1">
          Write a brief overview of your professional background and key strengths.
        </p>
      </div>

      <Textarea
        label="Summary"
        placeholder="e.g. Results-driven Data Engineer with 4+ years of experience designing scalable data pipelines and cloud-based data infrastructure. Proficient in Python, PySpark, SQL, and cloud platforms (AWS, Azure). Experienced in architecting real-time and batch data processing systems."
        value={resume.summary}
        onChange={(e) => updateSummary(e.target.value)}
        className="min-h-[160px]"
        hint={`${resume.summary.length} characters`}
      />

      {/* AI-assisted buttons (graceful fallback — show tips when no API) */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          icon={<Sparkles size={14} />}
          onClick={() => {
            // Graceful fallback: show helpful tip instead of breaking
            alert('💡 Tip: Start with "[Years] of experience in [field]" and highlight your top 2-3 skills and a key achievement.');
          }}
        >
          Improve Summary
        </Button>
        <Button
          variant="outline"
          size="sm"
          icon={<Target size={14} />}
          onClick={() => {
            alert('💡 ATS Tip: Use industry-standard job titles, include relevant keywords from the job description, and avoid creative formatting or tables.');
          }}
        >
          Make ATS Friendly
        </Button>
        <Button
          variant="outline"
          size="sm"
          icon={<Minimize2 size={14} />}
          onClick={() => {
            alert('💡 Conciseness Tip: Remove filler words like "responsible for," start with strong action verbs, and aim for 2-3 impactful sentences.');
          }}
        >
          Make More Concise
        </Button>
      </div>

      {/* Writing tips */}
      <div className="bg-primary-50 rounded-lg p-4 border border-primary-100">
        <h3 className="text-sm font-medium text-primary-800 mb-2">Writing Tips</h3>
        <ul className="space-y-1.5">
          {SUMMARY_TIPS.map((tip, i) => (
            <li key={i} className="text-xs text-primary-700 flex items-start gap-2">
              <span className="text-primary-400 mt-0.5">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
