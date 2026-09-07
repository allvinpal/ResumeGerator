import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  FileText, Save, Eye, EyeOff, Download, Menu, X, Check,
} from 'lucide-react';
import { useResumeStore } from '../store/resumeStore';
import { sampleResume } from '../data/sampleResume';
import Button from '../components/ui/Button';
import BuilderSidebar from '../components/builder/BuilderSidebar';
import PersonalInfoForm from '../components/builder/PersonalInfoForm';
import SummaryForm from '../components/builder/SummaryForm';
import ExperienceForm from '../components/builder/ExperienceForm';
import EducationForm from '../components/builder/EducationForm';
import SkillsForm from '../components/builder/SkillsForm';
import ProjectsForm from '../components/builder/ProjectsForm';
import CertificationsForm from '../components/builder/CertificationsForm';
import AchievementsForm from '../components/builder/AchievementsForm';
import LanguagesForm from '../components/builder/LanguagesForm';
import AwardsForm from '../components/builder/AwardsForm';
import VolunteerForm from '../components/builder/VolunteerForm';
import CustomSectionForm from '../components/builder/CustomSectionForm';
import TemplateSelector from '../components/builder/TemplateSelector';
import FinalReview from '../components/builder/FinalReview';
import ResumePreview from '../components/preview/ResumePreview';
import DownloadModal from '../components/builder/DownloadModal';
import { exportToPDF, exportToDocx } from '../utils/exportResume';

const formMap: Record<string, React.ComponentType> = {
  personalInfo: PersonalInfoForm,
  summary: SummaryForm,
  experience: ExperienceForm,
  education: EducationForm,
  skills: SkillsForm,
  projects: ProjectsForm,
  certifications: CertificationsForm,
  achievements: AchievementsForm,
  languages: LanguagesForm,
  awards: AwardsForm,
  volunteerExperience: VolunteerForm,
  customSections: CustomSectionForm,
  template: TemplateSelector,
  review: FinalReview,
};

export default function BuilderPage() {
  const { activeStep, showPreview, setShowPreview, resume, setResume } = useResumeStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Load sample resume if empty (for demo purposes) or restore saved
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('demo') === 'true' && !resume.personalInfo.fullName) {
      setResume(sampleResume);
    } else if (!resume.personalInfo.fullName) {
      try {
        const saved = localStorage.getItem('resumeforge_resume');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.personalInfo) {
            setResume(parsed);
          }
        }
      } catch (err) {
        console.error('Failed to load local storage resume:', err);
      }
    }
  }, []);

  const handleSave = () => {
    try {
      localStorage.setItem('resumeforge_resume', JSON.stringify(resume));
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 2500);
    } catch (err) {
      console.error('Failed to save to local storage:', err);
    }
  };

  const ActiveForm = formMap[activeStep] || PersonalInfoForm;

  return (
    <>
      <Helmet>
        <title>Resume Builder — CVMint</title>
        <meta name="description" content="Build your professional resume with CVMint's free online resume builder. Live preview, multiple templates, PDF & DOCX export." />
      </Helmet>

      <div className="h-screen flex flex-col">
        {/* Save Toast Notification */}
        {saveToast && (
          <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-200">
            <Check size={16} />
            Resume saved locally!
          </div>
        )}

        {/* Builder Header */}
        <header className="h-14 bg-white border-b border-secondary-200 flex items-center justify-between px-4 flex-shrink-0 no-print">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-1.5 rounded-lg text-secondary-600 hover:bg-secondary-100 cursor-pointer"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link to="/" className="flex items-center gap-2 no-underline">
              <div className="w-7 h-7 bg-primary-600 rounded-md flex items-center justify-center">
                <FileText size={14} className="text-white" />
              </div>
              <span className="text-lg font-bold text-secondary-900 hidden sm:block">
                CV<span className="text-primary-600">Mint</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {/* Load Demo button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setResume(sampleResume)}
            >
              Load Demo
            </Button>

            {/* Mobile preview toggle */}
            <Button
              variant="outline"
              size="sm"
              icon={showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
              onClick={() => setShowPreview(!showPreview)}
              className="lg:hidden"
            >
              {showPreview ? 'Edit' : 'Preview'}
            </Button>

            <Button variant="outline" size="sm" icon={<Save size={16} />} onClick={handleSave}>
              Save
            </Button>

            <Button size="sm" icon={<Download size={16} />} onClick={() => setDownloadModalOpen(true)}>
              Download
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar - Desktop always visible, mobile toggle */}
          <aside
            className={`
              w-[260px] flex-shrink-0 builder-sidebar no-print
              ${sidebarOpen ? 'block absolute z-30 h-full bg-secondary-50' : 'hidden'}
              lg:block lg:relative lg:z-auto
            `}
          >
            <BuilderSidebar />
          </aside>

          {/* Mobile overlay when sidebar is open */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/30 z-20 lg:hidden no-print"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Form Panel */}
          <div
            className={`
              flex-1 builder-form overflow-y-auto no-print
              ${showPreview ? 'hidden lg:block' : 'block'}
            `}
          >
            <div className="max-w-2xl mx-auto">
              <ActiveForm />
            </div>
          </div>

          {/* Preview Panel */}
          <div
            className={`
              flex-1 builder-preview overflow-y-auto
              ${showPreview ? 'block' : 'hidden lg:block'}
            `}
          >
            <ResumePreview />
          </div>
        </div>

        {/* Mobile Bottom Action Bar */}
        <div className="lg:hidden flex-shrink-0 bg-white border-t border-secondary-200 px-4 py-2 flex gap-2 no-print">
          <Button variant="outline" size="sm" icon={<Save size={14} />} fullWidth onClick={handleSave}>
            Save
          </Button>
          <Button size="sm" icon={<Download size={14} />} fullWidth onClick={() => exportToPDF(resume)}>
            PDF
          </Button>
          <Button variant="secondary" size="sm" icon={<Download size={14} />} fullWidth onClick={() => exportToDocx(resume)}>
            DOCX
          </Button>
        </div>
      </div>

      {/* Download Options Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />
    </>
  );
}
