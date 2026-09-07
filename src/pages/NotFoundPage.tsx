import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found — ResumeForge</title>
      </Helmet>

      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="text-6xl font-bold text-secondary-200 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-secondary-900 mb-2">Page Not Found</h2>
        <p className="text-secondary-500 mb-8">
          The page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <div className="flex justify-center gap-3">
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
          <Link to="/resume-builder">
            <Button variant="outline">Build Resume</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
