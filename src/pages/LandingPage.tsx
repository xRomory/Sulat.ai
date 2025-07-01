import React from "react";
// import Layout from "@/app/layout";
import { LetterInput } from "@/components/LetterInput/LetterInput";

const LandingPage: React.FC = () => {
  const handleLetterSubmit = (text: string) => {
    //Insert Logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-dm-serif-display text-6xl md:text-7xl mb-2">Sulat.ai</h1>
          <LetterInput onSubmit={handleLetterSubmit}/>
      </div>
    </div>
  );
};

export default LandingPage;
