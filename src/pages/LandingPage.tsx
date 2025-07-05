import React from "react";
import { Navbar } from "@/components/Navbar";
import { LetterAnimation } from "@/components/LetterAnimation/LetterAnimation";

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="relative flex justify-center items-center h-screen">
        <LetterAnimation />
      </div>
    </div>
  );
};
