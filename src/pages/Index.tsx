
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, Dumbbell, Apple, ChartLineUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

export default function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      if (heroRef.current) {
        const opacity = Math.max(0, 1 - scrollPosition / 500);
        const translateY = scrollPosition * 0.4;
        heroRef.current.style.opacity = opacity.toString();
        heroRef.current.style.transform = `translateY(${translateY}px)`;
      }
      
      if (featuresRef.current) {
        const elements = featuresRef.current.querySelectorAll('.feature-card');
        elements.forEach((el, index) => {
          const rect = el.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8;
          
          if (isVisible) {
            (el as HTMLElement).style.opacity = '1';
            (el as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 z-0"
            aria-hidden="true"
          />
          
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block mb-6">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Activity className="h-4 w-4" />
                  <span>Track your fitness journey</span>
                </div>
              </div>
              
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
                ref={heroRef}
              >
                Achieve your fitness goals with precision and elegance
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Calorimetrics helps you track workouts, monitor nutrition, and visualize your progress with a beautiful, intuitive interface.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/dashboard" className="group">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/workouts">
                    Explore Workouts
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-4 md:px-8" ref={featuresRef}>
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Calorimetrics combines powerful features with beautiful design to make fitness tracking a pleasure, not a chore.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Workout Plans',
                  description: 'Access curated workout plans for both gym and home, tailored to your fitness level.',
                  icon: <Dumbbell className="h-6 w-6" />,
                  color: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                },
                {
                  title: 'Nutrition Tracking',
                  description: 'Log meals, track calories, and monitor macronutrients to support your fitness goals.',
                  icon: <Apple className="h-6 w-6" />,
                  color: 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400'
                },
                {
                  title: 'Progress Visualization',
                  description: 'See your progress over time with beautiful charts and actionable insights.',
                  icon: <ChartLineUp className="h-6 w-6" />,
                  color: 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400'
                },
                {
                  title: 'Personalized Goals',
                  description: 'Set custom goals for weight loss, muscle gain, or maintenance with adaptive targets.',
                  icon: <Activity className="h-6 w-6" />,
                  color: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400'
                },
                {
                  title: 'AI Recommendations',
                  description: 'Receive personalized insights and recommendations to optimize your fitness journey.',
                  icon: <Activity className="h-6 w-6" />,
                  color: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
                },
                {
                  title: 'Privacy-Focused',
                  description: 'Your fitness data stays private and secure, with full control over your information.',
                  icon: <Shield className="h-6 w-6" />,
                  color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400'
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="feature-card bg-card border rounded-xl p-6 shadow-subtle transition-all duration-500 opacity-0 transform translate-y-8"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-4 ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 md:px-8 bg-muted relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 z-0" aria-hidden="true" />
          
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to transform your fitness journey?</h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of users who are already achieving their fitness goals with Calorimetrics.
              </p>
              
              <Button size="lg" asChild>
                <Link to="/dashboard" className="group">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
