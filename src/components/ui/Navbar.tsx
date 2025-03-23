
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Activity, 
  Dumbbell, 
  Home, 
  Apple, 
  ChartLine, 
  User,
  Menu,
  X
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export function Navbar() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);
  
  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { path: '/dashboard', label: 'Dashboard', icon: <Activity className="w-5 h-5" /> },
    { path: '/workouts', label: 'Workouts', icon: <Dumbbell className="w-5 h-5" /> },
    { path: '/nutrition', label: 'Nutrition', icon: <Apple className="w-5 h-5" /> },
    { path: '/progress', label: 'Progress', icon: <ChartLine className="w-5 h-5" /> },
    { path: '/profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  const renderNavItems = () => {
    return navItems.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) => cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
          isActive 
            ? "text-primary font-medium bg-primary/5" 
            : "text-foreground/70 hover:text-foreground hover:bg-muted"
        )}
      >
        {item.icon}
        <span>{isMobile ? "" : item.label}</span>
      </NavLink>
    ));
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8",
        isScrolled 
          ? "py-3 bg-background/80 backdrop-blur-md border-b" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold">Calorimetrics</span>
        </NavLink>
        
        {isMobile ? (
          <>
            <button 
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="p-2 text-foreground"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            {menuOpen && (
              <nav className="absolute top-full left-0 right-0 bg-background border-b shadow-subtle py-2 px-4 flex flex-col space-y-1 slide-in">
                {renderNavItems()}
              </nav>
            )}
          </>
        ) : (
          <nav className="flex items-center space-x-1">
            {renderNavItems()}
          </nav>
        )}
      </div>
    </header>
  );
}
