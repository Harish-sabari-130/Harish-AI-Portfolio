import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MinusCircle } from 'lucide-react';

interface Message {
  role: 'ai' | 'user';
  content: string;
}

export default function AIAvatar() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: "SYSTEM ONLINE. I am H.AI. How can I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    // Proximity effect for cursor
    const handleMouseMove = (e: MouseEvent) => {
      const orb = document.getElementById('ai-orb');
      if (!orb) return;
      const rect = orb.getBoundingClientRect();
      const orbX = rect.left + rect.width / 2;
      const orbY = rect.top + rect.height / 2;
      const dist = Math.sqrt(Math.pow(e.clientX - orbX, 2) + Math.pow(e.clientY - orbY, 2));
      
      if (dist < 150) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');

    // Process logic
    setTimeout(() => {
      const text = userMsg.toLowerCase();
      let reply = "Great question! I'm H.AI, Harish's personal AI assistant. I can tell you about his skills, projects, experience, certifications, or how to contact him. What would you like to know?";

      if (/(hi|hello|hey)/.test(text)) {
        reply = "Hello! I'm H.AI, Harish's AI assistant. How can I help you today? You can ask me about his skills, projects, or experience.";
      } else if (/(skills|technology|stack|languages)/.test(text)) {
        reply = "Harish is proficient in Python, JavaScript, TypeScript, React, Node.js, FastAPI, TensorFlow, PyTorch, LangChain, and more. He specializes in AI/ML and full-stack development.";
      } else if (/(projects|work|portfolio)/.test(text)) {
        reply = "Harish has built 15+ projects including NeuralChat AI, CodeVision, DeepSight Vision, and DataNexus Dashboard. Want details on any specific project?";
      } else if (/(experience|internship)/.test(text)) {
        reply = "Harish has 2+ years of experience including internships at TechCorp Solutions (React/Node.js dev) and AI Innovations Lab (NLP/CV models with PyTorch and FastAPI).";
      } else if (/(contact|email|reach|connect)/.test(text)) {
        reply = "You can reach Harish at harish@example.com, connect on LinkedIn at linkedin.com/in/harish-dev, or check his GitHub at github.com/harish-dev.";
      } else if (/(hire|available|job|opportunity)/.test(text)) {
        reply = "Harish is actively open to exciting opportunities in AI/ML engineering and full-stack development. Feel free to reach out via the Contact section!";
      } else if (/(resume|cv|download)/.test(text)) {
        reply = "You can download Harish's resume using the 'Download Resume' button in the hero section at the top of the page.";
      } else if (/(about|who|harish)/.test(text)) {
        reply = "Harish is a passionate full-stack developer and AI engineer pursuing B.Tech in CSE with AI/ML specialization. He loves building intelligent, futuristic applications.";
      } else if (/(certifications|certificates)/.test(text)) {
        reply = "Harish holds certifications including AWS Cloud Practitioner, TensorFlow Developer (Google), React.js Advanced (Meta), and more.";
      }

      setMessages(prev => [...prev, { role: 'ai', content: reply }]);
    }, 600);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-6 bottom-32 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[65vh] z-50 flex flex-col bg-background/95 backdrop-blur-xl border border-primary/30 rounded-2xl shadow-[0_10px_40px_rgba(0,212,255,0.2)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-primary/20 bg-card/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_5px_#00d4ff]" />
                <h3 className="font-mono font-bold text-foreground">H.AI Assistant</h3>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors" data-interactive="true">
                  <MinusCircle size={18} />
                </button>
                <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-destructive transition-colors" data-testid="btn-close-chat" data-interactive="true">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] p-3 rounded-lg ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-br from-accent to-purple-600 text-white rounded-tr-none' 
                        : 'bg-card border-l-2 border-primary text-foreground rounded-tl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-primary/20 bg-card/50">
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none px-3 py-2 rounded-md font-sans text-sm text-foreground transition-all"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim()}
                  className="bg-primary hover:bg-primary/80 text-background p-2 rounded-md disabled:opacity-50 transition-colors flex items-center justify-center"
                  data-interactive="true"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Holographic Orb */}
      <div 
        id="ai-orb"
        className="fixed right-6 bottom-6 z-50 cursor-pointer flex flex-col items-center"
        onClick={() => setIsOpen(!isOpen)}
        data-interactive="true"
      >
        <motion.div 
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="relative w-16 h-16 flex items-center justify-center group"
        >
          {/* Core glow */}
          <div className={`absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,#00d4ff,#0066ff,#7c3aed,transparent_70%)] opacity-80 blur-sm transition-all duration-300 ${isHovered ? 'scale-125 opacity-100' : ''}`} />
          
          {/* Rotating dashed ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-primary/50 border-dashed"
          />

          {/* Inner solid sphere */}
          <div className="w-8 h-8 rounded-full bg-white shadow-[0_0_20px_#00d4ff,inset_0_0_10px_#0066ff]" />
          
          {/* Orbiting particles */}
          <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
            <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_5px_#4d94ff]" />
          </div>
          <div className="absolute inset-0 animate-[spin_6s_linear_infinite_reverse]">
            <div className="absolute -bottom-1 left-1/4 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_5px_#bd93f9]" />
          </div>
        </motion.div>
        <span className="text-[10px] font-mono font-bold text-primary mt-2 drop-shadow-[0_0_2px_#00d4ff]">H.AI</span>
      </div>
    </>
  );
}
