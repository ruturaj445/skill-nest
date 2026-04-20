import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search, Filter, TrendingUp, Sparkles } from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { TaskCard } from "../components/TaskCard";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import api from "../api";

export function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await api.get("/tasks");
      const mappedTasks = data.map((t: any) => ({
        ...t,
        id: t._id,
        postedBy: t.postedBy?.name || "Client"
      }));
      setTasks(mappedTasks);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || task.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === "all" || task.difficulty === difficultyFilter;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleApply = async (taskId: string) => {
    try {
      await api.post(`/tasks/${taskId}/apply`);
      toast.success("Application submitted successfully! 🎉");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error applying for task");
    }
  };

  const categories = Array.from(new Set(tasks.map((t) => t.category)));

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
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <h1 className="text-3xl font-bold text-gray-900">Task Marketplace</h1>
            </div>
            <p className="text-gray-600">
              Discover beginner-friendly tasks and start earning today
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 mb-8 text-white"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold mb-1">{tasks.length}</div>
                <div className="text-purple-100">Available Tasks</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">
                  ${tasks.reduce((sum, t) => sum + t.budget, 0)}
                </div>
                <div className="text-purple-100">Total Value</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">
                  {tasks.filter((t) => t.difficulty === "Beginner").length}
                </div>
                <div className="text-purple-100">Beginner Tasks</div>
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Filters</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(searchQuery || categoryFilter !== "all" || difficultyFilter !== "all") && (
              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm text-gray-600">Active filters:</span>
                {searchQuery && (
                  <Badge variant="outline" className="border-purple-200">
                    Search: {searchQuery}
                  </Badge>
                )}
                {categoryFilter !== "all" && (
                  <Badge variant="outline" className="border-purple-200">
                    {categoryFilter}
                  </Badge>
                )}
                {difficultyFilter !== "all" && (
                  <Badge variant="outline" className="border-purple-200">
                    {difficultyFilter}
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                    setDifficultyFilter("all");
                  }}
                >
                  Clear all
                </Button>
              </div>
            )}
          </motion.div>

          {/* Featured Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Featured Tasks</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {tasks
                .filter((t) => t.difficulty === "Beginner")
                .slice(0, 2)
                .map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -top-2 -right-2 z-10">
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
                        ⭐ Featured
                      </Badge>
                    </div>
                    <TaskCard task={task} onApply={() => handleApply(task.id)} />
                  </motion.div>
                ))}
            </div>
          </motion.div>

          {/* All Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                All Tasks ({filteredTasks.length})
              </h2>
              <Select defaultValue="recent">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="budget-high">Budget: High to Low</SelectItem>
                  <SelectItem value="budget-low">Budget: Low to High</SelectItem>
                  <SelectItem value="applicants">Least Applicants</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredTasks.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                  >
                    <TaskCard task={task} onApply={() => handleApply(task.id)} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">No tasks found</p>
                <p className="text-sm text-gray-500">Try adjusting your filters</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
