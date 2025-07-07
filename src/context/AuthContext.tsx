import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { AuthContextType, AuthResponse } from "@/types";
import { authApi } from "@/services/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider ({ 
  children,
  onSignupRedirect = "/login",
  onLoginRedirect = "/home",
  onLogoutRedirect = "/login",
}: { 
  children: ReactNode,
  onSignupRedirect?: string,
  onLoginRedirect?: string,
  onLogoutRedirect?: string
}) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if(storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAuthResponse = (response: AuthResponse) => {
    localStorage.setItem("token", response.access_token);
    localStorage.setItem(
      "user",
      JSON.stringify({ username: response.username, email: response.email })
    );
    setToken(response.access_token);
    setUser({ username: response.username, email: response.email });
    window.location.href = onLoginRedirect;
  };

  const signup = async (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await authApi.signup(data);
      handleAuthResponse(response);
      window.location.href = onSignupRedirect;
    } catch (error) {
      console.error("Error Fetching Sign Up API:", error);
      throw new Error("Error Fetching Sign Up API");
    }
  };

  const login = async (data: { email: string; password: string }) => {
    try {
      const response = await authApi.login(data);
      handleAuthResponse(response);
    } catch (error) {
      console.error("Error Fetching Login API:", error);
      throw new Error("Error Fetching Login API");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    window.location.href = onLogoutRedirect;
  };

  const value = {
    user,
    token,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if(context === undefined) throw new Error("useAuth must be within an AuthProvider");
  return context;
};