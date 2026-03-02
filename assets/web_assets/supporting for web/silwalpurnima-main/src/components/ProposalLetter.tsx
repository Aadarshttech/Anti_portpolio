import { motion } from "framer-motion";
import { Pen } from "lucide-react";

const ProposalLetter = () => (
  <section className="py-24 px-4 bg-gradient-to-b from-blush/30 via-parchment to-parchment section-divider">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-2xl mx-auto relative"
    >
      {/* Decorative badge */}
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Pen size={14} />
          From My Heart
        </div>
      </motion.div>

      {/* Letter container */}
      <div
        className="bg-warm-white rounded-3xl p-8 md:p-14 shadow-2xl border border-accent/30 relative overflow-hidden"
        style={{
          backgroundImage: `
            repeating-linear-gradient(transparent, transparent 35px, hsl(var(--border) / 0.4) 35px, hsl(var(--border) / 0.4) 36px)
          `,
          boxShadow: "0 25px 80px -20px hsla(340, 60%, 55%, 0.15), 0 10px 30px -10px hsla(340, 40%, 40%, 0.1)",
        }}
      >
        {/* Subtle paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz48L3N2Zz4=')]" />

        {/* Red margin line */}
        <div className="absolute left-16 md:left-20 top-0 bottom-0 w-px bg-destructive/20" />

        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-10 relative">
          A Letter For You 💌
        </h2>

        <div className="font-handwritten text-xl md:text-2xl leading-[2.2] text-foreground/90 space-y-6 relative">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-primary font-bold text-2xl md:text-3xl"
          >
            My Dearest Babe,
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            From the very first moment I met you, I knew my life was about to change
            forever. You walked in and everything just made sense — like the world was
            finally in color.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            Every day with you is a gift I never want to take for granted. Your laugh is
            my favorite song, your smile is my morning sun, and your love is the greatest
            treasure I've ever known.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            I know I'm not perfect, but with you, I want to be the best version of myself.
            You inspire me, challenge me, and love me in ways I never knew were possible.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0 }}
          >
            So on this Valentine's Day, I want you to know — there is no one else I'd
            rather share this beautiful, crazy, wonderful life with. It's you. It's always
            been you. And it will always be you.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
            className="italic text-primary/80"
          >
            Will you continue to be mine? Not just today, but every day after? 💕
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4 }}
            className="text-right mt-10 pt-4"
          >
            Forever Yours,
            <br />
            <span className="text-3xl md:text-4xl font-bold text-gradient-romantic inline-block mt-2">
              Sanu Pu
            </span>
            <br />
            <span className="text-2xl mt-1 inline-block">💘</span>
          </motion.p>
        </div>
      </div>
    </motion.div>
  </section>
);

export default ProposalLetter;
