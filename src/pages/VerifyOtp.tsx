
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ArrowRight, KeyRound } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userContactValue, userContactType, verifyOtp, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If no contact value is set, redirect to login
    if (!userContactValue) {
      navigate('/login');
    }
  }, [userContactValue, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      await verifyOtp(userContactValue, otp);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format the contactValue for display
  const formatContact = () => {
    if (!userContactValue) return '';
    
    if (userContactType === 'email') {
      // Basic email masking - show first character, then asterisks, then domain
      const [username, domain] = userContactValue.split('@');
      if (username && domain) {
        return `${username.charAt(0)}${'*'.repeat(username.length - 1)}@${domain}`;
      }
      return userContactValue;
    } else {
      // Show only country code and last 4 digits
      const lastFour = userContactValue.slice(-4);
      const countryCode = userContactValue.replace(/[0-9]/g, '');
      return `${countryCode}****${lastFour}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4 mt-20">
        <div className="w-full max-w-md">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Verify Your {userContactType === 'email' ? 'Email' : 'Phone'}</CardTitle>
              <CardDescription>
                Enter the 6-digit code sent to {formatContact()}
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5 items-center">
                    <div className="mb-4">
                      <KeyRound className="h-10 w-10 text-primary" />
                    </div>
                    <div className="w-full flex flex-col space-y-4">
                      <div className="text-center font-medium">
                        Verification Code
                      </div>
                      <InputOTP 
                        maxLength={6} 
                        value={otp} 
                        onChange={setOtp}
                        containerClassName="justify-center"
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                      <p className="text-xs text-center text-muted-foreground mt-2">
                        For this demo, check the console for the OTP code.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/login')}
                >
                  Back to Login
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || isLoading || otp.length !== 6}
                >
                  Verify
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

export default VerifyOtp;
