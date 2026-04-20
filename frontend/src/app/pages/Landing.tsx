import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Sparkles, TrendingUp, Shield, Users, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import logoImage from "../../imports/WhatsApp_Image_2026-04-13_at_4.05.10_PM.jpeg";
import api from "../api";
import { toast } from "sonner";

export function Landing() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState<"student" | "client">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async () => {
    setIsLoading(true);
    try {
      if (isSignUp) {
        const payload = {
          email,
          password,
          role,
          name: role === "client" ? `${company} - ${name}` : name,
        };
        const res = await api.post("/auth/register", payload);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        toast.success("Account created successfully!");
        navigate(`/${role}`);
      } else {
        const payload = { email, password };
        const res = await api.post("/auth/login", payload);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        toast.success("Welcome back!");
        navigate(`/${res.data.role}`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-white flex items-center justify-center">
              <img src={logoImage} alt="SkillNest" className="w-full h-full object-cover" />
            </div>
            <h1 className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SkillNest
            </h1>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsSignUp(!isSignUp)}
            className="border-purple-200"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </Button>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Student-First Freelancing Platform
            </div>

            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Learn, Practice, and{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Earn
              </span>
            </h2>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join SkillNest to start your freelancing journey with micro-tasks designed for
              beginners. No experience needed — we'll guide you every step of the way.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {[
                { icon: TrendingUp, label: "Credit Score System", desc: "Level up as you work" },
                { icon: Shield, label: "Secure Escrow", desc: "Safe payments" },
                { icon: Users, label: "Team Collaboration", desc: "Work together" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex flex-col items-start gap-2"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{feature.label}</div>
                    <div className="text-sm text-gray-600">{feature.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200"
          >
            <Tabs value={role} onValueChange={(v) => setRole(v as "student" | "client")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="student">I'm a Student</TabsTrigger>
                <TabsTrigger value="client">I'm a Client</TabsTrigger>
              </TabsList>

              <TabsContent value="student" className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {isSignUp ? "Start Your Journey" : "Welcome Back"}
                  </h3>
                  <p className="text-gray-600">
                    {isSignUp
                      ? "Create your account and start earning"
                      : "Continue your freelancing journey"}
                  </p>
                </div>

                <div className="space-y-4">
                  {isSignUp && (
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Alex Rivera" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="alex@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>

                  <Button
                    onClick={handleAuth}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12"
                  >
                    {isLoading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>

                {isSignUp && (
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mt-4">
                    <p className="text-sm text-gray-700">
                      🎯 <strong>Your Journey:</strong> Sign up → Browse Tasks → Apply → Get AI
                      Help → Complete → Earn Credits → Level Up!
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="client" className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {isSignUp ? "Post Your First Task" : "Welcome Back"}
                  </h3>
                  <p className="text-gray-600">
                    {isSignUp ? "Find talented students for your projects" : "Manage your tasks"}
                  </p>
                </div>

                <div className="space-y-4">
                  {isSignUp && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input id="company" placeholder="Your Company" value={company} onChange={(e) => setCompany(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="client-name">Full Name</Label>
                        <Input id="client-name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                    </>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="client-email">Email</Label>
                    <Input id="client-email" type="email" placeholder="john@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-password">Password</Label>
                    <Input id="client-password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>

                  <Button
                    onClick={handleAuth}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12"
                  >
                    {isLoading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}