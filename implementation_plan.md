# ResumeForge — Full Implementation Plan

Build a modern, free, public-facing Resume Maker web application at `d:\Project\Resume`.

---

## User Review Required

> [!IMPORTANT]
> **This is a very large project (~100+ files, 7 phases).** I will build it phase-by-phase, verifying each phase works before moving on. The full build will take significant time. Please confirm you're ready to proceed.

> [!IMPORTANT]
> **Tailwind CSS**: Your spec requests Tailwind CSS. Since you didn't specify a version, I'll use **Tailwind CSS v4** (latest). Let me know if you prefer v3.

> [!WARNING]
> **AI-Assisted Features**: The "Improve Summary", "Make ATS Friendly" buttons require an LLM API. These will be implemented with graceful fallbacks — they'll show helpful tips/templates instead of breaking when no API key is configured. A `.env.example` will document where to add an API key later.

> [!NOTE]  
> **OCR for scanned PDFs**: Full OCR (Tesseract.js) adds ~15MB to bundle size. I'll implement it as a lazy-loaded optional feature that downloads on-demand only when a user uploads a scanned PDF.

---

## Open Questions

> [!IMPORTANT]
> 1. **Domain/Deployment**: Do you plan to deploy this to a custom domain, or is Vercel/Netlify fine for now?
> 2. **Sample Resume PDF/DOCX**: You mentioned "use the uploaded sample resume" — I don't see an uploaded file. Should I create the sample Data Engineer resume (Allvin Pal) from the details you provided in Section 18, or do you have a file to upload?
> 3. **13 Resume Example pages** (Section 32): These each need full sample resume content. I'll create realistic sample data for each role. OK to proceed with generated (but realistic) content?

---

## Technology Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | React 19 + Vite 6 | Fast builds, client-side SPA, free static hosting |
| **Language** | TypeScript | Type safety for complex data model |
| **Routing** | React Router v7 | SPA routing with SEO-friendly paths |
| **Styling** | Tailwind CSS v4 | Per user request |
| **UI Components** | Custom components (shadcn-style) | No heavy dependency, full control |
| **State** | Zustand | Lightweight, excellent DX |
| **Forms** | React Hook Form + Zod | Validation, performance |
| **PDF Export** | `@react-pdf/renderer` | True vector PDF, selectable text, no screenshots |
| **DOCX Export** | `docx` npm package | Real .docx generation, works client-side |
| **PDF Import** | `pdfjs-dist` (PDF.js) | Client-side PDF text extraction |
| **DOCX Import** | `mammoth.js` | Client-side DOCX → text extraction |
| **OCR** | `tesseract.js` (lazy) | Optional, for scanned PDFs |
| **Drag & Drop** | `@dnd-kit/core` | Accessible drag-and-drop |
| **Storage** | IndexedDB via `idb` | Local-first, multiple resumes |
| **Icons** | `lucide-react` | Clean, consistent icons |
| **Fonts** | Google Fonts (Inter, Roboto) | Professional typography |
| **Print** | `@media print` CSS | Native browser print |
| **PWA** | `vite-plugin-pwa` | Offline support, installable |

---

## Project Structure

