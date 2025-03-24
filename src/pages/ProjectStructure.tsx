
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useProjectPlanner, Methodology } from '@/hooks/useProjectPlanner';
import ProjectStructureCard from '@/components/ProjectStructureCard';
import MethodologyCard from '@/components/MethodologyCard';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { useIntersectionAnimation, useSlideUp } from '@/lib/animations';

const ProjectStructure = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, generateProjectStructure, generateMethodologyRecommendations } = useProjectPlanner();
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
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Button onClick={() => navigate('/')}>Return Home</Button>
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
            onClick={() => navigate('/')}
            className="mb-4 focus-ring"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
              <p className="text-gray-600 max-w-2xl">{project.description}</p>
            </div>
            
            <div className="flex space-x-3">
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
