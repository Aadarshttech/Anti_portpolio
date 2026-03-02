import { motion } from "framer-motion";
import { Heart, Camera } from "lucide-react";

import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import couple3 from "@/assets/couple-3.jpg";
import couple5 from "@/assets/couple-5.jpg";
import couple6 from "@/assets/couple-6.jpg";
import couple7 from "@/assets/couple-7.jpg";
import couple8 from "@/assets/couple-8.jpg";
import couple9 from "@/assets/couple-9.jpg";

const memories = [
  { date: "December 2024", caption: "Cozy Winter Moments Together 🥰", photo: couple5 },
  { date: "December 2024", caption: "First Professional Photo Shoot 📸", photo: couple1 },
  { date: "January 2025", caption: "Exploring Temples Hand in Hand 🛕", photo: couple7 },
  { date: "January 2025", caption: "Adventures in the Old City 💕", photo: couple8 },
  { date: "January 2025", caption: "Fun at the Park Together 🌳", photo: couple6 },
  { date: "January 2025", caption: "That Beautiful Garden Date 🌹", photo: couple3 },
  { date: "February 2025", caption: "Exploring New Places With You 🏛️", photo: couple9 },
  { date: "February 2025", caption: "Every Moment With You is Special ✨", photo: couple2 },
];

const MemoryTimeline = () => (
  <section className="py-24 px-4 bg-gradient-to-b from-cream via-background to-blush/30 section-divider">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-20"
    >
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <Camera size={14} />
        Our Journey Together
      </motion.div>
      <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
        Beautiful Memories 💕
      </h2>
      <p className="text-lg text-muted-foreground font-handwritten text-2xl">
        Each moment with you is a treasure
      </p>
    </motion.div>

    <div className="max-w-4xl mx-auto relative">
      {/* Timeline line with gradient */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent -translate-x-1/2 hidden md:block" />

      {memories.map((mem, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`relative flex items-center mb-16 ${
            i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          } flex-col md:flex-row`}
        >
          <div className={`flex-1 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"} text-center`}>
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass-card rounded-2xl p-3 shadow-lg inline-block max-w-sm group cursor-default"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="w-full h-56 rounded-xl mb-3 overflow-hidden">
                <img
                  src={mem.photo}
                  alt={mem.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-primary font-semibold tracking-wider uppercase mb-1">{mem.date}</p>
              <p className="text-base font-semibold text-foreground">{mem.caption}</p>
            </motion.div>
          </div>

          {/* Center dot with pulse */}
          <motion.div
            className="hidden md:flex w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground items-center justify-center z-10 shrink-0 shadow-lg"
            whileInView={{ scale: [0.5, 1.2, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Heart size={16} fill="currentColor" />
          </motion.div>

          <div className="flex-1" />
        </motion.div>
      ))}
    </div>
  </section>
);

export default MemoryTimeline;
