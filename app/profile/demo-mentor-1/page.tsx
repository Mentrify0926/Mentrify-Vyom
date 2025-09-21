"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { 
  Linkedin, Calendar, Clock, DollarSign, Star, Edit2, Save, X, 
  CalendarX, Plus, Trash2, Copy, AlertCircle, Users, Award
} from "lucide-react";
import { getUser, saveUser, isAuthenticated } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";

type Slot = { day: number; start: string; end: string };
type Exception = { date: string; reason: string };
type RecurringSettings = {
  enabled: boolean;
  duration: number; 
  startDate: string;
  exceptions: Exception[];
};

interface MentorProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  role: "mentor";
  brief?: string;
  expertise?: string[];
  session_cost?: number;
  total_sessions?: number;
  rating?: number;
  linkedin?: string;
  availability?: Slot[];
  recurring_settings?: RecurringSettings;
}

const MENTOR_STORAGE_KEY = "mentr_mentor_profile_demo";
const sampleMentor: MentorProfile = {
  id: "mentor-demo",
  name: "Dr. Jemin Vasoya",
  email: "jeminvasoya@example.com",
  username: "PrimeSolverXp",
  role: "mentor",
  brief: "Experienced software architect with 15+ years in the industry. Specializing in cloud infrastructure, microservices, and leading high-performing engineering teams. I'm here to help you navigate your career path and achieve your professional goals.",
  expertise: ["Cloud Architecture", "Microservices", "Team Leadership", "Career Development"],
  session_cost: 800,
  total_sessions: 250,
  rating: 4.9,
  linkedin: "https://www.linkedin.com/in/jeminvasoya/",
  availability: [
    { day: 2, start: "17:00", end: "18:00" },
    { day: 4, start: "17:00", end: "18:30" },
  ],
  recurring_settings: {
    enabled: true,
    duration: 3,
    startDate: new Date().toISOString().split('T')[0],
    exceptions: [
      { date: "2025-12-25", reason: "Christmas Day" }
    ]
  }
};

function dayLabel(d: number): string {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d] ?? d.toString();
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

