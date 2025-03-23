
import { useState } from 'react';
import { 
  Dumbbell, 
  Clock, 
  Flame, 
  ChevronDown, 
  ChevronUp,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  rest: number; // seconds
  completed?: boolean;
}

interface WorkoutCardProps {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // minutes
  calories: number;
  category: 'Gym' | 'Home' | 'Outdoor';
  exercises: Exercise[];
  image?: string;
  progress?: number;
}

export function WorkoutCard({ 
  id, 
  title, 
  description, 
  level, 
  duration, 
  calories, 
  category, 
  exercises, 
  image,
  progress = 0
}: WorkoutCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Gym': return <Dumbbell className="h-4 w-4" />;
      case 'Home': return <Dumbbell className="h-4 w-4" />; // Use home icon when available
      case 'Outdoor': return <Dumbbell className="h-4 w-4" />; // Use outdoor icon when available
      default: return <Dumbbell className="h-4 w-4" />;
    }
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-elevated",
      expanded ? "shadow-elevated" : "shadow-subtle"
    )}>
      <div className="relative">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-muted flex items-center justify-center">
            <Dumbbell className="h-16 w-16 text-muted-foreground/50" />
          </div>
        )}
        
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={cn(
            "px-2 py-1 rounded-md text-xs font-medium",
            getLevelColor(level)
          )}>
            {level}
          </span>
          <span className="px-2 py-1 rounded-md text-xs font-medium bg-black/60 text-white backdrop-blur-sm flex items-center gap-1">
            {getCategoryIcon(category)}
            {category}
          </span>
        </div>
        
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0">
            <Progress value={progress} className="h-1 rounded-none" />
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Flame className="h-4 w-4" />
            <span>{calories} cal</span>
          </div>
        </div>
        
        {expanded && (
          <div className="mt-4 space-y-4 border-t pt-4 animate-accordion-down">
            <h4 className="font-medium text-sm text-muted-foreground">Exercises</h4>
            <ul className="space-y-3">
              {exercises.map((exercise) => (
                <li key={exercise.id} className="flex items-center gap-3">
                  {exercise.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-muted flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{exercise.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {exercise.sets} sets • {exercise.reps} reps • {exercise.rest}s rest
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <Button variant="ghost" size="sm" onClick={toggleExpanded}>
            {expanded ? (
              <span className="flex items-center gap-1">
                <ChevronUp className="h-4 w-4" /> 
                Less details
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <ChevronDown className="h-4 w-4" /> 
                More details
              </span>
            )}
          </Button>
          
          <Button variant="default" size="sm" asChild>
            <a href={`/workout/${id}`} className="flex items-center gap-1">
              Start workout <ArrowRight className="h-4 w-4 ml-1" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
