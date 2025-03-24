
import ProjectForm from '@/components/ProjectForm';
import { ArrowRight } from 'lucide-react';
import { useSlideUp } from '@/lib/animations';

const CreateProject = () => {
  const headerAnimation = useSlideUp({ delay: 100 });
  
  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div {...headerAnimation} className="text-center mb-12">
          <div className="w-12 h-12 mx-auto mb-6 relative">
            <div className="w-full h-full rounded-xl bg-primary/10 absolute"></div>
            <div className="w-full h-full rounded-xl bg-primary/20 absolute transform rotate-6"></div>
            <ArrowRight className="absolute inset-0 m-auto h-6 w-6 text-primary" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Create Your Project</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-balance">
            Let's gather the details we need to help you structure your project effectively.
          </p>
        </div>
        
        <ProjectForm />
      </div>
    </div>
  );
};

export default CreateProject;
