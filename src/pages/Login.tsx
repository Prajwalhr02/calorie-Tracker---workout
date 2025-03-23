
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
import { Mail, Phone, ArrowRight, Globe } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

// Country codes list for phone number selection
const countryCodes = [
  { code: '+1', name: 'United States' },
  { code: '+44', name: 'United Kingdom' },
  { code: '+91', name: 'India' },
  { code: '+61', name: 'Australia' },
  { code: '+86', name: 'China' },
  { code: '+49', name: 'Germany' },
  { code: '+33', name: 'France' },
  { code: '+81', name: 'Japan' },
  { code: '+55', name: 'Brazil' },
  { code: '+7', name: 'Russia' },
  { code: '+27', name: 'South Africa' },
  { code: '+52', name: 'Mexico' },
  { code: '+39', name: 'Italy' },
  { code: '+34', name: 'Spain' },
  { code: '+82', name: 'South Korea' },
];

const Login = () => {
  const [contactType, setContactType] = useState<'email' | 'phone'>('email');
  const [contactValue, setContactValue] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
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
    
    const phoneValue = contactType === 'phone' ? `${countryCode}${contactValue.replace(/\D/g, '')}` : contactValue;
    
    if (contactType === 'phone' && !/^\d{6,12}$/.test(contactValue.replace(/\D/g, ''))) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      await login(contactType === 'phone' ? phoneValue : contactValue, contactType);
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
                    
                    {contactType === 'email' ? (
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-muted-foreground">
                          <Mail className="h-5 w-5" />
                        </span>
                        <Input
                          id="contactValue"
                          placeholder="you@example.com"
                          type="email"
                          value={contactValue}
                          onChange={(e) => setContactValue(e.target.value)}
                          className="pl-10"
                          autoComplete="email"
                          required
                        />
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <div className="relative w-1/3">
                          <span className="absolute left-3 top-2.5 text-muted-foreground">
                            <Globe className="h-5 w-5" />
                          </span>
                          <Select 
                            value={countryCode} 
                            onValueChange={setCountryCode}
                          >
                            <SelectTrigger className="pl-10">
                              <SelectValue placeholder="Code" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                              {countryCodes.map((country) => (
                                <SelectItem key={country.code} value={country.code}>
                                  {country.code} {country.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-2.5 text-muted-foreground">
                            <Phone className="h-5 w-5" />
                          </span>
                          <Input
                            id="contactValue"
                            placeholder="Phone number"
                            type="tel"
                            value={contactValue}
                            onChange={(e) => setContactValue(e.target.value)}
                            className="pl-10"
                            autoComplete="tel"
                            required
                          />
                        </div>
                      </div>
                    )}
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
                    (contactType === 'phone' && !/^\d{6,12}$/.test(contactValue.replace(/\D/g, '')))
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
