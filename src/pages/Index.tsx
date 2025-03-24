
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSlideUp } from '@/lib/animations';

const Index = () => {
  const heroAnimation = useSlideUp({ delay: 100 });
  const featuresAnimation = useSlideUp({ delay: 300 });
  const ctaAnimation = useSlideUp({ delay: 500 });
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div {...heroAnimation} className="text-center mb-16">
            <div className="mb-6 flex justify-center">
              <div className="relative w-16 h-16">
                <div className="w-full h-full rounded-2xl bg-primary/20 absolute transform rotate-12"></div>
                <div className="w-full h-full rounded-2xl bg-primary/10 absolute transform -rotate-6"></div>
                <div className="absolute inset-0 flex items-center justify-center text-primary">
                  <FileText size={32} />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance max-w-4xl mx-auto">
              Plan and Structure Your Projects with AI Assistance
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-balance">
              Project Planner helps you define goals, organize tasks, and choose the right workflow for your team.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/create">
                <Button size="lg" className="focus-ring">
                  Create New Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="focus-ring">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl">
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 absolute"></div>
              <div className="relative z-10 text-center p-8">
                <div className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-left">
                      <h3 className="text-lg font-semibold mb-2">Project Structure</h3>
                      <div className="space-y-2 mb-4">
                        <div className="bg-blue-50 rounded p-3">
                          <div className="font-medium">Epic: User Management</div>
                          <div className="text-sm text-gray-600">3 stories, 8 tasks</div>
                        </div>
                        <div className="bg-indigo-50 rounded p-3">
                          <div className="font-medium">Epic: Payment Processing</div>
                          <div className="text-sm text-gray-600">4 stories, 12 tasks</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold mb-2">Recommended Methodology</h3>
                      <div className="bg-green-50 rounded p-3">
                        <div className="font-medium">Agile</div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="h-2 flex-1 bg-gray-200 rounded-full">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                          <span className="text-xs font-medium">85%</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">Best match for your team size and project scope</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div {...featuresAnimation} className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform helps you plan projects in minutes, not hours.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Define Your Project</h3>
              <p className="text-gray-600 mb-4 flex-1">
                Answer a few simple questions about your project scope, objectives, and timeline.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 shrink-0" />
                  <span>Project name and description</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 shrink-0" />
                  <span>Key objectives and goals</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 shrink-0" />
                  <span>Project timeline and scope</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Configure Your Team</h3>
              <p className="text-gray-600 mb-4 flex-1">
                Detail your team composition, including roles, experience levels, and availability.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 shrink-0" />
                  <span>Team size and structure</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 shrink-0" />
                  <span>Roles and responsibilities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 shrink-0" />
                  <span>Experience levels and availability</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Generate Project Structure</h3>
              <p className="text-gray-600 mb-4 flex-1">
                We'll create a detailed project structure and recommend the best methodology.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 shrink-0" />
                  <span>Epics, stories, tasks breakdown</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 shrink-0" />
                  <span>Story point estimation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 shrink-0" />
                  <span>Methodology recommendations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div {...ctaAnimation} className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Planning?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Create your first project now and get a complete project structure in minutes.
              </p>
              <Link to="/create">
                <Button size="lg" className="focus-ring">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
