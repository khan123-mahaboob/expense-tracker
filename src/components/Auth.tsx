import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LogIn, UserPlus, Mail, Phone, Chrome } from "lucide-react";

interface AuthProps {
  onGoogleSignIn: () => void;
  onEmailSignIn: (email: string, pass: string) => void;
  onPhoneSignIn: (phone: string) => void;
  onSignUp: (username: string, email: string, pass: string) => void;
}

export const Auth = ({ onGoogleSignIn, onEmailSignIn, onPhoneSignIn, onSignUp }: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="bg-black/40 backdrop-blur-xl border-white/10 text-white shadow-2xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight">Expense Tracker</CardTitle>
          <CardDescription className="text-white/50">
            Manage your finances with elegance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10 mb-6">
              <TabsTrigger value="login" className="data-[state=active]:bg-white/10 text-white/70 data-[state=active]:text-white">
                <LogIn className="w-4 h-4 mr-2" /> Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-white/10 text-white/70 data-[state=active]:text-white">
                <UserPlus className="w-4 h-4 mr-2" /> Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email or Username</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 focus:border-indigo-500/50 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/5 border-white/10 focus:border-indigo-500/50 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-white/5 border-white/10 focus:border-indigo-500/50 transition-colors"
                />
              </div>
              <Button 
                onClick={() => {
                  if (password !== confirmPassword) {
                    alert("Passwords do not match!");
                    return;
                  }
                  onEmailSignIn(email, password);
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-6"
              >
                Sign In
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-username">Username</Label>
                <Input
                  id="signup-username"
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white/5 border-white/10 focus:border-indigo-500/50 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 focus:border-indigo-500/50 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/5 border-white/10 focus:border-indigo-500/50 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                <Input
                  id="signup-confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-white/5 border-white/10 focus:border-indigo-500/50 transition-colors"
                />
              </div>
              <Button 
                onClick={() => {
                  if (password !== confirmPassword) {
                    alert("Passwords do not match!");
                    return;
                  }
                  onSignUp(username, email, password);
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-6"
              >
                Create Account
              </Button>
            </TabsContent>
          </Tabs>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black/40 px-2 text-white/40">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              onClick={onGoogleSignIn}
              className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
            >
              <Chrome className="w-4 h-4 mr-2" /> Google
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                const p = prompt("Enter phone number:");
                if (p) onPhoneSignIn(p);
              }}
              className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
            >
              <Phone className="w-4 h-4 mr-2" /> Phone
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-xs text-center text-white/30">
            By clicking continue, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
