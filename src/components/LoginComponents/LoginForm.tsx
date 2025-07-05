import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MailOpenIcon, KeyIcon } from "lucide-react";

export const LoginForm = () => {
  const [error, setError] = useState("");

  const handleLoginSubmit = () => {
    console.log("Submitted");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="border-accent shadow-md bg-light-modal backdrop-blur-sm">
        <CardHeader className="pb-4">
          <h2 className="text-xl font-semibold text-center">Welcome Back</h2>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
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
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-secondary hover:text-secondary/60"
                >
                  Forgot Password?
                </Link>
              </div>
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
            </div>
            <div className="flex space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="font-normal">
                Remember Me
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#ffd45f] to-[#F37335] hover:from-[#BFA3F3]/60 hover:to-accent font-medium"
            >
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="pt-0 border-t border-accent flex flex-col items-center justify-center text-center">
          <p className="text-sm py-4">
            Don't have an account?{" "}
            <Link
              to="signup"
              className="font-medium text-secondary hover:text-secondary/60"
            >
              Sign Up
            </Link>
          </p>

          <div className="w-full pt-2 flex items-center">
            <div className="border-t border-accent flex-grow"></div>
            <span className="px-4 text-xs text-secondary-foreground">or continue with</span>
            <div className="border-t border-accent flex-grow"></div>
          </div>

          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              size="icon"
              className="border-accent hover:bg-primary-hover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-accent hover:bg-primary-hover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-accent hover:bg-primary-hover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
