import { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { createEmptyCertification } from '../../types/resume';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

export default function CertificationsForm() {
  const { resume, addCertification, updateCertification, removeCertification } = useResumeStore();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(resume.certifications.map(c => c.id)));

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-secondary-900">Certifications</h2>
          <p className="text-sm text-secondary-500 mt-1">Add professional certifications and credentials.</p>
        </div>
        <Button variant="outline" size="sm" icon={<Plus size={16} />}
          onClick={() => { const c = createEmptyCertification(); addCertification(c); setExpandedIds(prev => new Set(prev).add(c.id)); }}>
          Add Certification
        </Button>
      </div>

      {resume.certifications.length === 0 && (
        <div className="text-center py-12 bg-secondary-50 rounded-xl border-2 border-dashed border-secondary-200">
          <p className="text-secondary-500 mb-3">No certifications added yet</p>
          <Button variant="outline" size="sm" icon={<Plus size={16} />}
            onClick={() => { const c = createEmptyCertification(); addCertification(c); setExpandedIds(prev => new Set(prev).add(c.id)); }}>
            Add Certification
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {resume.certifications.map((cert, index) => {
          const isExpanded = expandedIds.has(cert.id);
          return (
            <Card key={cert.id} padding="none" className="overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 bg-secondary-50 cursor-pointer hover:bg-secondary-100 transition-colors"
                onClick={() => toggleExpand(cert.id)}>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-secondary-900 truncate">{cert.name || `Certification ${index + 1}`}</p>
                  <p className="text-xs text-secondary-500 truncate">{cert.issuingOrganization}</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); removeCertification(cert.id); }}
                  className="p-1.5 text-secondary-400 hover:text-danger-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" aria-label="Remove">
                  <Trash2 size={16} />
                </button>
                {isExpanded ? <ChevronUp size={16} className="text-secondary-400" /> : <ChevronDown size={16} className="text-secondary-400" />}
              </div>
              {isExpanded && (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Input label="Certification Name" placeholder="e.g. AWS Certified Data Engineer – Associate" value={cert.name}
                      onChange={(e) => updateCertification(cert.id, { name: e.target.value })} />
                  </div>
                  <Input label="Issuing Organization" placeholder="e.g. Amazon Web Services" value={cert.issuingOrganization}
                    onChange={(e) => updateCertification(cert.id, { issuingOrganization: e.target.value })} />
                  <Input label="Date" placeholder="e.g. 2024" value={cert.date}
                    onChange={(e) => updateCertification(cert.id, { date: e.target.value })} />
                  <Input label="Credential ID" placeholder="Optional" value={cert.credentialId}
                    onChange={(e) => updateCertification(cert.id, { credentialId: e.target.value })} />
                  <Input label="Credential URL" type="url" placeholder="Optional" value={cert.credentialUrl}
                    onChange={(e) => updateCertification(cert.id, { credentialUrl: e.target.value })} />
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
