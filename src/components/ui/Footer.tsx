
import { Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-8 px-4 md:px-8 bg-background/30 backdrop-blur-md mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary/90 rounded-lg flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold">Calorimetrics</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              Track fitness goals with precision and elegance
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <h3 className="text-sm font-semibold">Links</h3>
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
              <Link to="/workouts" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Workouts</Link>
            </div>
            
            <div className="flex flex-col items-center md:items-start gap-2">
              <h3 className="text-sm font-semibold">Resources</h3>
              <Link to="/nutrition" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Nutrition</Link>
              <Link to="/progress" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Progress</Link>
              <Link to="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Profile</Link>
            </div>
            
            <div className="flex flex-col items-center md:items-start gap-2 col-span-2 md:col-span-1">
              <h3 className="text-sm font-semibold">Legal</h3>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Calorimetrics. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Twitter
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Instagram
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
