import { useResumeStore } from '../../store/resumeStore';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { createEmptyAward } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

export default function AwardsForm() {
  const { resume, addAward, updateAward, removeAward } = useResumeStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-secondary-900">Awards</h2>
          <p className="text-sm text-secondary-500 mt-1">List awards and honors you've received.</p>
        </div>
        <Button variant="outline" size="sm" icon={<Plus size={16} />}
          onClick={() => addAward(createEmptyAward())}>
          Add Award
        </Button>
      </div>

      {resume.awards.length === 0 && (
        <div className="text-center py-12 bg-secondary-50 rounded-xl border-2 border-dashed border-secondary-200">
          <p className="text-secondary-500 mb-3">No awards added yet</p>
          <Button variant="outline" size="sm" icon={<Plus size={16} />}
            onClick={() => addAward(createEmptyAward())}>Add Award</Button>
        </div>
      )}

      <div className="space-y-3">
        {resume.awards.map((award) => (
          <Card key={award.id} padding="sm">
            <div className="flex gap-3">
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input label="Title" placeholder="e.g. Best Innovation Award" value={award.title}
                    onChange={(e) => updateAward(award.id, { title: e.target.value })} />
                  <Input label="Organization" placeholder="e.g. Company Name" value={award.organization}
                    onChange={(e) => updateAward(award.id, { organization: e.target.value })} />
                </div>
                <Input label="Date" placeholder="e.g. 2024" value={award.date}
                  onChange={(e) => updateAward(award.id, { date: e.target.value })} />
                <Textarea label="Description" placeholder="Optional description..." value={award.description}
                  onChange={(e) => updateAward(award.id, { description: e.target.value })} className="min-h-[50px]" />
              </div>
              <button onClick={() => removeAward(award.id)}
                className="p-1.5 h-fit text-secondary-400 hover:text-danger-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" aria-label="Remove">
                <Trash2 size={16} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
