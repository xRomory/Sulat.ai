import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MailOpenIcon, ArrowLeftIcon, CheckCircleIcon } from "lucide-react";

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //Logic for pass reset

    setSubmitted(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="border-accent shadow-md bg-light-modal backdrop-blur-sm">
        <CardHeader>
          <h2 className="text-xl font-semibold text-center">Forgot Password</h2>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-6"
            >
              <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Check your email</h3>
              <p className="mb-4">
                We've sent a password reset link to <span className="font-medium">{email}</span>
              </p>
              <p className="text-sm text-secondary-foreground">
                Didn't receive the email? Check your spam folder or {" "}
                <button 
                  className="text-secondary hover:text-secondary/70 cursor-pointer"
                  onClick={() => setSubmitted(false)}
                >
                  Try Again
                </button>
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-address">Email Address</Label>
                <div className="relative">
                  <Input 
                    id="email-address"
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <MailOpenIcon className="h-4 w-4 absolute left-3 top-3" />
                </div>
                {error && (
                <p className="text-sm text-destructive font-medium">{error}</p>
              )}
              </div>

              <Alert className="bg-secondary/25 border-accent">
                <AlertDescription className="text-sm text-foreground">
                  Enter your email address and we'll send you a link to reset your password.
                </AlertDescription>
              </Alert>

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-[#ffd45f] to-secondary hover:from-[#BFA3F3]/60 hover:to-accent font-semibold"
              >
                Send Reset Link
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="border-t border-accent flex justify-center">
          <Link 
            to="/login"
            className="flex items-center text-sm text-secondary hover:text-secondary/70 py-4"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Sign In
          </Link>

        </CardFooter>
      </Card>
    </motion.div>
  )
}
