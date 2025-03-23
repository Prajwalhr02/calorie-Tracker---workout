
import { useEffect, useState } from 'react';
import { Activity, Apple, Dumbbell, ChevronRight, Bell, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WorkoutCard } from '@/components/WorkoutCard';
import { MealTracker } from '@/components/MealTracker';
import { ProgressChart } from '@/components/ProgressChart';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { Link } from 'react-router-dom';

// Mock data for the dashboard
const mockWorkouts = [
  {
    id: '1',
    title: 'Full Body Strength',
    description: 'A complete workout to build strength and endurance',
    level: 'Intermediate' as const,
    duration: 45,
    calories: 350,
    category: 'Gym' as const,
    progress: 0,
    exercises: [
      { id: '101', name: 'Squats', sets: 3, reps: 12, rest: 60 },
      { id: '102', name: 'Push-ups', sets: 3, reps: 15, rest: 45 },
      { id: '103', name: 'Rows', sets: 3, reps: 12, rest: 60 },
      { id: '104', name: 'Lunges', sets: 3, reps: 10, rest: 45 },
    ]
  },
  {
    id: '2',
    title: 'HIIT Cardio Burn',
    description: 'High intensity intervals to maximize calorie burn',
    level: 'Advanced' as const,
    duration: 30,
    calories: 400,
    category: 'Home' as const,
    progress: 60,
    exercises: [
      { id: '201', name: 'Jumping Jacks', sets: 4, reps: 30, rest: 15 },
      { id: '202', name: 'Mountain Climbers', sets: 4, reps: 20, rest: 15 },
      { id: '203', name: 'Burpees', sets: 4, reps: 10, rest: 15 },
      { id: '204', name: 'High Knees', sets: 4, reps: 40, rest: 15 },
    ]
  }
];

const mockWeightData = [
  { date: 'Jan 1', value: 180 },
  { date: 'Jan 8', value: 178 },
  { date: 'Jan 15', value: 176 },
  { date: 'Jan 22', value: 175 },
  { date: 'Jan 29', value: 173 },
  { date: 'Feb 5', value: 172 },
  { date: 'Feb 12', value: 170 }
];

const mockCalorieData = [
  { date: 'Mon', value: 1800 },
  { date: 'Tue', value: 2100 },
  { date: 'Wed', value: 1950 },
  { date: 'Thu', value: 2200 },
  { date: 'Fri', value: 2050 },
  { date: 'Sat', value: 2300 },
  { date: 'Sun', value: 1900 }
];

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const totalCalories = 1250;
  const calorieGoal = 2000;
  const caloriePercentage = Math.round((totalCalories / calorieGoal) * 100);
  
  const workoutsCompleted = 12;
  const streakDays = 8;
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Activity className="h-10 w-10 text-primary mx-auto animate-pulse" />
            <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20 px-4 md:px-8 mt-16">
        <div className="container">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2 slide-up">Welcome Back, User</h1>
            <p className="text-muted-foreground slide-up">Track your fitness journey and stay motivated</p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 staggered">
            <Card className="p-6 shadow-subtle flex items-center">
              <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mr-4">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Daily Calories</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-semibold">{totalCalories}</p>
                  <p className="text-muted-foreground">/ {calorieGoal}</p>
                </div>
                <Progress value={caloriePercentage} className="mt-2 h-1.5" />
              </div>
            </Card>
            
            <Card className="p-6 shadow-subtle flex items-center">
              <div className="rounded-full w-12 h-12 bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center mr-4">
                <Dumbbell className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Workouts Completed</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-semibold">{workoutsCompleted}</p>
                  <p className="text-green-500 text-sm">+3 this week</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 shadow-subtle flex items-center">
              <div className="rounded-full w-12 h-12 bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center mr-4">
                <Award className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-semibold">{streakDays} days</p>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="col-span-1 lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Recommended Workouts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockWorkouts.map(workout => (
                  <WorkoutCard key={workout.id} {...workout} />
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link to="/workouts" className="inline-flex items-center">
                    View All Workouts
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Today's Nutrition</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/nutrition" className="inline-flex items-center text-sm">
                    Details
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <MealTracker 
                dailyCalorieTarget={calorieGoal}
                currentCalories={totalCalories}
              />
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
            
            <Tabs defaultValue="weight" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="weight">Weight</TabsTrigger>
                <TabsTrigger value="calories">Calories</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="weight">
                <ProgressChart 
                  title="Weight Tracking" 
                  data={mockWeightData}
                  unit="lbs"
                  color="hsl(var(--primary))"
                />
              </TabsContent>
              <TabsContent value="calories">
                <ProgressChart 
                  title="Daily Calories" 
                  data={mockCalorieData}
                  unit="cal"
                  color="hsl(142, 71%, 45%)"
                />
              </TabsContent>
              <TabsContent value="activity">
                <ProgressChart 
                  title="Weekly Activity" 
                  data={mockWeightData.map(d => ({ date: d.date, value: d.value / 2 }))}
                  unit="min"
                  color="hsl(220, 70%, 50%)"
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Insights & Recommendations</h2>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-6 shadow-subtle">
                <div className="flex items-start">
                  <div className="rounded-full w-10 h-10 bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Increase Your Activity</h3>
                    <p className="text-sm text-muted-foreground">
                      Your activity level has decreased by 15% this week. Consider adding a cardio session tomorrow.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 shadow-subtle">
                <div className="flex items-start">
                  <div className="rounded-full w-10 h-10 bg-green-50 dark:bg-green-950/50 flex items-center justify-center mr-4 flex-shrink-0">
                    <Apple className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">More Protein Needed</h3>
                    <p className="text-sm text-muted-foreground">
                      You're consistently under your protein target. Try adding more lean protein sources to your meals.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
