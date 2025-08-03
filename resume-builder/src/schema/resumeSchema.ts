import { z } from 'zod';

// Personal Information Schema
export const personalInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  location: z.string().min(1, 'Location is required'),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
});

// Experience Schema
export const experienceSchema = z.object({
  id: z.string(),
  jobTitle: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company name is required'),
  location: z.string().min(1, 'Location is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  isCurrentJob: z.boolean().default(false),
  description: z.string().min(1, 'Job description is required'),
});

// Education Schema
export const educationSchema = z.object({
  id: z.string(),
  degree: z.string().min(1, 'Degree is required'),
  institution: z.string().min(1, 'Institution is required'),
  location: z.string().min(1, 'Location is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  isCurrentStudy: z.boolean().default(false),
  gpa: z.string().optional(),
  description: z.string().optional(),
});

// Skill Schema
export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Skill name is required'),
  level: z.string(),
  category: z.string().min(1, 'Category is required'),
});

// Project Schema
export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Project name is required'),
  description: z.string().min(1, 'Project description is required'),
  technologies: z.string().min(1, 'Technologies used is required'),
  url: z.string().optional(),
  github: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

// Certificate Schema
export const certificateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Certificate name is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  issueDate: z.string().min(1, 'Issue date is required'),
  expirationDate: z.string().optional(),
  credentialId: z.string().optional(),
  url: z.string().optional(),
});

// Complete Resume Schema
export const resumeSchema = z.object({
  personalInfo: personalInfoSchema,
  summary: z.string().min(1, 'Professional summary is required'),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema),
  projects: z.array(projectSchema),
  certificates: z.array(certificateSchema),
});

// Type exports
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Certificate = z.infer<typeof certificateSchema>;
export type Resume = z.infer<typeof resumeSchema>;

// Default values
export const defaultPersonalInfo: PersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  website: undefined,
  linkedin: undefined,
  github: undefined,
};

export const defaultExperience: Experience = {
  id: '',
  jobTitle: '',
  company: '',
  location: '',
  startDate: '',
  endDate: '',
  isCurrentJob: false,
  description: '',
};

export const defaultEducation: Education = {
  id: '',
  degree: '',
  institution: '',
  location: '',
  startDate: '',
  endDate: '',
  isCurrentStudy: false,
  gpa: '',
  description: '',
};

export const defaultSkill: Skill = {
  id: '',
  name: '',
  level: 'Intermediate',
  category: '',
};

export const defaultProject: Project = {
  id: '',
  name: '',
  description: '',
  technologies: '',
  url: undefined,
  github: undefined,
  startDate: undefined,
  endDate: undefined,
};

export const defaultCertificate: Certificate = {
  id: '',
  name: '',
  issuer: '',
  issueDate: '',
  expirationDate: undefined,
  credentialId: undefined,
  url: undefined,
};

export const defaultResume: Resume = {
  personalInfo: defaultPersonalInfo,
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certificates: [],
};