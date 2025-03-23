
import { useState } from 'react';
import { 
  Calendar, 
  ArrowLeft, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown,
  Camera,
  BarChart3,
  Scale,
  Ruler,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProgressChart } from '@/components/ProgressChart';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { toast } from 'sonner';

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

const mockBodyMeasurements = {
  chest: [
    { date: 'Jan 1', value: 42 },
    { date: 'Jan 15', value: 41.5 },
    { date: 'Feb 1', value: 41 },
    { date: 'Feb 15', value: 40.5 },
  ],
  waist: [
    { date: 'Jan 1', value: 36 },
    { date: 'Jan 15', value: 35 },
    { date: 'Feb 1', value: 34.5 },
    { date: 'Feb 15', value: 34 },
  ],
  hips: [
    { date: 'Jan 1', value: 40 },
    { date: 'Jan 15', value: 39.5 },
    { date: 'Feb 1', value: 39 },
    { date: 'Feb 15', value: 38.5 },
  ],
  arms: [
    { date: 'Jan 1', value: 14 },
    { date: 'Jan 15', value: 14.2 },
    { date: 'Feb 1', value: 14.5 },
    { date: 'Feb 15', value: 14.7 },
  ],
  thighs: [
    { date: 'Jan 1', value: 24 },
    { date: 'Jan 15', value: 23.5 },
    { date: 'Feb 1', value: 23 },
    { date: 'Feb 15', value: 23.5 },
  ]
};

