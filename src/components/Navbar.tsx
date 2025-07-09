import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { About } from "@/components/Modal/About";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdQuestionMark } from "react-icons/md";
import { LogOut, User } from "lucide-react";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <nav className="bg-transparent py-4 px-6">
      <header className="flex justify-between items-center">
        <div className="font-dm-serif-display text-3xl">Sulat.ai</div>
        <div className="space-x-4">
          <div className="space-x-3 md:space-x-4 flex items-center">
            {!user ? (
              <>
                <NavLink to="/login">
                  <Button className="font-semibold">Login</Button>
                </NavLink>
                <NavLink to="/signup" className="hidden md:block">
                  <Button className="bg-transparent border border-accent hover:bg-primary-hover/30 text-foreground">
                    Sign Up
                  </Button>
                </NavLink>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full border border-accent"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="" alt={user.username} />
                      <AvatarFallback>
                        {getInitials(user.username)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-sidebar"
                  align="end"
                  forceMount
                >
                  <DropdownMenuItem className="flex flex-col items-start">
                    <div className="text-sm font-medium">{user.username}</div>
                    <div className="text-xs text-secondary-foreground">
                      {user.email}
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button
                    className="bg-transparent border border-accent text-foreground rounded-full hover:bg-primary-hover/30"
                    onClick={() => setIsOpen(true)}
                  >
                    <MdQuestionMark />
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent align="end">
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
