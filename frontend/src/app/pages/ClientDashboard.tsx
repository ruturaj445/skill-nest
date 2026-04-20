import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Plus, Users, Clock, CheckCircle2, IndianRupee, Eye } from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { VoiceAssistantButton } from "../components/VoiceAssistantButton";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { clientTasks, applicants } from "../data/mockData";
import { toast } from "sonner";
import api from "../api";

export function ClientDashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [clientTasksData, setClientTasksData] = useState<any[]>([]);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [category, setCategory] = useState("Design");

  const fetchTasks = async () => {
    try {
      const { data } = await api.get("/tasks/client");
      setClientTasksData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const stats = [
    { icon: Clock, label: "Active Tasks", value: 2, color: "from-blue-500 to-cyan-500" },
    { icon: Users, label: "Total Applicants", value: 20, color: "from-purple-500 to-pink-500" },
    { icon: CheckCircle2, label: "Completed", value: 8, color: "from-green-500 to-emerald-500" },
    { icon: IndianRupee, label: "In Escrow", value: "₹150", color: "from-amber-500 to-orange-500" },
  ];

  const handlePostTask = async () => {
    try {
      await api.post("/tasks", { title, description, budget: Number(budget), difficulty, category });
      toast.success("Task posted successfully! 🎉");
      setIsDialogOpen(false);
      // reset forms
      setTitle(""); setDescription(""); setBudget("");
      fetchTasks();
    } catch (err) {
      toast.error("Failed to post task");
    }
  };

  const handleHire = async (taskId: string, studentId: string) => {
    try {
      await api.put(`/tasks/${taskId}/hire/${studentId}`);
      toast.success("Student hired successfully! 🎉");
      fetchTasks();
    } catch (err) {
      toast.error("Failed to hire student");
    }
  };

  const handleReleasePayment = async (taskId: string) => {
    try {
      await api.put(`/tasks/${taskId}/complete`);
      toast.success("Payment released! 💸");
      fetchTasks();
    } catch (err) {
      toast.error("Failed to release payment");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="client" />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Dashboard 💼</h1>
              <p className="text-gray-600">Manage your tasks and find talented students</p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Task
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Post a New Task</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Task Title</Label>
                    <Input id="title" placeholder="e.g., Design a logo for my coffee shop" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide detailed requirements..."
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget (₹)</Label>
                      <Input id="budget" type="number" placeholder="50" value={budget} onChange={(e) => setBudget(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty Level</Label>
                      <Select value={difficulty} onValueChange={setDifficulty}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="writing">Writing</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="video">Video Editing</SelectItem>
                        <SelectItem value="data">Data Entry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      💡 <strong>Tip:</strong> Clear, detailed descriptions attract better
                      applicants. Include examples or references if possible.
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
                      onClick={handlePostTask}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      Post Task
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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

          {/* Posted Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Posted Tasks</h2>

            <div className="space-y-4">
              {clientTasksData.length === 0 ? <p className="text-gray-500">No tasks posted yet.</p> : null}
              {clientTasksData.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{task.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            task.difficulty === "Beginner"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-blue-100 text-blue-700 border-blue-200"
                          }
                        >
                          {task.difficulty}
                        </Badge>
                        <Badge variant="outline" className="border-gray-200">
                          {task.category}
                        </Badge>
                        <Badge className="bg-gradient-to-r from-purple-600 to-blue-600">
                          ₹{task.budget}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span className="font-semibold">{task.applicants?.length || 0} applicants</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Posted 2 days ago</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSelectedTask(selectedTask === task.id ? null : task.id)
                      }
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Applicants
                    </Button>
                  </div>

                  {/* Applicants List */}
                  {selectedTask === task.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-gray-100 space-y-3"
                    >
                      <h4 className="font-semibold text-gray-900 mb-3">Applicants</h4>
                      {task.applicants?.map((applicantObj: any) => {
                        const applicant = applicantObj.user;
                        if(!applicant) return null;
                        return (
                        <div
                          key={applicant._id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-semibold">
                              {applicant.name[0]}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{applicant.name}</div>
                              <div className="text-sm text-gray-600">
                                Credit Score: {applicant.creditScore} • Rating: {applicant.rating}⭐
                              </div>
                              <div className="text-xs text-gray-500">
                                Applied {applicant.appliedAt}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              View Profile
                            </Button>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                              onClick={() => handleHire(task._id, applicant._id)}
                              disabled={task.hiredApplicant || applicantObj.status === 'hired'}
                            >
                              {task.hiredApplicant === applicant._id ? "Hired" : "Hire"}
                            </Button>
                          </div>
                        </div>
                        )
                      })}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Escrow Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Secure Escrow System</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Your payments are held securely in escrow until the task is completed to your
                  satisfaction. This protects both you and the freelancer.
                </p>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    💰 Payment Secured
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                        if(clientTasksData.length > 0 && clientTasksData[0]._id) {
                            handleReleasePayment(clientTasksData[0]._id);
                        } else {
                            toast.error("No active task selected");
                        }
                    }}
                  >
                    Release Payment
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <VoiceAssistantButton />
    </div>
  );
}