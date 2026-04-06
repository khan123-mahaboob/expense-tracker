import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { UserProfile } from "../types";
import { User, Camera, Mail, Phone, Calendar, UserCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ProfileDialogProps {
  profile: UserProfile;
  onUpdate: (profile: Partial<UserProfile>) => Promise<void>;
}

export const ProfileDialog = ({ profile, onUpdate }: ProfileDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    phoneNumber: profile.phoneNumber || "",
    email: profile.email || "",
    dateOfBirth: profile.dateOfBirth || "",
    gender: profile.gender || "prefer-not-to-say",
    profilePic: profile.profilePic || "",
  });

  useEffect(() => {
    setFormData({
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      phoneNumber: profile.phoneNumber || "",
      email: profile.email || "",
      dateOfBirth: profile.dateOfBirth || "",
      gender: profile.gender || "prefer-not-to-say",
      profilePic: profile.profilePic || "",
    });
    if (!isOpen) setStep(1);
  }, [profile, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    setIsSaving(true);
    await onUpdate(formData);
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsOpen(false);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profilePic: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10 text-white">
          <Avatar className="h-6 w-6 mr-2 border border-white/10">
            <AvatarImage src={profile.profilePic} alt={profile.username} />
            <AvatarFallback className="bg-indigo-600 text-[10px] text-white">
              {profile.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {profile.firstName ? profile.username : "Profile"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-slate-900 border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">User Profile</DialogTitle>
          <DialogDescription className="text-white/40">
            {step === 1 ? "Step 1: Basic Information" : "Step 2: Additional Details"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 px-1 mt-2">
          <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= 1 ? 'bg-indigo-500' : 'bg-white/10'}`} />
          <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= 2 ? 'bg-indigo-500' : 'bg-white/10'}`} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {step === 1 ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex flex-col items-center gap-4 mb-4">
                <div className="relative group">
                  <Avatar className="h-24 w-24 border-2 border-indigo-500/50">
                    <AvatarImage src={formData.profilePic} />
                    <AvatarFallback className="bg-indigo-600 text-2xl">
                      {profile.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <label 
                    htmlFor="profile-pic" 
                    className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer"
                  >
                    <Camera className="w-6 h-6 text-white" />
                    <input 
                      id="profile-pic" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <p className="text-xs text-white/40">Click to change profile picture</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-400" /> First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="bg-white/5 border-white/10"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-400" /> Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="bg-white/5 border-white/10"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-400" /> Email ID
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-white/5 border-white/10"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-indigo-400" /> Phone Number
                </Label>
                <Input
                  id="phone"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  className="bg-white/5 border-white/10"
                  placeholder="+1 234 567 890"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400" /> Date of Birth
                  </Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender" className="flex items-center gap-2">
                    <UserCircle className="w-4 h-4 text-indigo-400" /> Gender
                  </Label>
                  <Select 
                    value={formData.gender} 
                    onValueChange={(val: any) => setFormData(prev => ({ ...prev, gender: val }))}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/10 text-white">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="pt-4 flex flex-col sm:flex-row gap-2">
            {showSuccess && (
              <div className="flex-1 flex items-center text-emerald-400 text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
                Profile updated successfully!
              </div>
            )}
            
            {step === 2 && (
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setStep(1)}
                className="text-white/60 hover:text-white"
                disabled={isSaving}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}

            <div className="flex-1" />

            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white"
              disabled={isSaving}
            >
              Cancel
            </Button>

            {step === 1 ? (
              <Button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
