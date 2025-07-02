import React from "react";
import Layout from "@/app/layout";
import { LetterAnimation } from "@/components/LetterAnimation/LetterAnimation";

const LandingPage: React.FC = () => {

  return (
    <div className="min-h-screen">
      <div className="px-2">
        <Layout>
          <LetterAnimation />
        </Layout>
      </div>
    </div>
  );
};

export default LandingPage;