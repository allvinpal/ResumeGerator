import { Helmet } from 'react-helmet-async';

export default function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — CVMint</title>
        <meta name="description" content="CVMint privacy policy. Your resume data stays on your device." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-secondary-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-secondary max-w-none space-y-6">
          <p className="text-secondary-600">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900">Your Data, Your Device</h2>
            <p className="text-secondary-600">
              CVMint is designed with a privacy-first approach. All resume data you create is stored
              locally on your device using your browser's built-in storage (IndexedDB/localStorage).
              <strong> Your resume content never leaves your browser unless you explicitly choose to export or download it.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900">What We Store</h2>
            <ul className="text-secondary-600 list-disc pl-6 space-y-1">
              <li>Resume data is stored in your browser's local storage (IndexedDB).</li>
              <li>No resume content is sent to any server.</li>
              <li>No account or login is required.</li>
              <li>No personal data is collected or sold.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900">Cookies</h2>
            <p className="text-secondary-600">
              We do not use tracking cookies. If analytics are enabled in the future, we will update this policy
              and clearly disclose what is collected.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900">Third-Party Services</h2>
            <p className="text-secondary-600">
              CVMint loads fonts from Google Fonts. This means Google may receive your IP address when
              the page loads. No other third-party services receive your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900">Deleting Your Data</h2>
            <p className="text-secondary-600">
              You can delete all locally stored resume data by clearing your browser's site data for this website.
              Go to your browser settings → Site Settings → Clear Data for this site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900">Contact</h2>
            <p className="text-secondary-600">
              If you have questions about this privacy policy, please open an issue on our GitHub repository.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
