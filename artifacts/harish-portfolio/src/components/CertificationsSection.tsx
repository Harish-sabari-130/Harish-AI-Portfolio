import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const certs = [
  { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services" },
  { name: "TensorFlow Developer Certificate", issuer: "Google" },
  { name: "React.js Advanced Developer", issuer: "Meta" },
  { name: "Python for AI/ML", issuer: "Coursera" },
  { name: "Full Stack Web Development", issuer: "freeCodeCamp" },
  { name: "Docker & Kubernetes Fundamentals", issuer: "Linux Foundation" }
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-24 relative bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-mono font-bold text-foreground mb-16 glitch-text"
        >
          <span className="text-primary mr-2">&gt;</span>CERT.VAULT
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
