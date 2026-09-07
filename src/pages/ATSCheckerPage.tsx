import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function ATSCheckerPage() {
  return (
    <>
      <Helmet>
        <title>Free ATS Resume Checker — ResumeForge</title>
        <meta name="description" content="Check your resume against job descriptions for free. Get an ATS compatibility score and suggestions to improve your resume." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900">ATS Resume Checker</h1>
          <p className="mt-3 text-lg text-secondary-500">
            Check how well your resume matches a job description. Get a score and actionable suggestions.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-secondary-200 p-8">
          <p className="text-secondary-500 text-center mb-6">
            This feature will be available in a future update. Build your resume first using our builder.
          </p>
          <div className="flex justify-center">
            <Link to="/resume-builder">
              <Button>Go to Resume Builder</Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-700">
            <strong>Note:</strong> ATS scores are estimates based on keyword matching and formatting analysis.
            They do not guarantee passing any employer's specific Applicant Tracking System.
          </p>
        </div>
      </div>
    </>
  );
}
