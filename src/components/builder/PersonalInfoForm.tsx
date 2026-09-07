import { useResumeStore } from '../../store/resumeStore';
import Input from '../ui/Input';
import { User, Mail, Phone, MapPin, Globe } from 'lucide-react';

function LinkedinIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

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
          icon={<LinkedinIcon />}
        />

        <Input
          label="GitHub URL"
          type="url"
          placeholder="https://github.com/yourusername"
          value={info.githubUrl}
          onChange={handleChange('githubUrl')}
          icon={<GithubIcon />}
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
