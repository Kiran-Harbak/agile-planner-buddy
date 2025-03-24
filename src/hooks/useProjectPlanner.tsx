import { useState } from 'react';
import { toast } from 'sonner';

// Types
export type ProjectDetails = {
  id: string;
  name: string;
  description: string;
  objectives: string[];
  teamSize: number;
  teamRoles: TeamMember[];
  timeline: string;
  currentQuestion: number;
  completed: boolean;
  createdAt: Date;
};

export type TeamMember = {
  id: string;
  role: string;
  experience: 'Junior' | 'Mid-level' | 'Senior';
  availability: 'Full-time' | 'Part-time' | 'Contractor';
};

export type WorkItem = {
  id: string;
  title: string;
  description: string;
  storyPoints?: number;
  children?: WorkItem[];
  type: 'epic' | 'story' | 'task' | 'subtask';
};

export type Methodology = {
  id: string;
  name: string;
  description: string;
  suitability: number; // 0-100 score
  benefits: string[];
  challenges: string[];
};

// Questions for the project creation flow
export const projectQuestions = [
  {
    id: 'name',
    question: 'What is the name of your project?',
    placeholder: 'E.g., Mobile Banking App Redesign',
    required: true,
  },
  {
    id: 'description',
    question: 'Briefly describe your project.',
    placeholder: 'E.g., A complete redesign of our mobile banking application with focus on improved user experience and new features.',
    required: true,
  },
  {
    id: 'objectives',
    question: 'What are the main objectives of this project?',
    placeholder: 'E.g., Increase user engagement, Reduce support tickets, Add payment features',
    required: true,
    isMultiple: true,
  },
  {
    id: 'teamSize',
    question: 'How many team members will be working on this project?',
    placeholder: 'E.g., 5',
    required: true,
    type: 'number',
  },
  {
    id: 'timeline',
    question: 'What is the expected timeline for this project?',
    placeholder: 'E.g., 3 months, Q4 2023, etc.',
    required: true,
  }
];

// Questions for team member details
export const teamMemberQuestions = [
  {
    id: 'role',
    question: 'What is the role of this team member?',
    placeholder: 'E.g., Frontend Developer, UX Designer, Product Manager',
    required: true,
  },
  {
    id: 'experience',
    question: 'What is the experience level of this team member?',
    options: ['Junior', 'Mid-level', 'Senior'],
    required: true,
  },
  {
    id: 'availability',
    question: 'What is the availability of this team member?',
    options: ['Full-time', 'Part-time', 'Contractor'],
    required: true,
  }
];

