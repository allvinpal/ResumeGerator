import type { TemplateType } from '../../types/resume';

interface Props {
  template: TemplateType;
}

export default function TemplateThumbnail({ template }: Props) {
  switch (template) {
    case 'executive':
      return (
        <div className="w-full h-full bg-white flex flex-col text-[7px] leading-tight select-none overflow-hidden border border-secondary-200 rounded shadow-sm">
          {/* Executive Top Banner */}
          <div className="bg-slate-900 text-white p-2.5">
            <div className="font-bold text-[9px] tracking-wide">ALEXANDER WRIGHT</div>
            <div className="text-slate-300 text-[6px] uppercase tracking-widest mt-0.5">Senior Director of Engineering</div>
            <div className="text-slate-400 text-[5px] mt-1">New York, NY • a.wright@email.com • +1 555-0192</div>
          </div>
          <div className="p-2 space-y-1.5 flex-1 bg-white">
            <div>
              <div className="font-bold text-[6.5px] uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-1">
                Executive Profile
              </div>
              <div className="text-slate-600 text-[5.5px] line-clamp-2">
                Visionary technology leader with 12+ years driving cloud transformation, engineering strategy, and organizational growth across enterprise teams.
              </div>
            </div>
            <div>
              <div className="font-bold text-[6.5px] uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-1">
                Leadership History
              </div>
              <div className="font-semibold text-slate-800 text-[6px]">VP of Engineering — Global Tech Corp</div>
              <div className="text-slate-500 text-[5px]">2021 – Present • Scale engineering org from 40 to 150+ engineers across 4 regions</div>
              <div className="font-semibold text-slate-800 text-[6px] mt-1">Director of Architecture — CloudScale Inc</div>
              <div className="text-slate-500 text-[5px]">2017 – 2021 • Led migration of 200+ microservices to Kubernetes & AWS</div>
            </div>
            <div>
              <div className="font-bold text-[6.5px] uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-1">
                Core Competencies
              </div>
              <div className="text-slate-700 text-[5.5px]">Strategic Planning • Enterprise Cloud • Budget Management • M&A Tech Integration</div>
            </div>
          </div>
        </div>
      );

    case 'tech':
      return (
        <div className="w-full h-full bg-white flex flex-col text-[7px] leading-tight select-none overflow-hidden border border-secondary-200 rounded shadow-sm p-2.5">
          <div className="border-l-2 border-sky-500 pl-1.5 mb-2">
            <div className="font-bold text-[9px] text-slate-900">JORDAN CHEN</div>
            <div className="text-sky-600 font-mono text-[6px]">&lt;Senior Full-Stack Engineer /&gt;</div>
            <div className="text-slate-500 text-[5px] font-mono mt-0.5">jordan.io • github.com/jchen • sf, ca</div>
          </div>
          <div className="space-y-1.5 flex-1">
            <div>
              <div className="font-bold text-[6.5px] uppercase tracking-wider text-slate-800 border-b border-sky-400 pb-0.5 mb-1">
                Tech Stack
              </div>
              <div className="flex flex-wrap gap-1">
                {['TypeScript', 'React', 'Node.js', 'Go', 'PostgreSQL', 'Docker'].map((s) => (
                  <span key={s} className="bg-slate-100 text-slate-800 px-1 py-0.2 rounded font-mono text-[5px] border border-slate-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="font-bold text-[6.5px] uppercase tracking-wider text-slate-800 border-b border-sky-400 pb-0.5 mb-1">
                Experience
              </div>
              <div className="font-semibold text-slate-900 text-[6px]">Staff Software Engineer — DataFlow</div>
              <div className="text-slate-500 text-[5px]">2022 – Present • High-throughput streaming data pipelines</div>
              <div className="font-semibold text-slate-900 text-[6px] mt-1">Full Stack Developer — SaaS Metrics</div>
              <div className="text-slate-500 text-[5px]">2019 – 2022 • Reduced API latency by 45% using Redis caching</div>
            </div>
            <div>
              <div className="font-bold text-[6.5px] uppercase tracking-wider text-slate-800 border-b border-sky-400 pb-0.5 mb-1">
                Featured Project
              </div>
              <div className="font-semibold text-slate-800 text-[6px]">OpenSource Distributed Queue</div>
              <div className="text-slate-600 text-[5.5px]">2.4k GitHub stars • 10M+ docker pulls</div>
            </div>
          </div>
        </div>
      );

    case 'classic':
      return (
        <div className="w-full h-full bg-white flex flex-col text-[7px] leading-tight select-none overflow-hidden border border-secondary-200 rounded shadow-sm p-3 font-serif">
          <div className="text-center border-b border-slate-900 pb-1.5 mb-2">
            <div className="font-bold text-[9px] uppercase tracking-widest text-slate-900">ELEANOR VANCE</div>
            <div className="italic text-slate-600 text-[6px] mt-0.5">Corporate Financial Analyst</div>
            <div className="text-slate-500 text-[5px] mt-0.5">Chicago, IL • e.vance@chicagomail.com • (312) 555-0143</div>
          </div>
          <div className="space-y-1.5 flex-1">
            <div>
              <div className="font-bold text-[6.5px] uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-0.5 mb-1">
                Professional Experience
              </div>
              <div className="flex justify-between font-bold text-[6px] text-slate-900">
                <span>Senior Financial Analyst, Vanguard Group</span>
                <span className="italic font-normal text-slate-600">2020 – Present</span>
              </div>
              <div className="text-slate-700 text-[5.5px] mt-0.5">
                • Built valuation models for $450M portfolio management and risk mitigation.
              </div>
              <div className="flex justify-between font-bold text-[6px] text-slate-900 mt-1">
                <span>Investment Banking Analyst, Morgan & Co</span>
                <span className="italic font-normal text-slate-600">2018 – 2020</span>
              </div>
              <div className="text-slate-700 text-[5.5px] mt-0.5">
                • Conducted due diligence across 14 closed M&A transactions.
              </div>
            </div>
            <div>
              <div className="font-bold text-[6.5px] uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-0.5 mb-1">
                Education
              </div>
              <div className="font-bold text-[6px] text-slate-900">B.S. in Finance, Northwestern University</div>
              <div className="italic text-slate-600 text-[5px]">Summa Cum Laude, GPA 3.92</div>
            </div>
            <div>
              <div className="font-bold text-[6.5px] uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-0.5 mb-1">
                Certifications
              </div>
              <div className="text-slate-700 text-[5.5px]">Chartered Financial Analyst (CFA) Level III • Series 7 & 63</div>
            </div>
          </div>
        </div>
      );

    case 'ats':
      return (
        <div className="w-full h-full bg-white flex flex-col text-[7px] leading-tight select-none overflow-hidden border border-secondary-200 rounded shadow-sm p-3 font-sans">
          <div className="text-center border-b border-black pb-1 mb-2">
            <div className="font-bold text-[9px] uppercase tracking-wide text-black">ROBERT T. STERLING</div>
            <div className="font-semibold text-black text-[6px] mt-0.5">OPERATIONS MANAGER</div>
            <div className="text-black text-[5px] mt-0.5">Austin, TX | rsterling@email.com | 512-555-0182 | linkedin.com/in/rsterling</div>
          </div>
          <div className="space-y-1.5 flex-1">
            <div>
              <div className="font-bold text-[6.5px] uppercase tracking-wider text-black border-b border-black pb-0.5 mb-0.5">
                PROFESSIONAL SUMMARY
              </div>
              <div className="text-black text-[5.5px]">
                Certified Operations Manager with 8+ years optimizing logistics workflows and reducing costs by 22% across multi-site distribution hubs.
              </div>
            </div>
            <div>
              <div className="font-bold text-[6.5px] uppercase tracking-wider text-black border-b border-black pb-0.5 mb-0.5">
                WORK EXPERIENCE
              </div>
              <div className="flex justify-between font-bold text-[6px] text-black">
                <span>Operations Lead - Pinnacle Logistics</span>
                <span>2021 - Present</span>
              </div>
              <div className="text-black text-[5.5px]">
                • Spearheaded automation rollout saving $180,000 annually.
              </div>
              <div className="flex justify-between font-bold text-[6px] text-black mt-1">
                <span>Supply Chain Coordinator - Apex Hub</span>
                <span>2018 - 2021</span>
              </div>
              <div className="text-black text-[5.5px]">
                • Maintained 99.4% on-time fulfillment rating for Tier-1 accounts.
              </div>
            </div>
            <div>
              <div className="font-bold text-[6.5px] uppercase tracking-wider text-black border-b border-black pb-0.5 mb-0.5">
                SKILLS
              </div>
              <div className="text-black text-[5.5px]">Lean Six Sigma Black Belt, Supply Chain Management, ERP SAP, Kaizen, KPI Dashboards</div>
            </div>
          </div>
        </div>
      );

    case 'minimal':
      return (
        <div className="w-full h-full bg-white flex flex-col text-[7px] leading-tight select-none overflow-hidden border border-secondary-200 rounded shadow-sm p-3 font-sans">
          <div className="mb-2">
            <div className="font-light text-[10px] tracking-tight text-slate-900">Maya Lin</div>
            <div className="text-slate-500 text-[6px] font-medium mt-0.5">Product Designer & Researcher</div>
            <div className="text-slate-400 text-[5px] mt-0.5">Berlin / maya.design / hello@mayalin.com</div>
          </div>
          <div className="space-y-1.5 flex-1">
            <div>
              <div className="font-semibold text-[5.5px] uppercase tracking-widest text-slate-400 mb-0.5">About</div>
              <div className="text-slate-600 text-[5.5px] font-light">
                Creating intuitive digital experiences through rigorous research and clean, accessible user interfaces.
              </div>
            </div>
            <div>
              <div className="font-semibold text-[5.5px] uppercase tracking-widest text-slate-400 mb-0.5">Experience</div>
              <div className="font-medium text-slate-900 text-[6px]">Lead Product Designer — Figma Labs</div>
              <div className="text-slate-400 text-[5px]">2022 — Present • Design systems & interaction design</div>
              <div className="font-medium text-slate-900 text-[6px] mt-1">Senior UI/UX Designer — Monolith Studio</div>
              <div className="text-slate-400 text-[5px]">2019 — 2022 • Mobile apps & web platforms</div>
            </div>
            <div>
              <div className="font-semibold text-[5.5px] uppercase tracking-widest text-slate-400 mb-0.5">Tooling</div>
              <div className="text-slate-700 text-[5.5px]">Figma · Design Systems · User Testing · Prototyping · HTML/CSS</div>
            </div>
          </div>
        </div>
      );

    case 'creative':
      return (
        <div className="w-full h-full bg-white flex flex-col text-[7px] leading-tight select-none overflow-hidden border border-secondary-200 rounded shadow-sm p-3">
          <div className="text-center mb-2">
            <div className="font-extrabold text-[10px] text-purple-700 tracking-tight">SOPHIA MARTINEZ</div>
            <div className="text-slate-600 uppercase text-[5.5px] tracking-widest font-semibold mt-0.5">Creative Director & Brand Strategist</div>
            <div className="text-slate-400 text-[5px] mt-0.5">Los Angeles, CA • sophia.art • +1 310-555-0149</div>
          </div>
          <div className="space-y-1.5 flex-1">
            <div>
              <div className="font-bold text-[6.5px] uppercase tracking-wider text-purple-700 flex items-center gap-1 mb-1">
                <span>✦</span> Profile
              </div>
              <div className="text-slate-600 text-[5.5px]">
                Award-winning creative director with 9+ years conceptualizing global 360° branding and visual campaigns.
              </div>
            </div>
            <div>
              <div className="font-bold text-[6.5px] uppercase tracking-wider text-purple-700 flex items-center gap-1 mb-1">
                <span>✦</span> Experience
              </div>
              <div className="font-bold text-slate-900 text-[6px]">Creative Lead — Horizon Media Group</div>
              <div className="text-purple-600 font-medium text-[5px]">2021 – Present • Directed Cannes Lion winning campaign</div>
              <div className="font-bold text-slate-900 text-[6px] mt-1">Senior Art Director — Nexus Creative</div>
              <div className="text-purple-600 font-medium text-[5px]">2018 – 2021 • Led rebrand for 6 Fortune 500 brands</div>
            </div>
            <div>
              <div className="font-bold text-[6.5px] uppercase tracking-wider text-purple-700 flex items-center gap-1 mb-1">
                <span>✦</span> Skills & Disciplines
              </div>
              <div className="flex flex-wrap gap-1">
                {['Brand Strategy', 'Art Direction', '3D Design', 'Campaigns', 'Motion'].map(s => (
                  <span key={s} className="bg-purple-50 text-purple-700 px-1 py-0.2 rounded-full text-[5px] border border-purple-100 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case 'corporate':
      return (
        <div className="w-full h-full bg-white flex flex-col text-[7px] leading-tight select-none overflow-hidden border border-secondary-200 rounded shadow-sm p-3">
          <div className="flex justify-between items-start border-b-2 border-blue-900 pb-1.5 mb-2">
            <div>
              <div className="font-extrabold text-[9px] text-slate-900">MARCUS A. REED</div>
              <div className="text-blue-900 font-bold text-[6px]">Senior Strategy Consultant</div>
            </div>
            <div className="text-right text-slate-500 text-[5px]">
              <div>Boston, MA</div>
              <div>m.reed@strategy.com</div>
              <div>617-555-0199</div>
            </div>
          </div>
          <div className="space-y-1.5 flex-1">
            <div>
              <div className="font-bold text-[6.5px] uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-0.5 mb-1">
                Professional Experience
              </div>
              <div className="flex justify-between font-bold text-[6px] text-slate-900">
                <span>Principal Consultant — Boston Advisory Group</span>
                <span className="text-slate-500 font-normal">2021 – Present</span>
              </div>
              <div className="text-slate-600 text-[5.5px]">Led restructuring for $2B consumer goods client, delivering $35M in cost savings.</div>
              <div className="flex justify-between font-bold text-[6px] text-slate-900 mt-1">
                <span>Management Consultant — Deloitte</span>
                <span className="text-slate-500 font-normal">2018 – 2021</span>
              </div>
              <div className="text-slate-600 text-[5.5px]">Advised C-suite leadership on digital transformation roadmap and PMO governance.</div>
            </div>
            <div>
              <div className="font-bold text-[6.5px] uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-0.5 mb-1">
                Education
              </div>
              <div className="font-bold text-[6px] text-slate-900">MBA, Harvard Business School (2018)</div>
              <div className="text-slate-600 text-[5px]">B.A. Economics, Columbia University</div>
            </div>
            <div>
              <div className="font-bold text-[6.5px] uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-0.5 mb-1">
                Competencies
              </div>
              <div className="text-slate-700 text-[5.5px]">Corporate Strategy • M&A Advisory • Financial Modeling • Change Management</div>
            </div>
          </div>
        </div>
      );

    case 'modern':
    default:
      return (
        <div className="w-full h-full bg-white flex flex-col text-[7px] leading-tight select-none overflow-hidden border border-secondary-200 rounded shadow-sm p-3">
          <div className="text-center mb-2">
            <div className="font-bold text-[10px] text-slate-900">SARAH JENKINS</div>
            <div className="text-blue-600 font-semibold text-[6.5px] mt-0.5">Senior Product Manager</div>
            <div className="text-slate-500 text-[5px] mt-0.5">San Francisco, CA • sarah.j@email.com • +1 415-555-0138</div>
          </div>
          <div className="space-y-1.5 flex-1">
            <div>
              <div className="font-bold text-[6.5px] uppercase tracking-wider text-slate-900 border-b-2 border-blue-600 pb-0.5 mb-1">
                Professional Summary
              </div>
              <div className="text-slate-600 text-[5.5px]">
                Accomplished Product Manager with 7+ years driving B2B SaaS growth from 0 to $20M ARR. Customer-centric problem solver.
              </div>
            </div>
            <div>
              <div className="font-bold text-[6.5px] uppercase tracking-wider text-slate-900 border-b-2 border-blue-600 pb-0.5 mb-1">
                Work Experience
              </div>
              <div className="flex justify-between font-semibold text-[6px] text-slate-900">
                <span>Lead PM — Enterprise Cloud</span>
                <span className="text-slate-400">2021 – Present</span>
              </div>
              <div className="text-slate-600 text-[5.5px]">• Scaled daily active users by 140% through AI search feature launch</div>
              <div className="flex justify-between font-semibold text-[6px] text-slate-900 mt-1">
                <span>Product Manager — GrowthWorks</span>
                <span className="text-slate-400">2018 – 2021</span>
              </div>
              <div className="text-slate-600 text-[5.5px]">• Increased free-to-paid conversion rate by 28% via onboarding overhaul</div>
            </div>
            <div>
              <div className="font-bold text-[6.5px] uppercase tracking-wider text-slate-900 border-b-2 border-blue-600 pb-0.5 mb-1">
                Skills
              </div>
              <div className="text-slate-700 text-[5.5px]">Product Strategy • Agile/Scrum • SQL & Analytics • Roadmapping • User Research</div>
            </div>
          </div>
        </div>
      );
  }
}
