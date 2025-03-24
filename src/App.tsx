
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import CreateProject from "./pages/CreateProject";
import ProjectStructure from "./pages/ProjectStructure";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for a smoother initial experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 relative animate-pulse-soft">
          <div className="w-full h-full rounded-lg bg-primary/20 absolute"></div>
          <div className="w-full h-full rounded-lg bg-primary/40 absolute animate-float" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-full h-full rounded-lg bg-primary/60 absolute animate-float" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-full h-full rounded-lg bg-primary/80 absolute animate-float" style={{ animationDelay: "0.3s" }}></div>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-20 pb-16 mx-auto">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/create" element={<CreateProject />} />
                <Route path="/project-structure/:id" element={<ProjectStructure />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
