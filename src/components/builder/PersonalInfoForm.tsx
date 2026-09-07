import { useResumeStore } from '../../store/resumeStore';
import Input from '../ui/Input';
import { User, Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export default function PersonalInfoForm() {
  const { resume, updatePersonalInfo } = useResumeStore();
  const info = resume.personalInfo;

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePersonalInfo({ [field]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-secondary-900">Personal Information</h2>
        <p className="text-sm text-secondary-500 mt-1">Start with your basic contact details.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Input
            label="Full Name"
            placeholder="e.g. John Doe"
            value={info.fullName}
            onChange={handleChange('fullName')}
            icon={<User size={16} />}
          />
        </div>

        <div className="sm:col-span-2">
          <Input
            label="Professional Title"
            placeholder="e.g. Senior Data Engineer"
            value={info.professionalTitle}
            onChange={handleChange('professionalTitle')}
            hint="Your current job title or target role"
          />
        </div>

        <Input
          label="Email"
          type="email"
          placeholder="e.g. john@example.com"
          value={info.email}
          onChange={handleChange('email')}
          icon={<Mail size={16} />}
        />

        <Input
          label="Phone"
          type="tel"
          placeholder="e.g. +1 (555) 123-4567"
          value={info.phone}
          onChange={handleChange('phone')}
          icon={<Phone size={16} />}
        />

        <Input
          label="City"
          placeholder="e.g. New York"
          value={info.city}
          onChange={handleChange('city')}
          icon={<MapPin size={16} />}
        />

        <Input
          label="State"
          placeholder="e.g. NY"
          value={info.state}
          onChange={handleChange('state')}
        />

        <div className="sm:col-span-2">
          <Input
            label="Country"
            placeholder="e.g. United States"
            value={info.country}
            onChange={handleChange('country')}
          />
        </div>

        <Input
          label="LinkedIn URL"
          type="url"
          placeholder="https://linkedin.com/in/yourprofile"
          value={info.linkedinUrl}
          onChange={handleChange('linkedinUrl')}
          icon={<Linkedin size={16} />}
        />

        <Input
          label="GitHub URL"
          type="url"
          placeholder="https://github.com/yourusername"
          value={info.githubUrl}
          onChange={handleChange('githubUrl')}
          icon={<Github size={16} />}
        />

        <Input
          label="Portfolio URL"
          type="url"
          placeholder="https://yourportfolio.com"
          value={info.portfolioUrl}
          onChange={handleChange('portfolioUrl')}
          icon={<Globe size={16} />}
        />

        <Input
          label="Other Website"
          type="url"
          placeholder="https://example.com"
          value={info.otherWebsite}
          onChange={handleChange('otherWebsite')}
          icon={<Globe size={16} />}
        />
      </div>
    </div>
  );
}
