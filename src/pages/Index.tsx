
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useIntersectionAnimation } from '@/lib/animations';

const Index = () => {
  const navigate = useNavigate();
  const heroAnimation = useIntersectionAnimation({ animationClass: 'animate-fade-in' });
  const featuresAnimation = useIntersectionAnimation({ animationClass: 'animate-fade-in' });
  const ctaAnimation = useIntersectionAnimation({ animationClass: 'animate-fade-in' });
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8" {...heroAnimation}>
            <div className="w-16 h-16 relative animate-float">
              <div className="w-full h-full rounded-2xl bg-primary/20 absolute transform rotate-6"></div>
              <div className="w-full h-full rounded-2xl bg-primary/40 absolute transform -rotate-3"></div>
              <div className="w-full h-full rounded-2xl bg-primary/60 absolute transform rotate-0"></div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 text-balance max-w-4xl">
              Project Planning. <span className="text-primary">Simplified.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl text-balance">
              Effortlessly plan, structure, and organize your projects with AI assistance that guides you every step of the way.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button 
                onClick={() => navigate('/create')}
                size="lg" 
                className="rounded-lg px-8 py-6 text-lg focus-ring shadow-sm"
              >
                Start Planning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16" {...featuresAnimation}>
            <h2 className="text-3xl font-bold mb-4 text-balance">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
              Our planning assistant guides you through structuring your project in three simple steps.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              number="01"
              title="Project Details"
              description="Define your project's scope, objectives, and team composition with guided questions."
              delay={100}
            />
            
            <FeatureCard
              number="02"
              title="Structure Generation"
              description="Get a recommended breakdown of epics, stories, tasks, and subtasks with estimated story points."
              delay={200}
            />
            
            <FeatureCard
              number="03"
              title="Methodology Match"
              description="Receive personalized recommendations for project management methodologies based on your context."
              delay={300}
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6" {...ctaAnimation}>
            <h2 className="text-3xl font-bold mb-4 text-balance">
              Ready to plan your next project?
            </h2>
            
            <p className="text-xl text-gray-600 text-balance">
              Start your journey to better project planning today. No sign-up required.
            </p>
            
            <Button 
              onClick={() => navigate('/create')}
              size="lg" 
              className="mt-4 rounded-lg px-8 py-6 text-lg focus-ring shadow-sm"
            >
              Create Your Project Plan
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ 
  number, 
  title, 
  description, 
  delay 
}: { 
  number: string; 
  title: string; 
  description: string;
  delay: number;
}) => {
  const animation = useIntersectionAnimation({
    animationClass: 'animate-fade-in',
  });
  
  return (
    <div 
      {...animation} 
      className="flex flex-col items-center p-6 text-center bg-white rounded-xl border border-gray-100 shadow-sm"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <span className="text-lg font-semibold text-primary">{number}</span>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Index;
