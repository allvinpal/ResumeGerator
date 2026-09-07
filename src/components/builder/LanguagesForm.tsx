import { useResumeStore } from '../../store/resumeStore';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { createEmptyLanguage, PROFICIENCY_LEVELS } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

export default function LanguagesForm() {
  const { resume, addLanguage, updateLanguage, removeLanguage } = useResumeStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-secondary-900">Languages</h2>
          <p className="text-sm text-secondary-500 mt-1">List languages you speak.</p>
        </div>
        <Button variant="outline" size="sm" icon={<Plus size={16} />}
          onClick={() => addLanguage(createEmptyLanguage())}>
          Add Language
        </Button>
      </div>

      {resume.languages.length === 0 && (
        <div className="text-center py-12 bg-secondary-50 rounded-xl border-2 border-dashed border-secondary-200">
          <p className="text-secondary-500 mb-3">No languages added yet</p>
          <Button variant="outline" size="sm" icon={<Plus size={16} />}
            onClick={() => addLanguage(createEmptyLanguage())}>Add Language</Button>
        </div>
      )}

      <div className="space-y-3">
        {resume.languages.map((lang) => (
          <Card key={lang.id} padding="sm">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <Input label="Language" placeholder="e.g. English" value={lang.language}
                  onChange={(e) => updateLanguage(lang.id, { language: e.target.value })} />
              </div>
              <div className="flex-1">
                <Select label="Proficiency" value={lang.proficiency} options={PROFICIENCY_LEVELS}
                  onChange={(e) => updateLanguage(lang.id, { proficiency: e.target.value as any })} />
              </div>
              <button onClick={() => removeLanguage(lang.id)}
                className="p-2 mb-0.5 text-secondary-400 hover:text-danger-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" aria-label="Remove">
                <Trash2 size={16} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