export default function MentorProfilePage() {
  const router = useRouter();
  const params = useParams();
  const profileId = params.id as string;

  const [profile, setProfile] = useState<MentorProfile | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [recurringSettings, setRecurringSettings] = useState<RecurringSettings>({
    enabled: false,
    duration: 1,
    startDate: new Date().toISOString().split('T')[0],
    exceptions: []
  });
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showRecurringPanel, setShowRecurringPanel] = useState(false);
  const [newExceptionDate, setNewExceptionDate] = useState("");
  const [newExceptionReason, setNewExceptionReason] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/signin');
      return;
    }
    const loggedInUser = getUser();
    
    if (loggedInUser && loggedInUser.id === profileId) {
        let profileData: MentorProfile;
        try {
            const saved = localStorage.getItem(MENTOR_STORAGE_KEY);
            profileData = saved ? JSON.parse(saved) : sampleMentor;
        } catch {
            profileData = sampleMentor;
        }
        setProfile(profileData);
        setSlots(profileData.availability || []);
        setRecurringSettings(profileData.recurring_settings || { enabled: false, duration: 1, startDate: new Date().toISOString().split('T')[0], exceptions: []});
    } else {
        setProfile(sampleMentor);
        setSlots(sampleMentor.availability || []);
        setRecurringSettings(sampleMentor.recurring_settings || { enabled: false, duration: 1, startDate: new Date().toISOString().split('T')[0], exceptions: []});
    }

    setLoading(false);
  }, [profileId, router]);

  const addSlot = () => setSlots(s => [...s, { day: 1, start: "09:00", end: "10:00" }]);
  const removeSlot = (i: number) => setSlots(s => s.filter((_, idx) => idx !== i));
  const updateSlot = (i: number, key: keyof Slot, val: any) => setSlots(s => s.map((it, idx) => (idx === i ? { ...it, [key]: val } : it)));
  const duplicateSlot = (i: number) => setSlots(s => [...s, { ...slots[i] }]);
  const updateProfileField = (field: keyof MentorProfile, value: any) => setProfile(prev => prev ? { ...prev, [field]: value } : null);

  const addException = () => {
    if (!newExceptionDate || !newExceptionReason.trim()) return;
    const newException: Exception = { date: newExceptionDate, reason: newExceptionReason.trim() };
    setRecurringSettings(prev => ({
      ...prev,
      exceptions: [...prev.exceptions, newException].sort((a, b) => a.date.localeCompare(b.date))
    }));
    setNewExceptionDate("");
    setNewExceptionReason("");
  };

  const removeException = (index: number) => {
    setRecurringSettings(prev => ({
      ...prev,
      exceptions: prev.exceptions.filter((_, i) => i !== index)
    }));
  };

  const saveProfile = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      const toSave = { ...profile, availability: slots, recurring_settings: recurringSettings };
      localStorage.setItem(MENTOR_STORAGE_KEY, JSON.stringify(toSave));
      saveUser(toSave);
      
      setTimeout(() => {
        setSaving(false);
        setIsEditing(false);
        setShowRecurringPanel(false);
        alert("Profile saved successfully!");
      }, 400);
    } catch (e) {
      setSaving(false);
      alert("Failed to save: " + String(e));
    }
  };
  
  const resetDemo = () => {
    localStorage.removeItem(MENTOR_STORAGE_KEY);
    setProfile(sampleMentor);
    setSlots(sampleMentor.availability || []);
    setRecurringSettings(sampleMentor.recurring_settings || { enabled: false, duration: 1, startDate: new Date().toISOString().split('T')[0], exceptions: [] });
    setIsEditing(false);
    alert("Mentor profile reset to sample data.");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-center p-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Mentor Profile Not Found</h1>
            <Button onClick={() => router.push('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12 mt-16">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
        {/* --- Header Section --- */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 mb-8">
          
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg flex-shrink-0">
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
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Mentor
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
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">About Me</h3>
              {isEditing ? (
                <textarea
                  value={profile.brief || ''}
                  onChange={(e) => updateProfileField('brief', e.target.value)}
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Tell mentees about your experience and expertise..."
                />
              ) : (
                <p className="text-gray-700 text-sm leading-relaxed">
                  {profile.brief || "No bio provided."}
                </p>
              )}

              {/* Expertise Tags */}
              {profile.expertise && profile.expertise.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.expertise.map((skill, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Stats Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Mentorship Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Per session</div>
                    <div className="text-xl font-bold text-gray-900">₹{profile.session_cost || 0}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Total sessions</div>
                    <div className="text-xl font-bold text-gray-900">{profile.total_sessions || 0}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Rating</div>
                    <div className="flex items-center gap-1">
                      <span className="text-xl font-bold text-gray-900">{profile.rating || 0}</span>
                      <span className="text-sm text-gray-500">/ 5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mentor Dashboard */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Mentor Dashboard</h3>
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Welcome to Your Mentor Hub!</h4>
                <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                  Manage your mentorship sessions, track your impact, and help mentees achieve their goals.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                  <Button
                    onClick={() => router.push('/sessions')}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 flex items-center justify-center gap-2"
                  >
                    <Calendar className="h-5 w-5" />
                    View Sessions
                  </Button>
                  <Button
                    onClick={() => router.push('/mentees')}
                    variant="outline"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50 font-semibold py-3 flex items-center justify-center gap-2"
                  >
                    <Users className="h-5 w-5" />
                    My Mentees
                  </Button>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Profile Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Name</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={profile.name} 
                      onChange={(e) => updateProfileField('name', e.target.value)} 
                      className="mt-1 block w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500" 
                    />
                  ) : (
                    <div className="font-medium text-gray-900">{profile.name}</div>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <div className="font-medium text-gray-900">{profile.email}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Username</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={profile.username} 
                      onChange={(e) => updateProfileField('username', e.target.value)} 
                      className="mt-1 block w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500" 
                    />
                  ) : (
                    <div className="font-medium text-gray-900">@{profile.username}</div>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-500">Session Cost (₹)</label>
                  {isEditing ? (
                    <input 
                      type="number" 
                      value={profile.session_cost || ''} 
                      onChange={(e) => updateProfileField('session_cost', Number(e.target.value))} 
                      className="mt-1 block w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500" 
                    />
                  ) : (
                    <div className="font-medium text-gray-900">₹{profile.session_cost || 0}</div>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-500">LinkedIn Profile URL</label>
                  {isEditing ? (
                    <input 
                      type="url" 
                      value={profile.linkedin || ''} 
                      onChange={(e) => updateProfileField('linkedin', e.target.value)} 
                      placeholder="https://linkedin.com/in/your-profile" 
                      className="mt-1 block w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500" 
                    />
                  ) : profile.linkedin ? (
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                      View LinkedIn Profile
                    </a>
                  ) : (
                    <div className="text-gray-500 text-sm">Not provided</div>
                  )}
                </div>
              </div>
            </div>

            {/* Availability Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Weekly Availability</h3>
                {!isEditing && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsEditing(true)} 
                    className="flex items-center gap-2"
                  >
                    <Edit2 className="h-4 w-4" /> Edit
                  </Button>
                )}
              </div>
              
              <div className="space-y-4">
                {slots.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No availability set.</p>
                    {isEditing && (
                      <Button onClick={addSlot} className="mt-3" size="sm">
                        <Plus className="h-4 w-4 mr-2" /> Add Time Slot
                      </Button>
                    )}
                  </div>
                ) : (
                  <>
                    {slots.map((slot, i) => (
                      <div key={i} className={`p-4 bg-gray-50 rounded-lg ${isEditing ? 'space-y-4 md:space-y-0 md:flex md:items-end md:gap-4' : 'flex items-center justify-between'}`}>
                        {isEditing ? (
                          <>
                            <div className="flex-1 min-w-[120px]">
                              <label className="text-xs text-gray-500 block mb-1">Day</label>
                              <select 
                                value={slot.day} 
                                onChange={(e) => updateSlot(i, "day", Number(e.target.value))} 
                                className="w-full p-2 border rounded"
                              >
                                <option value={0}>Sunday</option>
                                <option value={1}>Monday</option>
                                <option value={2}>Tuesday</option>
                                <option value={3}>Wednesday</option>
                                <option value={4}>Thursday</option>
                                <option value={5}>Friday</option>
                                <option value={6}>Saturday</option>
                              </select>
                            </div>
                            <div className="flex-1 min-w-[100px]">
                              <label className="text-xs text-gray-500 block mb-1">Start</label>
                              <input 
                                type="time" 
                                value={slot.start} 
                                onChange={(e) => updateSlot(i, "start", e.target.value)} 
                                className="w-full p-2 border rounded" 
                              />
                            </div>
                            <div className="flex-1 min-w-[100px]">
                              <label className="text-xs text-gray-500 block mb-1">End</label>
                              <input 
                                type="time" 
                                value={slot.end} 
                                onChange={(e) => updateSlot(i, "end", e.target.value)} 
                                className="w-full p-2 border rounded" 
                              />
                            </div>
                            <div className="flex gap-2 pt-4 md:pt-0">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                onClick={() => duplicateSlot(i)} 
                                title="Duplicate"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                onClick={() => removeSlot(i)} 
                                className="text-red-600 hover:text-red-700 hover:bg-red-50" 
                                title="Remove"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center justify-between w-full flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span className="font-medium">{dayLabel(slot.day)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span>{slot.start} - {slot.end}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <div className="flex gap-3 pt-4 border-t">
                        <Button 
                          variant="outline" 
                          onClick={addSlot} 
                          size="sm" 
                          className="flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" /> Add Time Slot
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Recurring Schedule Settings */}
              {isEditing && slots.length > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                    <h4 className="text-md font-semibold text-gray-900">Recurring Schedule</h4>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowRecurringPanel(!showRecurringPanel)} 
                      className="flex items-center gap-2 flex-shrink-0"
                    >
                      <Calendar className="h-4 w-4" />
                      {showRecurringPanel ? 'Hide Settings' : 'Manage Schedule'}
                    </Button>
                  </div>
                  
                  {showRecurringPanel && (
                    <div className="bg-purple-50 p-4 rounded-lg space-y-4">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          id="enableRecurring" 
                          checked={recurringSettings.enabled} 
                          onChange={(e) => setRecurringSettings(p => ({...p, enabled: e.target.checked }))} 
                          className="rounded text-purple-600 focus:ring-purple-500" 
                        />
                        <label htmlFor="enableRecurring" className="text-sm font-medium">
                          Use this schedule for multiple months
                        </label>
                      </div>
                      
                      {recurringSettings.enabled && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm block mb-1">Duration (months)</label>
                              <select 
                                value={recurringSettings.duration} 
                                onChange={(e) => setRecurringSettings(p => ({...p, duration: Number(e.target.value) }))} 
                                className="w-full p-2 border rounded"
                              >
                                <option value={1}>1 month</option>
                                <option value={2}>2 months</option>
                                <option value={3}>3 months</option>
                                <option value={6}>6 months</option>
                                <option value={12}>12 months</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-sm block mb-1">Start Date</label>
                              <input 
                                type="date" 
                                value={recurringSettings.startDate} 
                                onChange={(e) => setRecurringSettings(p => ({...p, startDate: e.target.value }))} 
                                className="w-full p-2 border rounded" 
                              />
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <div className="flex items-center gap-2 mb-3">
                              <CalendarX className="h-4 w-4 text-red-500" />
                              <h5 className="text-sm font-medium">Exception Dates</h5>
                            </div>
                            <div className="space-y-3">
                              {recurringSettings.exceptions.map((ex, i) => (
                                <div key={i} className="flex items-center justify-between bg-white p-3 rounded border">
                                  <div>
                                    <div className="font-medium text-sm">{formatDate(ex.date)}</div>
                                    <div className="text-xs text-gray-600">{ex.reason}</div>
                                  </div>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => removeException(i)} 
                                    className="text-red-600"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                              <div className="bg-white p-3 rounded border border-dashed">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 items-end">
                                  <input 
                                    type="date" 
                                    value={newExceptionDate} 
                                    onChange={(e) => setNewExceptionDate(e.target.value)} 
                                    min={recurringSettings.startDate} 
                                    className="p-2 border rounded text-sm" 
                                  />
                                  <input 
                                    type="text" 
                                    value={newExceptionReason} 
                                    onChange={(e) => setNewExceptionReason(e.target.value)} 
                                    placeholder="Reason (e.g., Holiday)" 
                                    className="p-2 border rounded text-sm" 
                                  />
                                  <Button 
                                    onClick={addException} 
                                    disabled={!newExceptionDate || !newExceptionReason.trim()} 
                                    size="sm" 
                                    className="bg-purple-500 hover:bg-purple-600 text-white w-full lg:w-auto"
                                  >
                                    Add Exception
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                              <div className="text-sm text-amber-800">
                                <p className="font-medium">Schedule Preview:</p>
                                <p>
                                  Your weekly availability will repeat for {recurringSettings.duration} month{recurringSettings.duration > 1 ? 's' : ''} from {formatDate(recurringSettings.startDate)}, 
                                  with {recurringSettings.exceptions.length} exception date{recurringSettings.exceptions.length !== 1 ? 's' : ''}.
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Save Button for Edit Mode */}
            {isEditing && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={saveProfile} 
                    disabled={saving} 
                    className="bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold px-6 py-2 rounded-lg flex items-center gap-2"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> 
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" /> 
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => { 
                      setIsEditing(false); 
                      setShowRecurringPanel(false); 
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}