```
d:\Project\Resume\
├── public/
│   ├── favicon.svg
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types/
│   │   └── resume.ts              # Core data model + Zod schemas
│   ├── store/
│   │   ├── resumeStore.ts          # Zustand store for active resume
│   │   └── appStore.ts             # UI state (sidebar, modals, etc.)
│   ├── data/
│   │   ├── sampleResume.ts         # Allvin Pal demo resume
│   │   ├── exampleResumes.ts       # 13 role-based examples
│   │   └── resumeTips.ts           # Tips content
│   ├── hooks/
│   │   ├── useResume.ts
│   │   ├── useStorage.ts           # IndexedDB operations
│   │   ├── useDebounce.ts
│   │   └── useMediaQuery.ts
│   ├── lib/
│   │   ├── storage.ts              # IndexedDB wrapper
│   │   ├── pdfExporter.tsx         # @react-pdf/renderer templates
│   │   ├── docxExporter.ts         # docx library generation
│   │   ├── pdfParser.ts            # PDF.js text extraction
│   │   ├── docxParser.ts           # mammoth.js parsing
│   │   ├── resumeParser.ts         # Section identification & mapping
│   │   ├── atsChecker.ts           # ATS scoring logic
│   │   ├── jobMatcher.ts           # Job description matching
│   │   ├── qualityChecker.ts       # Resume quality analysis
│   │   └── utils.ts                # Helpers
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Progress.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   └── Alert.tsx
│   │   ├── builder/
│   │   │   ├── ResumeBuilder.tsx       # Main builder layout
│   │   │   ├── BuilderSidebar.tsx      # Step navigation
│   │   │   ├── PersonalInfoForm.tsx
│   │   │   ├── SummaryForm.tsx
│   │   │   ├── ExperienceForm.tsx
│   │   │   ├── EducationForm.tsx
│   │   │   ├── SkillsForm.tsx
│   │   │   ├── ProjectsForm.tsx
│   │   │   ├── CertificationsForm.tsx
│   │   │   ├── AchievementsForm.tsx
│   │   │   ├── LanguagesForm.tsx
│   │   │   ├── AwardsForm.tsx
│   │   │   ├── VolunteerForm.tsx
│   │   │   ├── CustomSectionForm.tsx
│   │   │   ├── TemplateSelector.tsx
│   │   │   ├── FinalReview.tsx
│   │   │   └── SectionManager.tsx      # Reorder/show/hide sections
│   │   ├── preview/
│   │   │   ├── ResumePreview.tsx        # Live preview container
│   │   │   └── templates/
│   │   │       ├── ModernTemplate.tsx
│   │   │       ├── ClassicTemplate.tsx
│   │   │       ├── ATSTemplate.tsx
│   │   │       ├── MinimalTemplate.tsx
│   │   │       ├── ExecutiveTemplate.tsx
│   │   │       ├── TechTemplate.tsx
│   │   │       ├── CorporateTemplate.tsx
│   │   │       └── CreativeTemplate.tsx
│   │   ├── export/
│   │   │   ├── DownloadModal.tsx
│   │   │   ├── PDFDocument.tsx         # @react-pdf templates
│   │   │   └── DOCXGenerator.tsx
│   │   ├── import/
│   │   │   ├── ResumeImporter.tsx
│   │   │   └── ImportReview.tsx
│   │   ├── tools/
│   │   │   ├── ATSChecker.tsx
│   │   │   ├── JobMatcher.tsx
│   │   │   └── QualityChecker.tsx
│   │   ├── dashboard/
│   │   │   └── ResumeDashboard.tsx
│   │   └── settings/
│   │       └── SettingsPanel.tsx        # Font, spacing, colors
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── BuilderPage.tsx
│   │   ├── TemplatesPage.tsx
│   │   ├── ExamplesPage.tsx
│   │   ├── ExampleDetailPage.tsx
│   │   ├── TipsPage.tsx
│   │   ├── ATSCheckerPage.tsx
│   │   ├── JobMatcherPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── PrivacyPage.tsx
│   │   ├── TermsPage.tsx
│   │   └── NotFoundPage.tsx
│   └── pdf-templates/                   # @react-pdf versions of templates
│       ├── PDFModern.tsx
│       ├── PDFClassic.tsx
│       ├── PDFATS.tsx
│       ├── PDFMinimal.tsx
│       ├── PDFExecutive.tsx
│       ├── PDFTech.tsx
│       ├── PDFCorporate.tsx
│       └── PDFCreative.tsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.ts (if needed for v4)
├── postcss.config.js
├── README.md
├── LICENSE
└── CONTRIBUTING.md
```

---

## Proposed Changes (By Phase)

---

### Phase 1: Foundation — Landing Page + Builder + Data Model + Live Preview

The core experience: a user can open the app, enter resume data, and see it live.

#### [NEW] Project Setup
- Initialize Vite + React + TypeScript project
- Install all Phase 1 dependencies: `react-router-dom`, `zustand`, `react-hook-form`, `zod`, `lucide-react`, `@dnd-kit/core`, `@dnd-kit/sortable`
- Configure Tailwind CSS v4
- Set up routing, layout components

