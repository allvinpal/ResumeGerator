import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const examples = [
  { slug: 'data-engineer', title: 'Data Engineer', description: 'Pipeline building, cloud platforms, big data technologies.' },
  { slug: 'software-engineer', title: 'Software Engineer', description: 'Full-stack development, system design, coding skills.' },
  { slug: 'data-scientist', title: 'Data Scientist', description: 'Machine learning, statistical analysis, data visualization.' },
  { slug: 'cloud-engineer', title: 'Cloud Engineer', description: 'Cloud architecture, infrastructure, DevOps.' },
  { slug: 'devops-engineer', title: 'DevOps Engineer', description: 'CI/CD, automation, infrastructure as code.' },
  { slug: 'business-analyst', title: 'Business Analyst', description: 'Requirements analysis, stakeholder management.' },
  { slug: 'product-manager', title: 'Product Manager', description: 'Product strategy, roadmaps, user research.' },
  { slug: 'mba', title: 'MBA', description: 'Business strategy, leadership, finance.' },
  { slug: 'fresher', title: 'B.Tech Fresher', description: 'Recent graduate, internships, academic projects.' },
  { slug: 'mba-fresher', title: 'MBA Fresher', description: 'MBA graduate, case studies, summer internships.' },
  { slug: 'accountant', title: 'Accountant', description: 'Financial reporting, auditing, compliance.' },
  { slug: 'marketing-manager', title: 'Marketing Manager', description: 'Brand strategy, digital marketing, campaigns.' },
  { slug: 'project-manager', title: 'Project Manager', description: 'PMP, Agile, stakeholder management, delivery.' },
];

export default function ExamplesPage() {
  return (
    <>
      <Helmet>
        <title>Resume Examples — ResumeForge</title>
        <meta name="description" content="Browse professional resume examples for Data Engineer, Software Engineer, MBA, Fresher, and more. Use any example as a template." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900">Resume Examples</h1>
          <p className="mt-3 text-lg text-secondary-500">
            Browse resume examples for different roles. Click "Use This Resume" to start with a pre-filled template.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((ex) => (
            <div key={ex.slug} className="bg-white rounded-xl border border-secondary-200 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-secondary-900">{ex.title}</h3>
              <p className="text-sm text-secondary-500 mt-1 mb-4">{ex.description}</p>
              <div className="flex gap-2">
                <Link to={`/resume-builder?demo=true`}>
                  <Button size="sm">Use This Resume</Button>
                </Link>
                <Link to={`/resume-examples/${ex.slug}`}>
                  <Button variant="outline" size="sm">View</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
