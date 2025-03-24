
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, ArrowRight } from 'lucide-react';
import { useProjectPlanner } from '@/hooks/useProjectPlanner';
import { Button } from '@/components/ui/button';
import { useSlideUp } from '@/lib/animations';

const Dashboard = () => {
  const { projects } = useProjectPlanner();
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
  
  const headerAnimation = useSlideUp({ delay: 100 });
  const contentAnimation = useSlideUp({ delay: 300 });
  
  const filteredProjects = filterStatus === 'all' 
    ? projects 
    : filterStatus === 'active' 
      ? projects.filter(p => !p.completed) 
      : projects.filter(p => p.completed);

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div {...headerAnimation} className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Projects</h1>
              <p className="text-gray-600 max-w-2xl">
                View and manage all your project plans in one place.
              </p>
            </div>
            
            <Link to="/create">
              <Button className="focus-ring">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </Link>
          </div>
          
          <div className="flex space-x-2 border-b">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 font-medium text-sm transition-colors relative ${
                filterStatus === 'all' 
                  ? 'text-primary' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              All Projects
              {filterStatus === 'all' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-4 py-2 font-medium text-sm transition-colors relative ${
                filterStatus === 'active' 
                  ? 'text-primary' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Active
              {filterStatus === 'active' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-4 py-2 font-medium text-sm transition-colors relative ${
                filterStatus === 'completed' 
                  ? 'text-primary' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Completed
              {filterStatus === 'completed' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
              )}
            </button>
          </div>
        </div>
        
        <div {...contentAnimation}>
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <PlusCircle className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-medium mb-2">No projects found</h2>
              <p className="text-gray-500 mb-6">
                {filterStatus === 'all' 
                  ? "You haven't created any projects yet."
                  : filterStatus === 'active'
                    ? "You don't have any active projects."
                    : "You don't have any completed projects."
                }
              </p>
              {filterStatus === 'all' && (
                <Link to="/create">
                  <Button className="focus-ring">
                    Create Your First Project
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Link 
                  to={`/project-structure/${project.id}`} 
                  key={project.id}
                  className="group hover-scale focus-ring rounded-xl"
                >
                  <div className="h-full bg-white border border-gray-200 rounded-xl p-6 shadow-sm transition-all hover:shadow-md flex flex-col">
                    <div className="flex-1">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <span className="text-primary font-medium text-sm">
                          {project.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {project.description || "No description provided."}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {project.teamSize} Team Members
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {project.objectives.length} Objectives
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                      View Project Structure 
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
              
              <Link to="/create" className="group focus-ring rounded-xl">
                <div className="h-full border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center transition-colors hover:border-primary/50 hover:bg-primary/5">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <PlusCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-gray-900">Create New Project</h3>
                  <p className="text-gray-600 text-sm">Start planning your next project</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