export function useProjectPlanner() {
  const [projects, setProjects] = useState<ProjectDetails[]>([]);

  // Create a new project
  const createProject = (projectData: Partial<ProjectDetails>) => {
    const newProject = {
      id: generateId(),
      name: projectData.name || 'Untitled Project',
      description: projectData.description || '',
      objectives: projectData.objectives || [],
      teamSize: projectData.teamSize || 1,
      teamRoles: projectData.teamRoles || [],
      timeline: projectData.timeline || '',
      currentQuestion: 0,
      completed: false,
      createdAt: new Date(),
    };
    
    setProjects([...projects, newProject]);
    toast.success('Project created successfully!');
    return newProject;
  };
  
  // Update project completion status
  const toggleProjectCompletion = (projectId: string) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId 
          ? { ...project, completed: !project.completed }
          : project
      )
    );
    
    const project = projects.find(p => p.id === projectId);
    if (project) {
      const message = !project.completed
        ? 'Project marked as completed!'
        : 'Project marked as active!';
      toast.success(message);
    }
  };
  
  // Delete a project
  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
    toast.success('Project deleted successfully!');
  };

  // Generate project structure based on project details
  const generateProjectStructure = (projectId: string): WorkItem[] => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return [];
    
    // Generate epics based on objectives
    const epics = project.objectives.map((objective, index) => {
      const epicId = `epic-${index}-${generateId()}`;
      
      // Generate 2-4 stories per epic
      const storyCount = Math.floor(Math.random() * 3) + 2;
      const stories = Array.from({ length: storyCount }).map((_, storyIndex) => {
        const storyId = `story-${storyIndex}-${generateId()}`;
        
        // Generate 2-5 tasks per story
        const taskCount = Math.floor(Math.random() * 4) + 2;
        const tasks = Array.from({ length: taskCount }).map((_, taskIndex) => {
          const taskId = `task-${taskIndex}-${generateId()}`;
          
          // Some tasks have subtasks
          const hasSubtasks = Math.random() > 0.5;
          const subtasks = hasSubtasks 
            ? Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map((_, subtaskIndex) => ({
                id: `subtask-${subtaskIndex}-${generateId()}`,
                title: generateSubtaskTitle(taskIndex, subtaskIndex),
                description: `Subtask related to ${objective}`,
                storyPoints: Math.floor(Math.random() * 3) + 1,
                type: 'subtask' as const,
              }))
            : [];
            
          return {
            id: taskId,
            title: generateTaskTitle(storyIndex, taskIndex),
            description: `Task related to ${objective}`,
            storyPoints: Math.floor(Math.random() * 5) + 1,
            children: subtasks,
            type: 'task' as const,
          };
        });
        
        return {
          id: storyId,
          title: generateStoryTitle(index, storyIndex),
          description: `User story related to ${objective}`,
          storyPoints: Math.floor(Math.random() * 8) + 3,
          children: tasks,
          type: 'story' as const,
        };
      });
      
      return {
        id: epicId,
        title: `Epic: ${objective}`,
        description: `This epic focuses on ${objective.toLowerCase()}`,
        children: stories,
        type: 'epic' as const,
      };
    });
    
    return epics;
  };
  
  // Generate methodology recommendations based on project details
  const generateMethodologyRecommendations = (projectId: string): Methodology[] => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return [];
    
    const teamSize = project.teamSize || 0;
    
    // Calculate suitability scores based on project factors
    const agileScore = calculateAgileScore(project);
    const kanbanScore = calculateKanbanScore(project);
    const scrumScore = calculateScrumScore(project);
    const waterFallScore = calculateWaterfallScore(project);
    
    return [
      {
        id: 'agile',
        name: 'Agile',
        description: 'Iterative approach focused on collaboration, customer feedback, and small, rapid releases.',
        suitability: agileScore,
        benefits: [
          'Adaptable to changing requirements',
          'Faster delivery of features',
          'Better stakeholder engagement'
        ],
        challenges: [
          'Requires regular communication',
          'May need experienced team members',
          'Documentation might be less comprehensive'
        ]
      },
      {
        id: 'scrum',
        name: 'Scrum',
        description: 'Framework within Agile with defined roles, ceremonies, and artifacts for iterative development.',
        suitability: scrumScore,
        benefits: [
          'Clear structure and roles',
          'Regular planning and review',
          'Improved team synchronization'
        ],
        challenges: [
          'Requires dedicated Scrum Master',
          'Daily meetings may be overhead for small teams',
          'May be rigid for very small projects'
        ]
      },
      {
        id: 'kanban',
        name: 'Kanban',
        description: 'Visual workflow management focused on limiting work in progress and maximizing flow.',
        suitability: kanbanScore,
        benefits: [
          'Visualizes workflow clearly',
          'Limits work in progress',
          'Flexible scheduling and priorities'
        ],
        challenges: [
          'Less structured timeboxing',
          'May lack the ceremony benefits of Scrum',
          'Can be hard to forecast completion dates'
        ]
      },
      {
        id: 'waterfall',
        name: 'Waterfall',
        description: 'Sequential design process where progress flows downwards through phases.',
        suitability: waterFallScore,
        benefits: [
          'Clear project phases and deliverables',
          'Easy to understand and manage',
          'Thorough documentation'
        ],
        challenges: [
          'Difficult to incorporate changes mid-project',
          'Testing occurs late in the process',
          'Higher risk of rework'
        ]
      }
    ].sort((a, b) => b.suitability - a.suitability);
  };

  // Helper functions
  const calculateAgileScore = (project: ProjectDetails): number => {
    // Base score
    let score = 75;
    
    // Small teams benefit more from Agile
    if (project.teamSize <= 5) score += 10;
    if (project.teamSize > 10) score -= 10;
    
    // Senior team members tend to work better with Agile
    const seniorCount = project.teamRoles?.filter(m => m.experience === 'Senior').length || 0;
    score += seniorCount * 2;
    
    // Contract-heavy teams might find Agile challenging
    const contractorCount = project.teamRoles?.filter(m => m.availability === 'Contractor').length || 0;
    score -= contractorCount * 3;
    
    return Math.min(Math.max(score, 0), 100);
  };
  
  const calculateScrumScore = (project: ProjectDetails): number => {
    // Base score
    let score = 70;
    
    // Scrum works well for medium-sized teams
    if (project.teamSize >= 3 && project.teamSize <= 9) score += 15;
    if (project.teamSize < 3 || project.teamSize > 12) score -= 15;
    
    // Full-time team members benefit Scrum
    const fullTimeCount = project.teamRoles?.filter(m => m.availability === 'Full-time').length || 0;
    score += fullTimeCount * 2;
    
    return Math.min(Math.max(score, 0), 100);
  };
  
  const calculateKanbanScore = (project: ProjectDetails): number => {
    // Base score
    let score = 65;
    
    // Kanban works for teams of all sizes
    if (project.teamSize <= 5) score += 10;
    
    // Part-time resources work well with Kanban
    const partTimeCount = project.teamRoles?.filter(m => m.availability === 'Part-time').length || 0;
    score += partTimeCount * 3;
    
    return Math.min(Math.max(score, 0), 100);
  };
  
  const calculateWaterfallScore = (project: ProjectDetails): number => {
    // Base score - generally lower for modern software projects
    let score = 50;
    
    // Some factors that might influence waterfall suitability
    if (project.teamSize > 15) score += 10; // Large teams
    
    // Mix of different experience levels
    const juniorCount = project.teamRoles?.filter(m => m.experience === 'Junior').length || 0;
    score += juniorCount * 2; // More junior staff might benefit from waterfall structure
    
    return Math.min(Math.max(score, 0), 100);
  };
  
  const generateId = (): string => {
    return Math.random().toString(36).substring(2, 10);
  };
  
  const generateStoryTitle = (epicIndex: number, storyIndex: number): string => {
    const storyTitles = [
      "As a user, I want to view my dashboard",
      "As a user, I want to update my profile",
      "As a user, I want to manage my settings",
      "As a user, I want to track my progress",
      "As a user, I want to see notifications",
      "As a user, I want to filter search results",
      "As a user, I want to share content",
      "As a user, I want to customize my experience",
      "As a user, I want to export my data",
      "As a user, I want to connect with others",
      "As a user, I want to view analytics",
      "As a user, I want to manage permissions",
    ];
    
    const index = (epicIndex * 4 + storyIndex) % storyTitles.length;
    return storyTitles[index];
  };
  
  const generateTaskTitle = (storyIndex: number, taskIndex: number): string => {
    const taskTitles = [
      "Design UI mockups",
      "Implement frontend component",
      "Create API endpoint",
      "Write unit tests",
      "Update documentation",
      "Perform code review",
      "Optimize database query",
      "Add validation",
      "Fix accessibility issues",
      "Implement responsive design",
      "Add loading states",
      "Create error handling",
      "Update navigation flow",
      "Add user feedback mechanism",
      "Implement data caching",
      "Add search functionality",
    ];
    
    const index = (storyIndex * 5 + taskIndex) % taskTitles.length;
    return taskTitles[index];
  };
  
  const generateSubtaskTitle = (taskIndex: number, subtaskIndex: number): string => {
    const subtaskTitles = [
      "Add input sanitization",
      "Implement error states",
      "Create help documentation",
      "Update icons",
      "Fix edge case handling",
      "Add keyboard shortcuts",
      "Update color scheme",
      "Implement dark mode support",
      "Add localization support",
      "Optimize image loading",
      "Add analytics tracking",
      "Implement caching strategy",
    ];
    
    const index = (taskIndex * 3 + subtaskIndex) % subtaskTitles.length;
    return subtaskTitles[index];
  };

  return {
    projects,
    createProject,
    toggleProjectCompletion,
    deleteProject,
    generateProjectStructure,
    generateMethodologyRecommendations,
  };
}
