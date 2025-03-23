
import { useState } from 'react';
import { 
  Apple, 
  Camera, 
  Plus, 
  ChevronRight, 
  CalendarDays,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MealTracker } from '@/components/MealTracker';
import { ProgressChart } from '@/components/ProgressChart';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { toast } from 'sonner';

const mockCalorieData = [
  { date: 'Mon', value: 1800 },
  { date: 'Tue', value: 2100 },
  { date: 'Wed', value: 1950 },
  { date: 'Thu', value: 2200 },
  { date: 'Fri', value: 2050 },
  { date: 'Sat', value: 2300 },
  { date: 'Sun', value: 1900 }
];

const mockMacroData = {
  protein: { target: 150, current: 95 },
  carbs: { target: 250, current: 180 },
  fat: { target: 70, current: 45 }
};

export default function Nutrition() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const handlePreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };
  
  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };
  
  const handleCameraCapture = () => {
    toast('Camera feature', {
      description: 'AI food recognition coming soon!',
    });
  };
  
  const calculateMacroPercentage = (current: number, target: number) => {
    return Math.min(100, Math.round((current / target) * 100));
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20 px-4 md:px-8 mt-16">
        <div className="container">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2 slide-up">Nutrition Tracking</h1>
            <p className="text-muted-foreground slide-up">Monitor your diet and maintain balanced nutrition</p>
          </header>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3 space-y-8">
              <Card className="p-6 shadow-subtle">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={handlePreviousDay}>
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{formatDate(selectedDate)}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={handleNextDay}
                      disabled={selectedDate.toDateString() === new Date().toDateString()}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button variant="outline" onClick={handleCameraCapture}>
                    <Camera className="h-4 w-4 mr-2" /> Scan Food
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card className="p-4 bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-1">Calories</p>
                    <div className="flex items-baseline gap-1">
                      <p className="text-2xl font-semibold">1,250</p>
                      <p className="text-xs text-muted-foreground">/ 2,000</p>
                    </div>
                    <Progress value={62.5} className="mt-2 h-1" />
                    <p className="text-xs text-muted-foreground mt-1">750 remaining</p>
                  </Card>
                  
                  <Card className="p-4 bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-1">Protein</p>
                    <div className="flex items-baseline gap-1">
                      <p className="text-2xl font-semibold">{mockMacroData.protein.current}g</p>
                      <p className="text-xs text-muted-foreground">/ {mockMacroData.protein.target}g</p>
                    </div>
                    <Progress 
                      value={calculateMacroPercentage(mockMacroData.protein.current, mockMacroData.protein.target)} 
                      className="mt-2 h-1 bg-blue-100 dark:bg-blue-950"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {mockMacroData.protein.target - mockMacroData.protein.current}g remaining
                    </p>
                  </Card>
                  
                  <Card className="p-4 bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-1">Carbs</p>
                    <div className="flex items-baseline gap-1">
                      <p className="text-2xl font-semibold">{mockMacroData.carbs.current}g</p>
                      <p className="text-xs text-muted-foreground">/ {mockMacroData.carbs.target}g</p>
                    </div>
                    <Progress 
                      value={calculateMacroPercentage(mockMacroData.carbs.current, mockMacroData.carbs.target)} 
                      className="mt-2 h-1 bg-amber-100 dark:bg-amber-950"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {mockMacroData.carbs.target - mockMacroData.carbs.current}g remaining
                    </p>
                  </Card>
                  
                  <Card className="p-4 bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-1">Fat</p>
                    <div className="flex items-baseline gap-1">
                      <p className="text-2xl font-semibold">{mockMacroData.fat.current}g</p>
                      <p className="text-xs text-muted-foreground">/ {mockMacroData.fat.target}g</p>
                    </div>
                    <Progress 
                      value={calculateMacroPercentage(mockMacroData.fat.current, mockMacroData.fat.target)} 
                      className="mt-2 h-1 bg-red-100 dark:bg-red-950"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {mockMacroData.fat.target - mockMacroData.fat.current}g remaining
                    </p>
                  </Card>
                </div>
                
                <MealTracker 
                  dailyCalorieTarget={2000}
                  currentCalories={1250}
                />
              </Card>
              
              <Card className="p-6 shadow-subtle">
                <h3 className="text-xl font-semibold mb-4">Nutrition History</h3>
                <Tabs defaultValue="calories" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="calories">Calories</TabsTrigger>
                    <TabsTrigger value="macros">Macros</TabsTrigger>
                    <TabsTrigger value="water">Water Intake</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="calories">
                    <ProgressChart 
                      title="Daily Calories" 
                      data={mockCalorieData}
                      unit="cal"
                      color="hsl(var(--primary))"
                    />
                  </TabsContent>
                  
                  <TabsContent value="macros">
                    <ProgressChart 
                      title="Protein Intake" 
                      data={mockCalorieData.map(d => ({ date: d.date, value: Math.round(d.value * 0.2 / 4) }))}
                      unit="g"
                      color="hsl(217, 91%, 60%)"
                    />
                  </TabsContent>
                  
                  <TabsContent value="water">
                    <ProgressChart 
                      title="Water Intake" 
                      data={mockCalorieData.map(d => ({ date: d.date, value: Math.round(d.value * 0.001 * 2.5) }))}
                      unit="L"
                      color="hsl(199, 89%, 48%)"
                    />
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
            
            <div className="w-full lg:w-1/3 space-y-8">
              <Card className="p-6 shadow-subtle">
                <h3 className="text-xl font-semibold mb-4">Quick Add</h3>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search foods..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="font-medium">Breakfast</p>
                      <p className="text-sm text-muted-foreground">Oatmeal with Banana</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="font-medium">Lunch</p>
                      <p className="text-sm text-muted-foreground">Chicken Salad</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="font-medium">Dinner</p>
                      <p className="text-sm text-muted-foreground">Salmon with Vegetables</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <Button className="w-full mt-4">
                  <Plus className="h-4 w-4 mr-2" /> Add Custom Meal
                </Button>
              </Card>
              
              <Card className="p-6 shadow-subtle">
                <h3 className="text-xl font-semibold mb-4">Nutrition Goals</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">Daily Calories</p>
                      <p className="text-sm text-muted-foreground">2,000 calories</p>
                    </div>
                    <Progress value={100} className="h-1.5" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">Protein</p>
                      <p className="text-sm text-muted-foreground">150g (30%)</p>
                    </div>
                    <Progress value={100} className="h-1.5 bg-blue-100 dark:bg-blue-950" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">Carbs</p>
                      <p className="text-sm text-muted-foreground">250g (50%)</p>
                    </div>
                    <Progress value={100} className="h-1.5 bg-amber-100 dark:bg-amber-950" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">Fat</p>
                      <p className="text-sm text-muted-foreground">70g (20%)</p>
                    </div>
                    <Progress value={100} className="h-1.5 bg-red-100 dark:bg-red-950" />
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-6">
                  Adjust Nutrition Goals
                </Button>
              </Card>
              
              <Card className="p-6 shadow-subtle">
                <h3 className="text-xl font-semibold mb-4">Nutrition Insights</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-md bg-blue-50 dark:bg-blue-950/30">
                    <div className="rounded-full w-8 h-8 bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Protein Intake Trend</p>
                      <p className="text-sm text-muted-foreground">
                        Your protein intake is 15% below your target for the week. Consider adding more lean protein sources.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-md bg-amber-50 dark:bg-amber-950/30">
                    <div className="rounded-full w-8 h-8 bg-amber-100 dark:bg-amber-900 flex items-center justify-center flex-shrink-0">
                      <Apple className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Meal Balance</p>
                      <p className="text-sm text-muted-foreground">
                        Your breakfast is typically lower in protein than other meals. Try adding eggs or Greek yogurt.
                      </p>
                    </div>
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
