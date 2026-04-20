import { motion } from "motion/react";
import { TrendingUp, Award } from "lucide-react";
import { Progress } from "./ui/progress";

interface CreditScoreProps {
  score: number;
  level: "Beginner" | "Intermediate" | "Pro";
  compact?: boolean;
}

export function CreditScore({ score, level, compact = false }: CreditScoreProps) {
  const maxScore = level === "Beginner" ? 500 : level === "Intermediate" ? 1000 : 2000;
  const percentage = (score / maxScore) * 100;

  const getLevelColor = () => {
    switch (level) {
      case "Beginner":
        return "from-blue-500 to-cyan-500";
      case "Intermediate":
        return "from-purple-500 to-pink-500";
      case "Pro":
        return "from-amber-500 to-orange-500";
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getLevelColor()} flex items-center justify-center text-white font-semibold`}>
          {score}
        </div>
        <div>
          <div className="text-sm font-medium">{level}</div>
          <div className="text-xs text-gray-500">Credit Score</div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Credit Score</h3>
        </div>
        <TrendingUp className="w-4 h-4 text-green-500" />
      </div>

      <div className="relative mb-6">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${getLevelColor()} flex items-center justify-center relative`}
        >
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-gray-900">{score}</div>
              <div className="text-xs text-gray-500">points</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Current Level</span>
          <span className={`font-semibold bg-gradient-to-r ${getLevelColor()} bg-clip-text text-transparent`}>
            {level}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Progress to next level</span>
            <span>{Math.min(percentage, 100).toFixed(0)}%</span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>

        <div className="pt-3 border-t border-gray-100 text-xs text-gray-500">
          Score = (Tasks × 10) + (Rating × 5) - (Late × 3)
        </div>
      </div>
    </motion.div>
  );
}
