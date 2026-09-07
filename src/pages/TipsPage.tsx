import { Helmet } from 'react-helmet-async';

const tips = [
  { title: 'Tailor Your Resume to the Job', content: 'Customize your resume for each application. Mirror the language from the job description and highlight relevant skills and experiences.' },
  { title: 'Use Strong Action Verbs', content: 'Start bullet points with powerful action verbs like "Designed," "Implemented," "Optimized," "Automated," "Led," and "Delivered."' },
  { title: 'Quantify Your Achievements', content: 'Use numbers to demonstrate impact: "Reduced pipeline latency by 40%," "Processed 50M+ records daily," "Saved $15K/month in compute costs."' },
  { title: 'Keep It Concise', content: 'Aim for 1-2 pages. Remove irrelevant experience and filler words. Every line should add value.' },
  { title: 'Use ATS-Friendly Formatting', content: 'Avoid tables, columns, headers/footers, and images in ATS-optimized resumes. Use standard section headings that ATS software recognizes.' },
  { title: 'Include Relevant Keywords', content: 'Include industry-specific keywords and skills that match the job description. ATS systems scan for keyword matches.' },
  { title: 'Professional Summary Matters', content: 'Write a 2-3 sentence summary highlighting your years of experience, key skills, and most notable achievement.' },
  { title: 'Proofread Carefully', content: 'Check for spelling errors, grammatical mistakes, and formatting inconsistencies. Have someone else review your resume.' },
  { title: 'Use a Clean, Professional Format', content: 'Choose a clean template with consistent fonts, spacing, and alignment. White space improves readability.' },
  { title: 'Include Relevant Certifications', content: 'Professional certifications add credibility. Include them in a dedicated section with the issuing organization and date.' },
];

export default function TipsPage() {
  return (
    <>
      <Helmet>
        <title>Resume Tips — ResumeForge</title>
        <meta name="description" content="Expert resume writing tips to help you land more interviews. Learn how to format, optimize, and tailor your resume." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900">Resume Tips</h1>
          <p className="mt-3 text-lg text-secondary-500">Expert advice to make your resume stand out.</p>
        </div>

        <div className="space-y-6">
          {tips.map((tip, i) => (
            <div key={i} className="bg-white rounded-xl border border-secondary-200 p-6">
              <h2 className="text-lg font-semibold text-secondary-900 mb-2">
                {i + 1}. {tip.title}
              </h2>
              <p className="text-secondary-600 leading-relaxed">{tip.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
