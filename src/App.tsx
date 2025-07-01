import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

import MagicalLetter from "@/components/MagicalLetter/MagicalLetter";

import StartMenu from "./pages/StartMenu/StartMenu";
import LandingPage from "./pages/LandingPage";

const router = createBrowserRouter([
  {
    index: true,
    element: <StartMenu />
  },
  { path: "/home", element: <LandingPage /> },
  { path: "/letter", element: <MagicalLetter /> },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;