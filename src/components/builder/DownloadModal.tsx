import { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { exportToPDF, exportToDocx, exportToJSON, exportToTXT } from '../../utils/exportResume';
import { FileText, Download, X, FileCheck, Code2, Printer, Check } from 'lucide-react';
import Button from '../ui/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: Props) {
  const { resume } = useResumeStore();
  const [loadingDocx, setLoadingDocx] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownloadPDF = () => {
    onClose();
    setTimeout(() => {
      exportToPDF(resume);
    }, 250);
  };

  const handleDownloadDocx = async () => {
    try {
      setLoadingDocx(true);
      await exportToDocx(resume);
      setSavedSuccess('DOCX downloaded successfully!');
      setTimeout(() => setSavedSuccess(null), 3000);
    } catch (err) {
      console.error('Failed to export DOCX:', err);
    } finally {
      setLoadingDocx(false);
    }
  };

  const handleDownloadJSON = () => {
    exportToJSON(resume);
    setSavedSuccess('JSON backup downloaded!');
    setTimeout(() => setSavedSuccess(null), 3000);
  };

  const handleDownloadTXT = () => {
    exportToTXT(resume);
    setSavedSuccess('Plain text downloaded!');
    setTimeout(() => setSavedSuccess(null), 3000);
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-secondary-200 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-secondary-100 bg-secondary-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
              <Download size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-secondary-900">Download Resume</h3>
              <p className="text-xs text-secondary-500">100% Free • No watermark • Instant export</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          {savedSuccess && (
            <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-medium animate-in fade-in duration-150">
              <Check size={16} />
              {savedSuccess}
            </div>
          )}

          {/* Option 1: PDF */}
          <button
            onClick={handleDownloadPDF}
            className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-primary-500 bg-primary-50/50 hover:bg-primary-50 transition-all text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center shadow-xs">
                <Printer size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-secondary-900">Download PDF</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-primary-600 text-white px-1.5 py-0.2 rounded">Recommended</span>
                </div>
                <p className="text-xs text-secondary-500 mt-0.5">High-resolution vector PDF (Save as PDF)</p>
              </div>
            </div>
            <Download size={18} className="text-primary-600 group-hover:translate-y-0.5 transition-transform" />
          </button>

          {/* Option 2: DOCX */}
          <button
            onClick={handleDownloadDocx}
            disabled={loadingDocx}
            className="w-full flex items-center justify-between p-4 rounded-xl border border-secondary-200 hover:border-secondary-300 hover:bg-secondary-50 transition-all text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <FileText size={20} />
              </div>
              <div>
                <span className="text-sm font-bold text-secondary-900">Word Document (.docx)</span>
                <p className="text-xs text-secondary-500 mt-0.5">Fully editable in Microsoft Word & Google Docs</p>
              </div>
            </div>
            {loadingDocx ? (
              <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download size={18} className="text-secondary-400 group-hover:text-secondary-700 transition-colors" />
            )}
          </button>

          {/* Option 3: Plain Text / ATS */}
          <button
            onClick={handleDownloadTXT}
            className="w-full flex items-center justify-between p-3.5 rounded-xl border border-secondary-200 hover:border-secondary-300 hover:bg-secondary-50 transition-all text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-slate-700 text-white flex items-center justify-center">
                <FileCheck size={18} />
              </div>
              <div>
                <span className="text-sm font-semibold text-secondary-900">Plain Text (.txt)</span>
                <p className="text-xs text-secondary-500">Unformatted text for ATS form copy-pasting</p>
              </div>
            </div>
            <Download size={16} className="text-secondary-400 group-hover:text-secondary-700 transition-colors" />
          </button>

          {/* Option 4: JSON Backup */}
          <button
            onClick={handleDownloadJSON}
            className="w-full flex items-center justify-between p-3.5 rounded-xl border border-secondary-200 hover:border-secondary-300 hover:bg-secondary-50 transition-all text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <Code2 size={18} />
              </div>
              <div>
                <span className="text-sm font-semibold text-secondary-900">JSON Backup (.json)</span>
                <p className="text-xs text-secondary-500">Save complete resume data to re-import anytime</p>
              </div>
            </div>
            <Download size={16} className="text-secondary-400 group-hover:text-secondary-700 transition-colors" />
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-secondary-50 border-t border-secondary-100 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
