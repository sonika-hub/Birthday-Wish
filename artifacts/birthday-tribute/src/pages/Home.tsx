import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import html2canvas from "html2canvas";

import photo1 from "@assets/7371D520-B2AD-482A-AA21-F5FB917935C8_1779117820791.jpg";
import photo2 from "@assets/02F53639-9372-4671-AD0A-A62D6120D515_1779117820793.jpg";
import photo3 from "@assets/HIWpvbFW8AAdnzH_1779117820794.jpg";
import photo4 from "@assets/1000030172_1779117820795.jpg";
import photo5 from "@assets/_jqD9Xg-.jpg_small_1779117820796.jpg";
import photo6 from "@assets/coZ0c-xC.jpg_small_1779117820798.jpg";
import photo7 from "@assets/30751209954848170_1779118194288.jpg";
import photo8 from "@assets/274438171039763407_1779118194289.jpg";
import photo9 from "@assets/37576978138298042_1779118194290.jpg";

const Particles = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: Math.random() * 100 + 100, x: Math.random() * window.innerWidth }}
          animate={{ opacity: [0, 0.4, 0], y: "-100vh", x: `calc(${Math.random() * 100}vw)` }}
          transition={{ duration: Math.random() * 10 + 15, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
          className="absolute bottom-[-10px] w-1 h-1 bg-primary/40 rounded-full blur-[1px]"
        />
      ))}
    </div>
  );
};

const wishes = [
  "Your journey inspires us every day. Happy Birthday to our shining star.",
  "From the water to the stage, your passion is undeniable. Wishing you the best.",
  "May your year be as deep and beautiful as the ocean.",
  "We are so proud of the artist you have become. Keep shining.",
  "Your light guides us through the dark. Happy birthday.",
  "Like the tide, your talent is a force of nature. We love you.",
  "Wishing you an ocean of happiness on your special day.",
  "Keep breaking records, keep breaking hearts. Happy birthday.",
];

const gallery = [
  { src: photo3, caption: "Quiet moment" },
  { src: photo4, caption: "Fan sign" },
  { src: photo5, caption: "Under the sky" },
  { src: photo6, caption: "By the water" },
];

function BirthdayCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = "happy-birthday-est-supha.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10">
      {/* The card itself */}
      <div
        ref={cardRef}
        data-testid="birthday-card"
        className="relative w-[340px] md:w-[480px] rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #020d1a 0%, #051e36 40%, #0a3a5c 70%, #0d4d6e 100%)",
        }}
      >
        {/* Shimmer overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(13,148,136,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(56,189,248,0.10) 0%, transparent 60%)",
          }}
        />

        {/* Photo */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <img
            src={photo1}
            alt="Est Supha"
            className="w-full h-full object-cover object-top"
            style={{ filter: "brightness(0.75) saturate(1.1)" }}
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020d1a] via-transparent to-transparent" />
        </div>

        {/* Card text body */}
        <div className="relative px-8 py-8 flex flex-col items-center text-center">
          {/* Teal divider line */}
          <div className="w-12 h-px bg-teal-400/60 mb-6" />

          <p
            className="text-teal-300/80 uppercase tracking-[0.35em] text-[10px] font-medium mb-3"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            A Birthday Tribute
          </p>

          <h2
            className="text-white text-4xl md:text-5xl font-medium mb-1 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Est
          </h2>
          <h2
            className="text-teal-300 text-4xl md:text-5xl italic mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Supha
          </h2>

          <p
            className="text-white/70 text-sm md:text-base leading-relaxed mb-6 max-w-xs"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 300 }}
          >
            Like the ocean, your journey is deep,<br />
            powerful, and unforgettable.
          </p>

          <div className="w-12 h-px bg-teal-400/40 mb-5" />

          <p
            className="text-teal-200/60 uppercase tracking-[0.4em] text-[9px]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Happy Birthday
          </p>
        </div>
      </div>

      {/* Download button */}
      <motion.button
        data-testid="button-download-card"
        onClick={handleDownload}
        disabled={downloading}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="relative px-10 py-4 rounded-full text-sm uppercase tracking-[0.25em] font-medium text-white/90 border border-teal-400/30 overflow-hidden transition-all duration-300 disabled:opacity-60"
        style={{
          background: "linear-gradient(135deg, rgba(13,148,136,0.2) 0%, rgba(5,30,54,0.6) 100%)",
          backdropFilter: "blur(12px)",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        <span className="relative z-10">
          {downloading ? "Preparing..." : "Download Card"}
        </span>
        <motion.div
          className="absolute inset-0 bg-teal-400/10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden font-sans selection:bg-primary/30 selection:text-primary-foreground">

      {/* Dynamic Cursor Glow */}
      <motion.div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(13, 148, 136, 0.05) 0%, rgba(0,0,0,0) 70%)",
          left: mousePos.x - 300,
          top: mousePos.y - 300,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      />

      <Particles />

      <div className="fixed inset-0 pointer-events-none z-[-2]">
        <div className="absolute inset-0 bg-radial-gradient opacity-80" />
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent opacity-30 mix-blend-screen" />
      </div>

      {/* ── HERO ── */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-20 pb-32 z-10 px-6">
        <motion.div className="absolute inset-0 z-[-1] opacity-70" style={{ y: yBg }}>
          <img src={photo2} alt="Est Supha at the shore" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-background/65 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>

        <motion.div style={{ opacity: opacityHero, scale: scaleHero }} className="text-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeOut" }}>
            <h2 data-testid="text-hero-label" className="text-primary/80 uppercase tracking-[0.4em] text-xs md:text-sm font-medium mb-8">
              A Birthday Tribute
            </h2>
            <h1 data-testid="text-hero-name" className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-foreground mb-8 text-glow leading-tight">
              Est<br />
              <span className="text-primary/90 italic">Supha</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-12">
              From racing through waves to winning hearts on screen. A journey of passion, endurance, and profound beauty.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 2 }} className="animate-bounce mt-24">
            <div className="w-px h-24 bg-gradient-to-b from-primary/50 to-transparent mx-auto" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── JOURNEY TIMELINE ── */}
      <section className="relative z-10 py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }}
            className="text-center mb-32"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-glow">The Current</h2>
            <div className="w-16 h-px bg-primary/50 mx-auto" />
          </motion.div>

          <div className="space-y-40">
            {/* Phase 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 group">
              <motion.div
                initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-full md:w-1/2"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden glass-card p-3 relative transform transition-transform duration-700 group-hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 mix-blend-overlay" />
                  <img src={photo7} alt="By the water" className="w-full h-full object-cover object-center rounded-xl grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                className="w-full md:w-1/2 space-y-8"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-primary/50" />
                  <span className="text-primary/70 tracking-[0.2em] text-sm uppercase">Phase I</span>
                </div>
                <h3 className="font-serif text-4xl md:text-5xl text-foreground/90">National Swimmer</h3>
                <p className="text-muted-foreground leading-relaxed text-lg md:text-xl font-light">
                  Cutting through dark water with absolute precision. The discipline of a true athlete, learning to breathe in rhythm with the waves, pushing past limits in the silence of the pool.
                </p>
              </motion.div>
            </div>

            {/* Phase 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24 group">
              <motion.div
                initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-full md:w-1/2"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden glass-card p-3 relative transform transition-transform duration-700 group-hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 mix-blend-overlay" />
                  <img src={photo8} alt="Dream chaser" className="w-full h-full object-cover object-top rounded-xl grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                className="w-full md:w-1/2 space-y-8 text-left md:text-right"
              >
                <div className="flex items-center gap-4 md:justify-end">
                  <span className="text-primary/70 tracking-[0.2em] text-sm uppercase">Phase II</span>
                  <div className="w-8 h-px bg-primary/50" />
                </div>
                <h3 className="font-serif text-4xl md:text-5xl text-foreground/90">Dream Chaser</h3>
                <p className="text-muted-foreground leading-relaxed text-lg md:text-xl font-light">
                  Trading the water for the warmth of the spotlight. The same dedication, now poured into the craft of storytelling. A new kind of breathing, a new kind of rhythm.
                </p>
              </motion.div>
            </div>

            {/* Phase 3 */}
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 group">
              <motion.div
                initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-full md:w-1/2"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden glass-card p-3 relative transform transition-transform duration-700 group-hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 mix-blend-overlay" />
                  <img src={photo9} alt="Winning hearts" className="w-full h-full object-cover object-top rounded-xl grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                className="w-full md:w-1/2 space-y-8"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-primary/50" />
                  <span className="text-primary/70 tracking-[0.2em] text-sm uppercase">Phase III</span>
                </div>
                <h3 className="font-serif text-4xl md:text-5xl text-foreground/90">Winning Hearts</h3>
                <p className="text-muted-foreground leading-relaxed text-lg md:text-xl font-light">
                  Captivating audiences on screen. Every glance, every emotion resonant and deep like the ocean. You became the light that guides us through the dark.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-glow">Frames</h2>
            <div className="w-16 h-px bg-primary/50 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {gallery.map((item, i) => (
              <motion.div
                key={i}
                data-testid={`card-gallery-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                className="group relative rounded-2xl overflow-hidden glass-card p-2 cursor-default"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-xl">
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover object-top grayscale-[0.15] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl flex items-end justify-center pb-5">
                  <p className="text-white/80 text-xs tracking-[0.2em] uppercase font-light">{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WISHES ── */}
      <section className="relative z-10 py-40 px-6">
        <div className="absolute inset-0 bg-secondary/10 -skew-y-3 transform origin-top-left z-[-1]" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 1 }}
            className="text-center mb-24"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-glow">Notes on the Water</h2>
            <div className="w-16 h-px bg-primary/50 mx-auto mb-6" />
            <p className="text-muted-foreground font-light max-w-xl mx-auto text-lg">
              Messages of love floating from fans around the world, carried by the tide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {wishes.map((wish, i) => (
              <motion.div
                key={i}
                data-testid={`card-wish-${i}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="glass-card p-8 rounded-2xl relative overflow-hidden group cursor-default"
              >
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-2 bg-primary/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />
                <p className="text-foreground/80 font-light leading-relaxed relative z-10 font-serif italic text-base md:text-lg">
                  "{wish}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIRTHDAY CARD DOWNLOAD ── */}
      <section className="relative z-10 py-40 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-glow">Birthday Card</h2>
            <div className="w-16 h-px bg-primary/50 mx-auto mb-6" />
            <p className="text-muted-foreground font-light max-w-md mx-auto text-lg">
              Download and share this card to celebrate Est Supha with the world.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex justify-center"
          >
            <BirthdayCard />
          </motion.div>
        </div>
      </section>

      {/* ── CLOSING ── */}
      <section className="relative z-10 py-40 px-6 flex flex-col items-center justify-center text-center min-h-[100dvh]">
        <div className="absolute inset-0 z-[-1] opacity-20">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="max-w-4xl mx-auto relative"
        >
          <div className="absolute -inset-20 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground mb-12 leading-[1.1] text-glow">
            Like the ocean,<br />
            your journey is<br />
            <span className="text-primary italic font-light">deep, powerful,</span><br />
            <span className="text-primary italic font-light">& unforgettable.</span>
          </h2>

          <div className="w-24 h-px bg-primary/50 mx-auto mb-12" />

          <p data-testid="text-closing" className="text-muted-foreground text-xl md:text-2xl font-light uppercase tracking-[0.4em]">
            Happy Birthday, Est Supha
          </p>
        </motion.div>
      </section>

    </div>
  );
}
