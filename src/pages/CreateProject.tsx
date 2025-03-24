
import ProjectForm from '@/components/ProjectForm';
import { ArrowRight } from 'lucide-react';
import { useSlideUp } from '@/lib/animations';

const CreateProject = () => {
  const headerAnimation = useSlideUp({ delay: 100 });
  
  return (
    <div className="min-h-screen py-10 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div {...headerAnimation} className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-6 relative">
            <div className="w-full h-full rounded-xl bg-primary/10 absolute"></div>
            <div className="w-full h-full rounded-xl bg-primary/20 absolute transform rotate-6"></div>
            <div className="w-full h-full rounded-xl bg-primary/30 absolute transform -rotate-3"></div>
            <ArrowRight className="absolute inset-0 m-auto h-7 w-7 text-primary" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Create Your Project
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-balance">
            Let's gather the details we need to help you structure your project effectively.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-8">
            <ProjectForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
