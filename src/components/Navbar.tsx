import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdQuestionMark } from "react-icons/md";
import { About } from "./Modal/About";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-transparent py-4 px-6 fixed top-0 w-full z-10">
      <header className="flex justify-between items-center">
        <div className="font-dm-serif-display text-3xl">Sulat.ai</div>
        <div className="space-x-4">
          <div className="space-x-3 md:space-x-4 flex items-center">
            <NavLink to="/login">
              <Button className="font-semibold">Login</Button>
            </NavLink>
            <NavLink to="/signup" className="hidden md:block">
              <Button className="bg-transparent border border-accent hover:bg-primary-hover/30 text-foreground">
                Sign Up
              </Button>
            </NavLink>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  className="bg-transparent border border-accent text-foreground rounded-full hover:bg-primary-hover/30"
                  onClick={() => setIsOpen(true)}
                >
                  <MdQuestionMark />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-foreground font-medium">About Sulat.ai</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </header>

      <About open={isOpen} onOpenChange={setIsOpen} />
    </nav>
  );
};
