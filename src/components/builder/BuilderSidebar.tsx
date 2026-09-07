import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderOpen,
  Award,
  Trophy,
  Globe,
  Medal,
  Heart,
  Plus,
  Layout,
  CheckCircle,
} from 'lucide-react';
import { useResumeStore } from '../../store/resumeStore';
import type { SectionKey } from '../../types/resume';
import { SECTION_METADATA } from '../../types/resume';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderOpen,
  Award,
  Trophy,
  Globe,
  Medal,
  Heart,
  Plus,
  Layout,
  CheckCircle,
};

interface BuilderSidebarProps {
  className?: string;
}

export default function BuilderSidebar({ className = '' }: BuilderSidebarProps) {
  const { activeStep, setActiveStep, resume } = useResumeStore();

  const visibleSections = SECTION_METADATA.filter(
    (s) => s.required || resume.sectionVisibility[s.key]
  );

  return (
    <nav
      className={`flex flex-col h-full ${className}`}
      aria-label="Resume builder steps"
    >
      <div className="p-4 border-b border-secondary-200">
        <h2 className="text-sm font-semibold text-secondary-900">Resume Sections</h2>
        <p className="text-xs text-secondary-400 mt-0.5">Click to navigate</p>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {visibleSections.map((section) => {
          const IconComponent = iconMap[section.icon] || FileText;
          const isActive = activeStep === section.key;

          return (
            <button
              key={section.key}
              onClick={() => setActiveStep(section.key)}
              className={`
                w-full flex items-center gap-3 px-4 py-2.5 text-left
                transition-colors duration-100 cursor-pointer
                ${isActive
                  ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                  : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-800'
                }
              `}
              aria-current={isActive ? 'step' : undefined}
            >
              <IconComponent
                size={18}
                className={isActive ? 'text-primary-600' : 'text-secondary-400'}
              />
              <span className="text-sm font-medium truncate">{section.label}</span>
            </button>
          );
        })}

        {/* Divider */}
        <div className="mx-4 my-2 border-t border-secondary-200" />

        {/* Template */}
        <button
          onClick={() => setActiveStep('template')}
          className={`
            w-full flex items-center gap-3 px-4 py-2.5 text-left
            transition-colors duration-100 cursor-pointer
            ${activeStep === 'template'
              ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
              : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-800'
            }
          `}
        >
          <Layout size={18} className={activeStep === 'template' ? 'text-primary-600' : 'text-secondary-400'} />
          <span className="text-sm font-medium">Template & Style</span>
        </button>

        {/* Final Review */}
        <button
          onClick={() => setActiveStep('review')}
          className={`
            w-full flex items-center gap-3 px-4 py-2.5 text-left
            transition-colors duration-100 cursor-pointer
            ${activeStep === 'review'
              ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
              : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-800'
            }
          `}
        >
          <CheckCircle size={18} className={activeStep === 'review' ? 'text-primary-600' : 'text-secondary-400'} />
          <span className="text-sm font-medium">Final Review</span>
        </button>
      </div>

      {/* Section management */}
      <div className="p-4 border-t border-secondary-200">
        <button
          onClick={() => setActiveStep('customSections')}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium
            text-secondary-600 bg-white border border-secondary-300 rounded-lg
            hover:bg-secondary-50 transition-colors cursor-pointer"
        >
          <Plus size={16} />
          Manage Sections
        </button>
      </div>
    </nav>
  );
}
