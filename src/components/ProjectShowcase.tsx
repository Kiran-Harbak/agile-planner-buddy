
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Check, CheckCircle2, Clock } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import ProjectStructureCard from '@/components/ProjectStructureCard';
import { WorkItem, Methodology } from '@/hooks/useProjectPlanner';
import { Link } from 'react-router-dom';

const demoProjects = [
  {
    name: "E-commerce Platform Redesign",
    description: "Redesigning our e-commerce platform with a focus on mobile experience and checkout flow optimization.",
    objectives: ["Increase mobile conversion rate", "Simplify checkout process", "Implement new payment options"],
    teamSize: 6,
    timeline: "3 months",
    teamRoles: [
      { id: "1", role: "UX Designer", experience: "Senior", availability: "Full-time" },
      { id: "2", role: "Frontend Developer", experience: "Mid-level", availability: "Full-time" },
      { id: "3", role: "Backend Developer", experience: "Senior", availability: "Full-time" },
      { id: "4", role: "Product Manager", experience: "Senior", availability: "Full-time" },
      { id: "5", role: "QA Engineer", experience: "Junior", availability: "Full-time" },
      { id: "6", role: "DevOps Engineer", experience: "Mid-level", availability: "Part-time" }
    ]
  },
  {
    name: "Employee Management System",
    description: "Internal tool for managing employee data, performance reviews, and time-off requests.",
    objectives: ["Centralize employee records", "Automate performance review process", "Streamline time-off approvals"],
    teamSize: 4,
    timeline: "2 months",
    teamRoles: [
      { id: "1", role: "Full-stack Developer", experience: "Senior", availability: "Full-time" },
      { id: "2", role: "UI Designer", experience: "Mid-level", availability: "Part-time" },
      { id: "3", role: "Backend Developer", experience: "Mid-level", availability: "Full-time" },
      { id: "4", role: "Project Manager", experience: "Senior", availability: "Part-time" }
    ]
  }
];

const demoStructures: {[key: string]: WorkItem[]} = {
  "E-commerce Platform Redesign": [
    {
      id: "epic-1",
      title: "Epic: Increase mobile conversion rate",
      description: "This epic focuses on improving the mobile shopping experience to increase conversions",
      type: "epic",
      children: [
        {
          id: "story-1",
          title: "As a user, I want to view my dashboard",
          description: "Mobile-optimized dashboard with key information",
          storyPoints: 8,
          type: "story",
          children: [
            {
              id: "task-1",
              title: "Design UI mockups",
              description: "Create mobile-first designs for the dashboard",
              storyPoints: 3,
              type: "task",
              children: [
                {
                  id: "subtask-1",
                  title: "Add input sanitization",
                  description: "Ensure all user inputs are properly sanitized",
                  storyPoints: 1,
                  type: "subtask"
                }
              ]
            },
            {
              id: "task-2",
              title: "Implement frontend component",
              description: "Develop responsive React components for the dashboard",
              storyPoints: 5,
              type: "task"
            }
          ]
        },
        {
          id: "story-2",
          title: "As a user, I want to filter search results",
          description: "Enhanced filtering capabilities for product searches",
          storyPoints: 13,
          type: "story",
          children: [
            {
              id: "task-3",
              title: "Create API endpoint",
              description: "Backend API for advanced filtering",
              storyPoints: 5,
              type: "task"
            },
            {
              id: "task-4",
              title: "Implement responsive design",
              description: "Ensure filter UI works on all device sizes",
              storyPoints: 3,
              type: "task"
            }
          ]
        }
      ]
    },
    {
      id: "epic-2",
      title: "Epic: Simplify checkout process",
      description: "This epic focuses on streamlining the checkout flow to reduce cart abandonment",
      type: "epic",
      children: [
        {
          id: "story-3",
          title: "As a user, I want to update my profile",
          description: "Allow users to save billing/shipping info",
          storyPoints: 5,
          type: "story",
          children: [
            {
              id: "task-5",
              title: "Add validation",
              description: "Form validation for profile data",
              storyPoints: 2,
              type: "task"
            }
          ]
        }
      ]
    }
  ],
  "Employee Management System": [
    {
      id: "epic-1",
      title: "Epic: Centralize employee records",
      description: "This epic focuses on creating a single source of truth for employee data",
      type: "epic",
      children: [
        {
          id: "story-1",
          title: "As an HR manager, I want to view all employee profiles",
          description: "Comprehensive employee data dashboard",
          storyPoints: 8,
          type: "story",
          children: [
            {
              id: "task-1",
              title: "Design database schema",
              description: "Create optimized schema for employee data",
              storyPoints: 3,
              type: "task"
            },
            {
              id: "task-2",
              title: "Implement data import functionality",
              description: "Allow importing from CSV/Excel",
              storyPoints: 5,
              type: "task"
            }
          ]
        }
      ]
    },
    {
      id: "epic-2",
      title: "Epic: Automate performance review process",
      description: "This epic focuses on streamlining the review cycle",
      type: "epic",
      children: [
        {
          id: "story-2",
          title: "As a manager, I want to schedule performance reviews",
          description: "Automated scheduling and notification system",
          storyPoints: 13,
          type: "story",
          children: [
            {
              id: "task-3",
              title: "Create scheduling algorithm",
              description: "Optimize review scheduling across departments",
              storyPoints: 8,
              type: "task"
            },
            {
              id: "task-4",
              title: "Implement email notifications",
              description: "Automated emails for review participants",
              storyPoints: 5,
              type: "task"
            }
          ]
        }
      ]
    }
  ]
};

