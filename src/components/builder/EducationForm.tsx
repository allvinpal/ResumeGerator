import { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { createEmptyEducation } from '../../types/resume';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';

export default function EducationForm() {
  const { resume, addEducation, updateEducation, removeEducation } = useResumeStore();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(resume.education.map(e => e.id)));

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-secondary-900">Education</h2>
          <p className="text-sm text-secondary-500 mt-1">Add your educational background.</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          icon={<Plus size={16} />}
          onClick={() => {
            const edu = createEmptyEducation();
            addEducation(edu);
            setExpandedIds((prev) => new Set(prev).add(edu.id));
          }}
        >
          Add Education
        </Button>
      </div>

      {resume.education.length === 0 && (
        <div className="text-center py-12 bg-secondary-50 rounded-xl border-2 border-dashed border-secondary-200">
          <p className="text-secondary-500 mb-3">No education added yet</p>
          <Button
            variant="outline"
            size="sm"
            icon={<Plus size={16} />}
            onClick={() => {
              const edu = createEmptyEducation();
              addEducation(edu);
              setExpandedIds((prev) => new Set(prev).add(edu.id));
            }}
          >
            Add Education
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {resume.education.map((edu, index) => {
          const isExpanded = expandedIds.has(edu.id);
          return (
            <Card key={edu.id} padding="none" className="overflow-hidden">
              <div
                className="flex items-center gap-3 px-4 py-3 bg-secondary-50 cursor-pointer hover:bg-secondary-100 transition-colors"
                onClick={() => toggleExpand(edu.id)}
              >
                <GripVertical size={16} className="text-secondary-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-secondary-900 truncate">
                    {edu.degree || `Education ${index + 1}`}
                  </p>
                  <p className="text-xs text-secondary-500 truncate">
                    {edu.university}{edu.university && edu.endYear ? ` • ` : ''}{edu.endYear}
                  </p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeEducation(edu.id); }}
                  className="p-1.5 text-secondary-400 hover:text-danger-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  aria-label="Remove education"
                >
                  <Trash2 size={16} />
                </button>
                {isExpanded ? <ChevronUp size={16} className="text-secondary-400" /> : <ChevronDown size={16} className="text-secondary-400" />}
              </div>

              {isExpanded && (
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <Input
                        label="Degree"
                        placeholder="e.g. Bachelor of Technology (B.Tech) in Computer Science"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Input
                        label="University / College"
                        placeholder="e.g. Chaudhary Charan Singh University"
                        value={edu.university}
                        onChange={(e) => updateEducation(edu.id, { university: e.target.value })}
                      />
                    </div>
                    <Input
                      label="Location"
                      placeholder="e.g. Meerut, India"
                      value={edu.location}
                      onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                    />
                    <Input
                      label="GPA / Percentage"
                      placeholder="e.g. 3.8/4.0 or 85%"
                      value={edu.gpa}
                      onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                    />
                    <Input
                      label="Start Year"
                      placeholder="e.g. 2017"
                      value={edu.startYear}
                      onChange={(e) => updateEducation(edu.id, { startYear: e.target.value })}
                    />
                    <Input
                      label="End Year"
                      placeholder="e.g. 2021"
                      value={edu.endYear}
                      onChange={(e) => updateEducation(edu.id, { endYear: e.target.value })}
                    />
                  </div>
                  <Input
                    label="Relevant Coursework"
                    placeholder="e.g. Data Structures, Algorithms, Database Management"
                    value={edu.relevantCoursework}
                    onChange={(e) => updateEducation(edu.id, { relevantCoursework: e.target.value })}
                    hint="Comma-separated list of relevant courses"
                  />
                  <Textarea
                    label="Description"
                    placeholder="Additional details, honors, activities..."
                    value={edu.description}
                    onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                    className="min-h-[60px]"
                  />
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
