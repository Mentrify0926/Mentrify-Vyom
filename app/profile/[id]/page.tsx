"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { 
  Linkedin, Star, Edit2, Save, X, Search, CalendarCheck 
} from "lucide-react";
import { getUser, saveUser, isAuthenticated } from "@/lib/auth";
import { Button } from "@/components/ui/button"; 

interface MenteeProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  role: "mentee"; 
  brief?: string;
  linkedin?: string;
}
const MENTEE_STORAGE_KEY = "mentr_mentee_profile_demo";
const sampleMentee: MenteeProfile = {
  id: "mentee-demo",
  name: "Parth Vekariya",
  email: "Parth.vekariya@example.com",
  username: "Parthiv",
  role: "mentee",
  brief: "Aspiring Full-Stack Developer with a passion for creating intuitive user experiences. Currently learning React, Node.js, and TypeScript. Looking for guidance on building scalable projects and preparing for technical interviews.",
  linkedin: "https://www.linkedin.com/in/",
};


export default function MenteeProfilePage() {
  const router = useRouter();
  const params = useParams();
  const profileId = params.id as string;

  const [profile, setProfile] = useState<MenteeProfile | null>(null);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/signin');
      return;
    }
    const loggedInUser = getUser();
    
    if (loggedInUser && loggedInUser.id === profileId) {
        let profileData: MenteeProfile;
        try {
            const saved = localStorage.getItem(MENTEE_STORAGE_KEY);
            profileData = saved ? JSON.parse(saved) : sampleMentee;
        } catch {
            profileData = sampleMentee;
        }
        setProfile(profileData);
    } else {
        setProfile(sampleMentee);
    }

    setLoading(false);
  }, [profileId, router]);

  const updateProfileField = (field: keyof MenteeProfile, value: string) => {
    setProfile(prev => prev ? { ...prev, [field]: value } : null);
  };

  const saveProfile = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      localStorage.setItem(MENTEE_STORAGE_KEY, JSON.stringify(profile));
      saveUser(profile);
      
      setTimeout(() => {
        setSaving(false);
        setIsEditing(false);
        alert("Profile saved successfully!");
      }, 400);
    } catch (e) {
      setSaving(false);
      alert("Failed to save: " + String(e));
    }
  };
  
  const resetDemo = () => {
    localStorage.removeItem(MENTEE_STORAGE_KEY);
    setProfile(sampleMentee);
    setIsEditing(false);
    alert("Mentee profile reset to sample data.");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-center p-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Mentee Profile Not Found</h1>
            <Button onClick={() => router.push('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* --- Header Section --- */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 mb-8">
          
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg flex-shrink-0">
            {profile.name?.[0]?.toUpperCase() ?? "M"}
          </div>

          {/* Name, Details & Edit Button */}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900">{profile.name}</h1>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 flex-shrink-0"
              >
                {isEditing ? <X className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-x-3 gap-y-1 mt-2 flex-wrap">
              <div className="text-sm text-gray-600">@{profile.username}</div>
              <div className="text-sm text-gray-400 hidden sm:block">•</div>
              <div className="text-sm text-gray-700">{profile.email}</div>
              <div className="text-sm text-gray-400 hidden sm:block">•</div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Mentee
              </span>
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="ml-3 p-1 hover:bg-gray-100 rounded-md">
                  <Linkedin className="h-5 w-5 text-blue-600" />
                </a>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap justify-center sm:justify-start mt-4 sm:mt-0">
            <Button variant="outline" onClick={resetDemo} className="text-sm">Reset Demo</Button>
            <Button variant="outline" onClick={() => router.push("/")} className="text-sm">Back Home</Button>
          </div>
        </div>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">About Me</h3>
              {isEditing ? (
                <textarea
                  value={profile.brief || ''}
                  onChange={(e) => updateProfileField('brief', e.target.value)}
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell mentors about your goals and interests..."
                />
              ) : (
                <p className="text-gray-700 text-sm leading-relaxed">
                  {profile.brief || "No bio provided."}
                </p>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">My Dashboard</h3>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Ready to Learn and Grow!</h4>
                  <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                    Your journey starts here. Find the perfect mentor to guide you or check on your upcoming sessions.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                    <Button
                      onClick={() => router.push('/mentors')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 flex items-center justify-center gap-2"
                    >
                      <Search className="h-5 w-5" />
                      Browse Mentors
                    </Button>
                    <Button
                      onClick={() => router.push('/sessions')}
                      variant="outline"
                      className="border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold py-3 flex items-center justify-center gap-2"
                    >
                      <CalendarCheck className="h-5 w-5" />
                      My Sessions
                    </Button>
                  </div>
                </div>
            </div>

            {/* Profile Details Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">My Profile Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-gray-500">Name</label>
                        {isEditing ? <input type="text" value={profile.name} onChange={(e) => updateProfileField('name', e.target.value)} className="mt-1 block w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" /> : <div className="font-medium text-gray-900">{profile.name}</div>}
                    </div>
                    <div>
                        <label className="text-sm text-gray-500">Email</label>
                        <div className="font-medium text-gray-900">{profile.email}</div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-500">Username</label>
                        {isEditing ? <input type="text" value={profile.username} onChange={(e) => updateProfileField('username', e.target.value)} className="mt-1 block w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" /> : <div className="font-medium text-gray-900">@{profile.username}</div>}
                    </div>
                    <div>
                        <label className="text-sm text-gray-500">LinkedIn Profile URL</label>
                        {isEditing ? <input type="url" value={profile.linkedin || ''} onChange={(e) => updateProfileField('linkedin', e.target.value)} placeholder="https://linkedin.com/in/your-profile" className="mt-1 block w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" /> : profile.linkedin ? <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">View LinkedIn</a> : <div className="text-gray-500 text-sm">Not provided</div>}
                    </div>
                </div>
            </div>
            
            {/* Save Button for Edit Mode */}
            {isEditing && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex gap-3">
                  <Button onClick={saveProfile} disabled={saving} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-6 py-2 rounded-lg flex items-center gap-2">
                    {saving ? <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> Saving...</> : <><Save className="h-4 w-4" /> Save Changes</>}
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
