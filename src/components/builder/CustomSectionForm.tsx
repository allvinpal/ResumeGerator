import { useResumeStore } from '../../store/resumeStore';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { createEmptyCustomSection } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

export default function CustomSectionForm() {
  const { resume, addCustomSection, updateCustomSection, removeCustomSection } = useResumeStore();

  const handleAddItem = (sectionId: string) => {
    const section = resume.customSections.find(s => s.id === sectionId);
    if (section) {
      updateCustomSection(sectionId, {
        items: [...section.items, { id: crypto.randomUUID(), content: '', bullets: [''] }],
      });
    }
  };

  const handleUpdateItemContent = (sectionId: string, itemIdx: number, content: string) => {
    const section = resume.customSections.find(s => s.id === sectionId);
    if (section) {
      const items = [...section.items];
      items[itemIdx] = { ...items[itemIdx], content };
      updateCustomSection(sectionId, { items });
    }
  };

  const handleAddBullet = (sectionId: string, itemIdx: number) => {
    const section = resume.customSections.find(s => s.id === sectionId);
    if (section) {
      const items = [...section.items];
      items[itemIdx] = { ...items[itemIdx], bullets: [...items[itemIdx].bullets, ''] };
      updateCustomSection(sectionId, { items });
    }
  };

  const handleUpdateBullet = (sectionId: string, itemIdx: number, bulletIdx: number, value: string) => {
    const section = resume.customSections.find(s => s.id === sectionId);
    if (section) {
      const items = [...section.items];
      const bullets = [...items[itemIdx].bullets];
      bullets[bulletIdx] = value;
      items[itemIdx] = { ...items[itemIdx], bullets };
      updateCustomSection(sectionId, { items });
    }
  };

  const handleRemoveBullet = (sectionId: string, itemIdx: number, bulletIdx: number) => {
    const section = resume.customSections.find(s => s.id === sectionId);
    if (section) {
      const items = [...section.items];
      items[itemIdx] = { ...items[itemIdx], bullets: items[itemIdx].bullets.filter((_, i) => i !== bulletIdx) };
      updateCustomSection(sectionId, { items });
    }
  };

  const handleRemoveItem = (sectionId: string, itemIdx: number) => {
    const section = resume.customSections.find(s => s.id === sectionId);
    if (section) {
      updateCustomSection(sectionId, { items: section.items.filter((_, i) => i !== itemIdx) });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-secondary-900">Custom Sections</h2>
          <p className="text-sm text-secondary-500 mt-1">Add custom sections like Interests, Publications, etc.</p>
        </div>
        <Button variant="outline" size="sm" icon={<Plus size={16} />}
          onClick={() => addCustomSection(createEmptyCustomSection())}>
          Add Section
        </Button>
      </div>

      {resume.customSections.length === 0 && (
        <div className="text-center py-12 bg-secondary-50 rounded-xl border-2 border-dashed border-secondary-200">
          <p className="text-secondary-500 mb-3">No custom sections yet</p>
          <Button variant="outline" size="sm" icon={<Plus size={16} />}
            onClick={() => addCustomSection(createEmptyCustomSection())}>Add Custom Section</Button>
        </div>
      )}

      <div className="space-y-6">
        {resume.customSections.map((section) => (
          <Card key={section.id} padding="sm" className="space-y-4">
            <div className="flex gap-3">
              <Input placeholder="Section Title (e.g. Publications, Interests)" value={section.title}
                onChange={(e) => updateCustomSection(section.id, { title: e.target.value })} className="font-medium" />
              <button onClick={() => removeCustomSection(section.id)}
                className="p-2 text-secondary-400 hover:text-danger-500 hover:bg-red-50 rounded-lg cursor-pointer" aria-label="Remove section">
                <Trash2 size={16} />
              </button>
            </div>

            {section.items.map((item, itemIdx) => (
              <div key={item.id} className="pl-3 border-l-2 border-secondary-200 space-y-2">
                <div className="flex gap-2">
                  <input type="text" value={item.content} onChange={(e) => handleUpdateItemContent(section.id, itemIdx, e.target.value)}
                    placeholder="Content" className="flex-1 rounded-lg border border-secondary-300 px-3 py-2 text-sm placeholder:text-secondary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" />
                  <button onClick={() => handleRemoveItem(section.id, itemIdx)}
                    className="p-2 text-secondary-400 hover:text-danger-500 rounded-lg hover:bg-red-50 cursor-pointer" aria-label="Remove item">
                    <Trash2 size={14} />
                  </button>
                </div>

                {item.bullets.map((bullet, bulletIdx) => (
                  <div key={bulletIdx} className="flex gap-2 ml-4">
                    <span className="mt-2.5 text-secondary-400 text-sm">•</span>
                    <input type="text" value={bullet} onChange={(e) => handleUpdateBullet(section.id, itemIdx, bulletIdx, e.target.value)}
                      placeholder="Bullet point" className="flex-1 rounded-lg border border-secondary-300 px-3 py-1.5 text-sm placeholder:text-secondary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" />
                    <button onClick={() => handleRemoveBullet(section.id, itemIdx, bulletIdx)}
                      className="p-1.5 text-secondary-400 hover:text-danger-500 rounded-lg cursor-pointer" aria-label="Remove bullet">
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}

                <Button variant="ghost" size="sm" icon={<Plus size={12} />} onClick={() => handleAddBullet(section.id, itemIdx)}>
                  Add Bullet
                </Button>
              </div>
            ))}

            <Button variant="outline" size="sm" icon={<Plus size={14} />} onClick={() => handleAddItem(section.id)}>
              Add Item
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
