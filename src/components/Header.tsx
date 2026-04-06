import { Button } from "./ui/button";
import { LogOut, User as UserIcon } from "lucide-react";
import { ProfileDialog } from "./ProfileDialog";
import { UserProfile } from "../types";

interface HeaderProps {
  user: { uid: string; email: string; displayName: string; photoURL?: string } | null;
  userProfile: UserProfile | null;
  onSignOut: () => void;
  onUpdateProfile: (profile: Partial<UserProfile>) => Promise<void>;
}

export const Header = ({ user, userProfile, onSignOut, onUpdateProfile }: HeaderProps) => {
  return (
    <header className="w-full h-16 border-b border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <span className="text-white font-bold text-xl">E</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white hidden sm:block">
          Expense Tracker
        </h1>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          {userProfile && (
            <ProfileDialog profile={userProfile} onUpdate={onUpdateProfile} />
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onSignOut}
            className="text-white/60 hover:text-white hover:bg-white/5"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      )}
    </header>
  );
};
