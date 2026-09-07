import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function JobMatcherPage() {
  return (
    <>
      <Helmet>
        <title>Job Description Matcher — CVMint</title>
        <meta name="description" content="Match your resume to a job description. Find matching skills, missing keywords, and get suggestions to improve your application." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900">Job Description Matcher</h1>
          <p className="mt-3 text-lg text-secondary-500">
            Compare your resume against a job description to identify matching and missing skills.
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
      </div>
    </>
  );
}
