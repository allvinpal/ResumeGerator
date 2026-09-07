import { useState, useRef } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle2, X, Clipboard, ArrowRight, Loader2 } from 'lucide-react';
import { useResumeStore } from '../../store/resumeStore';
import { extractTextFromPDF, extractTextFromDOCX, extractTextFromTXT, parseResumeFromText } from '../../utils/parseResume';
import Button from '../ui/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function UploadResumeModal({ isOpen, onClose, onSuccess }: Props) {
  const { setResume } = useResumeStore();
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [parsedSummary, setParsedSummary] = useState<{
    name: string;
    experienceCount: number;
    educationCount: number;
    skillsCount: number;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setErrorMessage(null);
      setParsedSummary(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) {
      setFile(dropped);
      setErrorMessage(null);
      setParsedSummary(null);
    }
  };

  const handleProcessFile = async () => {
    if (!file) {
      setErrorMessage('Please select a file to upload.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // If user uploaded a CVMint JSON backup
      if (file.name.endsWith('.json')) {
        const text = await file.text();
        const json = JSON.parse(text);
        if (json && json.personalInfo) {
          setResume(json);
          setParsedSummary({
            name: json.personalInfo.fullName || 'Imported Resume',
            experienceCount: json.experience?.length || 0,
            educationCount: json.education?.length || 0,
            skillsCount: json.skills?.reduce((acc: number, c: any) => acc + (c.skills?.length || 0), 0) || 0,
          });
          setTimeout(() => {
            onClose();
            if (onSuccess) onSuccess();
          }, 800);
          return;
        }
      }

      let extractedText = '';
      if (file.name.endsWith('.pdf')) {
        extractedText = await extractTextFromPDF(file);
      } else if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
        extractedText = await extractTextFromDOCX(file);
      } else if (file.name.endsWith('.txt')) {
        extractedText = await extractTextFromTXT(file);
      } else {
        throw new Error('Unsupported file format. Please upload a PDF, DOCX, TXT, or JSON file.');
      }

      if (!extractedText || !extractedText.trim()) {
        throw new Error('Could not extract text from this file. It may be a scanned image or protected.');
      }

      const parsed = parseResumeFromText(extractedText, file.name.replace(/\.[^/.]+$/, ''));
      setResume(parsed);

      setParsedSummary({
        name: parsed.personalInfo.fullName || 'Imported Candidate',
        experienceCount: parsed.experience.length,
        educationCount: parsed.education.length,
        skillsCount: parsed.skills.reduce((acc, c) => acc + c.skills.length, 0),
      });

      setTimeout(() => {
        onClose();
        if (onSuccess) onSuccess();
      }, 1000);
    } catch (err: any) {
      console.error('File parsing error:', err);
      setErrorMessage(err.message || 'Failed to parse resume. Try copying and pasting the text instead.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProcessPastedText = () => {
    if (!pastedText.trim()) {
      setErrorMessage('Please paste your resume text into the box.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const parsed = parseResumeFromText(pastedText);
      setResume(parsed);

      setParsedSummary({
        name: parsed.personalInfo.fullName || 'Imported Candidate',
        experienceCount: parsed.experience.length,
        educationCount: parsed.education.length,
        skillsCount: parsed.skills.reduce((acc, c) => acc + c.skills.length, 0),
      });

      setTimeout(() => {
        onClose();
        if (onSuccess) onSuccess();
      }, 800);
    } catch (err: any) {
      console.error('Pasted text parsing error:', err);
      setErrorMessage(err.message || 'Failed to parse pasted text.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-secondary-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-secondary-100 bg-secondary-50/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
              <Upload size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-secondary-900">Import Existing Resume</h3>
              <p className="text-xs text-secondary-500">Extracts your experience, education, and skills instantly</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-secondary-100 bg-secondary-50/30 px-6 pt-2">
          <button
            onClick={() => { setActiveTab('upload'); setErrorMessage(null); }}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'upload'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700'
            }`}
          >
            <FileText size={14} />
            Upload File (PDF / DOCX / JSON)
          </button>
          <button
            onClick={() => { setActiveTab('paste'); setErrorMessage(null); }}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'paste'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700'
            }`}
          >
            <Clipboard size={14} />
            Paste Text
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 flex items-start gap-2.5 p-3.5 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-medium">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {parsedSummary ? (
            <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-sm flex flex-col items-center text-center gap-2">
              <CheckCircle2 size={32} className="text-emerald-600 animate-in zoom-in duration-200" />
              <p className="font-bold">Resume Extracted Successfully!</p>
              <div className="text-xs text-emerald-700 space-y-0.5 mt-1">
                <p>Found candidate: <span className="font-semibold">{parsedSummary.name}</span></p>
                <p>{parsedSummary.experienceCount} Work Experiences • {parsedSummary.educationCount} Education Entries • {parsedSummary.skillsCount} Skills</p>
              </div>
              <p className="text-[11px] text-emerald-600 mt-1">Loading into builder...</p>
            </div>
          ) : activeTab === 'upload' ? (
            <div>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                  file
                    ? 'border-primary-500 bg-primary-50/40'
                    : 'border-secondary-300 hover:border-primary-400 hover:bg-secondary-50/50'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.doc,.txt,.json"
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-3">
                  <Upload size={24} />
                </div>
                {file ? (
                  <div>
                    <p className="text-sm font-bold text-secondary-900">{file.name}</p>
                    <p className="text-xs text-secondary-500 mt-1">
                      {(file.size / 1024).toFixed(1)} KB • Click or drag to change
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-semibold text-secondary-900">
                      Drop your resume here, or <span className="text-primary-600">browse files</span>
                    </p>
                    <p className="text-xs text-secondary-400 mt-1">
                      Supports PDF, DOCX, TXT, or CVMint JSON (Max 15MB)
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-5 flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={onClose} disabled={isProcessing}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleProcessFile}
                  disabled={!file || isProcessing}
                  icon={isProcessing ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                >
                  {isProcessing ? 'Parsing Resume...' : 'Import & Edit'}
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1.5">
                Paste your resume content below:
              </label>
              <textarea
                rows={8}
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste the text from your existing resume or LinkedIn profile here..."
                className="w-full text-xs p-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono resize-none leading-relaxed"
              />
              <p className="text-[11px] text-secondary-400 mt-1">
                Tip: Copy all text from your Word or PDF file (Ctrl+A, Ctrl+C) and paste it here.
              </p>

              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={onClose} disabled={isProcessing}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleProcessPastedText}
                  disabled={!pastedText.trim() || isProcessing}
                  icon={isProcessing ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                >
                  {isProcessing ? 'Parsing Resume...' : 'Import & Edit'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