#### [NEW] `src/types/resume.ts`
- Define the complete `Resume` TypeScript interface and Zod schemas
- All sections: personalInfo, summary, experience, education, skills, projects, certifications, achievements, languages, awards, volunteerExperience, customSections, settings, template

#### [NEW] `src/store/resumeStore.ts`
- Zustand store with all resume CRUD operations
- Section add/remove/reorder actions
- Template & settings actions

#### [NEW] `src/pages/HomePage.tsx`
- Hero section with headline, subtitle, CTA buttons
- "How It Works" 4-step section
- "Why Use ResumeForge?" features grid
- Responsive layout

#### [NEW] `src/pages/BuilderPage.tsx`
- Split-pane layout: form (left) + preview (right)
- Mobile: stacked with Edit/Preview toggle
- Step navigation sidebar

#### [NEW] Builder Form Components (all 14 steps)
- `PersonalInfoForm.tsx` through `FinalReview.tsx`
- React Hook Form + Zod validation
- Drag-and-drop for reordering entries
- Add/remove entries for multi-item sections

#### [NEW] `src/components/preview/ResumePreview.tsx`
- A4 aspect ratio container
- Live-updating from Zustand store
- Default "Modern" template rendering
- Multi-page support with automatic page breaks

#### [NEW] Layout components
- `Header.tsx`, `Footer.tsx`, `Sidebar.tsx`
- Navigation with all menu items
- Responsive mobile menu

---

### Phase 2: Templates + PDF Export + DOCX Export

#### [NEW] 8 Preview Templates
- Modern, Classic, ATS Professional, Minimal, Executive, Tech, Corporate, Creative
- Each renders the full resume data model
- Responsive to settings (font, size, spacing, colors)

#### [NEW] `src/components/settings/SettingsPanel.tsx`
- Font family selector (Inter, Arial, Calibri, Georgia, Times New Roman, Roboto)
- Font size (9-14px)
- Margins (Narrow/Normal/Wide)
- Spacing (Compact/Normal/Relaxed)
- Accent color picker

#### [NEW] `src/pages/TemplatesPage.tsx`
- Template preview cards with sample data
- "Use This Template" button

#### [NEW] PDF Export (`@react-pdf/renderer`)
- 8 PDF template variants matching preview templates
- A4 format, selectable text, proper page breaks
- Filename: `FirstName_LastName_Resume.pdf`
- Download modal with format selection

#### [NEW] DOCX Export (`docx` library)
- Generate real .docx with all resume sections
- Proper formatting: headings, bullet points, tables
- Filename: `FirstName_LastName_Resume.docx`
- Editable in Word, Google Docs, LibreOffice

#### [NEW] Print support
- `@media print` CSS for clean printing
- Hide UI chrome, print only resume

---

### Phase 3: Local Save/Load + JSON Backup

#### [NEW] `src/lib/storage.ts`
- IndexedDB wrapper using `idb` library
- CRUD for multiple resumes
- Auto-save with debouncing

#### [NEW] `src/components/dashboard/ResumeDashboard.tsx`
- "My Resumes" dashboard with cards
- Resume name, last updated, template
- Edit, Duplicate, Download, Delete actions

#### [NEW] JSON Export/Import
- Download resume data as `.json`
- Import from `.json` file
- Data validation on import

---

### Phase 4: PDF/DOCX Resume Import

#### [NEW] `src/lib/pdfParser.ts`
- PDF.js for text extraction
- Section identification via regex/keyword matching

#### [NEW] `src/lib/docxParser.ts`
- mammoth.js for DOCX → text
- Section identification

#### [NEW] `src/lib/resumeParser.ts`
- Universal resume section classifier
- Maps extracted text to structured resume fields
- Handles common resume formats

#### [NEW] `src/components/import/ResumeImporter.tsx`
- Upload UI with drag-and-drop
- File type/size validation
- Progress indicator

#### [NEW] `src/components/import/ImportReview.tsx`
- Shows extracted data for user review
- Edit-before-import capability
- Confirm/cancel flow

