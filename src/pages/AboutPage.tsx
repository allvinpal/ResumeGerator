import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Heart, Shield, Zap, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — CVMint</title>
        <meta name="description" content="CVMint is a free, open-source resume builder. No login, no watermarks, no hidden fees." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900">About CVMint</h1>
          <p className="mt-3 text-lg text-secondary-500">
            Create a professional resume for free.
          </p>
        </div>

        <div className="prose prose-secondary max-w-none">
          <p className="text-secondary-600 leading-relaxed text-lg">
            CVMint is a free, open-source resume builder designed for everyone — students, freshers,
            experienced professionals, developers, data engineers, managers, MBA candidates, and job seekers worldwide.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            {[
              { icon: Heart, title: 'Free Forever', desc: 'Core features are completely free. No hidden paywalls.' },
              { icon: Shield, title: 'Privacy First', desc: 'Your resume stays on your device. No server uploads.' },
              { icon: Zap, title: 'Fast & Simple', desc: 'Build a resume in minutes with live preview.' },
              { icon: Globe, title: 'Open Source', desc: 'Built with transparency. Contribute on GitHub.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-secondary-200 p-5">
                <item.icon size={24} className="text-primary-600 mb-3" />
                <h3 className="text-lg font-semibold text-secondary-900">{item.title}</h3>
                <p className="text-sm text-secondary-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/resume-builder">
              <Button size="lg">Start Building Your Resume</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
