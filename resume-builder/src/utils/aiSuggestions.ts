import { PersonalInfo, Experience, Education, Skill } from '../schema/resumeSchema';

// Placeholder AI suggestion functions
// In a real application, these would call an AI service

export const generatePersonalSummary = async (personalInfo: PersonalInfo): Promise<string> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const summaries = [
    `Experienced professional with expertise in ${personalInfo.fullName ? 'developing innovative solutions' : 'technology and business'}. Proven track record of delivering high-quality results and driving organizational success through strategic thinking and collaborative leadership.`,
    
    `Results-driven professional with a passion for ${personalInfo.fullName ? 'excellence and innovation' : 'continuous learning'}. Strong background in project management, team collaboration, and strategic problem-solving with a focus on delivering measurable outcomes.`,
    
    `Dynamic and motivated professional with extensive experience in ${personalInfo.fullName ? 'leading cross-functional teams' : 'modern technologies'}. Committed to driving business growth through innovative solutions and exceptional stakeholder relationships.`,
    
    `Accomplished professional with a strong foundation in ${personalInfo.fullName ? 'strategic planning and execution' : 'industry best practices'}. Demonstrated ability to adapt to evolving business needs while maintaining high standards of quality and performance.`
  ];

  return summaries[Math.floor(Math.random() * summaries.length)];
};

export const suggestJobDescription = async (jobTitle: string, company: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1200));

  const descriptions = [
    `Led cross-functional teams to deliver innovative solutions that improved operational efficiency by 25%. Collaborated with stakeholders to define project requirements and ensure successful implementation of key initiatives.`,
    
    `Developed and implemented strategic processes that enhanced team productivity and reduced project delivery time by 30%. Mentored junior team members and fostered a culture of continuous improvement.`,
    
    `Managed complex projects from conception to completion, ensuring adherence to quality standards and timeline requirements. Successfully delivered multiple high-impact initiatives that drove business growth.`,
    
    `Spearheaded the development of innovative solutions that streamlined operations and improved customer satisfaction. Worked closely with leadership to align project goals with organizational objectives.`,
    
    `Drove the implementation of best practices and process improvements that resulted in significant cost savings and enhanced operational performance. Built strong relationships with key stakeholders.`
  ];

  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

export const suggestSkills = async (jobTitle: string): Promise<Skill[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const skillSuggestions = {
    'Software Engineer': [
      { name: 'JavaScript', level: 'Advanced', category: 'Programming Languages' },
      { name: 'React', level: 'Advanced', category: 'Frontend Frameworks' },
      { name: 'Node.js', level: 'Intermediate', category: 'Backend Technologies' },
      { name: 'TypeScript', level: 'Advanced', category: 'Programming Languages' },
      { name: 'Git', level: 'Advanced', category: 'Version Control' },
    ],
    'Data Scientist': [
      { name: 'Python', level: 'Expert', category: 'Programming Languages' },
      { name: 'Machine Learning', level: 'Advanced', category: 'Data Science' },
      { name: 'SQL', level: 'Advanced', category: 'Databases' },
      { name: 'TensorFlow', level: 'Intermediate', category: 'ML Frameworks' },
      { name: 'Data Visualization', level: 'Advanced', category: 'Data Science' },
    ],
    'Project Manager': [
      { name: 'Agile Methodology', level: 'Expert', category: 'Project Management' },
      { name: 'Scrum', level: 'Advanced', category: 'Project Management' },
      { name: 'Risk Management', level: 'Advanced', category: 'Project Management' },
      { name: 'Stakeholder Management', level: 'Expert', category: 'Leadership' },
      { name: 'Budget Planning', level: 'Intermediate', category: 'Finance' },
    ],
    default: [
      { name: 'Communication', level: 'Advanced', category: 'Soft Skills' },
      { name: 'Problem Solving', level: 'Advanced', category: 'Soft Skills' },
      { name: 'Team Collaboration', level: 'Advanced', category: 'Soft Skills' },
      { name: 'Time Management', level: 'Advanced', category: 'Soft Skills' },
      { name: 'Leadership', level: 'Intermediate', category: 'Soft Skills' },
    ]
  };

  const normalizedJobTitle = jobTitle.toLowerCase();
  let suggestedSkills = skillSuggestions.default;

  if (normalizedJobTitle.includes('engineer') || normalizedJobTitle.includes('developer')) {
    suggestedSkills = skillSuggestions['Software Engineer'];
  } else if (normalizedJobTitle.includes('data') || normalizedJobTitle.includes('scientist')) {
    suggestedSkills = skillSuggestions['Data Scientist'];
  } else if (normalizedJobTitle.includes('manager') || normalizedJobTitle.includes('project')) {
    suggestedSkills = skillSuggestions['Project Manager'];
  }

  return suggestedSkills.map((skill, index) => ({
    ...skill,
    id: `suggested-skill-${index}`,
  }));
};

export const suggestEducationDescription = async (degree: string, institution: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 800));

  const descriptions = [
    `Relevant coursework included advanced topics in ${degree.toLowerCase().includes('computer') ? 'algorithms, data structures, and software engineering' : 'core subject areas'}. Maintained strong academic performance while actively participating in student organizations.`,
    
    `Completed comprehensive curriculum covering ${degree.toLowerCase().includes('business') ? 'strategic management, finance, and operations' : 'theoretical and practical applications'}. Engaged in research projects and collaborative learning experiences.`,
    
    `Achieved academic excellence while developing strong analytical and critical thinking skills. Participated in ${degree.toLowerCase().includes('engineering') ? 'engineering design projects' : 'academic research initiatives'} and leadership activities.`,
    
    `Focused on ${degree.toLowerCase().includes('science') ? 'scientific research methodologies and data analysis' : 'core competencies and practical applications'}. Built a solid foundation for professional growth and continuous learning.`
  ];

  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

export const improveText = async (text: string, context: 'summary' | 'experience' | 'education'): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (!text.trim()) {
    return text;
  }

  // Simple text improvements (in a real app, this would use AI)
  let improvedText = text;

  // Add action words for experience
  if (context === 'experience') {
    const actionWords = ['Spearheaded', 'Implemented', 'Developed', 'Led', 'Optimized', 'Enhanced', 'Delivered'];
    if (!improvedText.match(/^(Spearheaded|Implemented|Developed|Led|Optimized|Enhanced|Delivered|Managed|Created|Built)/)) {
      const randomAction = actionWords[Math.floor(Math.random() * actionWords.length)];
      improvedText = improvedText.charAt(0).toLowerCase() + improvedText.slice(1);
      improvedText = randomAction + ' ' + improvedText;
    }
  }

  // Enhance with metrics (placeholder)
  if (context === 'experience' && !improvedText.match(/\d+(%|x|\+)/)) {
    const metrics = ['25%', '30%', '2x', '40%', '50%'];
    const randomMetric = metrics[Math.floor(Math.random() * metrics.length)];
    improvedText += `, resulting in ${randomMetric} improvement in efficiency`;
  }

  return improvedText;
};