import { Helmet } from 'react-helmet-async';
import { TEMPLATE_METADATA, type TemplateType } from '../types/resume';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import TemplateThumbnail from '../components/preview/TemplateThumbnail';
import { useResumeStore } from '../store/resumeStore';

export default function TemplatesPage() {
  const navigate = useNavigate();
  const { setTemplate } = useResumeStore();

  const handleSelectTemplate = (id: TemplateType) => {
    setTemplate(id);
    navigate('/resume-builder');
  };

  return (
    <>
      <Helmet>
        <title>Free Resume Templates — CVMint</title>
        <meta name="description" content="Choose from 8 professional, ATS-friendly resume templates. Modern, Classic, Minimal, Executive, Tech, Corporate, Creative and ATS-optimized templates." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900">Professional Resume Templates</h1>
          <p className="mt-3 text-lg text-secondary-500">
            Choose a template and customize it to match your personal brand. All templates are ATS-friendly and free.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {TEMPLATE_METADATA.map((tmpl) => (
            <div key={tmpl.id} className="bg-white rounded-xl border border-secondary-200 overflow-hidden hover:shadow-xl hover:border-primary-300 transition-all flex flex-col group">
              {/* Preview */}
              <div
                className="aspect-[3/4] bg-secondary-100 p-3 flex items-center justify-center cursor-pointer group-hover:bg-primary-50/50 transition-colors overflow-hidden"
                onClick={() => handleSelectTemplate(tmpl.id)}
              >
                <div className="w-full h-full transform group-hover:scale-[1.02] transition-transform duration-200">
                  <TemplateThumbnail template={tmpl.id} />
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-secondary-900">{tmpl.name}</h3>
                  <p className="text-xs text-secondary-500 mt-1 line-clamp-2">{tmpl.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2.5 mb-3">
                    {tmpl.tags.map((tag) => (
                      <Badge key={tag} variant="primary">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <Button size="sm" fullWidth onClick={() => handleSelectTemplate(tmpl.id)}>
                  Use This Template
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