#### [NEW] OCR (lazy-loaded)
- Tesseract.js loaded on-demand
- Fallback message for scanned PDFs

---

### Phase 5: ATS Checker + Job Description Matcher + Quality Checker

#### [NEW] `src/lib/atsChecker.ts`
- Keyword extraction from job description
- Scoring across 8 categories
- Missing keywords report

#### [NEW] `src/lib/jobMatcher.ts`
- Resume vs. job description comparison
- Match percentage, matching/missing skills
- Suggested improvements

#### [NEW] `src/lib/qualityChecker.ts`
- 15+ quality checks (missing email, weak bullets, etc.)
- Friendly recommendations
- Severity levels

#### [NEW] Tool Pages
- `ATSCheckerPage.tsx`, `JobMatcherPage.tsx`
- Interactive UI with results display

---

### Phase 6: SEO + Examples + Legal Pages

#### [NEW] `src/pages/ExamplesPage.tsx`
- 13 role-based example resumes
- Cards with preview
- "Use This Resume" copies to builder

#### [NEW] `src/data/exampleResumes.ts`
- Realistic sample data for all 13 roles
- Data Engineer (Allvin Pal), Software Engineer, Data Scientist, Cloud Engineer, DevOps, BA, PM, MBA, B.Tech Fresher, MBA Fresher, Accountant, Marketing Manager, Project Manager

#### [NEW] `src/pages/TipsPage.tsx`
- Resume writing best practices
- Section-by-section guidance
- FAQ

#### [NEW] Legal Pages
- `PrivacyPage.tsx` — clear privacy policy
- `TermsPage.tsx` — terms of use

#### [NEW] SEO
- React Helmet for meta tags
- Proper heading hierarchy
- Structured routes matching spec

---

### Phase 7: PWA + Testing + Performance + Polish

#### [NEW] PWA Setup
- `vite-plugin-pwa` configuration
- Service worker for offline caching
- App manifest with icons

#### [NEW] Accessibility
- ARIA attributes on all interactive elements
- Keyboard navigation
- Focus management
- Color contrast verification

#### [NEW] `README.md`
- Features, tech stack, installation, deployment guide

#### [NEW] `LICENSE` (MIT)

#### [NEW] `.env.example`
- Documented optional env vars (AI API key)

#### Performance
- Lazy-load routes with `React.lazy`
- Debounce preview updates
- Code-split PDF/DOCX libraries

#### Testing
- Component tests for form sections
- Integration tests for save/load
- Export validation tests

---

## Verification Plan

### Automated Tests
```bash
npm run build          # Production build succeeds
npm run lint           # No lint errors
npm run test           # Unit/integration tests pass
npx lighthouse --view  # Performance audit
```

### Manual Verification
- [ ] Complete resume creation flow (no login)
- [ ] PDF download — open in Adobe Reader, verify selectable text
- [ ] DOCX download — open in Word/Google Docs, verify editable
- [ ] PDF import — upload a real PDF, verify extraction
- [ ] DOCX import — upload a real DOCX, verify extraction
- [ ] All 8 templates render correctly
- [ ] Mobile responsive layout (Chrome DevTools)
- [ ] Print resume (Ctrl+P)
- [ ] ATS checker produces reasonable scores
- [ ] Local save/load persists across browser sessions
- [ ] JSON export/import round-trips correctly
- [ ] PWA installable
- [ ] No console errors in production build

---

## Estimated Complexity

| Phase | Files | Complexity |
|-------|-------|------------|
| Phase 1 | ~40 files | High — core architecture |
| Phase 2 | ~25 files | High — PDF/DOCX generation + 8 templates |
| Phase 3 | ~8 files | Medium |
| Phase 4 | ~8 files | Medium — parsing logic |
| Phase 5 | ~8 files | Medium |
| Phase 6 | ~15 files | Medium — content-heavy |
| Phase 7 | ~10 files | Medium — polish |
| **Total** | **~115 files** | |

This is a production-grade application. I'll build it methodically, verifying each phase before proceeding.
