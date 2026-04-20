import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  IndianRupee,
  Clock,
  Users,
  Sparkles,
  CheckCircle2,
  Shield,
  FileText,
  Calendar,
} from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { AIAssistant } from "../components/AIAssistant";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { toast } from "sonner";
import api from "../api";

export function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await api.get(`/tasks/${id}`);
        setTask({
          ...data,
          id: data._id,
          postedBy: data.postedBy?.name || "Client",
          applicants: data.applicants?.length || 0
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTask();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar role="student" />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar role="student" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Task not found</h2>
            <Button onClick={() => navigate("/marketplace")}>Back to Marketplace</Button>
          </div>
        </div>
      </div>
    );
  }

  const handleApply = async () => {
    try {
      await api.post(`/tasks/${id}/apply`);
      setHasApplied(true);
      toast.success("Application submitted! Good luck! 🎉");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to apply");
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700 border-green-200";
      case "Intermediate":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Advanced":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const competitionLevel = (task.applicants / 20) * 100;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="student" />

      <div className="flex-1 overflow-auto">
        <div className="p-8 max-w-4xl">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/marketplace")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </motion.button>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 border-b border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">{task.title}</h1>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className={getDifficultyColor(task.difficulty)}>
                      {task.difficulty}
                    </Badge>
                    <Badge variant="outline" className="border-gray-200">
                      {task.category}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-purple-600 to-blue-600">
                      <IndianRupee className="w-3 h-3 mr-1" />
                      {task.budget}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{task.applicants} applicants</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>2-3 days delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Posted 2 days ago</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Task Description</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">{task.description}</p>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">Requirements</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Deliver within the specified timeframe</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Provide high-quality work that matches the description</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Be responsive to feedback and revisions</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Follow the client's guidelines and preferences</span>
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">Competition Level</h3>
                <div className="space-y-2">
                  <Progress value={competitionLevel} className="h-2" />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{task.applicants} applicants so far</span>
                    <span>
                      {competitionLevel < 30
                        ? "Low competition"
                        : competitionLevel < 70
                        ? "Medium competition"
                        : "High competition"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Secure Escrow Payment</h3>
                    <p className="text-sm text-gray-700 mb-3">
                      Payment of <strong>₹{task.budget}</strong> is secured in escrow. Funds will
                      be released once the client approves your work.
                    </p>
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      💰 Payment Secured
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Posted By */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Posted By</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-semibold">
                    {task.postedBy[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{task.postedBy}</div>
                    <div className="text-sm text-gray-600">Client since 2024</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-4"
          >
            <Button
              onClick={() => setIsAIOpen(true)}
              variant="outline"
              className="flex-1 h-14 text-base border-purple-200 hover:border-purple-300 hover:bg-purple-50"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Get AI Help
            </Button>

            <Button
              onClick={handleApply}
              disabled={hasApplied}
              className="flex-1 h-14 text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {hasApplied ? (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Applied Successfully
                </>
              ) : (
                <>
                  Apply for This Task
                  <IndianRupee className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </motion.div>

          {/* Success Message */}
          {hasApplied && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200"
            >
              <h3 className="font-semibold text-gray-900 mb-2">🎉 Application Submitted!</h3>
              <p className="text-sm text-gray-700">
                The client will review your application and get back to you soon. Keep an eye on
                your dashboard for updates!
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <AIAssistant taskTitle={task.title} isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
    </div>
  );
}