import { motion } from 'framer-motion';

const experiences = [
  {
    role: "Software Developer Intern",
    company: "TechCorp Solutions",
    period: "Jan 2024 – Jun 2024",
    points: [
      "Developed interactive React frontend components for dashboard interfaces.",
      "Built and optimized RESTful APIs using Node.js and Express.",
      "Integrated machine learning models into the web application, improving processing performance by 40%."
    ]
  },
  {
    role: "AI/ML Intern",
    company: "AI Innovations Lab",
    period: "Jul 2023 – Dec 2023",
    points: [
      "Trained NLP models using PyTorch for text classification tasks.",
      "Constructed robust computer vision pipelines for image analysis.",
      "Deployed machine learning models to production utilizing FastAPI endpoints."
    ]
  },
  {
    role: "B.Tech CSE (AI/ML Specialization)",
    company: "University",
    period: "2021 – 2025",
    points: [
      "Current CGPA: 8.5/10",
      "Relevant Coursework: Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, Data Structures."
    ]
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative bg-[#0b1020]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-mono font-bold text-foreground mb-16 glitch-text"
        >
          <span className="text-primary mr-2">&gt;</span>EXPERIENCE.LOG
        </motion.h2>

        <div className="relative border-l border-primary/30 ml-3 md:ml-6 space-y-12">
          {experiences.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-5px] top-1.5 w-[9px] h-[9px] rounded-full bg-primary shadow-[0_0_10px_#00d4ff] ring-4 ring-background" />

              <div className="bg-card/40 border border-border backdrop-blur p-6 hover:border-primary/50 transition-colors group">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <h3 className="text-xl font-mono font-bold text-foreground group-hover:text-primary transition-colors">
                    {exp.role}
                  </h3>
                  <span className="text-sm font-mono text-accent bg-accent/10 px-3 py-1 border border-accent/20">
                    {exp.period}
                  </span>
                </div>
                
                <div className="text-muted-foreground font-medium mb-4">
                  @ {exp.company}
                </div>
                
                <ul className="space-y-2 text-muted-foreground text-sm">
                  {exp.points.map((point, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-primary mt-1">▹</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
