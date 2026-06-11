import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const certs = [
  {
    name: "Java SE 17 Developer",
    issuer: "Oracle",
    badge: "ORACLE"
  },
  {
    name: "Oracle APEX Cloud Developer",
    issuer: "Oracle",
    badge: "ORACLE"
  }
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-24 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-mono font-bold text-foreground mb-16 glitch-text"
        >
          <span className="text-primary mr-2">&gt;</span>CERT.VAULT
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
          {certs.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="group relative p-[1px] overflow-hidden rounded-sm bg-gradient-to-br from-border to-border hover:from-primary hover:to-purple-500 transition-colors duration-500"
            >
              <div className="h-full bg-card p-6 flex flex-col relative z-10 items-start">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full text-primary mb-4 group-hover:scale-110 transition-transform">
                  <Award size={24} />
                </div>
                <h3 className="text-lg font-mono font-bold text-foreground mb-2 leading-tight">
                  {cert.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-auto">
                  {cert.issuer}
                </p>
                <div className="absolute top-4 right-4 border border-green-500/50 text-green-400 bg-green-500/10 px-2 py-0.5 text-[10px] font-mono tracking-wider">
                  VERIFIED
                </div>
                <div className="absolute bottom-4 right-4 text-[9px] font-mono tracking-widest"
                  style={{ color: 'rgba(0,212,255,0.4)' }}>
                  {cert.badge}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
