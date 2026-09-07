import { useResumeStore } from '../../store/resumeStore';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Card from '../ui/Card';
import {
  createEmptyExperience,
  MONTHS,
  EMPLOYMENT_TYPES,
} from '../../types/resume';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function ExperienceForm() {
  const { resume, addExperience, updateExperience, removeExperience } = useResumeStore();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(resume.experience.map(e => e.id)));

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAddBullet = (expId: string) => {
    const exp = resume.experience.find((e) => e.id === expId);
    if (exp) {
      updateExperience(expId, { achievements: [...exp.achievements, ''] });
    }
  };

  const handleUpdateBullet = (expId: string, bulletIndex: number, value: string) => {
    const exp = resume.experience.find((e) => e.id === expId);
    if (exp) {
      const newAchievements = [...exp.achievements];
      newAchievements[bulletIndex] = value;
      updateExperience(expId, { achievements: newAchievements });
    }
  };

  const handleRemoveBullet = (expId: string, bulletIndex: number) => {
    const exp = resume.experience.find((e) => e.id === expId);
    if (exp) {
      updateExperience(expId, {
        achievements: exp.achievements.filter((_, i) => i !== bulletIndex),
      });
    }
  };

  const yearOptions = Array.from({ length: 30 }, (_, i) => {
    const year = String(new Date().getFullYear() - i);
    return { value: year, label: year };
  });

  const monthOptions = MONTHS.map((m) => ({ value: m, label: m }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-secondary-900">Work Experience</h2>
          <p className="text-sm text-secondary-500 mt-1">Add your professional experience, most recent first.</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          icon={<Plus size={16} />}
          onClick={() => {
            const exp = createEmptyExperience();
            addExperience(exp);
            setExpandedIds((prev) => new Set(prev).add(exp.id));
          }}
        >
          Add Experience
        </Button>
      </div>

      {resume.experience.length === 0 && (
        <div className="text-center py-12 bg-secondary-50 rounded-xl border-2 border-dashed border-secondary-200">
          <p className="text-secondary-500 mb-3">No work experience added yet</p>
          <Button
            variant="outline"
            size="sm"
            icon={<Plus size={16} />}
            onClick={() => {
              const exp = createEmptyExperience();
              addExperience(exp);
              setExpandedIds((prev) => new Set(prev).add(exp.id));
            }}
          >
            Add Your First Experience
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {resume.experience.map((exp, index) => {
          const isExpanded = expandedIds.has(exp.id);
          return (
            <Card key={exp.id} padding="none" className="overflow-hidden">
              {/* Header */}
              <div
                className="flex items-center gap-3 px-4 py-3 bg-secondary-50 cursor-pointer hover:bg-secondary-100 transition-colors"
                onClick={() => toggleExpand(exp.id)}
              >
                <GripVertical size={16} className="text-secondary-400 drag-handle" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-secondary-900 truncate">
                    {exp.jobTitle || `Experience ${index + 1}`}
                  </p>
                  <p className="text-xs text-secondary-500 truncate">
                    {exp.company}{exp.company && exp.startYear ? ` • ` : ''}{exp.startYear}{exp.currentlyWorking ? ' – Present' : exp.endYear ? ` – ${exp.endYear}` : ''}
                  </p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeExperience(exp.id); }}
                  className="p-1.5 text-secondary-400 hover:text-danger-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  aria-label="Remove experience"
                >
                  <Trash2 size={16} />
                </button>
                {isExpanded ? <ChevronUp size={16} className="text-secondary-400" /> : <ChevronDown size={16} className="text-secondary-400" />}
              </div>

              {/* Body */}
              {isExpanded && (
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Job Title"
                      placeholder="e.g. Data Engineer"
                      value={exp.jobTitle}
                      onChange={(e) => updateExperience(exp.id, { jobTitle: e.target.value })}
                    />
                    <Input
                      label="Company"
                      placeholder="e.g. Tata Consultancy Services"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                    />
                    <Input
                      label="Location"
                      placeholder="e.g. Noida, India"
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                    />
                    <Select
                      label="Employment Type"
                      value={exp.employmentType}
                      onChange={(e) => updateExperience(exp.id, { employmentType: e.target.value as any })}
                      options={EMPLOYMENT_TYPES}
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Select
                      label="Start Month"
                      value={exp.startMonth}
                      onChange={(e) => updateExperience(exp.id, { startMonth: e.target.value })}
                      options={monthOptions}
                      placeholder="Month"
                    />
                    <Select
                      label="Start Year"
                      value={exp.startYear}
                      onChange={(e) => updateExperience(exp.id, { startYear: e.target.value })}
                      options={yearOptions}
                      placeholder="Year"
                    />
                    {!exp.currentlyWorking && (
                      <>
                        <Select
                          label="End Month"
                          value={exp.endMonth}
                          onChange={(e) => updateExperience(exp.id, { endMonth: e.target.value })}
                          options={monthOptions}
                          placeholder="Month"
                        />
                        <Select
                          label="End Year"
                          value={exp.endYear}
                          onChange={(e) => updateExperience(exp.id, { endYear: e.target.value })}
                          options={yearOptions}
                          placeholder="Year"
                        />
                      </>
                    )}
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exp.currentlyWorking}
                      onChange={(e) => updateExperience(exp.id, { currentlyWorking: e.target.checked })}
                      className="w-4 h-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-secondary-700">I currently work here</span>
                  </label>

                  <Textarea
                    label="Description"
                    placeholder="Briefly describe your role and responsibilities..."
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                    className="min-h-[60px]"
                  />

                  {/* Bullet points */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-secondary-700">
                        Key Achievements / Bullet Points
                      </label>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Plus size={14} />}
                        onClick={() => handleAddBullet(exp.id)}
                      >
                        Add Bullet
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {exp.achievements.map((bullet, bulletIdx) => (
                        <div key={`${exp.id}-bullet-${bulletIdx}`} className="flex gap-2">
                          <span className="mt-2.5 text-secondary-400 text-sm">•</span>
                          <input
                            type="text"
                            value={bullet}
                            onChange={(e) => handleUpdateBullet(exp.id, bulletIdx, e.target.value)}
                            placeholder="e.g. Designed end-to-end data pipelines processing 50M+ records daily"
                            className="flex-1 rounded-lg border border-secondary-300 px-3 py-2 text-sm
                              placeholder:text-secondary-400
                              focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none
                              transition-colors"
                          />
                          <button
                            onClick={() => handleRemoveBullet(exp.id, bulletIdx)}
                            className="p-2 text-secondary-400 hover:text-danger-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            aria-label="Remove bullet"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