export default function Progress() {
  const [selectedRange, setSelectedRange] = useState('month');
  const [selectedMeasurement, setSelectedMeasurement] = useState('waist');
  
  const handleTakeProgressPhoto = () => {
    toast('Progress Photo', {
      description: 'Photo capture feature coming soon!',
    });
  };
  
  const formatChange = (data: { date: string, value: number }[]) => {
    if (data.length < 2) return { value: 0, percentage: 0, isPositive: false };
    
    const oldValue = data[0].value;
    const newValue = data[data.length - 1].value;
    const change = newValue - oldValue;
    const percentage = ((change / oldValue) * 100).toFixed(1);
    
    return {
      value: Math.abs(change),
      percentage: Math.abs(parseFloat(percentage)),
      isPositive: change > 0
    };
  };
  
  const weightChange = formatChange(mockWeightData);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20 px-4 md:px-8 mt-16">
        <div className="container">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2 slide-up">Progress Tracking</h1>
            <p className="text-muted-foreground slide-up">Monitor your fitness journey and celebrate your achievements</p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 staggered">
            <Card className="p-6 shadow-subtle">
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-full w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Scale className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Weight</p>
                  <p className="text-2xl font-semibold">170 lbs</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <div className={`text-sm rounded-full px-2 py-0.5 flex items-center ${weightChange.isPositive ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'}`}>
                  {weightChange.isPositive ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {weightChange.value} lbs
                </div>
                <p className="text-xs text-muted-foreground">
                  {weightChange.isPositive ? 'Gained' : 'Lost'} {weightChange.percentage}% in 6 weeks
                </p>
              </div>
            </Card>
            
            <Card className="p-6 shadow-subtle">
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-full w-10 h-10 bg-green-50 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0">
                  <Ruler className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Body Fat</p>
                  <p className="text-2xl font-semibold">18%</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <div className="text-sm rounded-full px-2 py-0.5 flex items-center bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  2%
                </div>
                <p className="text-xs text-muted-foreground">
                  Decreased by 10% in 6 weeks
                </p>
              </div>
            </Card>
            
            <Card className="p-6 shadow-subtle">
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-full w-10 h-10 bg-purple-50 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0">
                  <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Workouts</p>
                  <p className="text-2xl font-semibold">24</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <div className="text-sm rounded-full px-2 py-0.5 flex items-center bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  4
                </div>
                <p className="text-xs text-muted-foreground">
                  Increased by 20% from last month
                </p>
              </div>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <Card className="shadow-subtle">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold">Weight Progress</h3>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <Select defaultValue={selectedRange} onValueChange={setSelectedRange}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week">Week</SelectItem>
                          <SelectItem value="month">Month</SelectItem>
                          <SelectItem value="3months">3 Months</SelectItem>
                          <SelectItem value="year">Year</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center mb-1">
                        <p className="font-medium text-sm">Starting: 180 lbs</p>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <p className="font-medium text-sm">Current: 170 lbs</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-semibold">
                          {!weightChange.isPositive ? '-' : '+'}{weightChange.value} lbs
                        </p>
                        <p className={`text-sm ${!weightChange.isPositive ? 'text-blue-500' : 'text-red-500'}`}>
                          {!weightChange.isPositive ? '-' : '+'}{weightChange.percentage}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Goal: 165 lbs</Button>
                      <Button size="sm" className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Log Weight
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="h-64">
                    <ProgressChart 
                      title="Weight Progress" 
                      data={mockWeightData}
                      timeRange={selectedRange}
                      unit=" lbs"
                      color="hsl(var(--primary))"
                    />
                  </div>
                </div>
              </Card>
            </div>
            
            <div>
              <Card className="shadow-subtle h-full flex flex-col">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-semibold mb-4">Body Measurements</h3>
                  
                  <Select defaultValue={selectedMeasurement} onValueChange={setSelectedMeasurement}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select measurement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chest">Chest</SelectItem>
                      <SelectItem value="waist">Waist</SelectItem>
                      <SelectItem value="hips">Hips</SelectItem>
                      <SelectItem value="arms">Arms</SelectItem>
                      <SelectItem value="thighs">Thighs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1 p-6">
                  {selectedMeasurement && (
                    <div>
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground">Current Measurement</p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-2xl font-semibold">
                            {mockBodyMeasurements[selectedMeasurement as keyof typeof mockBodyMeasurements][mockBodyMeasurements[selectedMeasurement as keyof typeof mockBodyMeasurements].length - 1]?.value} inches
                          </p>
                          
                          {formatChange(mockBodyMeasurements[selectedMeasurement as keyof typeof mockBodyMeasurements]).value > 0 && (
                            <p className={`text-sm ${!formatChange(mockBodyMeasurements[selectedMeasurement as keyof typeof mockBodyMeasurements]).isPositive ? 'text-blue-500' : 'text-green-500'}`}>
                              {!formatChange(mockBodyMeasurements[selectedMeasurement as keyof typeof mockBodyMeasurements]).isPositive ? '-' : '+'}
                              {formatChange(mockBodyMeasurements[selectedMeasurement as keyof typeof mockBodyMeasurements]).value} inches
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {mockBodyMeasurements[selectedMeasurement as keyof typeof mockBodyMeasurements].map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <p className="text-sm">{item.date}</p>
                            <p className="font-medium">{item.value} inches</p>
                          </div>
                        ))}
                      </div>
                      
                      <Button className="w-full mt-6">
                        <Ruler className="h-4 w-4 mr-2" /> Log New Measurement
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="shadow-subtle">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-semibold mb-1">Progress Photos</h3>
                  <p className="text-sm text-muted-foreground">Visualize your transformation journey</p>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col items-center">
                      <p className="text-sm text-muted-foreground mb-2">Jan 1, 2023</p>
                      <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center">
                        <Camera className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <p className="text-sm text-muted-foreground mb-2">Feb 1, 2023</p>
                      <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center">
                        <Camera className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <p className="text-sm text-muted-foreground mb-2">Mar 1, 2023</p>
                      <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center">
                        <Camera className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full" onClick={handleTakeProgressPhoto}>
                    <Camera className="h-4 w-4 mr-2" /> Take New Progress Photo
                  </Button>
                </div>
              </Card>
            </div>
            
            <div>
              <Card className="shadow-subtle">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-semibold mb-1">Insights</h3>
                  <p className="text-sm text-muted-foreground">AI-powered progress analysis</p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full w-8 h-8 bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">Consistent Progress</p>
                        <p className="text-sm text-muted-foreground">
                          You've consistently lost weight at a healthy rate of 1-2 lbs per week. Great job maintaining this pace!
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="rounded-full w-8 h-8 bg-green-50 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                        <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">Body Composition</p>
                        <p className="text-sm text-muted-foreground">
                          Your measurements suggest you're losing fat while maintaining muscle. Your waist has decreased by 5.5% while arms increased slightly.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="rounded-full w-8 h-8 bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                        <Scale className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">Goal Projection</p>
                        <p className="text-sm text-muted-foreground">
                          At your current rate, you'll reach your goal weight of 165 lbs in approximately 3 weeks.
                        </p>
                      </div>
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
