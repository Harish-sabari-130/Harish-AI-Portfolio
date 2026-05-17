import { useEffect, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import CSSParticles from './CSSParticles';

export default function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const [typeIndex, setTypeIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "Full Stack Developer",
    "AI/ML Engineer",
    "React Specialist",
    "Python Developer",
    "Open Source Contributor"
  ];

  useEffect(() => {
    const currentRole = roles[typeIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setTypedText(currentRole.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 50);
      } else {
        setIsDeleting(false);
        setTypeIndex((prev) => (prev + 1) % roles.length);
      }
    } else {
      if (charIndex < currentRole.length) {
        timer = setTimeout(() => {
          setTypedText(currentRole.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 100);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, typeIndex, roles]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    setMousePos({
      x: (clientX / window.innerWidth) - 0.5,
      y: (clientY / window.innerHeight) - 0.5,
    });
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20"
      onMouseMove={handleMouseMove}
    >
      {/* Background CSS Particles — works everywhere, no WebGL needed */}
      <div className="absolute inset-0 z-0">
        <CSSParticles />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="font-mono text-primary text-sm tracking-wider mb-4 flex items-center gap-2">
            <span>// AI & FULL STACK DEVELOPER</span>
            <motion.span 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-4 bg-primary inline-block"
            />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black font-mono leading-none mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-purple-500 drop-shadow-[0_0_20px_rgba(0,212,255,0.4)]">
            HARISH
          </h1>
          
          <div className="h-8 mb-6">
            <span className="text-xl md:text-2xl text-foreground font-medium">
              {typedText}
              <span className="text-primary animate-pulse">|</span>
            </span>
          </div>
          
          <p className="text-muted-foreground text-lg mb-10 max-w-lg">
            Building the future, one algorithm at a time. Specializing in highly scalable intelligence systems and immersive user interfaces.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              className="relative px-8 py-4 font-mono font-bold text-background bg-primary border border-primary overflow-hidden group transition-all"
              data-testid="btn-view-projects"
              data-interactive="true"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
              <span className="relative z-10">[ View Projects ]</span>
            </button>
            
            <button 
              className="relative px-8 py-4 font-mono font-bold text-primary border border-primary/50 overflow-hidden group transition-all hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(0,212,255,0.3)]"
              data-testid="btn-download-resume"
              data-interactive="true"
              style={{
                transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)`,
              }}
            >
              <span className="relative z-10">[ Download Resume ]</span>
            </button>
          </div>
        </motion.div>

        {/* Right Column (Holographic Frame) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative aspect-square w-full max-w-md mx-auto hidden md:flex items-center justify-center"
        >
          {/* Main Frame */}
          <div className="absolute inset-4 border border-primary/20 bg-card/40 backdrop-blur-sm rounded-lg overflow-hidden flex items-center justify-center shadow-[0_0_40px_rgba(0,212,255,0.1)]">
            
            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary" />

            {/* Scanline */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary/30 animate-scanline shadow-[0_0_10px_#00d4ff]" />

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

            {/* Crosshairs */}
            <div className="absolute inset-0 flex items-center justify-center opacity-50">
              <div className="w-[1px] h-full bg-primary/20" />
              <div className="h-[1px] w-full bg-primary/20 absolute" />
            </div>

            {/* Expanding Rings */}
            <motion.div 
              animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeOut" }}
              className="absolute w-32 h-32 rounded-full border border-primary/40"
            />
            <motion.div 
              animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 1, ease: "easeOut" }}
              className="absolute w-32 h-32 rounded-full border border-accent/40"
            />

            {/* Center Logo */}
            <div className="relative z-10 text-6xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-primary drop-shadow-[0_0_15px_#00d4ff] animate-pulse">
              H.AI
            </div>
          </div>

          {/* Floating Chips */}
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute top-8 -right-4 px-3 py-1 bg-background/80 border border-primary text-primary text-xs font-mono backdrop-blur-md"
          >
            STATUS: ONLINE
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 5, delay: 1 }}
            className="absolute bottom-16 -left-8 px-3 py-1 bg-background/80 border border-accent text-accent text-xs font-mono backdrop-blur-md"
          >
            SKILLS: 20+
          </motion.div>

          <motion.div 
            animate={{ y: [0, -8, 0] }} 
            transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
            className="absolute top-1/2 -right-8 px-3 py-1 bg-background/80 border border-purple-500 text-purple-400 text-xs font-mono backdrop-blur-md"
          >
            PROJECTS: 15+
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
