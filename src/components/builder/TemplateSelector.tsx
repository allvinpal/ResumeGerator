import { useResumeStore } from '../../store/resumeStore';
import { SECTION_METADATA, TEMPLATE_METADATA } from '../../types/resume';
import TemplateThumbnail from '../preview/TemplateThumbnail';

const ACCENT_COLORS = [
  { value: '#1a56db', label: 'Blue' },
  { value: '#1e293b', label: 'Black' },
  { value: '#1e3a5f', label: 'Navy' },
  { value: '#4b5563', label: 'Gray' },
  { value: '#166534', label: 'Green' },
  { value: '#6b21a8', label: 'Purple' },
  { value: '#9f1239', label: 'Rose' },
  { value: '#92400e', label: 'Amber' },
];

const FONTS = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Calibri', label: 'Calibri' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Roboto', label: 'Roboto' },
];

export default function TemplateSelector() {
  const { resume, setTemplate, setSettings, setSectionVisibility } = useResumeStore();

  return (
    <div className="space-y-8">
      {/* Template Selection */}
      <div>
        <h2 className="text-xl font-semibold text-secondary-900">Template & Style</h2>
        <p className="text-sm text-secondary-500 mt-1">Choose a template and customize the appearance.</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-secondary-800 mb-3">Resume Template</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {TEMPLATE_METADATA.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => setTemplate(tmpl.id)}
              className={`
                p-3 rounded-xl border-2 text-left transition-all cursor-pointer
                ${resume.template === tmpl.id
                  ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                  : 'border-secondary-200 hover:border-secondary-300 hover:bg-secondary-50'
                }
              `}
            >
              {/* Realistic mini preview */}
              <div className="aspect-[3/4] bg-white rounded-lg border border-secondary-200 mb-2 overflow-hidden shadow-xs">
                <TemplateThumbnail template={tmpl.id} />
              </div>
              <p className="text-xs font-semibold text-secondary-900">{tmpl.name}</p>
              <div className="flex gap-1 mt-1">
                {tmpl.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-secondary-100 text-secondary-500 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Font */}
      <div>
        <h3 className="text-sm font-semibold text-secondary-800 mb-3">Font Family</h3>
        <div className="flex flex-wrap gap-2">
          {FONTS.map((font) => (
            <button
              key={font.value}
              onClick={() => setSettings({ fontFamily: font.value as any })}
              className={`
                px-3 py-1.5 rounded-lg text-sm border transition-all cursor-pointer
                ${resume.settings.fontFamily === font.value
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-secondary-200 text-secondary-600 hover:border-secondary-300'
                }
              `}
              style={{ fontFamily: font.value }}
            >
              {font.label}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div>
        <h3 className="text-sm font-semibold text-secondary-800 mb-3">
          Font Size: {resume.settings.fontSize}px
        </h3>
        <input
          type="range"
          min={9}
          max={14}
          value={resume.settings.fontSize}
          onChange={(e) => setSettings({ fontSize: Number(e.target.value) })}
          className="w-full accent-primary-600"
        />
        <div className="flex justify-between text-xs text-secondary-400 mt-1">
          <span>9px</span>
          <span>14px</span>
        </div>
      </div>

      {/* Margins */}
      <div>
        <h3 className="text-sm font-semibold text-secondary-800 mb-3">Margins</h3>
        <div className="flex gap-2">
          {(['narrow', 'normal', 'wide'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setSettings({ margins: m })}
              className={`
                px-4 py-2 rounded-lg text-sm border capitalize transition-all cursor-pointer
                ${resume.settings.margins === m
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-secondary-200 text-secondary-600 hover:border-secondary-300'
                }
              `}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Spacing */}
      <div>
        <h3 className="text-sm font-semibold text-secondary-800 mb-3">Line Spacing</h3>
        <div className="flex gap-2">
          {(['compact', 'normal', 'relaxed'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSettings({ lineSpacing: s })}
              className={`
                px-4 py-2 rounded-lg text-sm border capitalize transition-all cursor-pointer
                ${resume.settings.lineSpacing === s
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-secondary-200 text-secondary-600 hover:border-secondary-300'
                }
              `}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color */}
      <div>
        <h3 className="text-sm font-semibold text-secondary-800 mb-3">Accent Color</h3>
        <div className="flex flex-wrap gap-2">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => setSettings({ accentColor: color.value })}
              className={`
                w-10 h-10 rounded-full border-2 transition-all cursor-pointer
                ${resume.settings.accentColor === color.value
                  ? 'border-primary-500 ring-2 ring-primary-200 scale-110'
                  : 'border-secondary-300 hover:scale-105'
                }
              `}
              style={{ backgroundColor: color.value }}
              title={color.label}
              aria-label={`${color.label} accent color`}
            />
          ))}
        </div>
      </div>

      {/* Section Visibility */}
      <div>
        <h3 className="text-sm font-semibold text-secondary-800 mb-3">Show / Hide Sections</h3>
        <div className="space-y-2">
          {SECTION_METADATA.filter(s => !s.required).map((section) => (
            <label key={section.key} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary-50 cursor-pointer">
              <input
                type="checkbox"
                checked={resume.sectionVisibility[section.key]}
                onChange={(e) => setSectionVisibility(section.key, e.target.checked)}
                className="w-4 h-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-secondary-700">{section.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