const demoMethodologies: {[key: string]: Methodology[]} = {
  "E-commerce Platform Redesign": [
    {
      id: "scrum",
      name: "Scrum",
      description: "Framework within Agile with defined roles, ceremonies, and artifacts for iterative development.",
      suitability: 92,
      benefits: [
        "Ideal for your 6-person team size",
        "Strong for complex projects with changing requirements",
        "Clear framework for the 3-month timeline"
      ],
      challenges: [
        "Requires dedicated Scrum Master",
        "Daily meetings add overhead",
        "Team needs cross-functional capabilities"
      ]
    },
    {
      id: "kanban",
      name: "Kanban",
      description: "Visual workflow management focused on limiting work in progress and maximizing flow.",
      suitability: 78,
      benefits: [
        "Flexible for ongoing feature additions",
        "Visual workflow management",
        "Minimizes context switching"
      ],
      challenges: [
        "Less structured timeboxing",
        "May need additional planning discipline",
        "Could be too flexible for your timeline"
      ]
    }
  ],
  "Employee Management System": [
    {
      id: "kanban",
      name: "Kanban",
      description: "Visual workflow management focused on limiting work in progress and maximizing flow.",
      suitability: 94,
      benefits: [
        "Perfect for your small team of 4",
        "Accommodates part-time team members",
        "Flexible prioritization for feature development"
      ],
      challenges: [
        "Requires self-discipline",
        "Less structured ceremonies",
        "May need additional planning sessions"
      ]
    },
    {
      id: "scrum",
      name: "Scrum",
      description: "Framework within Agile with defined roles, ceremonies, and artifacts for iterative development.",
      suitability: 72,
      benefits: [
        "Regular planning and review",
        "Clear structure for development",
        "Well-defined roles"
      ],
      challenges: [
        "Small team size challenges",
        "Part-time members complicate ceremonies",
        "Overhead for relatively short project"
      ]
    }
  ]
};

type AnimatedStep = {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
};

