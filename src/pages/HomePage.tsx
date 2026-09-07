import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  FileText,
  Download,
  Upload,
  Palette,
  Eye,
  Shield,
  Smartphone,
  Award,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import Button from '../components/ui/Button';
import UploadResumeModal from '../components/builder/UploadResumeModal';

const steps = [
  {
    number: '01',
    title: 'Enter Your Information',
    description: 'Fill in your professional details, experience, education, and skills using our guided form.',
    icon: FileText,
  },
  {
    number: '02',
    title: 'Choose a Template',
    description: 'Pick from 8 professional, ATS-friendly resume templates designed for different industries.',
    icon: Palette,
  },
  {
    number: '03',
    title: 'Customize Your Resume',
    description: 'Adjust fonts, colors, spacing, and section order. See changes live as you edit.',
    icon: Sparkles,
  },
  {
    number: '04',
    title: 'Download as PDF or DOCX',
    description: 'Export your polished resume as a high-quality PDF or editable Word document. No watermarks.',
    icon: Download,
  },
];

const features = [
  { icon: Zap, title: '100% Free Resume Builder', description: 'No hidden fees, no subscriptions, no premium walls.' },
  { icon: Palette, title: 'Professional Templates', description: '8 polished templates designed for every industry.' },
  { icon: Download, title: 'PDF & DOCX Export', description: 'Download as high-quality PDF or editable Word document.' },
  { icon: Award, title: 'ATS-Friendly Templates', description: 'Optimized to pass Applicant Tracking Systems.' },
  { icon: Eye, title: 'Live Preview', description: 'See your resume update in real-time as you type.' },
  { icon: Upload, title: 'Resume Import', description: 'Upload an existing PDF or DOCX to get started fast.' },
  { icon: Shield, title: 'No Watermark', description: 'Clean, professional exports without any branding.' },
  { icon: CheckCircle, title: 'No Login Required', description: 'Start building immediately. No account needed.' },
  { icon: Smartphone, title: 'Mobile Responsive', description: 'Create and edit your resume on any device.' },
  { icon: Shield, title: 'Privacy First', description: 'Your data stays on your device. We don\'t store your resume.' },
];

export default function HomePage() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>CVMint — Free Resume Builder | No Login Required</title>
        <meta
          name="description"
          content="Build a job-winning resume for free. Professional templates, PDF & DOCX export, ATS-friendly formatting. No login, no watermarks, no subscriptions."
        />
      </Helmet>

      {/* ─── Hero Section ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-primary-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 mb-6">
                <Sparkles size={14} className="text-primary-600" />
                <span className="text-xs font-medium text-primary-700">100% Free — No Login Required</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-secondary-900 leading-tight tracking-tight">
                Build a Job-Winning Resume{' '}
                <span className="text-primary-600">for Free</span>
              </h1>
              <p className="mt-5 text-lg text-secondary-600 leading-relaxed">
                Create, customize and download a professional resume in minutes — no subscription required.
                Choose from ATS-friendly templates, export as PDF or DOCX, and land more interviews.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/resume-builder">
                  <Button size="lg" icon={<ArrowRight size={18} />}>
                    Create Resume Free
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  icon={<Upload size={18} />}
                  onClick={() => setUploadModalOpen(true)}
                >
                  Upload Existing Resume
                </Button>
              </div>
              <p className="mt-4 text-sm text-secondary-400">
                No login · No credit card · No watermark
              </p>
            </div>

            {/* Right: Resume Preview Mockup */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Main resume card */}
                <div className="bg-white rounded-xl shadow-2xl border border-secondary-200 p-7 max-w-[440px] ml-auto transform rotate-1 hover:rotate-0 transition-transform duration-500 text-left">
                  {/* Real resume preview */}
                  <div className="space-y-3.5">
                    <div>
                      <h3 className="text-xl font-bold text-secondary-900 leading-tight">Alex Morgan</h3>
                      <p className="text-xs font-semibold text-primary-600 mt-0.5">Senior Full-Stack & Cloud Engineer</p>
                      <p className="text-[11px] text-secondary-500 mt-1">
                        San Francisco, CA • alex.morgan@example.com • +1 (555) 234-5678
                      </p>
                    </div>

                    <div className="border-t border-secondary-200 pt-2.5">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-secondary-900 mb-1">
                        Summary
                      </h4>
                      <p className="text-[11px] text-secondary-600 leading-relaxed">
                        High-impact engineer with 6+ years building scalable distributed systems and cloud platforms handling 10M+ daily events.
                      </p>
                    </div>

                    <div className="border-t border-secondary-200 pt-2.5">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-secondary-900 mb-1.5">
                        Experience
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between items-baseline">
                            <span className="text-xs font-semibold text-secondary-900">Senior Software Engineer — CloudScale</span>
                            <span className="text-[10px] text-secondary-500">2022 – Present</span>
                          </div>
                          <p className="text-[11px] text-secondary-600 mt-0.5">
                            • Architected event-driven microservices reducing latency by 42%
                          </p>
                          <p className="text-[11px] text-secondary-600">
                            • Scaled Kubernetes clusters handling 50k requests/sec at 99.99% uptime
                          </p>
                        </div>
                        <div>
                          <div className="flex justify-between items-baseline">
                            <span className="text-xs font-semibold text-secondary-900">Software Engineer — DataFlow Inc</span>
                            <span className="text-[10px] text-secondary-500">2019 – 2022</span>
                          </div>
                          <p className="text-[11px] text-secondary-600 mt-0.5">
                            • Built real-time streaming ETL pipelines processing 2TB+ daily data
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-secondary-200 pt-2.5">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-secondary-900 mb-1.5">
                        Skills
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {['TypeScript', 'React', 'Node.js', 'Python', 'Go', 'AWS', 'Docker', 'PostgreSQL'].map((s) => (
                          <span key={s} className="px-2 py-0.5 text-[10px] font-medium bg-primary-50 text-primary-700 rounded-md border border-primary-100">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-100 rounded-full opacity-40 -z-10" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-50 rounded-full opacity-60 -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How It Works ───────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900">How It Works</h2>
            <p className="mt-3 text-lg text-secondary-500">Four simple steps to your professional resume</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 mb-4 group-hover:bg-primary-100 transition-colors">
                  <step.icon size={24} />
                </div>
                <div className="text-xs font-bold text-primary-400 mb-1">STEP {step.number}</div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">{step.title}</h3>
                <p className="text-sm text-secondary-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Use CVMint ─────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900">Why Use CVMint?</h2>
            <p className="mt-3 text-lg text-secondary-500">Everything you need to create a professional resume</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-5 border border-secondary-200 hover:shadow-md hover:border-secondary-300 transition-all duration-200"
              >
                <feature.icon size={22} className="text-primary-600 mb-3" />
                <h3 className="text-sm font-semibold text-secondary-900 mb-1">{feature.title}</h3>
                <p className="text-xs text-secondary-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900">
            Ready to Build Your Resume?
          </h2>
          <p className="mt-4 text-lg text-secondary-500">
            Join thousands of job seekers who've created their professional resume with CVMint.
            It's completely free — start now.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/resume-builder">
              <Button size="lg" icon={<ArrowRight size={18} />}>
                Create Resume Free
              </Button>
            </Link>
            <Link to="/resume-templates">
              <Button variant="outline" size="lg" icon={<Eye size={18} />}>
                View Templates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Upload Modal */}
      <UploadResumeModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onSuccess={() => navigate('/resume-builder')}
      />
    </>
  );
}
