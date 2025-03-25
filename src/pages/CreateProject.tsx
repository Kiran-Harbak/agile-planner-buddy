
import { motion } from 'framer-motion';
import ProjectForm from '@/components/ProjectForm';
import { ArrowRight, Brain, FileText, PenLine, Settings } from 'lucide-react';
import { useSlideUp } from '@/lib/animations';

const CreateProject = () => {
  const headerAnimation = useSlideUp({ delay: 100 });
  
  // Sequential animation for form steps
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  return (
    <div className="min-h-screen py-10 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div {...headerAnimation} className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-6 relative">
            <div className="w-full h-full rounded-xl bg-primary/10 absolute"></div>
            <div className="w-full h-full rounded-xl bg-primary/20 absolute transform rotate-6"></div>
            <div className="w-full h-full rounded-xl bg-primary/30 absolute transform -rotate-3"></div>
            <PenLine className="absolute inset-0 m-auto h-7 w-7 text-primary" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Create Your Project
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-balance">
            Let's gather the details we need to help you structure your project effectively.
          </p>
        </div>
        
        <motion.div 
          className="max-w-4xl mx-auto mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div variants={itemVariants} className="bg-white/90 rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-medium mb-2">Project Details</h3>
              <p className="text-sm text-gray-600">Define your project's name, description, and core objectives</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white/90 rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <Settings className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-medium mb-2">Team Configuration</h3>
              <p className="text-sm text-gray-600">Specify team size, roles, and member experience levels</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white/90 rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <Brain className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-medium mb-2">AI-Generated Structure</h3>
              <p className="text-sm text-gray-600">Get a complete project breakdown with just a few details</p>
            </motion.div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-8">
            <ProjectForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateProject;
