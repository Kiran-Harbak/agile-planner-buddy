
import ProjectForm from '@/components/ProjectForm';

const CreateProject = () => {
  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
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
