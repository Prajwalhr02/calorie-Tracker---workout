
import { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { WorkoutCard } from '@/components/WorkoutCard';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { Separator } from '@/components/ui/separator';

// Mock workout data
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
  },
  {
    id: '3',
    title: 'Upper Body Focus',
    description: 'Target your chest, back, and arms with this focused routine',
    level: 'Beginner' as const,
    duration: 40,
    calories: 300,
    category: 'Gym' as const,
    progress: 25,
    exercises: [
      { id: '301', name: 'Bench Press', sets: 3, reps: 10, rest: 60 },
      { id: '302', name: 'Lat Pulldowns', sets: 3, reps: 12, rest: 60 },
      { id: '303', name: 'Shoulder Press', sets: 3, reps: 10, rest: 60 },
      { id: '304', name: 'Bicep Curls', sets: 3, reps: 12, rest: 45 },
    ]
  },
  {
    id: '4',
    title: 'Lower Body Blast',
    description: 'Build strong legs and glutes with this targeted workout',
    level: 'Intermediate' as const,
    duration: 35,
    calories: 320,
    category: 'Gym' as const,
    progress: 0,
    exercises: [
      { id: '401', name: 'Deadlifts', sets: 4, reps: 8, rest: 90 },
      { id: '402', name: 'Romanian Deadlifts', sets: 3, reps: 10, rest: 60 },
      { id: '403', name: 'Leg Press', sets: 3, reps: 12, rest: 60 },
      { id: '404', name: 'Leg Extensions', sets: 3, reps: 15, rest: 45 },
    ]
  },
  {
    id: '5',
    title: 'Core Crusher',
    description: 'Strengthen your abs, obliques, and lower back',
    level: 'Beginner' as const,
    duration: 25,
    calories: 250,
    category: 'Home' as const,
    progress: 0,
    exercises: [
      { id: '501', name: 'Plank', sets: 3, reps: 1, rest: 30 },
      { id: '502', name: 'Russian Twists', sets: 3, reps: 20, rest: 30 },
      { id: '503', name: 'Leg Raises', sets: 3, reps: 15, rest: 30 },
      { id: '504', name: 'Bird Dogs', sets: 3, reps: 12, rest: 30 },
    ]
  },
  {
    id: '6',
    title: 'Morning Energizer',
    description: 'Quick workout to start your day with energy and focus',
    level: 'Beginner' as const,
    duration: 15,
    calories: 150,
    category: 'Home' as const,
    progress: 75,
    exercises: [
      { id: '601', name: 'Jumping Jacks', sets: 2, reps: 30, rest: 15 },
      { id: '602', name: 'Push-ups', sets: 2, reps: 10, rest: 15 },
      { id: '603', name: 'Bodyweight Squats', sets: 2, reps: 20, rest: 15 },
      { id: '604', name: 'Plank', sets: 2, reps: 1, rest: 15 },
    ]
  },
];

export default function Workouts() {
  const [workouts, setWorkouts] = useState(mockWorkouts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    level: '',
    duration: '',
    category: ''
  });
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Filter workouts based on search query and filters
    let filtered = [...mockWorkouts];
    
    if (searchQuery) {
      filtered = filtered.filter(workout => 
        workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workout.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filters.level) {
      filtered = filtered.filter(workout => workout.level === filters.level);
    }
    
    if (filters.duration) {
      const durationRange = filters.duration.split('-');
      const minDuration = parseInt(durationRange[0]);
      const maxDuration = parseInt(durationRange[1] || '999');
      
      filtered = filtered.filter(workout => 
        workout.duration >= minDuration && workout.duration <= maxDuration
      );
    }
    
    if (filters.category) {
      filtered = filtered.filter(workout => workout.category === filters.category);
    }
    
    setWorkouts(filtered);
  }, [searchQuery, filters]);
  
  const resetFilters = () => {
    setFilters({
      level: '',
      duration: '',
      category: ''
    });
    setSearchQuery('');
  };
  
  const hasActiveFilters = filters.level || filters.duration || filters.category || searchQuery;
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="h-10 w-10 bg-primary/20 rounded-full animate-pulse mx-auto" />
            <p className="mt-4 text-muted-foreground">Loading workouts...</p>
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
            <h1 className="text-3xl font-bold mb-2 slide-up">Workout Library</h1>
            <p className="text-muted-foreground slide-up">Find the perfect workout for your goals and fitness level</p>
          </header>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search workouts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Filter Workouts</h4>
                  <Separator />
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Level</label>
                    <Select 
                      value={filters.level} 
                      onValueChange={(value) => setFilters({...filters, level: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any level</SelectItem>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Duration</label>
                    <Select 
                      value={filters.duration} 
                      onValueChange={(value) => setFilters({...filters, duration: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any duration</SelectItem>
                        <SelectItem value="0-15">Under 15 mins</SelectItem>
                        <SelectItem value="15-30">15-30 mins</SelectItem>
                        <SelectItem value="30-45">30-45 mins</SelectItem>
                        <SelectItem value="45-999">Over 45 mins</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select 
                      value={filters.category} 
                      onValueChange={(value) => setFilters({...filters, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any category</SelectItem>
                        <SelectItem value="Gym">Gym</SelectItem>
                        <SelectItem value="Home">Home</SelectItem>
                        <SelectItem value="Outdoor">Outdoor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            {hasActiveFilters && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={resetFilters}
                title="Clear all filters"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all">All Workouts</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="recent">Recently Added</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="pt-6">
              {workouts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {workouts.map(workout => (
                    <WorkoutCard key={workout.id} {...workout} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground mb-4">No workouts match your current filters</p>
                  <Button onClick={resetFilters}>Clear Filters</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="trending" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockWorkouts.slice(1, 4).map(workout => (
                  <WorkoutCard key={workout.id} {...workout} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recent" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockWorkouts.slice(3, 6).map(workout => (
                  <WorkoutCard key={workout.id} {...workout} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="saved" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockWorkouts.slice(0, 2).map(workout => (
                  <WorkoutCard key={workout.id} {...workout} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
