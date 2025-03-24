import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectDetails, TeamMember, projectQuestions, teamMemberQuestions, useProjectPlanner } from '@/hooks/useProjectPlanner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ArrowRight, X, Plus } from 'lucide-react';
import { useSlideUp, useStaggeredChildren } from '@/lib/animations';

export function ProjectForm() {
  const navigate = useNavigate();
  const { createProject } = useProjectPlanner();
  const [currentStep, setCurrentStep] = useState(0);
  const [projectData, setProjectData] = useState<Partial<ProjectDetails>>({
    name: '',
    description: '',
    objectives: [''],
    teamSize: 1,
    teamRoles: [],
    timeline: '',
  });
  const [showTeamMembers, setShowTeamMembers] = useState(false);
  const [currentTeamMember, setCurrentTeamMember] = useState<Partial<TeamMember>>({});
  const [currentTeamMemberIndex, setCurrentTeamMemberIndex] = useState(0);
  const [currentTeamStep, setCurrentTeamStep] = useState(0);
  
  const slideIn = useSlideUp({ delay: 100 });
  const questionAnimation = useSlideUp({ delay: 300 });
  const buttonAnimation = useSlideUp({ delay: 500 });
  
  useEffect(() => {
    // Reset currentTeamMember when moving to a new team member
    if (showTeamMembers && currentTeamStep === 0) {
      setCurrentTeamMember({
        id: Math.random().toString(36).substring(2, 10),
      });
    }
  }, [currentTeamMemberIndex, showTeamMembers]);
  
  const handleInputChange = (questionId: string, value: string | string[] | number) => {
    setProjectData(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };
  
  const handleObjectivesChange = (index: number, value: string) => {
    const newObjectives = [...(projectData.objectives || [''])];
    newObjectives[index] = value;
    setProjectData(prev => ({
      ...prev,
      objectives: newObjectives,
    }));
  };
  
  const addObjective = () => {
    setProjectData(prev => ({
      ...prev,
      objectives: [...(prev.objectives || ['']), ''],
    }));
  };
  
  const removeObjective = (index: number) => {
    if ((projectData.objectives?.length || 0) <= 1) return;
    
    const newObjectives = [...(projectData.objectives || [''])];
    newObjectives.splice(index, 1);
    setProjectData(prev => ({
      ...prev,
      objectives: newObjectives,
    }));
  };
  
  const handleTeamMemberChange = (questionId: string, value: string) => {
    setCurrentTeamMember(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };
  
  const goToNextProjectQuestion = () => {
    const currentQuestion = projectQuestions[currentStep];
    
    // Validate required fields
    if (currentQuestion.required) {
      if (currentQuestion.id === 'objectives') {
        const objectives = projectData.objectives || [''];
        if (objectives.some(obj => !obj.trim())) return;
      } else {
        const value = projectData[currentQuestion.id as keyof typeof projectData];
        if (!value) return;
      }
    }
    
    if (currentStep < projectQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // If all project questions are answered, proceed to team members
      setShowTeamMembers(true);
    }
  };
  
  const goToPrevProjectQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const goToNextTeamQuestion = () => {
    const currentQuestion = teamMemberQuestions[currentTeamStep];
    
    // Validate required fields
    if (currentQuestion.required) {
      const value = currentTeamMember[currentQuestion.id as keyof typeof currentTeamMember];
      if (!value) return;
    }
    
    if (currentTeamStep < teamMemberQuestions.length - 1) {
      setCurrentTeamStep(prev => prev + 1);
    } else {
      // Add team member to project data
      const newTeamRoles = [...(projectData.teamRoles || [])];
      newTeamRoles[currentTeamMemberIndex] = currentTeamMember as TeamMember;
      
      setProjectData(prev => ({
        ...prev,
        teamRoles: newTeamRoles,
      }));
      
      // If we've collected all team members, finalize the project
      if (currentTeamMemberIndex >= (projectData.teamSize || 1) - 1) {
        finalizeProject();
      } else {
        // Otherwise, move to next team member
        setCurrentTeamMemberIndex(prev => prev + 1);
        setCurrentTeamStep(0);
      }
    }
  };
  
  const goToPrevTeamQuestion = () => {
    if (currentTeamStep > 0) {
      setCurrentTeamStep(prev => prev - 1);
    } else if (currentTeamMemberIndex > 0) {
      // Go back to previous team member
      setCurrentTeamMemberIndex(prev => prev - 1);
      setCurrentTeamStep(teamMemberQuestions.length - 1);
      
      // Restore the previous team member data
      const prevTeamMember = projectData.teamRoles?.[currentTeamMemberIndex - 1];
      if (prevTeamMember) {
        setCurrentTeamMember(prevTeamMember);
      }
    } else {
      // Go back to project questions
      setShowTeamMembers(false);
      setCurrentStep(projectQuestions.length - 1);
    }
  };
  
  const finalizeProject = () => {
    const newProject = createProject(projectData);
    navigate(`/project-structure/${newProject.id}`);
  };
  
  const skipToScaffold = () => {
    // Ensure we have at least the minimum requirements
    if (!projectData.name) return;
    
    const newProject = createProject({
      ...projectData,
      teamRoles: projectData.teamRoles || Array.from({ length: projectData.teamSize || 1 }).map(() => ({
        id: Math.random().toString(36).substring(2, 10),
        role: 'Team Member',
        experience: 'Mid-level',
        availability: 'Full-time',
      })),
    });
    
    navigate(`/project-structure/${newProject.id}`);
  };
  
  const renderProjectQuestion = () => {
    const question = projectQuestions[currentStep];
    
    return (
      <div {...questionAnimation} className="space-y-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-medium mb-2 text-balance">{question.question}</h2>
        
        {question.id === 'objectives' ? (
          <div className="space-y-3">
            {projectData.objectives?.map((objective, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={objective}
                  onChange={(e) => handleObjectivesChange(index, e.target.value)}
                  placeholder={question.placeholder}
                  className="focus-ring"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeObjective(index)}
                  className="h-10 w-10"
                  disabled={(projectData.objectives?.length || 0) <= 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addObjective}
              className="focus-ring"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Objective
            </Button>
          </div>
        ) : question.type === 'number' ? (
          <Input
            type="number"
            value={projectData[question.id as keyof typeof projectData] as string || ''}
            onChange={(e) => handleInputChange(question.id, parseInt(e.target.value) || 1)}
            placeholder={question.placeholder}
            min={1}
            className="focus-ring"
          />
        ) : question.id === 'description' ? (
          <Textarea
            value={projectData[question.id as keyof typeof projectData] as string || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="min-h-32 focus-ring"
          />
        ) : (
          <Input
            value={projectData[question.id as keyof typeof projectData] as string || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="focus-ring"
          />
        )}
      </div>
    );
  };
  
  const renderTeamMemberQuestion = () => {
    const question = teamMemberQuestions[currentTeamStep];
    
    return (
      <div {...questionAnimation} className="space-y-6 max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="text-sm font-medium text-muted-foreground mb-1">
            Team Member {currentTeamMemberIndex + 1} of {projectData.teamSize}
          </div>
          <h2 className="text-2xl font-medium text-balance">{question.question}</h2>
        </div>
        
        {question.options ? (
          <div className="space-y-2">
            <Label htmlFor={question.id}>{question.question}</Label>
            <Select
              value={currentTeamMember[question.id as keyof typeof currentTeamMember] as string || ''}
              onValueChange={(value) => handleTeamMemberChange(question.id, value)}
            >
              <SelectTrigger id={question.id} className="focus-ring">
                <SelectValue placeholder={`Select ${question.id}`} />
              </SelectTrigger>
              <SelectContent>
                {question.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <Input
            value={currentTeamMember[question.id as keyof typeof currentTeamMember] as string || ''}
            onChange={(e) => handleTeamMemberChange(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="focus-ring"
          />
        )}
      </div>
    );
  };
  
  const progressPercentage = showTeamMembers
    ? Math.round(((currentTeamMemberIndex * teamMemberQuestions.length + currentTeamStep) / (projectData.teamSize || 1) / teamMemberQuestions.length + projectQuestions.length / (projectQuestions.length + 1)) * 100)
    : Math.round(((currentStep + 1) / (projectQuestions.length + 1)) * 100);
  
  return (
    <div {...slideIn} className="w-full max-w-4xl mx-auto px-4 py-8 relative">
      <div className="bg-gray-100 h-1 mb-10 rounded-full overflow-hidden">
        <div 
          className="bg-primary h-full transition-all duration-500 ease-in-out" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (showTeamMembers) {
            goToNextTeamQuestion();
          } else {
            goToNextProjectQuestion();
          }
        }}
        className="space-y-8"
      >
        {showTeamMembers ? renderTeamMemberQuestion() : renderProjectQuestion()}
        
        <div {...buttonAnimation} className="flex justify-between pt-4">
          <div>
            <Button
              type="button"
              variant="outline"
              onClick={showTeamMembers ? goToPrevTeamQuestion : goToPrevProjectQuestion}
              disabled={currentStep === 0 && !showTeamMembers}
              className="mr-2 focus-ring"
            >
              Back
            </Button>
            
            {!showTeamMembers && (
              <Button
                type="button"
                variant="secondary"
                onClick={skipToScaffold}
                disabled={!projectData.name}
                className="focus-ring"
              >
                Skip to Project Structure
              </Button>
            )}
          </div>
          
          <Button type="submit" className="focus-ring">
            {showTeamMembers && currentTeamStep === teamMemberQuestions.length - 1 && currentTeamMemberIndex === (projectData.teamSize || 1) - 1
              ? 'Finish'
              : 'Continue'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProjectForm;
