
import { useState } from 'react';
import { 
  User, 
  Settings, 
  LogOut, 
  Bell, 
  Shield, 
  HelpCircle, 
  Smartphone,
  Dumbbell,
  Target,
  Edit2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  
  const handleSaveChanges = () => {
    toast('Changes saved', {
      description: 'Your profile has been updated successfully.'
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20 px-4 md:px-8 mt-16">
        <div className="container">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2 slide-up">Your Profile</h1>
            <p className="text-muted-foreground slide-up">Manage your account and preferences</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Card className="shadow-subtle">
                <div className="p-6 flex flex-col items-center">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <button className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 shadow-md">
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  
                  <h2 className="text-xl font-semibold mt-4">John Doe</h2>
                  <p className="text-muted-foreground">john.doe@example.com</p>
                  
                  <div className="w-full mt-6">
                    <div className="flex justify-between items-center mb-1.5">
                      <p className="text-sm">Profile Completion</p>
                      <p className="text-sm font-medium">75%</p>
                    </div>
                    <Progress value={75} className="h-1.5" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="p-4">
                  <nav className="space-y-1">
                    {[
                      { id: 'profile', label: 'Profile Information', icon: <User className="h-4 w-4" /> },
                      { id: 'goals', label: 'Fitness Goals', icon: <Target className="h-4 w-4" /> },
                      { id: 'preferences', label: 'Preferences', icon: <Settings className="h-4 w-4" /> },
                      { id: 'notifications', label: 'Notifications', icon: <Bell className="h-4 w-4" /> },
                      { id: 'privacy', label: 'Privacy & Security', icon: <Shield className="h-4 w-4" /> },
                      { id: 'devices', label: 'Connected Devices', icon: <Smartphone className="h-4 w-4" /> },
                      { id: 'help', label: 'Help & Support', icon: <HelpCircle className="h-4 w-4" /> },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                          activeTab === item.id 
                            ? 'bg-primary/10 text-primary font-medium' 
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </div>
                
                <Separator />
                
                <div className="p-4">
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2 text-red-500">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </Card>
            </div>
            
            <div className="lg:col-span-3">
              {activeTab === 'profile' && (
                <Card className="shadow-subtle">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Profile Information</h2>
                    <p className="text-sm text-muted-foreground">Update your personal details</p>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="John" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Doe" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input id="dob" type="date" defaultValue="1990-01-15" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select defaultValue="male">
                          <SelectTrigger id="gender">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea 
                        id="bio" 
                        rows={4} 
                        className="w-full p-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        defaultValue="Fitness enthusiast on a journey to improve health and strength. Love morning workouts and meal prepping on weekends."
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button onClick={handleSaveChanges}>Save Changes</Button>
                    </div>
                  </div>
                </Card>
              )}
              
              {activeTab === 'goals' && (
                <Card className="shadow-subtle">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Fitness Goals</h2>
                    <p className="text-sm text-muted-foreground">Define what you want to achieve</p>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="space-y-4">
                      <Label>Primary Goal</Label>
                      <RadioGroup defaultValue="weight-loss">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="weight-loss" id="weight-loss" />
                          <Label htmlFor="weight-loss">Weight Loss</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="muscle-gain" id="muscle-gain" />
                          <Label htmlFor="muscle-gain">Muscle Gain</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="maintenance" id="maintenance" />
                          <Label htmlFor="maintenance">Maintenance</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="general-fitness" id="general-fitness" />
                          <Label htmlFor="general-fitness">General Fitness</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="current-weight">Current Weight (lbs)</Label>
                        <Input id="current-weight" type="number" defaultValue="170" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="target-weight">Target Weight (lbs)</Label>
                        <Input id="target-weight" type="number" defaultValue="165" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="weekly-target">Weekly Target (lbs)</Label>
                        <Select defaultValue="1">
                          <SelectTrigger id="weekly-target">
                            <SelectValue placeholder="Select target" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0.5">0.5 lbs per week</SelectItem>
                            <SelectItem value="1">1 lb per week</SelectItem>
                            <SelectItem value="1.5">1.5 lbs per week</SelectItem>
                            <SelectItem value="2">2 lbs per week</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="activity-level">Activity Level</Label>
                        <Select defaultValue="moderate">
                          <SelectTrigger id="activity-level">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sedentary">Sedentary (little exercise)</SelectItem>
                            <SelectItem value="light">Lightly active (1-2 days/week)</SelectItem>
                            <SelectItem value="moderate">Moderately active (3-5 days/week)</SelectItem>
                            <SelectItem value="very">Very active (6-7 days/week)</SelectItem>
                            <SelectItem value="extreme">Extremely active (physical job)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <Label>Target Areas</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['Core', 'Arms', 'Chest', 'Back', 'Legs', 'Glutes'].map((area) => (
                          <div key={area} className="flex items-center space-x-2">
                            <input type="checkbox" id={area.toLowerCase()} className="rounded border-input h-4 w-4 text-primary" />
                            <Label htmlFor={area.toLowerCase()}>{area}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button onClick={handleSaveChanges}>Save Goals</Button>
                    </div>
                  </div>
                </Card>
              )}
              
              {activeTab === 'preferences' && (
                <Card className="shadow-subtle">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Preferences</h2>
                    <p className="text-sm text-muted-foreground">Customize your app experience</p>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Workout Preferences</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="workout-level">Preferred Workout Level</Label>
                        <Select defaultValue="intermediate">
                          <SelectTrigger id="workout-level">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="workout-duration">Preferred Workout Duration</Label>
                        <Select defaultValue="30-45">
                          <SelectTrigger id="workout-duration">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15-30">15-30 minutes</SelectItem>
                            <SelectItem value="30-45">30-45 minutes</SelectItem>
                            <SelectItem value="45-60">45-60 minutes</SelectItem>
                            <SelectItem value="60+">60+ minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Workout Equipment</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {['Dumbbells', 'Barbell', 'Kettlebell', 'Resistance Bands', 'Pull-up Bar', 'None (Bodyweight)'].map((equipment) => (
                            <div key={equipment} className="flex items-center space-x-2">
                              <input type="checkbox" id={equipment.toLowerCase().replace(/[ -]/g, '-')} className="rounded border-input h-4 w-4 text-primary" defaultChecked={['Dumbbells', 'Resistance Bands', 'None (Bodyweight)'].includes(equipment)} />
                              <Label htmlFor={equipment.toLowerCase().replace(/[ -]/g, '-')}>{equipment}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Nutrition Preferences</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="diet-type">Diet Type</Label>
                        <Select defaultValue="balanced">
                          <SelectTrigger id="diet-type">
                            <SelectValue placeholder="Select diet" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="balanced">Balanced</SelectItem>
                            <SelectItem value="keto">Keto</SelectItem>
                            <SelectItem value="paleo">Paleo</SelectItem>
                            <SelectItem value="vegetarian">Vegetarian</SelectItem>
                            <SelectItem value="vegan">Vegan</SelectItem>
                            <SelectItem value="mediterranean">Mediterranean</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Food Allergies or Restrictions</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {['Gluten', 'Dairy', 'Nuts', 'Shellfish', 'Eggs', 'Soy'].map((allergy) => (
                            <div key={allergy} className="flex items-center space-x-2">
                              <input type="checkbox" id={allergy.toLowerCase()} className="rounded border-input h-4 w-4 text-primary" />
                              <Label htmlFor={allergy.toLowerCase()}>{allergy}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">App Preferences</h3>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Dark Mode</p>
                          <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Use Metric Units</p>
                          <p className="text-sm text-muted-foreground">Switch between imperial and metric</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="zh">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button onClick={handleSaveChanges}>Save Preferences</Button>
                    </div>
                  </div>
                </Card>
              )}
              
              {activeTab === 'notifications' && (
                <Card className="shadow-subtle">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Notification Settings</h2>
                    <p className="text-sm text-muted-foreground">Manage how you receive notifications</p>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Workout Notifications</h3>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Workout Reminders</p>
                          <p className="text-sm text-muted-foreground">Receive reminders for scheduled workouts</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Workout Completion</p>
                          <p className="text-sm text-muted-foreground">Get notified when it's time to log workouts</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Workout Recommendations</p>
                          <p className="text-sm text-muted-foreground">Get personalized workout suggestions</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Nutrition Notifications</h3>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Meal Reminders</p>
                          <p className="text-sm text-muted-foreground">Get reminders to log your meals</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Water Intake Reminders</p>
                          <p className="text-sm text-muted-foreground">Reminders to stay hydrated</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Nutrition Insights</p>
                          <p className="text-sm text-muted-foreground">Receive insights about your nutrition</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Progress Notifications</h3>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Weekly Progress Reports</p>
                          <p className="text-sm text-muted-foreground">Receive weekly summaries of your progress</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Goal Achievement</p>
                          <p className="text-sm text-muted-foreground">Get notified when you reach your goals</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Streak Milestones</p>
                          <p className="text-sm text-muted-foreground">Celebrate your consistency streaks</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button onClick={handleSaveChanges}>Save Notification Settings</Button>
                    </div>
                  </div>
                </Card>
              )}
              
              {activeTab === 'privacy' && (
                <Card className="shadow-subtle">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Privacy & Security</h2>
                    <p className="text-sm text-muted-foreground">Manage your data and account security</p>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Account Security</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      
                      <Button>Change Password</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Privacy Settings</h3>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Data Collection</p>
                          <p className="text-sm text-muted-foreground">Allow anonymous usage data collection</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Personalized Recommendations</p>
                          <p className="text-sm text-muted-foreground">Allow AI to analyze your data for recommendations</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Data Management</h3>
                      
                      <Button variant="outline">Export Your Data</Button>
                      <Button variant="outline" className="text-red-500">Delete Account</Button>
                    </div>
                  </div>
                </Card>
              )}
              
              {activeTab === 'devices' && (
                <Card className="shadow-subtle">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Connected Devices</h2>
                    <p className="text-sm text-muted-foreground">Manage fitness trackers and devices</p>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                            <Smartphone className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">iPhone 13 Pro</p>
                            <p className="text-sm text-muted-foreground">iOS 15.4 • Last synced 2 hours ago</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Disconnect</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                            <div className="h-5 w-5 text-muted-foreground">⌚</div>
                          </div>
                          <div>
                            <p className="font-medium">Apple Watch Series 7</p>
                            <p className="text-sm text-muted-foreground">watchOS 8.5 • Last synced 30 minutes ago</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Disconnect</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Connect a Device</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                          { name: 'Apple Health', icon: '🍎' },
                          { name: 'Google Fit', icon: 'G' },
                          { name: 'Fitbit', icon: 'F' },
                          { name: 'Garmin', icon: 'G' },
                          { name: 'Samsung Health', icon: 'S' },
                          { name: 'Oura Ring', icon: 'O' },
                        ].map((device) => (
                          <Button key={device.name} variant="outline" className="h-auto p-4 justify-start">
                            <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center mr-3">
                              <div className="text-muted-foreground">{device.icon}</div>
                            </div>
                            <span>Connect {device.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              )}
              
              {activeTab === 'help' && (
                <Card className="shadow-subtle">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Help & Support</h2>
                    <p className="text-sm text-muted-foreground">Get assistance with the app</p>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
                      
                      {[
                        { 
                          question: 'How do I track a workout?', 
                          answer: 'Go to the Workouts page, select a workout plan, and click "Start Workout". Follow the on-screen instructions to log your sets and reps.'
                        },
                        { 
                          question: 'Can I create custom workouts?', 
                          answer: 'Yes, in the Workouts section, click on "Create Custom Workout" to design your own workout routine with exercises, sets, and reps.'
                        },
                        { 
                          question: 'How accurate is the calorie tracking?', 
                          answer: 'Our calorie tracking is based on nutritional databases and provides estimates. For most accurate results, measure portions and log all ingredients.'
                        },
                      ].map((faq, i) => (
                        <div key={i} className="border rounded-md p-4">
                          <h4 className="font-medium mb-2">{faq.question}</h4>
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Contact Support</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="Enter the subject of your query" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <textarea 
                          id="message" 
                          rows={4} 
                          className="w-full p-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="Describe your issue or question in detail"
                        />
                      </div>
                      
                      <Button>Submit Support Request</Button>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Helpful Resources</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="justify-start h-auto p-4">
                          <div className="mr-3">📘</div>
                          <div className="text-left">
                            <p className="font-medium">User Guide</p>
                            <p className="text-xs text-muted-foreground">Step-by-step instructions</p>
                          </div>
                        </Button>
                        
                        <Button variant="outline" className="justify-start h-auto p-4">
                          <div className="mr-3">🎓</div>
                          <div className="text-left">
                            <p className="font-medium">Video Tutorials</p>
                            <p className="text-xs text-muted-foreground">Visual guides for app features</p>
                          </div>
                        </Button>
                        
                        <Button variant="outline" className="justify-start h-auto p-4">
                          <div className="mr-3">📋</div>
                          <div className="text-left">
                            <p className="font-medium">Fitness Resources</p>
                            <p className="text-xs text-muted-foreground">Articles and tips</p>
                          </div>
                        </Button>
                        
                        <Button variant="outline" className="justify-start h-auto p-4">
                          <div className="mr-3">💬</div>
                          <div className="text-left">
                            <p className="font-medium">Community Forum</p>
                            <p className="text-xs text-muted-foreground">Connect with other users</p>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
