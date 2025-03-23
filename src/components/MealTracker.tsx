
import { useState } from 'react';
import { Camera, Plus, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { useTracking } from '@/hooks/use-tracking';

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portion: string;
}

interface MealTrackerProps {
  dailyCalorieTarget?: number;
  currentCalories?: number;
}

export function MealTracker({ 
  dailyCalorieTarget = 2000,
  currentCalories = 0
}: MealTrackerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const { isActiveTracking, trackCalories } = useTracking();
  
  const meals = [
    { id: 'breakfast', label: 'Breakfast', icon: null },
    { id: 'lunch', label: 'Lunch', icon: null },
    { id: 'dinner', label: 'Dinner', icon: null },
    { id: 'snacks', label: 'Snacks', icon: null },
  ];
  
  const commonFoods: FoodItem[] = [
    { id: '1', name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, portion: '1 medium' },
    { id: '2', name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, portion: '100g' },
    { id: '3', name: 'Brown Rice', calories: 215, protein: 5, carbs: 45, fat: 1.8, portion: '1 cup cooked' },
    { id: '4', name: 'Salmon', calories: 206, protein: 22, carbs: 0, fat: 13, portion: '100g' },
    { id: '5', name: 'Greek Yogurt', calories: 100, protein: 17, carbs: 6, fat: 0.4, portion: '170g' },
    { id: '6', name: 'Avocado', calories: 240, protein: 3, carbs: 12, fat: 22, portion: '1 medium' },
    { id: '7', name: 'Almonds', calories: 164, protein: 6, carbs: 6, fat: 14, portion: '28g' },
    { id: '8', name: 'Oatmeal', calories: 150, protein: 5, carbs: 27, fat: 3, portion: '1 cup cooked' },
  ];
  
  const handleAddFood = (food: FoodItem) => {
    if (isActiveTracking) {
      trackCalories(food.calories);
    } else {
      toast(`Added ${food.name} to ${selectedMeal}`, {
        description: `${food.calories} calories added to your daily intake.`,
      });
    }
  };
  
  const handleCameraCapture = () => {
    toast('Camera feature', {
      description: 'AI food recognition coming soon!',
    });
  };
  
  const caloriePercentage = Math.min(100, Math.round((currentCalories / dailyCalorieTarget) * 100));
  const remainingCalories = dailyCalorieTarget - currentCalories;
  
  const filteredFoods = commonFoods.filter(food => 
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Card className="overflow-hidden shadow-subtle">
      <div className="p-5">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Daily Nutrition</h3>
          <Button variant="outline" size="sm" onClick={handleCameraCapture}>
            <Camera className="h-4 w-4 mr-1" /> Scan Food
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Daily Calories</p>
                <p className="text-sm">
                  <span className="font-semibold">{currentCalories}</span>
                  <span className="text-muted-foreground"> / {dailyCalorieTarget}</span>
                </p>
              </div>
              <Progress value={caloriePercentage} className="h-2" />
              <p className="text-xs text-muted-foreground text-right">
                {remainingCalories > 0 
                  ? `${remainingCalories} calories remaining` 
                  : 'Daily target reached'}
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Protein</p>
                <p className="text-lg font-semibold">65g</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Carbs</p>
                <p className="text-lg font-semibold">220g</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Fat</p>
                <p className="text-lg font-semibold">55g</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="relative h-28 w-28">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-muted" strokeWidth="2"></circle>
                <circle 
                  cx="18" 
                  cy="18" 
                  r="16" 
                  fill="none" 
                  className="stroke-primary" 
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset={100 - caloriePercentage}
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                ></circle>
                <text 
                  x="18" 
                  y="18" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  className="fill-foreground text-xl font-semibold"
                >
                  {caloriePercentage}%
                </text>
              </svg>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="breakfast" className="w-full" onValueChange={setSelectedMeal}>
          <TabsList className="grid grid-cols-4 mb-4">
            {meals.map((meal) => (
              <TabsTrigger key={meal.id} value={meal.id}>
                {meal.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {meals.map((meal) => (
            <TabsContent key={meal.id} value={meal.id} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={`Search food for ${meal.label.toLowerCase()}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                {filteredFoods.length > 0 ? (
                  filteredFoods.map((food) => (
                    <div 
                      key={food.id} 
                      className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium">{food.name}</p>
                        <p className="text-xs text-muted-foreground">{food.portion}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-medium">{food.calories}</p>
                          <p className="text-xs text-muted-foreground">calories</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleAddFood(food)}
                          className={isActiveTracking ? "text-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20" : ""}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground text-sm">No results found</p>
                  </div>
                )}
              </div>
              
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Custom Food
              </Button>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Card>
  );
}
