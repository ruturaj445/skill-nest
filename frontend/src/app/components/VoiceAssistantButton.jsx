import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { toast } from 'sonner';

export function VoiceAssistantButton({ 
  position = 'bottom-right',
  onActivate,
  className = '' 
}) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showPermissionHelp, setShowPermissionHelp] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const recognitionRef = useRef(null);
  const synthesisRef = useRef(null);

  useEffect(() => {
    // Initialize Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        // Show interim results
        if (interimTranscript) {
          setTranscript(interimTranscript);
        }

        // Process final results
        if (finalTranscript) {
          const processedTranscript = finalTranscript.toLowerCase().trim();
          setTranscript(processedTranscript);
          console.log('Final transcript:', processedTranscript);
          
          // Stop listening after getting final result
          recognitionRef.current?.stop();
          setIsListening(false);
          
          // Process the command
          handleCommand(processedTranscript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.log('Speech recognition status:', event.error);
        setIsListening(false);
        setTranscript('');
        
        if (event.error === 'no-speech') {
          toast.info("I didn't hear anything", {
            description: 'Please try speaking again'
          });
        } else if (event.error === 'aborted') {
          // Silent - user manually stopped
        } else if (event.error === 'not-allowed') {
          setShowPermissionHelp(true);
          toast.warning('Microphone Access Required', {
            description: 'Click the help guide to enable microphone access',
            duration: 6000
          });
        } else if (event.error === 'audio-capture') {
          toast.error('No microphone found', {
            description: 'Please connect a microphone to use voice commands'
          });
        } else {
          toast.error('Could not process voice', {
            description: 'Please try again'
          });
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (transcript && !isSpeaking) {
          setTranscript('');
        }
      };

      recognitionRef.current.onstart = () => {
        console.log('Speech recognition started');
        setTranscript('');
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCommand = (command) => {
    console.log('Processing command:', command);
    
    // Remove wake words
    let cleanCommand = command
      .replace(/hey skillnest/gi, '')
      .replace(/hey skill nest/gi, '')
      .replace(/skillnest/gi, '')
      .replace(/skill nest/gi, '')
      .trim();
    
    // If only wake word was said, provide help
    if (!cleanCommand || cleanCommand.length < 3) {
      speak('How can I help you? Try saying: go to marketplace, open dashboard, or find talent.');
      return;
    }
    
    console.log('Clean command:', cleanCommand);
    
    // Navigation commands
    if (cleanCommand.includes('dashboard') || cleanCommand.includes('home')) {
      if (cleanCommand.includes('student')) {
        navigate('/student');
        speak('Opening student dashboard');
      } else if (cleanCommand.includes('client')) {
        navigate('/client');
        speak('Opening client dashboard');
      } else {
        // Detect current user type from location
        if (location.pathname.includes('student')) {
          navigate('/student');
          speak('Opening student dashboard');
        } else if (location.pathname.includes('client')) {
          navigate('/client');
          speak('Opening client dashboard');
        } else {
          navigate('/');
          speak('Opening home page');
        }
      }
    }
    else if (cleanCommand.includes('marketplace') || cleanCommand.includes('market') || cleanCommand.includes('find task') || cleanCommand.includes('browse task')) {
      navigate('/marketplace');
      speak('Opening marketplace');
    }
    else if (cleanCommand.includes('find talent') || cleanCommand.includes('hire') || cleanCommand.includes('find student')) {
      navigate('/find-talent');
      speak('Opening find talent page');
    }
    else if (cleanCommand.includes('team') || cleanCommand.includes('collaboration')) {
      navigate('/teams');
      speak('Opening teams page');
    }
    else if (cleanCommand.includes('achievement') || cleanCommand.includes('badge') || cleanCommand.includes('reward')) {
      navigate('/achievements');
      speak('Opening achievements page');
    }
    else if (cleanCommand.includes('setting') || cleanCommand.includes('profile')) {
      if (location.pathname.includes('client')) {
        navigate('/client/settings');
      } else {
        navigate('/student/settings');
      }
      speak('Opening settings');
    }
    
    // Action commands
    else if (cleanCommand.includes('apply for task') || cleanCommand.includes('apply to task')) {
      toast.info('Please select a task from the marketplace to apply');
      speak('Please go to the marketplace and select a task to apply for');
    }
    else if (cleanCommand.includes('post task') || cleanCommand.includes('create task')) {
      if (location.pathname.includes('client')) {
        toast.info('Click the Post New Task button on your dashboard');
        speak('To post a task, click the Post New Task button on your dashboard');
      } else {
        navigate('/client');
        speak('Switching to client dashboard to post a task');
      }
    }
    else if (cleanCommand.includes('my task') || cleanCommand.includes('view my task')) {
      if (location.pathname.includes('student')) {
        speak('Your active tasks are shown on your student dashboard');
        navigate('/student');
      } else {
        speak('Your posted tasks are shown on your client dashboard');
        navigate('/client');
      }
    }
    
    // Help commands
    else if (cleanCommand.includes('help') || cleanCommand.includes('what can you do')) {
      speak('I can help you navigate to dashboard, marketplace, teams, achievements, settings, or find talent. I can also help you apply for tasks or post new tasks. Just tell me what you need!');
    }
    
    // Default fallback
    else {
      speak(`I heard: ${cleanCommand}. Try saying things like: go to marketplace, open dashboard, find talent, or show my achievements.`);
    }
  };

  const handleToggle = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      toast.error('Speech recognition is not supported in your browser');
      return;
    }

    if (isListening) {
      // Stop listening
      recognitionRef.current?.stop();
      setIsListening(false);
      setTranscript('');
    } else {
      // Start listening directly
      try {
        setTranscript('');
        setShowPermissionHelp(false);
        recognitionRef.current?.start();
        setIsListening(true);
        toast.success('🎤 Listening...', {
          description: 'Say a command like "open marketplace" or "show dashboard"'
        });
        
        if (onActivate) {
          onActivate(true);
        }
      } catch (error) {
        console.error('Error starting recognition:', error);
        if (error.name === 'NotAllowedError') {
          setShowPermissionHelp(true);
          toast.error('Microphone Access Required', {
            description: 'Please allow microphone access and try again'
          });
        } else {
          toast.error('Could not start voice recognition', {
            description: error.message
          });
        }
      }
    }
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-[9999] ${className}`} style={{ zIndex: 9999 }}>
      <motion.div
        className="relative"
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
      >
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isListening && !isSpeaking && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full mb-3 right-0 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg"
            >
              AI Voice Assistant
              <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulsing rings when active */}
        {(isListening || isSpeaking) && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.75
              }}
            />
          </>
        )}

        {/* Main Button */}
        <motion.button
          onClick={handleToggle}
          className={`relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
            isListening 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-xl shadow-blue-500/50' 
              : isSpeaking
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-xl shadow-purple-500/50'
              : 'bg-white hover:shadow-xl border border-gray-200'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Voice Assistant"
        >
          <AnimatePresence mode="wait">
            {isListening ? (
              <motion.div
                key="listening"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Mic className="w-6 h-6 text-white" />
              </motion.div>
            ) : isSpeaking ? (
              <motion.div
                key="speaking"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0,
                }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Volume2 className="w-6 h-6 text-white" />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Mic className="w-6 h-6 text-blue-600" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Status indicator */}
        {(isListening || isSpeaking) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md border border-gray-200 text-xs font-medium whitespace-nowrap"
          >
            <span className="flex items-center gap-2">
              {isListening && (
                <>
                  <motion.span
                    className="w-2 h-2 bg-blue-500 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-gray-700">Listening...</span>
                </>
              )}
              {isSpeaking && (
                <>
                  <motion.span
                    className="w-2 h-2 bg-purple-500 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                  <span className="text-gray-700">Speaking...</span>
                </>
              )}
            </span>
          </motion.div>
        )}

        {/* Transcript display */}
        <AnimatePresence>
          {transcript && isListening && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute -bottom-16 right-0 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-lg shadow-lg border border-blue-200 max-w-xs"
            >
              <p className="text-sm text-gray-700 italic">"{transcript}"</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Permission Help Guide */}
        <AnimatePresence>
          {showPermissionHelp && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-full mb-3 right-0 bg-white p-4 rounded-lg shadow-xl border border-gray-200 w-80"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">Enable Microphone Access</h3>
                <button 
                  onClick={() => setShowPermissionHelp(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                To use voice commands, please allow microphone access:
              </p>
              <ol className="text-xs text-gray-600 space-y-2 mb-3">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">1.</span>
                  <span>Look for the microphone icon 🎤 in your browser's address bar</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">2.</span>
                  <span>Click on it and select "Allow"</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">3.</span>
                  <span>Refresh the page if needed</span>
                </li>
              </ol>
              <button
                onClick={() => {
                  setShowPermissionHelp(false);
                  handleToggle();
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default VoiceAssistantButton;