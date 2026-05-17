import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function Counter({ end, suffix }: { end: number, suffix: string }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    const duration = 2000;
    
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = (time - startTime) / duration;
      
      if (progress < 1) {
        setCount(Math.floor(end * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end]);

  return <span className="text-4xl md:text-5xl font-mono font-bold text-primary drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]">{count}{suffix}</span>;
}

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 w-full overflow-hidden bg-background">
      {/* Hex Grid Background */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSI0OSIgdmlld0JveD0iMCAwIDI4IDQ5Ij4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPGcgc3Ryb2tlPSIjMDBkNGZmIiBzdHJva2Utd2lkdGg9IjEiPgogICAgICA8cGF0aCBkPSJNMTMuOTkgMTFsLTcgNy40MkwwIDExbTctNy40MmwyLjAxLTIuMTNMMTQgMG0xNCAxMWwtNyA3LjQyTDE0IDExbTctNy40MmwyLjAxLTIuMTNMMjggMCIgLz4KICAgICAgPHBhdGggZD0iTTEzLjk5IDM1LjVMNyA0MkwwIDM1LjVtNy03LjQybDIuMDEtMi4xM0wxNCAyNC41bTE0IDExbC03IDcuNDJMMTQgMzUuNW03LTcuNDJsMi4wMS0yLjEzTDI4IDI0LjUiIC8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4=')] bg-repeat" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-mono font-bold text-foreground mb-16 glitch-text"
        >
          <span className="text-primary mr-2">&gt;</span>ABOUT.EXE
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-6 border border-primary/20 bg-card/40 backdrop-blur-sm shadow-[0_0_30px_rgba(0,212,255,0.05)] relative">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary" />
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I am Harish, a passionate full-stack developer and AI engineer pursuing a B.Tech in CSE with an AI/ML specialization. 
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I thrive on building intelligent systems and futuristic applications that push the boundaries of what's possible. From neural networks to scalable cloud architectures, I bridge the gap between complex algorithms and immersive user experiences.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-8">
            {[
              { end: 15, suffix: '+', label: 'Projects Completed' },
              { end: 2, suffix: '+ YR', label: 'Experience' },
              { end: 10, suffix: '+', label: 'Technologies Mastered' },
              { end: 5, suffix: '+', label: 'Certifications' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center justify-center p-6 border border-border bg-card/20 backdrop-blur hover:border-primary/50 transition-colors group"
              >
                <Counter end={stat.end} suffix={stat.suffix} />
                <span className="text-sm font-mono text-muted-foreground mt-2 text-center group-hover:text-foreground transition-colors">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
