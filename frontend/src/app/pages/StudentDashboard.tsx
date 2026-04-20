import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Briefcase, CheckCircle2, Clock, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { CreditScore } from "../components/CreditScore";
import { BadgeDisplay } from "../components/BadgeDisplay";
import { TaskCard } from "../components/TaskCard";
import { VoiceAssistantButton } from "../components/VoiceAssistantButton";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import { currentUser, myAppliedTasks, completedTasks, tasks } from "../data/mockData";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import api from "../api";

export function StudentDashboard() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(currentUser);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/auth/profile");
        // merge mock defaults with real data
        setUserProfile((prev) => ({ ...prev, ...data }));
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };
    fetchProfile();
  }, []);

  const stats = [
    {
      icon: Briefcase,
      label: "Tasks Applied",
      value: userProfile.tasksApplied,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: CheckCircle2,
      label: "Tasks Completed",
      value: userProfile.tasksCompleted,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Clock,
      label: "In Progress",
      value: myAppliedTasks.length,
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: TrendingUp,
      label: "Total Earned",
      value: `₹${userProfile.tasksCompleted * 45}`,
      color: "from-amber-500 to-orange-500",
    },
  ];

  // Calculate skill progress based on the learn -> practice -> earn -> level up flow
  const totalTasks = userProfile.tasksCompleted + userProfile.tasksApplied;
  const learningProgress = Math.min((totalTasks / 10) * 100, 100);
  const practiceProgress = Math.min((userProfile.tasksApplied / 5) * 100, 100);
  const earningProgress = Math.min((userProfile.tasksCompleted / 20) * 100, 100);
  const levelProgress = (userProfile.creditScore / 1000) * 100;

  const handleApply = (taskId: string) => {
    toast.success("Application submitted! Good luck! 🎉");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="student" />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {userProfile.name}! 👋
            </h1>
            <p className="text-gray-600">Here's your progress and available opportunities</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Credit Score & Badges */}
            <div className="lg:col-span-1 space-y-6">
              <CreditScore
                score={userProfile.creditScore}
                level={userProfile.level}
              />
              <BadgeDisplay badges={userProfile.badges} />
            </div>

            {/* Right Column - Skill Progress */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">Skill Journey</h3>
                  </div>
                  <span className="text-sm text-gray-600">Learn → Practice → Earn → Level Up</span>
                </div>

                <div className="space-y-6">
                  {[
                    { label: "Learning", progress: learningProgress, icon: "📚" },
                    { label: "Practicing", progress: practiceProgress, icon: "💪" },
                    { label: "Earning", progress: earningProgress, icon: "💰" },
                    { label: "Level Progress", progress: levelProgress, icon: "🚀" },
                  ].map((skill, index) => (
                    <motion.div
                      key={skill.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span>{skill.icon}</span>
                          <span className="text-sm font-medium text-gray-700">{skill.label}</span>
                        </div>
                        <span className="text-sm text-gray-600">{skill.progress.toFixed(0)}%</span>
                      </div>
                      <Progress value={skill.progress} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid sm:grid-cols-2 gap-4"
              >
                <button
                  onClick={() => navigate("/marketplace")}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-6 text-left hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Briefcase className="w-8 h-8" />
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="font-semibold mb-1">Browse Tasks</div>
                  <div className="text-sm text-purple-100">{tasks.length} new opportunities</div>
                </button>

                <button
                  onClick={() => navigate("/teams")}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 text-left hover:border-purple-300 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-green-600" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">Join a Team</div>
                  <div className="text-sm text-gray-600">Collaborate & earn more</div>
                </button>
              </motion.div>
            </div>
          </div>

          {/* Active Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Tasks In Progress</h2>
              <Button variant="outline">View All</Button>
            </div>

            {myAppliedTasks.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {myAppliedTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No active tasks yet</p>
                <Button onClick={() => navigate("/marketplace")}>Browse Marketplace</Button>
              </div>
            )}
          </motion.div>

          {/* Recommended Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recommended For You</h2>
              <Button variant="outline" onClick={() => navigate("/marketplace")}>
                See All Tasks
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.slice(0, 3).map((task) => (
                <TaskCard key={task.id} task={task} onApply={() => handleApply(task.id)} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <VoiceAssistantButton />
    </div>
  );
}