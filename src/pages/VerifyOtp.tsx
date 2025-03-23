
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ArrowRight, KeyRound } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userEmail, verifyOtp, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If no email is set, redirect to login
    if (!userEmail) {
      navigate('/login');
    }
  }, [userEmail, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      await verifyOtp(userEmail, otp);
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
              <CardTitle>Verify Your Email</CardTitle>
              <CardDescription>
                Enter the 6-digit code sent to {userEmail || 'your email'}
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
                      <Label htmlFor="otp" className="text-center">
                        Verification Code
                      </Label>
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
