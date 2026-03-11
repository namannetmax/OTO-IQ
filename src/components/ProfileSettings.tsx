import React, { useState } from "react";
import { motion } from "motion/react";
import { User, Camera, Save, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface ProfileSettingsProps {
  onBack: () => void;
  currentUserName: string;
}

export default function ProfileSettings({ onBack, currentUserName }: ProfileSettingsProps) {
  const [userName, setUserName] = useState(currentUserName || "");
  const [profilePicture, setProfilePicture] = useState<string | null>(null); // Placeholder for image URL

  const handleSave = () => {
    // Logic to save user name and profile picture
    console.log("Saving profile:", { userName, profilePicture });
    toast.success("Profile updated successfully.");
    onBack();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto bg-[#FCFCFC] rounded-[2.5rem] shadow-2xl shadow-zinc-200/50 border border-zinc-200 p-12 mt-12"
    >
      <h2 className="font-display text-3xl mb-8">Profile Settings</h2>

      <div className="space-y-8">
        {/* Profile Picture */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-24 h-24 rounded-full bg-zinc-100 flex items-center justify-center overflow-hidden border border-zinc-200">
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-zinc-400" />
            )}
            <label htmlFor="profile-picture-upload" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="w-6 h-6" />
            </label>
            <input
              id="profile-picture-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">Change Profile Picture</span>
        </div>

        {/* User Name */}
        <div className="space-y-2">
          <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-bold">
            User Name
          </label>
          <input
            type="text"
            value={userName || ""}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 font-mono text-sm focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-950 transition-colors font-mono text-[10px] tracking-widest uppercase"
        >
          <ArrowLeft className="w-3 h-3" />
          Back
        </button>
        <button
          onClick={handleSave}
          className="bg-violet-600 text-white px-6 py-3 rounded-xl font-mono text-xs tracking-widest uppercase font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/20 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </motion.div>
  );
}
