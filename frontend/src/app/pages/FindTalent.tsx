import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search, Star, MapPin, Briefcase, Award, Filter, MessageCircle } from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { VoiceAssistantButton } from "../components/VoiceAssistantButton";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import api from "../api";

export function FindTalent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [talents, setTalents] = useState<any[]>([]);

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const { data } = await api.get("/users/leaderboard");
        // Map backend user to talent object with defaults for missing fields
        const mapped = data.map((user: any, index: number) => ({
          id: user._id,
          name: user.name,
          avatar: user.name[0],
          title: user.title || "Freelance " + user.level,
          location: "Global",
          rating: 4.5 + Math.random() * 0.5, // simulate rating
          reviews: user.tasksCompleted || 0,
          creditScore: user.creditScore || 0,
          level: user.level || "Beginner",
          completedTasks: user.tasksCompleted || 0,
          skills: user.skills || ["General"],
          hourlyRate: "Negotiable",
          bio: user.bio || `Passionate ${user.level} freelancer ready to work on amazing projects.`,
          availability: "Available"
        }));
        setTalents(mapped);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTalents();
  }, []);

  const skills = [
    "All",
    "Content Writing",
    "Graphic Design",
    "Web Development",
    "Social Media",
    "Data Entry",
    "Video Editing",
  ];



  const filteredTalents = talents.filter((talent) => {
    const matchesSearch =
      searchQuery === "" ||
      talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSkill =
      !selectedSkill || selectedSkill === "All" || talent.skills.includes(selectedSkill);

    return matchesSearch && matchesSkill;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "from-purple-500 to-pink-500";
      case "Advanced":
        return "from-blue-500 to-cyan-500";
      case "Intermediate":
        return "from-green-500 to-emerald-500";
      default:
        return "from-gray-500 to-gray-600";
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
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Talent</h1>
            <p className="text-gray-600">
              Discover skilled students ready to work on your projects
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by name, skills, or expertise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                More Filters
              </Button>
            </div>

            {/* Skill Filters */}
            <div className="flex gap-2 mt-4 flex-wrap">
              {skills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => setSelectedSkill(skill === "All" ? null : skill)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    (skill === "All" && !selectedSkill) || selectedSkill === skill
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Found <span className="font-semibold text-gray-900">{filteredTalents.length}</span>{" "}
              talented {filteredTalents.length === 1 ? "freelancer" : "freelancers"}
            </p>
          </div>

          {/* Talent Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredTalents.map((talent, index) => (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {talent.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 text-lg">{talent.name}</h3>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          talent.availability === "Available"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {talent.availability}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{talent.title}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{talent.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-600 mb-4">{talent.bio}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-100">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-gray-900">{talent.rating.toFixed(1)}</span>
                    </div>
                    <div className="text-xs text-gray-500">{talent.reviews} reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 mb-1">{talent.creditScore}</div>
                    <div className="text-xs text-gray-500">Credit Score</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 mb-1">{talent.completedTasks}</div>
                    <div className="text-xs text-gray-500">Tasks Done</div>
                  </div>
                </div>

                {/* Level Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${getLevelColor(
                      talent.level
                    )}`}
                  >
                    <Award className="w-4 h-4 text-white" />
                    <span className="text-sm font-semibold text-white">{talent.level}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Rate: </span>
                    <span className="font-semibold text-gray-900">{talent.hourlyRate}/hr</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {talent.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Profile
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredTalents.length === 0 && (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">No talents found</p>
              <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      <VoiceAssistantButton />
    </div>
  );
}