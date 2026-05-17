import { useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  opacity: number;
}

export default function CSSParticles() {
  const particles = useMemo<Particle[]>(() => {
    const colors = ['#00d4ff', '#0066ff', '#bd93f9', '#00ffff', '#4d94ff'];
    return Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.7 + 0.2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,102,255,0.15),transparent)] bg-[radial-gradient(ellipse_60%_60%_at_80%_80%,rgba(189,147,249,0.1),transparent)]" />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 70% 50% at 30% 60%, rgba(0,212,255,0.07) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 20%, rgba(189,147,249,0.08) 0%, transparent 50%)'
      }} />

      {/* Animated star particles */}
      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) scale(1); opacity: var(--op); }
          50% { transform: translateY(-20px) scale(1.2); opacity: calc(var(--op) * 0.5); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: var(--op); }
          50% { opacity: calc(var(--op) * 0.3); }
        }
      `}</style>

      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            '--op': p.opacity,
            opacity: p.opacity,
            animation: p.size > 1.5
              ? `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`
              : `twinkle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          } as React.CSSProperties}
        />
      ))}

      {/* Horizontal scan lines subtle */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.5) 2px, rgba(0,212,255,0.5) 3px)',
        backgroundSize: '100% 6px',
      }} />
    </div>
  );
}
