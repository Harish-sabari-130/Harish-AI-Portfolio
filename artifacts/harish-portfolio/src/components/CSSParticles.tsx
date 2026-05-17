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
  type: 'star' | 'float' | 'drift';
}

export default function CSSParticles() {
  const particles = useMemo<Particle[]>(() => {
    const colors = ['#00d4ff', '#0066ff', '#bd93f9', '#00ffff', '#4d94ff', '#ffffff'];
    const weights = [0.35, 0.2, 0.2, 0.1, 0.1, 0.05];

    const pick = () => {
      const r = Math.random();
      let acc = 0;
      for (let i = 0; i < colors.length; i++) {
        acc += weights[i];
        if (r < acc) return colors[i];
      }
      return colors[0];
    };

    return Array.from({ length: 140 }, (_, i) => {
      const rnd = Math.random();
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: rnd < 0.6 ? Math.random() * 1.5 + 0.4 : Math.random() * 3 + 1.2,
        color: pick(),
        duration: Math.random() * 10 + 5,
        delay: Math.random() * 8,
        opacity: rnd < 0.5 ? Math.random() * 0.5 + 0.15 : Math.random() * 0.4 + 0.5,
        type: rnd < 0.5 ? 'star' : rnd < 0.8 ? 'float' : 'drift',
      };
    });
  }, []);

  /* Larger drifting nebula orbs */
  const nebulas = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: [15, 75, 40, 85, 10, 60][i],
    y: [20, 15, 60, 70, 80, 40][i],
    size: 200 + i * 60,
    color: i % 2 === 0 ? 'rgba(0,102,255,0.05)' : 'rgba(124,58,237,0.05)',
    duration: 20 + i * 5,
    delay: i * 3,
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base deep space */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(0,102,255,0.1), transparent 60%)' }}
      />
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 80% 80%, rgba(189,147,249,0.08), transparent 60%)' }}
      />
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 10% 60%, rgba(0,212,255,0.05), transparent 60%)' }}
      />

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: var(--op); transform: scale(1); }
          50%       { opacity: calc(var(--op) * 0.2); transform: scale(0.7); }
        }
        @keyframes float-up {
          0%   { transform: translateY(0)   scale(1);   opacity: var(--op); }
          50%  { transform: translateY(-22px) scale(1.3); opacity: calc(var(--op) * 0.6); }
          100% { transform: translateY(0)   scale(1);   opacity: var(--op); }
        }
        @keyframes drift {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(8px, -12px); }
          50%  { transform: translate(-6px, -20px); }
          75%  { transform: translate(-10px, -8px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes nebula-pulse {
          0%, 100% { transform: scale(1);    opacity: 1; }
          50%       { transform: scale(1.15); opacity: 0.7; }
        }
      `}</style>

      {/* Nebula orbs */}
      {nebulas.map(n => (
        <div
          key={n.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            width: `${n.size}px`,
            height: `${n.size}px`,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(ellipse, ${n.color}, transparent 70%)`,
            animation: `nebula-pulse ${n.duration}s ease-in-out ${n.delay}s infinite`,
          }}
        />
      ))}

      {/* Star / particle field */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: p.size > 1.5 ? `0 0 ${p.size * 4}px ${p.color}` : `0 0 ${p.size * 2}px ${p.color}`,
            '--op': p.opacity,
            opacity: p.opacity,
            animation: p.type === 'star'
              ? `twinkle ${p.duration}s ease-in-out ${p.delay}s infinite`
              : p.type === 'float'
              ? `float-up ${p.duration}s ease-in-out ${p.delay}s infinite`
              : `drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
          } as React.CSSProperties}
        />
      ))}

      {/* Subtle horizontal scan lines across entire page */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,212,255,0.6) 3px, rgba(0,212,255,0.6) 4px)',
          backgroundSize: '100% 8px',
        }}
      />

      {/* Faint vertical energy columns */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(0,212,255,0.8) 80px, rgba(0,212,255,0.8) 81px)',
        }}
      />
    </div>
  );
}
