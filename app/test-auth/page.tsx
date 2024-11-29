'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

export default function TestAuthPage() {
  const { user, signIn, signUp, signOut, loading } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Test User');
  const [isLoading, setIsLoading] = useState(false);

  const handleTestSignUp = async () => {
    setIsLoading(true);
    try {
      await signUp(email, password, name);
      console.log('Sign up successful');
    } catch (error: any) {
      console.error('Sign up failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn(email, password);
      console.log('Sign in successful');
    } catch (error: any) {
      console.error('Sign in failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      console.log('Sign out successful');
    } catch (error: any) {
      console.error('Sign out failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Auth Test Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Test Credentials */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name (for signup)</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Current User Status */}
          <div className="p-4 bg-muted rounded-lg">
            <h2 className="font-semibold mb-2">Current User:</h2>
            <pre className="whitespace-pre-wrap break-all">
              {user ? JSON.stringify(user, null, 2) : 'Not logged in'}
            </pre>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-2">
            <Button
              onClick={handleTestSignUp}
              disabled={isLoading || !!user}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Test Sign Up
            </Button>
            <Button
              onClick={handleTestSignIn}
              disabled={isLoading || !!user}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Test Sign In
            </Button>
            <Button
              onClick={handleSignOut}
              disabled={isLoading || !user}
              variant="destructive"
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
