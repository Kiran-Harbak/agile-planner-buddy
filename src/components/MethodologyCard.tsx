
import { useState } from 'react';
import { Methodology } from '@/hooks/useProjectPlanner';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

type MethodologyCardProps = {
  methodology: Methodology;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

export function MethodologyCard({ methodology, isSelected, onSelect }: MethodologyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div 
      className={cn(
        "rounded-xl overflow-hidden transition-all duration-300 shadow-sm border",
        isSelected 
          ? "border-primary/80 ring-2 ring-primary/20" 
          : "border-gray-200 hover:border-gray-300"
      )}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-medium">{methodology.name}</h3>
            <div className="flex items-center mt-1">
              <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full",
                    methodology.suitability > 75 ? "bg-green-500" :
                    methodology.suitability > 50 ? "bg-blue-500" :
                    methodology.suitability > 25 ? "bg-yellow-500" : "bg-red-500"
                  )}
                  style={{ width: `${methodology.suitability}%` }}
                ></div>
              </div>
              <span className="text-sm ml-2 text-gray-600">{methodology.suitability}% match</span>
            </div>
          </div>
          
          <Button
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onSelect(methodology.id)}
            className={cn(
              "min-w-24 focus-ring group",
              isSelected && "bg-primary"
            )}
          >
            {isSelected ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Selected
              </>
            ) : "Select"}
          </Button>
        </div>
        
        <p className="text-gray-600 mt-2 text-sm">{methodology.description}</p>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleExpand}
          className="mt-2 text-gray-500 hover:text-gray-700 focus-ring"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Less Details
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              More Details
            </>
          )}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="px-5 pb-5 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-700">Benefits</h4>
              <ul className="space-y-1">
                {methodology.benefits.map((benefit, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-700">Challenges</h4>
              <ul className="space-y-1">
                {methodology.challenges.map((challenge, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-500 mt-1.5 mr-2"></span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MethodologyCard;
