
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const AuthForm = ({ onAuthenticated }: { onAuthenticated: (user: { email: string }) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleAuth = (e: React.FormEvent, type: 'login' | 'register') => {
    e.preventDefault();
    
    // For demo purposes, we'll simulate authentication
    if (email && password) {
      // In a real app, this would be an API call to authenticate
      setTimeout(() => {
        toast({
          title: type === 'login' ? "Logged in successfully" : "Account created successfully",
          description: "Welcome to ExpenseFlow!",
        });
        onAuthenticated({ email });
      }, 1000);
    } else {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">ExpenseFlow</CardTitle>
        <CardDescription className="text-center">Manage your expenses with ease</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={(e) => handleAuth(e, 'login')}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Login
                </Button>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={(e) => handleAuth(e, 'register')}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input 
                    id="register-email"
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input 
                    id="register-password"
                    type="password" 
                    placeholder="Create a password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Create Account
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        By continuing, you agree to our Terms of Service
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
