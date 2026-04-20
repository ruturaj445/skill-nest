import { useState } from "react";
import { motion } from "motion/react";
import { User, Bell, Shield, CreditCard, Globe, Moon, Volume2, Eye, Mic } from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { VoiceAssistantButton } from "../components/VoiceAssistantButton";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { Badge } from "../components/ui/badge";
import { useLocation } from "react-router";

export function Settings() {
  const location = useLocation();
  const role = location.pathname.includes("student") ? "student" : "client";
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    taskUpdates: true,
    weeklyReport: true,
    darkMode: false,
    twoFactor: false,
    voiceAssistant: false,
    highContrast: false,
    screenReader: true,
    language: "en",
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={role} />

      <div className="flex-1 overflow-auto">
        <div className="p-8 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600">Manage your account preferences and settings</p>
          </motion.div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
              </div>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="Alex Rivera" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="alex@example.com" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue="Mumbai, India" />
                  </div>
                </div>
                {role === "student" && (
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      rows={3}
                      defaultValue="Passionate student freelancer specializing in content writing and social media management."
                    />
                  </div>
                )}
                <div className="flex justify-end gap-3">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Save Changes
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <div className="font-medium text-gray-900">Email Notifications</div>
                    <div className="text-sm text-gray-500">Receive updates via email</div>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={() => toggleSetting("emailNotifications")}
                  />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <div className="font-medium text-gray-900">Push Notifications</div>
                    <div className="text-sm text-gray-500">Get browser notifications</div>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={() => toggleSetting("pushNotifications")}
                  />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <div className="font-medium text-gray-900">Task Updates</div>
                    <div className="text-sm text-gray-500">
                      Notify me about task status changes
                    </div>
                  </div>
                  <Switch
                    checked={settings.taskUpdates}
                    onCheckedChange={() => toggleSetting("taskUpdates")}
                  />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-medium text-gray-900">Weekly Report</div>
                    <div className="text-sm text-gray-500">Get weekly performance summary</div>
                  </div>
                  <Switch
                    checked={settings.weeklyReport}
                    onCheckedChange={() => toggleSetting("weeklyReport")}
                  />
                </div>
              </div>
            </motion.div>

            {/* Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Security</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                    <div className="text-sm text-gray-500">Add an extra layer of security</div>
                  </div>
                  <Switch
                    checked={settings.twoFactor}
                    onCheckedChange={() => toggleSetting("twoFactor")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="••••••••" />
                </div>
                <Button variant="outline" className="w-full">
                  Update Password
                </Button>
              </div>
            </motion.div>

            {/* Accessibility */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Accessibility</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <Mic className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium text-gray-900">AI Voice Assistant</div>
                      <div className="text-sm text-gray-500">
                        Enable voice commands and audio feedback
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={settings.voiceAssistant}
                    onCheckedChange={() => toggleSetting("voiceAssistant")}
                  />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <div className="font-medium text-gray-900">High Contrast Mode</div>
                    <div className="text-sm text-gray-500">Improve visibility for low vision</div>
                  </div>
                  <Switch
                    checked={settings.highContrast}
                    onCheckedChange={() => toggleSetting("highContrast")}
                  />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-medium text-gray-900">Screen Reader Support</div>
                    <div className="text-sm text-gray-500">
                      Optimize for assistive technologies
                    </div>
                  </div>
                  <Switch
                    checked={settings.screenReader}
                    onCheckedChange={() => toggleSetting("screenReader")}
                  />
                </div>
              </div>

              {settings.voiceAssistant && (
                <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                  <div className="flex items-start gap-3">
                    <Volume2 className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 mb-1">
                        Voice Assistant Enabled
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        The AI voice assistant will help you navigate the platform, read content
                        aloud, and provide audio feedback. Say "Hey SkillNest" to activate.
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-300 text-purple-700 hover:bg-purple-50"
                      >
                        Test Voice Assistant
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Payment (for clients) */}
            {role === "client" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
                </div>

                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center text-white text-xs font-bold">
                          VISA
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">•••• 4242</div>
                          <div className="text-sm text-gray-500">Expires 12/26</div>
                        </div>
                      </div>
                      <Badge variant="secondary">Default</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Add Payment Method
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Preferences</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <div className="font-medium text-gray-900">Dark Mode</div>
                    <div className="text-sm text-gray-500">Switch to dark theme</div>
                  </div>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={() => toggleSetting("darkMode")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    value={settings.language}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, language: e.target.value }))
                    }
                  >
                    <option value="en">English</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                    <option value="mr">मराठी (Marathi)</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                    <option value="te">తెలుగు (Telugu)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option>IST (UTC+5:30)</option>
                    <option>EST (UTC-5:00)</option>
                    <option>PST (UTC-8:00)</option>
                  </select>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <VoiceAssistantButton />
    </div>
  );
}