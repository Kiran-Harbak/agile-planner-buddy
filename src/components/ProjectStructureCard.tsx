
import { useState } from 'react';
import { WorkItem } from '@/hooks/useProjectPlanner';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type ProjectStructureCardProps = {
  item: WorkItem;
  depth?: number;
  isExpanded?: boolean;
};

export function ProjectStructureCard({ 
  item, 
  depth = 0,
  isExpanded: initialExpanded = depth < 1 
}: ProjectStructureCardProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  
  const hasChildren = item.children && item.children.length > 0;
  
  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'epic':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'story':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'task':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'subtask':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <div 
      className={cn(
        "rounded-lg border transition-all duration-200",
        depth === 0 ? "border-gray-200 bg-white shadow-sm" : "border-gray-100 bg-white/50",
        depth === 0 && "mb-4"
      )}
    >
      <div 
        className={cn(
          "p-3 flex items-center justify-between cursor-pointer",
          hasChildren && "hover:bg-gray-50"
        )}
        onClick={hasChildren ? toggleExpand : undefined}
      >
        <div className="flex items-center space-x-3 flex-1">
          {hasChildren && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 shrink-0" 
              onClick={toggleExpand}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          )}
          
          {!hasChildren && (
            <div className="w-6"></div>
          )}
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className={cn(
                "text-xs inline-block py-0.5 px-2 rounded-full border",
                getTypeColor(item.type)
              )}>
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </span>
              
              {item.storyPoints && (
                <span className="text-xs bg-gray-100 py-0.5 px-2 rounded-full text-gray-700">
                  {item.storyPoints} {item.storyPoints === 1 ? 'point' : 'points'}
                </span>
              )}
            </div>
            
            <h3 className={cn(
              "font-medium text-gray-900",
              depth === 0 ? "text-base" : "text-sm"
            )}>
              {item.title}
            </h3>
            
            {depth < 2 && (
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
            )}
          </div>
        </div>
      </div>
      
      {isExpanded && hasChildren && (
        <div className={cn(
          "pl-6 pr-3 pb-3 space-y-2 animate-accordion-down",
          depth > 0 && "pl-8"
        )}>
          {item.children?.map((child) => (
            <ProjectStructureCard 
              key={child.id} 
              item={child} 
              depth={depth + 1}
              isExpanded={depth < 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectStructureCard;
