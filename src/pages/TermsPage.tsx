import { Helmet } from 'react-helmet-async';

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms of Use — ResumeForge</title>
        <meta name="description" content="ResumeForge terms of use. Free resume builder with no guarantees of employment outcomes." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-secondary-900 mb-8">Terms of Use</h1>

        <div className="prose prose-secondary max-w-none space-y-6">
          <p className="text-secondary-600">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900">Service Description</h2>
            <p className="text-secondary-600">
              ResumeForge provides free online tools for creating, editing, and exporting professional resumes.
              The service is provided "as is" without warranties of any kind.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900">Content Ownership</h2>
            <p className="text-secondary-600">
              You retain full ownership of all resume content you create using ResumeForge.
              We do not claim any rights to your personal information or resume content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900">ATS Scores</h2>
            <p className="text-secondary-600">
              ATS compatibility scores provided by ResumeForge are estimates based on keyword matching and
              formatting analysis. <strong>They do not guarantee that your resume will pass any specific
              employer's Applicant Tracking System.</strong> Different employers use different ATS software
              with different configurations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900">No Employment Guarantee</h2>
            <p className="text-secondary-600">
              ResumeForge is a resume-building tool. We do not guarantee any employment outcomes, interviews,
              or job offers as a result of using our service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900">Accuracy</h2>
            <p className="text-secondary-600">
              You are solely responsible for the accuracy, completeness, and truthfulness of the information
              in your resume. Do not include false or misleading information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900">Free Service</h2>
            <p className="text-secondary-600">
              The core features of ResumeForge — resume creation, template selection, PDF export, and DOCX
              export — are free and will remain free. No hidden fees, no forced subscriptions.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
