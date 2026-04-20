import { motion } from "motion/react";
import { Trophy, Star, Zap, Target, Sparkles } from "lucide-react";

interface BadgeDisplayProps {
  badges: string[];
}

const badgeIcons: Record<string, any> = {
  Starter: Star,
  "Rising Talent": Zap,
  "Fast Learner": Target,
  Pro: Trophy,
  Expert: Sparkles,
};

const badgeColors: Record<string, string> = {
  Starter: "from-blue-400 to-blue-600",
  "Rising Talent": "from-purple-400 to-purple-600",
  "Fast Learner": "from-green-400 to-green-600",
  Pro: "from-amber-400 to-amber-600",
  Expert: "from-pink-400 to-pink-600",
};

export function BadgeDisplay({ badges }: BadgeDisplayProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-900 mb-4">Your Badges</h3>
      <div className="grid grid-cols-3 gap-3">
        {badges.map((badge, index) => {
          const Icon = badgeIcons[badge] || Star;
          const gradient = badgeColors[badge] || "from-gray-400 to-gray-600";

          return (
            <motion.div
              key={badge}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <span className="text-xs text-center text-gray-600 font-medium">{badge}</span>
            </motion.div>
          );
        })}
        {badges.length < 6 && (
          <div className="flex flex-col items-center gap-2 opacity-30">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-300">
              <Trophy className="w-6 h-6 text-gray-400" />
            </div>
            <span className="text-xs text-center text-gray-400">Locked</span>
          </div>
        )}
      </div>
    </div>
  );
}
