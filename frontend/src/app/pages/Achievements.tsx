import { motion } from "motion/react";
import { Trophy, Award, Star, Target, Zap, Crown, Medal, Flame } from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { CreditScore } from "../components/CreditScore";
import { VoiceAssistantButton } from "../components/VoiceAssistantButton";
import { currentUser } from "../data/mockData";
import { Progress } from "../components/ui/progress";

export function Achievements() {
  const milestones = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first task",
      icon: Star,
      progress: 100,
      unlocked: true,
      reward: "+50 Credits",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      id: 2,
      title: "Task Master",
      description: "Complete 10 tasks successfully",
      icon: Target,
      progress: 80,
      unlocked: false,
      reward: "+100 Credits",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      title: "Rising Star",
      description: "Achieve a 5-star average rating",
      icon: Crown,
      progress: 90,
      unlocked: false,
      reward: "+150 Credits",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 4,
      title: "Speed Demon",
      description: "Complete 5 tasks ahead of deadline",
      icon: Zap,
      progress: 60,
      unlocked: false,
      reward: "+75 Credits",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: 5,
      title: "Team Player",
      description: "Complete 3 collaborative team tasks",
      icon: Medal,
      progress: 33,
      unlocked: false,
      reward: "+80 Credits",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      id: 6,
      title: "Consistent Performer",
      description: "Complete tasks for 7 consecutive days",
      icon: Flame,
      progress: 42,
      unlocked: false,
      reward: "+120 Credits",
      gradient: "from-red-500 to-orange-500",
    },
  ];

  const leaderboard = [
    { rank: 1, name: "Sarah Chen", score: 985, avatar: "SC" },
    { rank: 2, name: "Mike Johnson", score: 920, avatar: "MJ" },
    { rank: 3, name: "Alex Rivera", score: currentUser.creditScore, avatar: "AR" },
    { rank: 4, name: "Emma Wilson", score: 745, avatar: "EW" },
    { rank: 5, name: "David Kim", score: 710, avatar: "DK" },
  ];

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
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-8 h-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
            </div>
            <p className="text-gray-600">Track your progress and unlock rewards</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Credit Score */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <CreditScore score={currentUser.creditScore} level={currentUser.level} />

              {/* Leaderboard */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-6"
              >
                <div className="flex items-center gap-2 mb-6">
                  <Crown className="w-5 h-5 text-amber-600" />
                  <h3 className="font-semibold text-gray-900">Leaderboard</h3>
                </div>

                <div className="space-y-3">
                  {leaderboard.map((user, index) => (
                    <motion.div
                      key={user.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        user.name === "Alex Rivera"
                          ? "bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200"
                          : "bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          user.rank === 1
                            ? "bg-gradient-to-br from-yellow-400 to-amber-500 text-white"
                            : user.rank === 2
                            ? "bg-gradient-to-br from-gray-300 to-gray-400 text-white"
                            : user.rank === 3
                            ? "bg-gradient-to-br from-amber-600 to-amber-700 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        #{user.rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm truncate">
                          {user.name}
                          {user.name === "Alex Rivera" && (
                            <span className="ml-2 text-xs text-purple-600">(You)</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-600">{user.score} credits</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Milestones */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Milestones</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {milestones.map((milestone, index) => {
                    const Icon = milestone.icon;
                    return (
                      <motion.div
                        key={milestone.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        className={`bg-white rounded-xl p-6 border-2 shadow-sm transition-all hover:shadow-md ${
                          milestone.unlocked
                            ? "border-purple-200 bg-gradient-to-br from-purple-50/50 to-blue-50/50"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${milestone.gradient} flex items-center justify-center ${
                              milestone.unlocked ? "opacity-100" : "opacity-40"
                            }`}
                          >
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          {milestone.unlocked && (
                            <div className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                              Unlocked ✓
                            </div>
                          )}
                        </div>

                        <h3 className="font-bold text-gray-900 mb-1">{milestone.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{milestone.description}</p>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-semibold text-gray-900">
                              {milestone.progress}%
                            </span>
                          </div>
                          <Progress value={milestone.progress} className="h-2" />
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Reward:</span>
                            <span className="text-xs font-semibold text-purple-600">
                              {milestone.reward}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Stats Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white"
              >
                <h3 className="text-2xl font-bold mb-6">Your Stats Overview</h3>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">{currentUser.badges.length}</div>
                    <div className="text-sm text-purple-100">Badges Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">{currentUser.tasksCompleted}</div>
                    <div className="text-sm text-purple-100">Tasks Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">
                      {milestones.filter((m) => m.unlocked).length}/{milestones.length}
                    </div>
                    <div className="text-sm text-purple-100">Milestones Unlocked</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <VoiceAssistantButton />
    </div>
  );
}