import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Send, CheckCircle2, Lightbulb, List } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface AIAssistantProps {
  taskTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AIAssistant({ taskTitle, isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `I'll help you break down "${taskTitle}" into simple steps!`,
    },
  ]);
  const [input, setInput] = useState("");

  const suggestions = [
    {
      icon: List,
      title: "Break into steps",
      content: [
        "Step 1: Research similar designs for inspiration",
        "Step 2: Sketch 3-5 rough concepts on paper",
        "Step 3: Choose the best concept and create it digitally",
        "Step 4: Refine colors, fonts, and spacing",
        "Step 5: Export in required formats (PNG, SVG)",
      ],
    },
    {
      icon: Lightbulb,
      title: "Quick Tips",
      content: [
        "Keep it simple - minimalist designs work best",
        "Use no more than 2-3 colors",
        "Ensure it looks good in black & white too",
        "Test it at different sizes",
      ],
    },
    {
      icon: CheckCircle2,
      title: "Success Checklist",
      content: [
        "✓ Design matches the brief requirements",
        "✓ Files are in correct format",
        "✓ Logo works on light and dark backgrounds",
        "✓ Followed revision guidelines",
      ],
    },
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { role: "user", content: input },
      {
        role: "assistant",
        content: "That's a great question! Based on the task requirements, I suggest focusing on creating clean, simple shapes that represent coffee. You could start with a coffee cup silhouette or coffee bean icon.",
      },
    ]);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">AI Task Assistant</h2>
                  <p className="text-sm text-gray-600">Get step-by-step guidance</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg hover:bg-white/50 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {suggestions.map((suggestion, index) => {
                const Icon = suggestion.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-200"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-5 h-5 text-purple-600" />
                      <h3 className="font-semibold text-gray-900">{suggestion.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {suggestion.content.map((item, i) => (
                        <li key={i} className="text-sm text-gray-700 leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}

              <div className="space-y-4">
                {messages.slice(1).map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: message.role === "user" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl p-4 ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything about this task..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
