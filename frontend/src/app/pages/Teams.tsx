import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, Plus, TrendingUp, CheckCircle2, Award, UserPlus } from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { toast } from "sonner";
import api from "../api";

export function Teams() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [teamsData, setTeamsData] = useState<any[]>([]);
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const [teamsRes, lbRes] = await Promise.all([
        api.get("/teams"),
        api.get("/users/leaderboard")
      ]);
      setTeamsData(teamsRes.data);
      if(lbRes.data && lbRes.data.length > 0) {
        setLeaderboardData(lbRes.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateTeam = async () => {
    try {
      await api.post("/teams", { name: teamName, description });
      toast.success("Team created successfully! 🎉");
      setIsDialogOpen(false);
      setTeamName("");
      setDescription("");
      fetchData();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create team");
    }
  };

  const handleJoinTeam = async (teamId: string) => {
    try {
      await api.post(`/teams/${teamId}/join`);
      toast.success("Joined team! 🎊");
      fetchData();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to join team");
    }
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
            className="flex items-center justify-between mb-8"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-8 h-8 text-purple-600" />
                <h1 className="text-3xl font-bold text-gray-900">Team Collaboration</h1>
              </div>
              <p className="text-gray-600">Work together, earn more, and level up faster</p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Team
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a New Team</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="teamName">Team Name</Label>
                    <Input id="teamName" placeholder="e.g., Design Wizards" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Input id="description" placeholder="What does your team focus on?" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="text-sm text-purple-800">
                      💡 <strong>Team Benefits:</strong> Share tasks, combine skills, and earn 20%
                      bonus credits when working together!
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreateTeam}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      Create Team
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: Users,
                label: "Available Teams",
                value: teamsData.length,
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: TrendingUp,
                label: "Team Bonus",
                value: "+20%",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: CheckCircle2,
                label: "Team Tasks",
                value: "15",
                color: "from-green-500 to-emerald-500",
              },
            ].map((stat, index) => {
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

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Available Teams */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Teams</h2>

                <div className="space-y-4">
                  {teamsData.length === 0 && <p className="text-gray-500">No teams available yet.</p>}
                  {teamsData.map((team: any, index: number) => (
                    <motion.div
                      key={team.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold">
                              {team.name[0]}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{team.name}</h3>
                                <p className="text-sm text-gray-600">
                                  {team.members?.length || 0} members
                                </p>
                            </div>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleJoinTeam(team._id)}
                          className="border-purple-200 hover:border-purple-300 hover:bg-purple-50"
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Join
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {team.members?.map((member: any) => (
                          <Badge key={member._id} variant="outline" className="border-gray-200">
                            {member.name}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Active Tasks</div>
                          <div className="text-lg font-semibold text-gray-900">
                            {team.activeTasks}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Completed</div>
                          <div className="text-lg font-semibold text-gray-900">
                            {team.completedTasks}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                          <span>Team Progress</span>
                          <span>{team.completedTasks + team.activeTasks > 0 ? ((team.completedTasks / (team.completedTasks + team.activeTasks)) * 100).toFixed(0) : 0}%</span>
                        </div>
                        <Progress
                          value={team.completedTasks + team.activeTasks > 0 ? (team.completedTasks / (team.completedTasks + team.activeTasks)) * 100 : 0}
                          className="h-2"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Leaderboard */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Award className="w-6 h-6 text-amber-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Leaderboard</h2>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
                    {leaderboardData.length > 0 ? (
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold">
                        🏆
                      </div>
                      <div>
                        <div className="text-sm text-amber-100">Top Performer</div>
                        <div className="text-xl font-bold">{leaderboardData[0].name}</div>
                        <div className="text-sm text-amber-100">
                          {leaderboardData[0].creditScore} points
                        </div>
                      </div>
                    </div>
                    ) : (
                       <p className="text-sm text-amber-100">No data available</p>
                    )}
                  </div>

                  <div className="p-6 space-y-4">
                    {leaderboardData.slice(1).map((user: any, index: number) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.05 }}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold">
                          {user.rank}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-600">{user.level}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-purple-600">
                            {user.creditScore}
                          </div>
                          <div className="text-xs text-gray-500">{user.xp || 0} XP</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Team Benefits Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200"
                >
                  <h3 className="font-semibold text-gray-900 mb-3">Team Benefits</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5" />
                      <span>Earn 20% bonus credits on team tasks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5" />
                      <span>Learn from experienced team members</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5" />
                      <span>Access to exclusive team-only tasks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5" />
                      <span>Build your portfolio faster together</span>
                    </li>
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
