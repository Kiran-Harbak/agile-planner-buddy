
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useProjectPlanner, Methodology } from '@/hooks/useProjectPlanner';
import ProjectStructureCard from '@/components/ProjectStructureCard';
import MethodologyCard from '@/components/MethodologyCard';
import { ArrowLeft, Download, Share2, CheckSquare, Trash2, AlignLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useIntersectionAnimation, useSlideUp } from '@/lib/animations';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ProjectStructure = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, generateProjectStructure, generateMethodologyRecommendations, toggleProjectCompletion, deleteProject } = useProjectPlanner();
  const [selectedMethodology, setSelectedMethodology] = useState<string | null>(null);
  
  const project = projects.find(p => p.id === id);
  const projectStructure = id ? generateProjectStructure(id) : [];
  const methodologies = id ? generateMethodologyRecommendations(id) : [];
  
  const headerAnimation = useSlideUp({ delay: 100 });
  const structureAnimation = useSlideUp({ delay: 300 });
  const methodologyAnimation = useSlideUp({ delay: 500 });
  
  const handleMethodologySelect = (methodologyId: string) => {
    setSelectedMethodology(methodologyId);
    toast.success(`${methodologies.find(m => m.id === methodologyId)?.name} methodology selected!`);
  };
  
  const handleDownload = () => {
    const projectData = {
      project,
      structure: projectStructure,
      selectedMethodology: methodologies.find(m => m.id === selectedMethodology),
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projectData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${project?.name || 'project'}_plan.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    toast.success('Project plan downloaded successfully!');
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Project URL copied to clipboard!');
  };
  
  const handleToggleCompletion = () => {
    if (id) {
      toggleProjectCompletion(id);
    }
  };
  
  const handleDeleteProject = () => {
    if (id) {
      deleteProject(id);
      navigate('/dashboard');
    }
  };
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div {...headerAnimation} className="mb-10">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-4 focus-ring"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{project.name}</h1>
                {project.completed && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                )}
              </div>
              <p className="text-gray-600 max-w-2xl">{project.description}</p>
              
              <div className="mt-4 flex flex-wrap gap-3">
                <div className="flex items-center text-sm text-gray-600">
                  <AlignLeft className="h-4 w-4 mr-1" />
                  <span>{project.objectives.length} Objectives</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span>Timeline: {project.timeline}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span>Team size: {project.teamSize}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                onClick={handleToggleCompletion}
                className="focus-ring"
              >
                <CheckSquare className="mr-2 h-4 w-4" />
                Mark as {project.completed ? 'Active' : 'Completed'}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleShare}
                className="focus-ring"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              
              <Button 
                onClick={handleDownload}
                className="focus-ring"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Plan
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="text-destructive focus-ring">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete the project "{project.name}" and all associated data.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteProject} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div {...structureAnimation} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
              <h2 className="text-xl font-bold mb-6">Project Structure</h2>
              
              <div className="space-y-4">
                {projectStructure.map(item => (
                  <ProjectStructureCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div {...methodologyAnimation} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-6">Recommended Methodologies</h2>
              
              <div className="space-y-4">
                {methodologies.map(methodology => (
                  <MethodologyCard
                    key={methodology.id}
                    methodology={methodology}
                    isSelected={selectedMethodology === methodology.id}
                    onSelect={handleMethodologySelect}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStructure;
