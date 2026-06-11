import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: "Safina – Women Safety Analysis",
    desc: "A smart women safety platform providing emergency assistance, real-time location tracking, and multi-level escalation to notify trusted contacts and emergency services during critical situations.",
    tags: ["React", "Node.js", "MongoDB", "GPS Tracking"],
    github: "https://github.com/Harish-sabari-130/Women-safety-application",
    link: "https://github.com/Harish-sabari-130/Women-safety-application",
    features: ["Real-time location tracking", "Instant emergency alerts", "Multi-level escalation"]
  },
  {
    title: "Live Vision – Object Detection",
    desc: "A real-time object detection system using YOLO to process live video streams. Improved model accuracy and performance through data preprocessing and model optimization techniques.",
    tags: ["Python", "YOLO", "OpenCV", "TensorFlow"],
    github: "https://github.com/Harish-sabari-130/Real-time-object-detection-using-YOLO",
    link: "https://github.com/Harish-sabari-130/Real-time-object-detection-using-YOLO",
    features: ["Live camera processing", "Real-time detection", "Optimized accuracy"]
  },
  {
    title: "Nomad Visa Hub",
    desc: "A ServiceNow-based digital visa & immigration management portal for application submission, secure document upload, real-time visa status tracking, and workflow automation.",
    tags: ["ServiceNow", "Flow Designer", "Service Portal", "App Engine Studio"],
    github: null,
    link: null,
    features: ["Visa application workflow", "Document upload", "Expiry notifications"]
  },
  {
    title: "Expense Tracker Agent",
    desc: "An AI-powered expense management system that automatically tracks, categorizes, and analyzes financial transactions using rule-based logic to generate spending summaries and insights.",
    tags: ["Python", "AI Workflows", "Data Analysis"],
    github: null,
    link: null,
    features: ["Auto-categorization", "Spending analysis", "Financial summaries"]
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-mono font-bold text-foreground mb-16 glitch-text"
        >
          <span className="text-primary mr-2">&gt;</span>PROJECT.ARCHIVE
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, rotateX: 20, y: 50 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative h-full bg-card/40 border border-primary/20 backdrop-blur-sm overflow-hidden hover:border-primary transition-all duration-300 transform-gpu hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,212,255,0.15)] flex flex-col"
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

              <div className="p-6 flex-grow flex flex-col relative z-10">
                <h3 className="text-xl font-mono font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-grow">
                  {project.desc}
                </p>

                {/* Feature chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.features.map((f, j) => (
                    <span key={j} className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(0,212,255,0.08)', color: 'rgba(0,212,255,0.7)', border: '1px solid rgba(0,212,255,0.15)' }}>
                      ◈ {f}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-5 mt-auto">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="text-xs font-mono px-2 py-1 bg-background/50 border border-border text-foreground/80">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-4 border-t border-border group-hover:border-primary/30 transition-colors">
                  {project.github ? (
                    <a href={project.github} target="_blank" rel="noreferrer"
                      className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
                      data-interactive="true">
                      <Github size={16} /> CODE
                    </a>
                  ) : (
                    <span className="flex items-center gap-2 text-sm font-mono text-muted-foreground/40 cursor-not-allowed">
                      <Github size={16} /> PRIVATE
                    </span>
                  )}
                  {project.link && project.link !== project.github && (
                    <a href={project.link} target="_blank" rel="noreferrer"
                      className="flex items-center gap-2 text-sm font-mono text-primary hover:text-accent transition-colors"
                      data-interactive="true">
                      <ExternalLink size={16} /> VIEW
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
