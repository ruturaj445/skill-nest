import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, X, Volume2 } from "lucide-react";
import { Button } from "./ui/button";

export function VoiceAssistantButton() {
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const toggleVoiceAssistant = () => {
    setIsActive(!isActive);
    if (!isActive) {
      // Simulate starting voice assistant
      setIsListening(true);
      setTimeout(() => setIsListening(false), 2000);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleVoiceAssistant}
          className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all ${
            isActive
              ? "bg-gradient-to-r from-red-600 to-pink-600"
              : "bg-gradient-to-r from-purple-600 to-blue-600"
          }`}
          aria-label="Voice Assistant for Accessibility"
          title="Voice Assistant for Accessibility"
        >
          {isActive ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <Mic className="w-7 h-7 text-white" />
          )}
        </motion.button>

        {/* Pulsing indicator when listening */}
        {isListening && (
          <motion.div
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-purple-400"
            style={{ pointerEvents: "none" }}
          />
        )}
      </motion.div>

      {/* Voice Assistant Panel */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-28 right-8 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">AI Voice Assistant</h3>
                  <p className="text-xs text-purple-100">Here to help you navigate</p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isListening ? "bg-green-500 animate-pulse" : "bg-gray-300"
                  }`}
                />
                <span className="text-sm text-gray-600">
                  {isListening ? "Listening..." : "Say 'Hey SkillNest' to start"}
                </span>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 border border-purple-200">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Voice Commands:</strong>
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• "Show me available tasks"</li>
                  <li>• "Read my credit score"</li>
                  <li>• "What's my progress?"</li>
                  <li>• "Navigate to settings"</li>
                </ul>
              </div>

              <Button
                onClick={() => setIsListening(!isListening)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                size="sm"
              >
                <Mic className="w-4 h-4 mr-2" />
                {isListening ? "Stop Listening" : "Start Listening"}
              </Button>

              <p className="text-xs text-center text-gray-500">
                Optimized for screen readers and voice control
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