const ProjectShowcase = () => {
  const [selectedProject, setSelectedProject] = useState(demoProjects[0].name);
  const [currentStep, setCurrentStep] = useState(0);
  const [showStructure, setShowStructure] = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);
  
  const project = demoProjects.find(p => p.name === selectedProject);
  const structure = demoStructures[selectedProject];
  const methodologies = demoMethodologies[selectedProject];
  
  const steps: AnimatedStep[] = [
    { 
      title: "Gather Project Details", 
      description: "Collect key information about your project's scope and objectives",
      icon: <Brain className="h-6 w-6 text-primary" />,
      delay: 0
    },
    { 
      title: "Define Team Composition", 
      description: "Specify roles, experience levels, and availability of team members",
      icon: <Clock className="h-6 w-6 text-primary" />,
      delay: 500
    },
    { 
      title: "Generate Project Structure", 
      description: "AI creates epics, stories, tasks with story points",
      icon: <ArrowRight className="h-6 w-6 text-primary" />,
      delay: 1000
    },
    { 
      title: "Recommend Methodologies", 
      description: "Get personalized workflow recommendations based on your project",
      icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
      delay: 1500
    }
  ];
  
  // Auto-advance through steps for demo
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prevStep => prevStep + 1);
      } else if (currentStep === steps.length - 1 && !showStructure) {
        setShowStructure(true);
      } else if (showStructure && !showMethodology) {
        setShowMethodology(true);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [currentStep, showStructure, showMethodology]);
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-8 overflow-hidden">
        <h2 className="text-2xl font-bold mb-8 text-center">See Project Planner AI in Action</h2>
        
        <Carousel className="w-full max-w-4xl mx-auto mb-8">
          <CarouselContent>
            {demoProjects.map((project) => (
              <CarouselItem key={project.name}>
                <div 
                  className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6"
                  onClick={() => {
                    setSelectedProject(project.name);
                    setCurrentStep(0);
                    setShowStructure(false);
                    setShowMethodology(false);
                  }}
                >
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-sm text-gray-500 mb-2">Team Size</h4>
                      <p className="font-bold">{project.teamSize} members</p>
                    </div>
                    <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-sm text-gray-500 mb-2">Timeline</h4>
                      <p className="font-bold">{project.timeline}</p>
                    </div>
                    <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-sm text-gray-500 mb-2">Objectives</h4>
                      <p className="font-bold">{project.objectives.length}</p>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedProject(project.name);
                      setCurrentStep(0);
                      setShowStructure(false);
                      setShowMethodology(false);
                    }}
                    className="w-full"
                  >
                    View Demo
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="lg:-left-12" />
          <CarouselNext className="lg:-right-12" />
        </Carousel>
        
        {project && (
          <>
            <div className="mb-10">
              <div className="relative">
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="h-1 bg-gray-200 relative top-7 z-0 mx-8">
                    <div 
                      className="h-full bg-primary transition-all duration-1000" 
                      style={{ 
                        width: `${Math.min(100, ((currentStep + 1) / steps.length) * 100)}%` 
                      }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 relative z-10">
                  {steps.map((step, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: index <= currentStep ? 1 : 0.5, 
                        y: 0 
                      }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index <= currentStep ? step.delay / 3000 : 0 
                      }}
                      className="flex flex-col items-center px-4"
                    >
                      <div 
                        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md mb-3 transition-colors ${
                          index <= currentStep ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {index < currentStep ? (
                          <Check className="h-6 w-6" />
                        ) : (
                          step.icon
                        )}
                      </div>
                      <h3 className={`text-sm font-medium text-center mb-1 ${
                        index <= currentStep ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-xs text-gray-500 text-center hidden md:block">
                        {step.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Project Details Section */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              >
                <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Project Name</h4>
                    <p className="font-medium">{project.name}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Description</h4>
                    <p>{project.description}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Objectives</h4>
                    <ul className="list-disc list-inside">
                      {project.objectives.map((objective, i) => (
                        <li key={i}>{objective}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              >
                <h3 className="text-lg font-semibold mb-4">Team Composition</h3>
                <div className="space-y-2">
                  {project.teamRoles.map((member, i) => (
                    <div key={i} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium">{member.role}</div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{member.experience}</span>
                        <span>{member.availability}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Project Structure */}
            {showStructure && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">AI-Generated Project Structure</h3>
                  <p className="text-gray-600 mb-4">
                    Based on your project details, we've automatically generated the following structure:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-sm text-gray-500 mb-2">Epics</h4>
                      <p className="font-bold">{structure.length}</p>
                    </div>
                    <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-sm text-gray-500 mb-2">Stories</h4>
                      <p className="font-bold">
                        {structure.reduce((count, epic) => count + (epic.children?.length || 0), 0)}
                      </p>
                    </div>
                    <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-sm text-gray-500 mb-2">Total Story Points</h4>
                      <p className="font-bold">
                        {structure.reduce((total, epic) => {
                          return total + (epic.children?.reduce((storyTotal, story) => {
                            return storyTotal + (story.storyPoints || 0);
                          }, 0) || 0);
                        }, 0)}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {structure.map((item) => (
                    <ProjectStructureCard key={item.id} item={item} />
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Methodology Recommendations */}
            {showMethodology && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">AI-Recommended Methodologies</h3>
                  <p className="text-gray-600 mb-4">
                    Based on your team composition and project requirements, we recommend:
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {methodologies.map((method, index) => (
                    <div 
                      key={method.id} 
                      className={`bg-white rounded-xl border p-6 shadow-sm ${
                        index === 0 ? 'border-primary/30' : 'border-gray-200'
                      }`}
                    >
                      {index === 0 && (
                        <div className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                          Best Match
                        </div>
                      )}
                      
                      <h3 className="text-xl font-bold mb-2">{method.name}</h3>
                      <p className="text-gray-600 mb-4">{method.description}</p>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Suitability</span>
                          <span className="text-sm font-medium">{method.suitability}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-primary h-2.5 rounded-full" 
                            style={{ width: `${method.suitability}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Benefits</h4>
                        <ul className="space-y-1">
                          {method.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 mr-2 shrink-0" />
                              <span className="text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Challenges</h4>
                        <ul className="space-y-1">
                          {method.challenges.map((challenge, i) => (
                            <li key={i} className="flex items-start">
                              <div className="h-4 w-4 rounded-full border border-amber-500 mt-0.5 mr-2 shrink-0" />
                              <span className="text-sm">{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            <div className="flex justify-center mt-12">
              <Link to="/create">
                <Button size="lg" className="focus-ring">
                  Create Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectShowcase;
