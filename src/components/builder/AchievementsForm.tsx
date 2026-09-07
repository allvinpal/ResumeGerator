import { useResumeStore } from '../../store/resumeStore';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { createEmptyAchievement } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

export default function AchievementsForm() {
  const { resume, addAchievement, updateAchievement, removeAchievement } = useResumeStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-secondary-900">Achievements</h2>
          <p className="text-sm text-secondary-500 mt-1">Highlight notable accomplishments.</p>
        </div>
        <Button variant="outline" size="sm" icon={<Plus size={16} />}
          onClick={() => addAchievement(createEmptyAchievement())}>
          Add Achievement
        </Button>
      </div>

      {resume.achievements.length === 0 && (
        <div className="text-center py-12 bg-secondary-50 rounded-xl border-2 border-dashed border-secondary-200">
          <p className="text-secondary-500 mb-3">No achievements added yet</p>
          <Button variant="outline" size="sm" icon={<Plus size={16} />}
            onClick={() => addAchievement(createEmptyAchievement())}>Add Achievement</Button>
        </div>
      )}

      <div className="space-y-3">
        {resume.achievements.map((ach) => (
          <Card key={ach.id} padding="sm">
            <div className="flex gap-3">
              <div className="flex-1 space-y-3">
                <Input label="Title" placeholder="e.g. Employee of the Year" value={ach.title}
                  onChange={(e) => updateAchievement(ach.id, { title: e.target.value })} />
                <Textarea label="Description" placeholder="Describe the achievement..." value={ach.description}
                  onChange={(e) => updateAchievement(ach.id, { description: e.target.value })} className="min-h-[50px]" />
                <Input label="Date" placeholder="e.g. 2024" value={ach.date}
                  onChange={(e) => updateAchievement(ach.id, { date: e.target.value })} />
              </div>
              <button onClick={() => removeAchievement(ach.id)}
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
