
import { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { 
  Activity, 
  Dumbbell, 
  Home, 
  Apple, 
  ChartLine, 
  User,
  Menu,
  X,
  CircleDot,
  LogOut
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useTracking } from '@/hooks/use-tracking';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { isActiveTracking } = useTracking();
  const { isAuthenticated, user, logout } = useAuth();
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
    { path: '/', label: 'Home', icon: <Home className="w-5 h-5" />, showAlways: true },
    { path: '/dashboard', label: 'Dashboard', icon: <Activity className="w-5 h-5" />, requireAuth: true },
    { path: '/workouts', label: 'Workouts', icon: <Dumbbell className="w-5 h-5" />, requireAuth: true },
    { path: '/nutrition', label: 'Nutrition', icon: <Apple className="w-5 h-5" />, requireAuth: true },
    { path: '/progress', label: 'Progress', icon: <ChartLine className="w-5 h-5" />, requireAuth: true },
    { path: '/profile', label: 'Profile', icon: <User className="w-5 h-5" />, requireAuth: true },
  ];

  const renderNavItems = () => {
    return navItems
      .filter(item => item.showAlways || !item.requireAuth || isAuthenticated)
      .map((item) => (
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

  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>{isMobile ? "" : "Log out"}</span>
        </Button>
      );
    } else {
      return (
        <Link to="/login">
          <Button 
            variant="default"
            size="sm"
          >
            <User className="mr-2 h-4 w-4" />
            {isMobile ? "" : "Login"}
          </Button>
        </Link>
      );
    }
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
          {isActiveTracking && (
            <div className="flex items-center ml-2">
              <CircleDot className="h-4 w-4 text-green-500 animate-pulse" />
              <span className="text-xs text-green-500 ml-1">Live tracking</span>
            </div>
          )}
        </NavLink>
        
        {isMobile ? (
          <>
            <div className="flex items-center gap-2">
              {renderAuthButtons()}
              <button 
                onClick={toggleMenu}
                aria-label="Toggle menu"
                className="p-2 text-foreground"
              >
                {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
            
            {menuOpen && (
              <nav className="absolute top-full left-0 right-0 bg-background border-b shadow-subtle py-2 px-4 flex flex-col space-y-1 slide-in">
                {renderNavItems()}
              </nav>
            )}
          </>
        ) : (
          <div className="flex items-center gap-4">
            <nav className="flex items-center space-x-1 mr-4">
              {renderNavItems()}
            </nav>
            {renderAuthButtons()}
          </div>
        )}
      </div>
    </header>
  );
}
