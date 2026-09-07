# ResumeForge — Free Professional Resume Builder

> **Create a professional resume. 100% Free. No login required.**

ResumeForge is a modern, privacy-first web application designed to help job seekers, developers, students, and professionals craft ATS-friendly, visually stunning resumes and export them instantly to PDF, Word (.docx), and Plain Text.

---

## ✨ Features

- **100% Free & Privacy-First**: No account creation, no subscriptions, no watermarks. Your resume data stays strictly in your browser (`localStorage`).
- **8 Professional Templates**:
  - **Modern**: Clean accent-colored header with two-column balance for tech and modern professionals.
  - **Classic**: Traditional serif styling with elegant section dividers for academia, law, and finance.
  - **ATS Professional**: Maximum ATS score, strict single-column, standard headings, and high parseability.
  - **Minimalist**: Generous whitespace, Scandinavian typographic elegance, distraction-free.
  - **Executive**: Leadership-focused layout with distinguished header and achievements emphasis.
  - **Tech / Developer**: Monospace touches, skill badges, and GitHub / project repository highlights.
  - **Corporate**: Structured business format with right-aligned metadata for management and consulting.
  - **Creative**: Eye-catching gradient headers, badge tags, and modern portfolio styling.
- **Multiple Export Options**:
  - **High-Resolution Vector PDF**: Crisp, searchable, selectable vector text with perfect margins via an isolated print engine.
  - **Editable Word Document (.docx)**: Native Microsoft Word document generation formatted with proper styles.
  - **Plain Text (.txt)**: Quick copy-paste format for manual ATS forms.
  - **JSON Backup & Restore**: Download a backup of your resume data and re-import anytime.
- **Interactive Resume Builder**:
  - Personal Information & Social Links (LinkedIn, GitHub, Portfolio).
  - Summary / Objective with sample suggestions.
  - Work Experience with achievements bullet guidance and action verbs.
  - Education, Skills (categorized with tag chips), Projects, Certifications, Awards, and Volunteering.
  - Custom Sections with custom titles and bullet items.
  - Section reordering and visibility toggling.
- **Value-Add Career Tools**:
  - **Real-Time ATS Checker**: Live scoring (0–100) assessing metrics, section headings, and action verbs.
  - **Job Description Matcher**: Compare your resume against any target job posting to detect missing keywords.
  - **Resume Examples & Career Tips**: Guidance and curated examples across multiple industries.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```bash
# Clone repository
git clone https://github.com/allvinpal/ResumeGerator.git

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be accessible at `http://localhost:5173/`.

### Building for Production

```bash
# Type check and build production bundle
npm run build

# Preview production build
npm run preview
```

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) with LocalStorage persistence
- **Document Generation**:
  - [`docx`](https://docx.js.org/) for native Microsoft Word (.docx) export
  - Vector PDF engine with isolated iframe print and CSS paged media
  - [`file-saver`](https://github.com/eligrey/FileSaver.js/) for client-side downloads
- **Client-Side Parsing**:
  - `pdfjs-dist` for PDF resume extraction
  - `mammoth` for DOCX resume extraction

---

## 📄 License

MIT License — free for personal and commercial use.
