import { motion } from "motion/react";
import { IndianRupee, Users, Clock, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Task } from "../data/mockData";
import { useNavigate } from "react-router";

interface TaskCardProps {
  task: Task;
  onApply?: () => void;
}

export function TaskCard({ task, onApply }: TaskCardProps) {
  const navigate = useNavigate();

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl p-5 border border-gray-200 cursor-pointer"
      onClick={() => navigate(`/task/${task.id}`)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{task.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{task.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Badge variant="outline" className={getDifficultyColor(task.difficulty)}>
          {task.difficulty}
        </Badge>
        <Badge variant="outline" className="border-gray-200">
          {task.category}
        </Badge>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <IndianRupee className="w-4 h-4" />
            <span className="font-semibold text-gray-900">₹{task.budget}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{Array.isArray(task.applicants) ? task.applicants.length : (task.applicants || 0)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>2-3 days</span>
          </div>
        </div>

        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onApply?.();
          }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          Apply Now
        </Button>
      </div>

      <div className="flex items-center gap-1 text-xs text-gray-500 mt-3">
        <TrendingUp className="w-3 h-3" />
        <span>Posted by {task.postedBy}</span>
      </div>
    </motion.div>
  );
}