
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

// Define contact type
type ContactType = 'email' | 'phone';

// Define user type
type User = {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
};

// Define auth context type
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (contactValue: string, contactType: ContactType) => Promise<void>;
  logout: () => void;
  verifyOtp: (contactValue: string, otp: string) => Promise<boolean>;
  userContactValue: string;
  userContactType: ContactType;
  setUserContactValue: (value: string) => void;
  setUserContactType: (type: ContactType) => void;
};

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Local storage keys
const USER_STORAGE_KEY = 'calorimetrics_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userContactValue, setUserContactValue] = useState<string>('');
  const [userContactType, setUserContactType] = useState<ContactType>('email');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Mock login function - in a real app, this would call an API
  const login = async (contactValue: string, contactType: ContactType) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUserContactValue(contactValue);
      setUserContactType(contactType);
      
      // Generate a random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // In a real app, this would send the OTP to the user's email or phone
      console.log(`OTP for ${contactType}: ${contactValue}: ${otp}`);
      
      // Store OTP in localStorage temporarily (in a real app, this would be on the server)
      localStorage.setItem(`otp_${contactValue}`, otp);
      
      // Navigate to OTP verification page
      navigate('/verify-otp');
      
      toast({
        title: "OTP Sent",
        description: `A verification code has been sent to your ${contactType}. In this demo, check the console for the OTP.`,
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mock OTP verification
  const verifyOtp = async (contactValue: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get stored OTP from localStorage
      const storedOtp = localStorage.getItem(`otp_${contactValue}`);
      
      if (otp === storedOtp) {
        // Create a user object based on contact type
        const newUser: User = {
          id: crypto.randomUUID(),
        };
        
        // Set the appropriate contact field
        if (userContactType === 'email') {
          newUser.email = contactValue;
        } else {
          newUser.phone = contactValue;
        }
        
        // Store user in localStorage
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
        
        // Set user in state
        setUser(newUser);
        
        // Clean up the OTP
        localStorage.removeItem(`otp_${contactValue}`);
        
        toast({
          title: "Login Successful",
          description: "You have successfully logged in.",
        });
        
        // Navigate to dashboard
        navigate('/dashboard');
        return true;
      } else {
        toast({
          title: "Verification Failed",
          description: "Invalid OTP. Please try again.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast({
        title: "Verification Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
    navigate('/');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        verifyOtp,
        userContactValue,
        userContactType,
        setUserContactValue,
        setUserContactType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
