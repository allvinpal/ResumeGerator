import { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { createEmptyVolunteer } from '../../types/resume';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

export default function VolunteerForm() {
  const { resume, addVolunteer, updateVolunteer, removeVolunteer } = useResumeStore();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(resume.volunteerExperience.map(v => v.id)));

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-secondary-900">Volunteer Experience</h2>
          <p className="text-sm text-secondary-500 mt-1">Add volunteer work and community involvement.</p>
        </div>
        <Button variant="outline" size="sm" icon={<Plus size={16} />}
          onClick={() => { const v = createEmptyVolunteer(); addVolunteer(v); setExpandedIds(prev => new Set(prev).add(v.id)); }}>
          Add Volunteer
        </Button>
      </div>

      {resume.volunteerExperience.length === 0 && (
        <div className="text-center py-12 bg-secondary-50 rounded-xl border-2 border-dashed border-secondary-200">
          <p className="text-secondary-500 mb-3">No volunteer experience added yet</p>
          <Button variant="outline" size="sm" icon={<Plus size={16} />}
            onClick={() => { const v = createEmptyVolunteer(); addVolunteer(v); setExpandedIds(prev => new Set(prev).add(v.id)); }}>
            Add Volunteer Experience
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {resume.volunteerExperience.map((vol, i) => {
          const isExpanded = expandedIds.has(vol.id);
          return (
            <Card key={vol.id} padding="none" className="overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 bg-secondary-50 cursor-pointer hover:bg-secondary-100"
                onClick={() => toggleExpand(vol.id)}>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-secondary-900 truncate">{vol.role || `Volunteer ${i + 1}`}</p>
                  <p className="text-xs text-secondary-500 truncate">{vol.organization}</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); removeVolunteer(vol.id); }}
                  className="p-1.5 text-secondary-400 hover:text-danger-500 hover:bg-red-50 rounded-lg cursor-pointer" aria-label="Remove">
                  <Trash2 size={16} />
                </button>
                {isExpanded ? <ChevronUp size={16} className="text-secondary-400" /> : <ChevronDown size={16} className="text-secondary-400" />}
              </div>
              {isExpanded && (
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Role" placeholder="e.g. Mentor" value={vol.role}
                      onChange={(e) => updateVolunteer(vol.id, { role: e.target.value })} />
                    <Input label="Organization" placeholder="e.g. Code for Good" value={vol.organization}
                      onChange={(e) => updateVolunteer(vol.id, { organization: e.target.value })} />
                    <Input label="Start Date" placeholder="e.g. Jan 2023" value={vol.startDate}
                      onChange={(e) => updateVolunteer(vol.id, { startDate: e.target.value })} />
                    <Input label="End Date" placeholder="e.g. Present" value={vol.endDate}
                      onChange={(e) => updateVolunteer(vol.id, { endDate: e.target.value })} />
                  </div>
                  <Textarea label="Description" placeholder="Describe your volunteer work..." value={vol.description}
                    onChange={(e) => updateVolunteer(vol.id, { description: e.target.value })} className="min-h-[60px]" />
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
