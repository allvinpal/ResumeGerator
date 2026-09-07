import { useResumeStore } from '../../store/resumeStore';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import ATSTemplate from './templates/ATSTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import TechTemplate from './templates/TechTemplate';
import CorporateTemplate from './templates/CorporateTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import type { TemplateType } from '../../types/resume';

const TEMPLATE_COMPONENTS: Record<TemplateType, React.ComponentType<{ resume: any }>> = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  ats: ATSTemplate,
  minimal: MinimalTemplate,
  executive: ExecutiveTemplate,
  tech: TechTemplate,
  corporate: CorporateTemplate,
  creative: CreativeTemplate,
};

export default function ResumePreview() {
  const { resume } = useResumeStore();

  const TemplateComponent = TEMPLATE_COMPONENTS[resume.template] || ModernTemplate;

  return (
    <div className="resume-preview-container h-full" id="resume-preview">
      <div className="resume-preview-scaled">
        <div className="print-area">
          <TemplateComponent resume={resume} />
        </div>
      </div>
    </div>
  );
}
