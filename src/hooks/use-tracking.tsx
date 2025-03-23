
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface TrackingContextType {
  isActiveTracking: boolean;
  startTracking: () => void;
  stopTracking: () => void;
  trackCalories: (amount: number) => void;
  trackWater: (amount: number) => void;
  trackExercise: (name: string, duration: number, calories: number) => void;
  currentSession: {
    startTime: Date | null;
    duration: number;
    caloriesBurned: number;
    caloriesConsumed: number;
    waterIntake: number;
    exercises: Array<{
      name: string;
      duration: number;
      calories: number;
      timestamp: Date;
    }>;
  };
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

export function TrackingProvider({ children }: { children: ReactNode }) {
  const [isActiveTracking, setIsActiveTracking] = useState(false);
  const [trackingInterval, setTrackingInterval] = useState<number | null>(null);
  const [currentSession, setCurrentSession] = useState({
    startTime: null as Date | null,
    duration: 0,
    caloriesBurned: 0,
    caloriesConsumed: 0,
    waterIntake: 0,
    exercises: [] as Array<{
      name: string;
      duration: number;
      calories: number;
      timestamp: Date;
    }>,
  });

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (trackingInterval) {
        window.clearInterval(trackingInterval);
      }
    };
  }, [trackingInterval]);

  // Save session data to localStorage
  useEffect(() => {
    if (isActiveTracking && currentSession.startTime) {
      localStorage.setItem('trackingSession', JSON.stringify(currentSession));
    }
  }, [isActiveTracking, currentSession]);

  // Load session data from localStorage on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('trackingSession');
    if (savedSession) {
      try {
        const parsedSession = JSON.parse(savedSession);
        
        // If there was a recently active session (within last hour), restore it
        if (parsedSession.startTime) {
          const startTime = new Date(parsedSession.startTime);
          const now = new Date();
          const diffInHours = (now.getTime() - startTime.getTime()) / (1000 * 60 * 60);
          
          if (diffInHours < 1) {
            setCurrentSession({
              ...parsedSession,
              startTime: new Date(parsedSession.startTime)
            });
            setIsActiveTracking(true);
            startTrackingInterval();
            toast.info("Previous tracking session restored");
          } else {
            localStorage.removeItem('trackingSession');
          }
        }
      } catch (error) {
        console.error("Error parsing saved tracking session", error);
        localStorage.removeItem('trackingSession');
      }
    }
  }, []);

  const startTrackingInterval = () => {
    // Update duration every second
    const interval = window.setInterval(() => {
      setCurrentSession(prev => {
        if (!prev.startTime) return prev;
        
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - prev.startTime.getTime()) / 1000);
        
        return {
          ...prev,
          duration: diffInSeconds
        };
      });
    }, 1000);
    
    setTrackingInterval(interval);
  };

  const startTracking = () => {
    setIsActiveTracking(true);
    setCurrentSession({
      startTime: new Date(),
      duration: 0,
      caloriesBurned: 0,
      caloriesConsumed: 0,
      waterIntake: 0,
      exercises: [],
    });
    
    startTrackingInterval();
    toast.success("Tracking started", {
      description: "Your fitness activities are now being tracked in real-time"
    });
  };

  const stopTracking = () => {
    if (trackingInterval) {
      window.clearInterval(trackingInterval);
      setTrackingInterval(null);
    }
    
    setIsActiveTracking(false);
    
    // Save final session data to history
    if (currentSession.startTime) {
      const sessionHistory = JSON.parse(localStorage.getItem('sessionHistory') || '[]');
      sessionHistory.push({
        ...currentSession,
        endTime: new Date()
      });
      localStorage.setItem('sessionHistory', JSON.stringify(sessionHistory));
    }
    
    localStorage.removeItem('trackingSession');
    
    toast.success("Tracking stopped", {
      description: "Your session has been saved"
    });
  };

  const trackCalories = (amount: number) => {
    if (!isActiveTracking) return;
    
    setCurrentSession(prev => ({
      ...prev,
      caloriesConsumed: prev.caloriesConsumed + amount
    }));
    
    toast.success(`Added ${amount} calories to your daily intake`);
  };

  const trackWater = (amount: number) => {
    if (!isActiveTracking) return;
    
    setCurrentSession(prev => ({
      ...prev,
      waterIntake: prev.waterIntake + amount
    }));
    
    toast.success(`Added ${amount}ml of water to your daily intake`);
  };

  const trackExercise = (name: string, duration: number, calories: number) => {
    if (!isActiveTracking) return;
    
    setCurrentSession(prev => ({
      ...prev,
      caloriesBurned: prev.caloriesBurned + calories,
      exercises: [
        ...prev.exercises,
        {
          name,
          duration,
          calories,
          timestamp: new Date()
        }
      ]
    }));
    
    toast.success(`Tracked: ${name}`, {
      description: `Burned approximately ${calories} calories`
    });
  };

  const value = {
    isActiveTracking,
    startTracking,
    stopTracking,
    trackCalories,
    trackWater,
    trackExercise,
    currentSession
  };

  return (
    <TrackingContext.Provider value={value}>
      {children}
    </TrackingContext.Provider>
  );
}

export function useTracking() {
  const context = useContext(TrackingContext);
  if (context === undefined) {
    throw new Error('useTracking must be used within a TrackingProvider');
  }
  return context;
}
