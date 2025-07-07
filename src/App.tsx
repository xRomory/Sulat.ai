import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { LandingPage } from "./pages/LandingPage";
import StartMenu from "./pages/StartMenu/StartMenu";
import LoadingSpinner from "./components/utils/LoadingSpinner";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"))

const router = createBrowserRouter([
  {
    index: true,
    element: <StartMenu />
  },
  {
    path: "/home", 
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LandingPage />
      </Suspense>
    )
  },
  {
    path: "/forgot-password",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ForgotPassword />
      </Suspense>
    )
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LoginPage />
      </Suspense>
    )
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <SignupPage />
      </Suspense>
    )
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;