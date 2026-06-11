import { motion } from 'framer-motion';

const skills = [
  {
    category: "Programming Languages",
    items: ["Java", "Python", "C"],
    color: "border-primary",
    text: "text-primary"
  },
  {
    category: "Machine Learning & AI",
    items: ["TensorFlow", "Scikit-Learn", "OpenCV", "NumPy", "Pandas"],
    color: "border-purple-500",
    text: "text-purple-400"
  },
  {
    category: "Full Stack Development",
    items: ["React", "Node.js", "Express.js", "MongoDB", "MySQL", "HTML", "CSS"],
    color: "border-primary",
    text: "text-primary"
  },
  {
    category: "Tools & Platforms",
    items: ["Git", "Jupyter Notebook", "ServiceNow"],
    color: "border-accent",
    text: "text-accent"
  },
  {
    category: "Areas of Interest",
    items: ["Artificial Intelligence", "Machine Learning", "Full Stack Development"],
    color: "border-purple-500",
    text: "text-purple-400"
  },
  {
    category: "Journey",
    items: ["2023 → B.Tech AIML", "2024 → AI & Full Stack", "2025 → Computer Vision", "2026 → ServiceNow & Freelance"],
    color: "border-accent",
    text: "text-accent"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 relative bg-[#050816]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-mono font-bold text-foreground mb-16 glitch-text"
        >
          <span className="text-primary mr-2">&gt;</span>SKILL.MATRIX
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 border border-border bg-card/30 backdrop-blur-md rounded-lg hover:border-primary/40 transition-colors group"
            >
              <h3 className={`text-xl font-mono font-semibold mb-6 ${group.text} border-b border-border pb-2 group-hover:border-primary/30 transition-colors`}>
                {group.category}
              </h3>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {group.items.map((skill, j) => (
                  <motion.div
                    key={j}
                    variants={itemVariants}
                    className={`px-3 py-1 text-sm font-medium border ${group.color} ${group.text} bg-background/50 rounded-sm hover:shadow-[0_0_10px_currentColor] transition-all cursor-default`}
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
