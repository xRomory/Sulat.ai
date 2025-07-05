import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MailOpenIcon, KeyIcon, UserIcon } from "lucide-react";

export const SignupForm = () => {
  const [error, setError] = useState("");

  const handleSignupSubmit = () => {
    console.log("Submitted");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="border-accent shadow-md bg-light-modal backdrop-blur-sm">
        <CardHeader>
          <h2 className="text-xl font-semibold text-center">
            Create Your Account
          </h2>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="font-medium">
                Username
              </Label>
              <div className="relative">
                <Input
                  id="username"
                  placeholder="Username"
                  className="pl-10"
                  required
                />
                <UserIcon className="h-4 w-4 absolute left-3 top-3" />
              </div>
              {error && (
                <p className="text-sm text-destructive font-medium">{error}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-address" className="font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email-address"
                  type="email"
                  placeholder="doe@email.com"
                  className="pl-10"
                  required
                />
                <MailOpenIcon className="h-4 w-4 absolute left-3 top-3" />
              </div>
              {error && (
                <p className="text-sm text-destructive font-medium">{error}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="pl-10"
                  required
                />
                <KeyIcon className="w-4 h-4 absolute left-3 top-3" />
              </div>
              <p className="text-xs text-secondary-foreground mt-3">
                Password must be at least 8 characters long
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#ffd45f] to-secondary hover:from-[#BFA3F3]/60 hover:to-accent font-semibold"
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="border-t border-accent flex flex-col items-center justify-center text-center">
          <p className="text-sm">
            Already have an account{" "}
            <Link
              to="/login"
              className="font-medium text-secondary hover:text-secondary/60"
            >
              Sign In
            </Link>
          </p>

          <p className="text-xs mt-4 text-secondary-foreground text-center">
            By signing up, you agree to our{" "}
            <a href="#" className="text-secondary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-secondary hover:underline">
              Privacy Policy
            </a>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
