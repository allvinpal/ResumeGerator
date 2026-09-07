import { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { createEmptySkillCategory, DEFAULT_SKILL_CATEGORIES } from '../../types/resume';
import { Plus, Trash2, X } from 'lucide-react';

export default function SkillsForm() {
  const { resume, addSkillCategory, updateSkillCategory, removeSkillCategory } = useResumeStore();
  const [newSkillInputs, setNewSkillInputs] = useState<Record<string, string>>({});

  const handleAddSkill = (categoryId: string) => {
    const value = newSkillInputs[categoryId]?.trim();
    if (!value) return;
    const cat = resume.skills.find((c) => c.id === categoryId);
    if (cat) {
      updateSkillCategory(categoryId, { skills: [...cat.skills, value] });
      setNewSkillInputs((prev) => ({ ...prev, [categoryId]: '' }));
    }
  };

  const handleRemoveSkill = (categoryId: string, skillIndex: number) => {
    const cat = resume.skills.find((c) => c.id === categoryId);
    if (cat) {
      updateSkillCategory(categoryId, {
        skills: cat.skills.filter((_, i) => i !== skillIndex),
      });
    }
  };

  const handleKeyDown = (categoryId: string, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill(categoryId);
    }
  };

  const addPredefinedCategory = (name: string) => {
    addSkillCategory(createEmptySkillCategory(name));
  };

  const unusedCategories = DEFAULT_SKILL_CATEGORIES.filter(
    (cat) => !resume.skills.some((s) => s.name === cat)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-secondary-900">Skills</h2>
          <p className="text-sm text-secondary-500 mt-1">Organize your skills by category.</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          icon={<Plus size={16} />}
          onClick={() => addSkillCategory(createEmptySkillCategory())}
        >
          Add Category
        </Button>
      </div>

      {/* Quick add predefined categories */}
      {unusedCategories.length > 0 && (
        <div>
          <p className="text-xs text-secondary-500 mb-2">Quick add category:</p>
          <div className="flex flex-wrap gap-1.5">
            {unusedCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => addPredefinedCategory(cat)}
                className="px-2.5 py-1 text-xs bg-secondary-100 text-secondary-600 rounded-full
                  hover:bg-primary-50 hover:text-primary-600 transition-colors cursor-pointer"
              >
                + {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {resume.skills.length === 0 && (
        <div className="text-center py-12 bg-secondary-50 rounded-xl border-2 border-dashed border-secondary-200">
          <p className="text-secondary-500 mb-3">No skill categories added yet</p>
          <div className="flex flex-wrap justify-center gap-2">
            {DEFAULT_SKILL_CATEGORIES.slice(0, 4).map((cat) => (
              <Button
                key={cat}
                variant="outline"
                size="sm"
                onClick={() => addPredefinedCategory(cat)}
              >
                + {cat}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {resume.skills.map((category) => (
          <Card key={category.id} padding="sm">
            <div className="flex items-center gap-2 mb-3">
              <Input
                placeholder="Category name (e.g. Programming Languages)"
                value={category.name}
                onChange={(e) => updateSkillCategory(category.id, { name: e.target.value })}
                className="!py-1.5 font-medium"
              />
              <button
                onClick={() => removeSkillCategory(category.id)}
                className="p-2 text-secondary-400 hover:text-danger-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0 cursor-pointer"
                aria-label="Remove category"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {category.skills.map((skill, idx) => (
                <Badge key={idx} variant="primary" className="gap-1 pr-1">
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(category.id, idx)}
                    className="p-0.5 rounded-full hover:bg-primary-200 transition-colors cursor-pointer"
                    aria-label={`Remove ${skill}`}
                  >
                    <X size={12} />
                  </button>
                </Badge>
              ))}
            </div>

            {/* Add skill input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a skill and press Enter (e.g. Python)"
                value={newSkillInputs[category.id] || ''}
                onChange={(e) => setNewSkillInputs((prev) => ({ ...prev, [category.id]: e.target.value }))}
                onKeyDown={(e) => handleKeyDown(category.id, e)}
                className="flex-1 rounded-lg border border-secondary-300 px-3 py-1.5 text-sm
                  placeholder:text-secondary-400
                  focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleAddSkill(category.id)}
              >
                Add
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
