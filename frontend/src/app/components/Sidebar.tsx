import { motion } from "motion/react";
import { Home, Search, Users, Award, Settings, LogOut, Briefcase, Mic } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import logoImage from "../../imports/WhatsApp_Image_2026-04-13_at_4.05.10_PM.jpeg";

interface SidebarProps {
  role: "student" | "client";
}

export function Sidebar({ role }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const studentLinks = [
    { icon: Home, label: "Dashboard", path: "/student" },
    { icon: Search, label: "Marketplace", path: "/marketplace" },
    { icon: Users, label: "Teams", path: "/teams" },
    { icon: Award, label: "Achievements", path: "/achievements" },
  ];

  const clientLinks = [
    { icon: Home, label: "Dashboard", path: "/client" },
    { icon: Briefcase, label: "My Tasks", path: "/client" },
    { icon: Search, label: "Find Talent", path: "/find-talent" },
  ];

  const links = role === "student" ? studentLinks : clientLinks;

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col"
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex items-center justify-center">
            <img src={logoImage} alt="SkillNest" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SkillNest
            </h1>
            <p className="text-xs text-gray-500 capitalize">{role} Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;

          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-gradient-to-r from-purple-50 to-blue-50 text-purple-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-1">
        <button 
          onClick={() => navigate(role === "student" ? "/student/settings" : "/client/settings")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-all"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/");
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </motion.div>
  );
}