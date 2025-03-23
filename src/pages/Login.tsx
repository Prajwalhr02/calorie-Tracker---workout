
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/ui/Navbar';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const Login = () => {
  const [contactType, setContactType] = useState<'email' | 'phone'>('email');
  const [contactValue, setContactValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactValue.trim()) {
      return;
    }
    
    // Validate based on type
    if (contactType === 'email' && !contactValue.includes('@')) {
      return;
    }
    
    if (contactType === 'phone' && !/^\d{10,15}$/.test(contactValue)) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      await login(contactValue, contactType);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4 mt-20">
        <div className="w-full max-w-md">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your email or phone number to receive a one-time code
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="contactType">Login Method</Label>
                    <Select
                      value={contactType}
                      onValueChange={(value) => {
                        setContactType(value as 'email' | 'phone');
                        setContactValue(''); // Reset value when changing type
                      }}
                    >
                      <SelectTrigger id="contactType">
                        <SelectValue placeholder="Select login method" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone Number</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="contactValue">
                      {contactType === 'email' ? 'Email' : 'Phone Number'}
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">
                        {contactType === 'email' ? (
                          <Mail className="h-5 w-5" />
                        ) : (
                          <Phone className="h-5 w-5" />
                        )}
                      </span>
                      <Input
                        id="contactValue"
                        placeholder={contactType === 'email' ? 'you@example.com' : '(123) 456-7890'}
                        type={contactType === 'email' ? 'email' : 'tel'}
                        value={contactValue}
                        onChange={(e) => setContactValue(e.target.value)}
                        className="pl-10"
                        autoComplete={contactType === 'email' ? 'email' : 'tel'}
                        required
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                  Back to home
                </Link>
                <Button 
                  type="submit" 
                  disabled={
                    isSubmitting || 
                    isLoading || 
                    (contactType === 'email' && !contactValue.includes('@')) ||
                    (contactType === 'phone' && !/^\d{10,15}$/.test(contactValue))
                  }
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Login;
