import { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { createEmptyProject } from '../../types/resume';
import { Plus, Trash2, ChevronDown, ChevronUp, X } from 'lucide-react';

export default function ProjectsForm() {
  const { resume, addProject, updateProject, removeProject } = useResumeStore();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(resume.projects.map(p => p.id)));
  const [techInputs, setTechInputs] = useState<Record<string, string>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAddTech = (projId: string) => {
    const value = techInputs[projId]?.trim();
    if (!value) return;
    const proj = resume.projects.find((p) => p.id === projId);
    if (proj) {
      updateProject(projId, { technologies: [...proj.technologies, value] });
      setTechInputs((prev) => ({ ...prev, [projId]: '' }));
    }
  };

  const handleRemoveTech = (projId: string, idx: number) => {
    const proj = resume.projects.find((p) => p.id === projId);
    if (proj) {
      updateProject(projId, { technologies: proj.technologies.filter((_, i) => i !== idx) });
    }
  };

  const handleAddBullet = (projId: string) => {
    const proj = resume.projects.find((p) => p.id === projId);
    if (proj) {
      updateProject(projId, { achievements: [...proj.achievements, ''] });
    }
  };

  const handleUpdateBullet = (projId: string, idx: number, value: string) => {
    const proj = resume.projects.find((p) => p.id === projId);
    if (proj) {
      const newAch = [...proj.achievements];
      newAch[idx] = value;
      updateProject(projId, { achievements: newAch });
    }
  };

  const handleRemoveBullet = (projId: string, idx: number) => {
    const proj = resume.projects.find((p) => p.id === projId);
    if (proj) {
      updateProject(projId, { achievements: proj.achievements.filter((_, i) => i !== idx) });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-secondary-900">Projects</h2>
          <p className="text-sm text-secondary-500 mt-1">Showcase your key projects and technical work.</p>
        </div>
        <Button variant="outline" size="sm" icon={<Plus size={16} />}
          onClick={() => { const p = createEmptyProject(); addProject(p); setExpandedIds(prev => new Set(prev).add(p.id)); }}>
          Add Project
        </Button>
      </div>

      {resume.projects.length === 0 && (
        <div className="text-center py-12 bg-secondary-50 rounded-xl border-2 border-dashed border-secondary-200">
          <p className="text-secondary-500 mb-3">No projects added yet</p>
          <Button variant="outline" size="sm" icon={<Plus size={16} />}
            onClick={() => { const p = createEmptyProject(); addProject(p); setExpandedIds(prev => new Set(prev).add(p.id)); }}>
            Add Your First Project
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {resume.projects.map((proj, index) => {
          const isExpanded = expandedIds.has(proj.id);
          return (
            <Card key={proj.id} padding="none" className="overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 bg-secondary-50 cursor-pointer hover:bg-secondary-100 transition-colors"
                onClick={() => toggleExpand(proj.id)}>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-secondary-900 truncate">{proj.name || `Project ${index + 1}`}</p>
                  <p className="text-xs text-secondary-500 truncate">{proj.role}</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); removeProject(proj.id); }}
                  className="p-1.5 text-secondary-400 hover:text-danger-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" aria-label="Remove project">
                  <Trash2 size={16} />
                </button>
                {isExpanded ? <ChevronUp size={16} className="text-secondary-400" /> : <ChevronDown size={16} className="text-secondary-400" />}
              </div>

              {isExpanded && (
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Project Name" placeholder="e.g. Real-Time Transaction Monitoring" value={proj.name}
                      onChange={(e) => updateProject(proj.id, { name: e.target.value })} />
                    <Input label="Role" placeholder="e.g. Lead Data Engineer" value={proj.role}
                      onChange={(e) => updateProject(proj.id, { role: e.target.value })} />
                    <Input label="Start Date" placeholder="e.g. 2023" value={proj.startDate}
                      onChange={(e) => updateProject(proj.id, { startDate: e.target.value })} />
                    <Input label="End Date" placeholder="e.g. Present" value={proj.endDate}
                      onChange={(e) => updateProject(proj.id, { endDate: e.target.value })} />
                    <div className="sm:col-span-2">
                      <Input label="Project URL" type="url" placeholder="https://github.com/..." value={proj.projectUrl}
                        onChange={(e) => updateProject(proj.id, { projectUrl: e.target.value })} />
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <label className="text-sm font-medium text-secondary-700 mb-2 block">Technologies</label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {proj.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="primary" className="gap-1 pr-1">
                          {tech}
                          <button onClick={() => handleRemoveTech(proj.id, idx)}
                            className="p-0.5 rounded-full hover:bg-primary-200 cursor-pointer" aria-label={`Remove ${tech}`}>
                            <X size={12} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input type="text" placeholder="Add technology..." value={techInputs[proj.id] || ''}
                        onChange={(e) => setTechInputs(prev => ({ ...prev, [proj.id]: e.target.value }))}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTech(proj.id); } }}
                        className="flex-1 rounded-lg border border-secondary-300 px-3 py-1.5 text-sm placeholder:text-secondary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" />
                      <Button variant="secondary" size="sm" onClick={() => handleAddTech(proj.id)}>Add</Button>
                    </div>
                  </div>

                  <Textarea label="Description" placeholder="Describe the project..." value={proj.description}
                    onChange={(e) => updateProject(proj.id, { description: e.target.value })} className="min-h-[60px]" />

                  {/* Achievements */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-secondary-700">Key Achievements</label>
                      <Button variant="ghost" size="sm" icon={<Plus size={14} />} onClick={() => handleAddBullet(proj.id)}>Add Bullet</Button>
                    </div>
                    <div className="space-y-2">
                      {proj.achievements.map((bullet, idx) => (
                        <div key={`${proj.id}-bullet-${idx}`} className="flex gap-2">
                          <span className="mt-2.5 text-secondary-400 text-sm">•</span>
                          <input type="text" value={bullet} onChange={(e) => handleUpdateBullet(proj.id, idx, e.target.value)}
                            placeholder="e.g. Reduced fraud detection time from hours to under 30 seconds"
                            className="flex-1 rounded-lg border border-secondary-300 px-3 py-2 text-sm placeholder:text-secondary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" />
                          <button onClick={() => handleRemoveBullet(proj.id, idx)}
                            className="p-2 text-secondary-400 hover:text-danger-500 rounded-lg hover:bg-red-50 cursor-pointer" aria-label="Remove bullet">
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
