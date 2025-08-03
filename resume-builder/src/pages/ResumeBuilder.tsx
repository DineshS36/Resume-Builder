import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Resume, 
  defaultResume, 
  Experience, 
  Education, 
  Skill, 
  Project, 
  Certificate,
  defaultExperience,
  defaultEducation,
  defaultSkill,
  defaultProject,
  defaultCertificate
} from '../schema/resumeSchema';
import { InputField } from '../components/InputField';
import { TextArea } from '../components/TextArea';
import { SectionCard } from '../components/SectionCard';
import { Button } from '../components/Button';
import { ThemeToggle } from '../components/ThemeToggle';
import { ResumePreview } from '../components/ResumePreview';
import { exportToPDF } from '../utils/pdfExport';
import { generatePersonalSummary, suggestJobDescription, suggestSkills } from '../utils/aiSuggestions';

export const ResumeBuilder: React.FC = () => {
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState<Resume>(defaultResume);
  const [isExporting, setIsExporting] = useState(false);
  const [aiLoading, setAiLoading] = useState<string | null>(null);

  const updatePersonalInfo = useCallback((field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  }, []);

  const updateSummary = useCallback((value: string) => {
    setResumeData(prev => ({
      ...prev,
      summary: value
    }));
  }, []);

  const addExperience = useCallback(() => {
    const newExperience: Experience = {
      ...defaultExperience,
      id: `exp-${Date.now()}`
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
  }, []);

  const updateExperience = useCallback((id: string, field: string, value: string | boolean) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  }, []);

  const addEducation = useCallback(() => {
    const newEducation: Education = {
      ...defaultEducation,
      id: `edu-${Date.now()}`
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  }, []);

  const updateEducation = useCallback((id: string, field: string, value: string | boolean) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  }, []);

  const addSkill = useCallback(() => {
    const newSkill: Skill = {
      ...defaultSkill,
      id: `skill-${Date.now()}`
    };
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  }, []);

  const updateSkill = useCallback((id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  }, []);

  const removeSkill = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  }, []);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await exportToPDF('resume-content', `${resumeData.personalInfo.fullName || 'Resume'}.pdf`);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleAISuggestSummary = async () => {
    setAiLoading('summary');
    try {
      const suggestion = await generatePersonalSummary(resumeData.personalInfo);
      updateSummary(suggestion);
    } catch (error) {
      console.error('AI suggestion failed:', error);
    } finally {
      setAiLoading(null);
    }
  };

  const handleAISuggestJobDescription = async (expId: string, jobTitle: string, company: string) => {
    setAiLoading(`exp-${expId}`);
    try {
      const suggestion = await suggestJobDescription(jobTitle, company);
      updateExperience(expId, 'description', suggestion);
    } catch (error) {
      console.error('AI suggestion failed:', error);
    } finally {
      setAiLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <header className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                }
              >
                Back to Home
              </Button>
              
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Resume Builder
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={handleExportPDF}
                loading={isExporting}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
              >
                {isExporting ? 'Exporting...' : 'Export PDF'}
              </Button>
              
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-8">
            {/* Personal Information */}
            <SectionCard
              title="Personal Information"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Full Name"
                  name="fullName"
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  required
                />
                
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  required
                />
                
                <InputField
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  required
                />
                
                <InputField
                  label="Location"
                  name="location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  required
                />
                
                <InputField
                  label="Website"
                  name="website"
                  type="url"
                  value={resumeData.personalInfo.website || ''}
                  onChange={(e) => updatePersonalInfo('website', e.target.value)}
                />
                
                <InputField
                  label="LinkedIn"
                  name="linkedin"
                  type="url"
                  value={resumeData.personalInfo.linkedin || ''}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                />
              </div>
            </SectionCard>

            {/* Professional Summary */}
            <SectionCard
              title="Professional Summary"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              actions={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAISuggestSummary}
                  loading={aiLoading === 'summary'}
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  }
                >
                  AI Suggest
                </Button>
              }
            >
              <TextArea
                label="Summary"
                name="summary"
                value={resumeData.summary}
                onChange={(e) => updateSummary(e.target.value)}
                placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
                rows={4}
                maxLength={500}
                required
              />
            </SectionCard>

            {/* Experience */}
            <SectionCard
              title="Professional Experience"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              }
              actions={
                <Button
                  onClick={addExperience}
                  size="sm"
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  }
                >
                  Add Experience
                </Button>
              }
            >
              <div className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/50"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Experience #{index + 1}
                      </h4>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeExperience(exp.id)}
                        icon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        }
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <InputField
                        label="Job Title"
                        name={`jobTitle-${exp.id}`}
                        value={exp.jobTitle}
                        onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                        required
                      />
                      
                      <InputField
                        label="Company"
                        name={`company-${exp.id}`}
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        required
                      />
                      
                      <InputField
                        label="Location"
                        name={`location-${exp.id}`}
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                        required
                      />
                      
                      <InputField
                        label="Start Date"
                        name={`startDate-${exp.id}`}
                        type="date"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        required
                      />
                      
                      {!exp.isCurrentJob && (
                        <InputField
                          label="End Date"
                          name={`endDate-${exp.id}`}
                          type="date"
                          value={exp.endDate || ''}
                          onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        />
                      )}
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id={`currentJob-${exp.id}`}
                        checked={exp.isCurrentJob}
                        onChange={(e) => updateExperience(exp.id, 'isCurrentJob', e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor={`currentJob-${exp.id}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        I currently work here
                      </label>
                    </div>

                    <div className="flex justify-between items-end gap-4">
                      <div className="flex-1">
                        <TextArea
                          label="Job Description"
                          name={`description-${exp.id}`}
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          placeholder="Describe your responsibilities and achievements..."
                          rows={3}
                          required
                        />
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAISuggestJobDescription(exp.id, exp.jobTitle, exp.company)}
                        loading={aiLoading === `exp-${exp.id}`}
                        disabled={!exp.jobTitle || !exp.company}
                        icon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        }
                      >
                        AI Suggest
                      </Button>
                    </div>
                  </motion.div>
                ))}
                
                {resumeData.experience.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No experience added yet. Click "Add Experience" to get started.
                  </div>
                )}
              </div>
            </SectionCard>

            {/* Education */}
            <SectionCard
              title="Education"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              }
              actions={
                <Button
                  onClick={addEducation}
                  size="sm"
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  }
                >
                  Add Education
                </Button>
              }
            >
              <div className="space-y-6">
                {resumeData.education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/50"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Education #{index + 1}
                      </h4>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeEducation(edu.id)}
                        icon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        }
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <InputField
                        label="Degree"
                        name={`degree-${edu.id}`}
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        required
                      />
                      
                      <InputField
                        label="Institution"
                        name={`institution-${edu.id}`}
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        required
                      />
                      
                      <InputField
                        label="Location"
                        name={`edu-location-${edu.id}`}
                        value={edu.location}
                        onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                        required
                      />
                      
                      <InputField
                        label="Start Date"
                        name={`edu-startDate-${edu.id}`}
                        type="date"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                        required
                      />
                      
                      {!edu.isCurrentStudy && (
                        <InputField
                          label="End Date"
                          name={`edu-endDate-${edu.id}`}
                          type="date"
                          value={edu.endDate || ''}
                          onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                        />
                      )}
                      
                      <InputField
                        label="GPA (Optional)"
                        name={`gpa-${edu.id}`}
                        value={edu.gpa || ''}
                        onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                        placeholder="3.8/4.0"
                      />
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id={`currentStudy-${edu.id}`}
                        checked={edu.isCurrentStudy}
                        onChange={(e) => updateEducation(edu.id, 'isCurrentStudy', e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor={`currentStudy-${edu.id}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        I'm currently studying here
                      </label>
                    </div>
                  </motion.div>
                ))}
                
                {resumeData.education.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No education added yet. Click "Add Education" to get started.
                  </div>
                )}
              </div>
            </SectionCard>

            {/* Skills */}
            <SectionCard
              title="Skills"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
              actions={
                <Button
                  onClick={addSkill}
                  size="sm"
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  }
                >
                  Add Skill
                </Button>
              }
            >
              <div className="space-y-4">
                {resumeData.skills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-end gap-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50"
                  >
                    <div className="flex-1">
                      <InputField
                        label="Skill Name"
                        name={`skill-name-${skill.id}`}
                        value={skill.name}
                        onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="flex-1">
                      <InputField
                        label="Category"
                        name={`skill-category-${skill.id}`}
                        value={skill.category}
                        onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                        placeholder="e.g., Programming Languages"
                        required
                      />
                    </div>
                    
                    <div className="w-32">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Level
                      </label>
                      <select
                        value={skill.level}
                        onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                        className="w-full px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                    
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeSkill(skill.id)}
                      icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      }
                    >
                      Remove
                    </Button>
                  </motion.div>
                ))}
                
                {resumeData.skills.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No skills added yet. Click "Add Skill" to get started.
                  </div>
                )}
              </div>
            </SectionCard>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionCard title="Resume Preview" className="h-fit">
              <div className="max-h-[80vh] overflow-y-auto">
                <ResumePreview resumeData={resumeData} />
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
};