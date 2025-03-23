
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, Timer, Flame, Droplet } from 'lucide-react';
import { useTracking } from '@/hooks/use-tracking';
import { cn } from '@/lib/utils';

export function TrackingControls() {
  const { 
    isActiveTracking, 
    startTracking, 
    stopTracking, 
    currentSession 
  } = useTracking();
  
  const [formattedTime, setFormattedTime] = useState('00:00:00');
  
  useEffect(() => {
    if (currentSession.duration) {
      const hours = Math.floor(currentSession.duration / 3600);
      const minutes = Math.floor((currentSession.duration % 3600) / 60);
      const seconds = currentSession.duration % 60;
      
      setFormattedTime(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }
  }, [currentSession.duration]);
  
  return (
    <Card className={cn(
      "overflow-hidden shadow-subtle transition-all duration-300",
      isActiveTracking ? "border-green-500 bg-green-50/30 dark:bg-green-950/10" : ""
    )}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Timer className={cn(
              "h-5 w-5",
              isActiveTracking ? "text-green-500 animate-pulse" : "text-muted-foreground"
            )} />
            <h3 className="text-xl font-semibold">
              {isActiveTracking ? "Active Tracking" : "Tracking Controls"}
            </h3>
          </div>
          
          <Button 
            variant={isActiveTracking ? "destructive" : "default"}
            size="sm"
            onClick={isActiveTracking ? stopTracking : startTracking}
          >
            {isActiveTracking ? (
              <>
                <Pause className="h-4 w-4 mr-2" /> Stop
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" /> Start
              </>
            )}
          </Button>
        </div>
        
        {isActiveTracking && (
          <div className="space-y-4">
            <div className="text-center py-3">
              <p className="text-muted-foreground text-sm">Session Time</p>
              <p className="text-3xl font-mono font-semibold">{formattedTime}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <p className="text-sm">Calories Burned</p>
                  </div>
                  <p className="text-sm font-medium">{currentSession.caloriesBurned} cal</p>
                </div>
                <Progress value={Math.min(100, (currentSession.caloriesBurned / 500) * 100)} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Droplet className="h-4 w-4 text-blue-500" />
                    <p className="text-sm">Water Intake</p>
                  </div>
                  <p className="text-sm font-medium">{currentSession.waterIntake} ml</p>
                </div>
                <Progress 
                  value={Math.min(100, (currentSession.waterIntake / 2000) * 100)} 
                  className="h-2 bg-blue-100 dark:bg-blue-950"
                />
              </div>
            </div>
            
            {currentSession.exercises.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Recent Activities</p>
                <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                  {currentSession.exercises.slice(-3).reverse().map((exercise, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-background rounded-md text-sm">
                      <p>{exercise.name}</p>
                      <div className="flex items-center gap-2">
                        <span>{exercise.calories} cal</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {!isActiveTracking && (
          <div className="text-center py-8 text-muted-foreground">
            <p>Start tracking to monitor your fitness activities in real-time</p>
          </div>
        )}
      </div>
    </Card>
  );
}
