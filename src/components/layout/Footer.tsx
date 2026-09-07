import { Link } from 'react-router-dom';
import { FileText, Heart } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Resume Builder', path: '/resume-builder' },
    { label: 'Templates', path: '/resume-templates' },
    { label: 'Resume Examples', path: '/resume-examples' },
    { label: 'Resume Tips', path: '/resume-tips' },
  ],
  tools: [
    { label: 'ATS Checker', path: '/ats-resume-checker' },
    { label: 'Job Matcher', path: '/job-description-matcher' },
  ],
  company: [
    { label: 'About', path: '/about' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Use', path: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-secondary-50 border-t border-secondary-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 no-underline mb-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <FileText size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-secondary-900">
                Resume<span className="text-primary-600">Forge</span>
              </span>
            </Link>
            <p className="text-sm text-secondary-500 leading-relaxed">
              Create a professional resume for free. No login required. No watermarks. Your data stays on your device.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-secondary-900 mb-3">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-secondary-500 hover:text-secondary-700 transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Links */}
          <div>
            <h3 className="text-sm font-semibold text-secondary-900 mb-3">Tools</h3>
            <ul className="space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-secondary-500 hover:text-secondary-700 transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-secondary-900 mb-3">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-secondary-500 hover:text-secondary-700 transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-secondary-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-secondary-400">
            © {new Date().getFullYear()} ResumeForge. Free and open source.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-sm text-secondary-400">
              Made with <Heart size={14} className="text-red-400" /> for job seekers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
