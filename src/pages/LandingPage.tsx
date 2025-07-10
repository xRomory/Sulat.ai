import React from "react";
import { Navbar } from "@/components/Navbar";
import { LetterAnimation } from "@/components/LetterAnimation/LetterAnimation";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/utils/app-sidebar";
// import { useAuth } from "@/context/AuthContext";

export const LandingPage: React.FC = () => {
  // const { user } = useAuth();
  return (
    <div className="min-h-screen flex">
      {/* {user && (
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
        </SidebarProvider>
      )} */}
      <main className="flex-1 flex flex-col">
        <div className="sticky top-0">
          <Navbar />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <LetterAnimation />
        </div>
      </main>
    </div>
  );
};
