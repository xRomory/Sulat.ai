import { useState } from "react";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { userSchema } from "@/schema/schemas";
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
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    api?: string;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    //Clear error when user types
    if (error[id as keyof typeof error]) {
      setError((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});
    setLoading(true);

    try {
      await userSchema.validate(formData, { abortEarly: false });

      await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newError: typeof error = {};
        err.inner.forEach((errors) => {
          if (errors.path) newError[errors.path as keyof typeof newError] = errors.message;
        });
        setError(newError);
      } else {
        setError({
          api: err instanceof Error ? err.message : "Signup failed. Please try again",
        });
      }
    } finally {
      setLoading(false);
    }
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
            {error.api && (
              <div className="text-sm text-destructive font-medium text-center">
                {error.api}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username" className="font-medium">
                Username
              </Label>
              <div className="relative">
                <Input
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="pl-10"
                  required
                  disabled={loading}
                />
                <UserIcon className="h-4 w-4 absolute left-3 top-3" />
              </div>
              {error.username && (
                <p className="text-sm text-destructive font-medium">
                  {error.username}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="doe@email.com"
                  className="pl-10"
                  required
                  disabled={loading}
                />
                <MailOpenIcon className="h-4 w-4 absolute left-3 top-3" />
              </div>
              {error.email && (
                <p className="text-sm text-destructive font-medium">
                  {error.email}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="pl-10"
                  required
                  disabled={loading}
                />
                <KeyIcon className="w-4 h-4 absolute left-3 top-3" />
              </div>
              {error.password ? (
                <p className="text-sm text-destructive font-medium">{error.password}</p>
              ) : (
                <p className="text-xs text-secondary-foreground mt-3">
                  Password must be at least 8 characters long
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Password"
                  className="pl-10"
                  required
                  disabled={loading}
                />
                <KeyIcon className="w-4 h-4 absolute left-3 top-3" />
              </div>
              {error.confirmPassword && (
                <p className="text-sm text-destructive font-medium">{error.confirmPassword}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#ffd45f] to-secondary hover:from-[#BFA3F3]/60 hover:to-accent font-semibold"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
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
