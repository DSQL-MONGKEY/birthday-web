"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { PERSONAL_INFO, STORY, ASSETS } from "@/constants";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TextHighlight } from "@/components/TextHighlight";
import { MusicPlayer } from "@/components/MusicPlayer";
import { DomeGallery } from "@/components/DomeGallery";
import { Sparkles, Stars, Gift, Cake } from "lucide-react";

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

 
  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#FFB6C1", "#FFD700", "#FF69B4", "#ffffff"]
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#FFB6C1", "#FFD700", "#FF69B4", "#ffffff"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

   // Auto trigger confetti after entering site
  useEffect(() => {
    if (hasStarted && !showConfetti) {
      setTimeout(() => {
        triggerConfetti();
        setShowConfetti(true);
      }, 1000);
    }
  }, [hasStarted, showConfetti]);


  const startJourney = () => {
    setHasStarted(true);
    // Event to play music globally
    window.dispatchEvent(new Event("playMusic"));
  };

  return (
    <main className="relative min-h-screen selection:bg-primary/30">
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-100 bg-dark flex flex-col items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center"
            >
              <Cake className="w-12 h-12 text-primary mx-auto mb-6 animate-pulse" />
              <h1 className="text-3xl md:text-5xl mb-8 font-serif leading-tight">
                There&apos;s special surprize<br />for you...
              </h1>
              <button
                onClick={startJourney}
                className="group relative px-8 py-4 bg-primary text-dark rounded-full font-semibold overflow-hidden transition-transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Open it now
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      {hasStarted && (
        <div className="pt-20 pb-40">

          {/* Hero Section */}
          <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,182,193,0.1)_0%,transparent_70%)] pointer-events-none" />

            <ScrollReveal delay={0.2} duration={1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm text-primary">
                <Stars className="w-4 h-4" />
                A Special Day!
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4} duration={1} className="text-center max-w-4xl mx-auto z-10">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 leading-tight font-playfair">
                Happy Birthday,<br />
                <span className="text-primary font-playfair">{PERSONAL_INFO.name}</span>
              </h1>
              <p className="text-md md:text-2xl text-white/80 max-w-2xl mx-auto font-sans font-light font-inter">
                {PERSONAL_INFO.tagline}
              </p>
            </ScrollReveal>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 text-sm"
            >
              <span>Scroll down</span>
              <div className="w-0.5 h-10 bg-linear-to-b from-white/50 to-transparent rounded-full" />
            </motion.div>
          </section>

          {/* Prologue Section */}
          <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
            <ScrollReveal direction="up" className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />

              <QuoteIcon className="w-12 h-12 text-primary/40 mb-6" />
              <p className="text-xl md:text-3xl leading-relaxed relative z-10 text-white/90 font-inter">
                {STORY.prologue}
              </p>
              <span className="text-sm font-outfit">(canda *cerah)</span>
            </ScrollReveal>
          </section>

          {/* Opening Narrative */}
          <section className="py-24 px-6 max-w-3xl mx-auto text-center">
            <ScrollReveal direction="up">
              <p className="text-lg md:text-2xl leading-loose font-sans font-playfair text-white/80">
                {STORY.opening.split("jatuh dan bangun").map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i !== arr.length - 1 && <TextHighlight text="jatuh dan bangun" delay={0.5} />}
                  </span>
                ))}
              </p>
            </ScrollReveal>
          </section>

          {/* Main Greeting / Typewriter effect manually done via framer motion */}
          <section className="py-24 px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal direction="up">
                <Gift className="w-16 h-16 text-primary mx-auto mb-8" />
                <h2 className="text-3xl md:text-5xl font-serif mb-8 text-primary">Doa Untukmu</h2>

                <div className="text-lg md:text-2xl leading-relaxed text-white/90 font-serif italic">
                  {STORY.greeting}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Poem/Meaningful text */}
          <section className="py-24 px-6 max-w-3xl mx-auto">
            <ScrollReveal direction="left" className="border-l-4 border-primary pl-8 md:pl-12 py-4">
              <p className="text-xl md:text-3xl font-serif text-white/80 leading-relaxed indent-8">
                {STORY.poem}
              </p>
            </ScrollReveal>
          </section>

          {/* Gallery Section */}
          <section className="py-24 px-6 overflow-hidden">
            <ScrollReveal className="text-center mb-16">
              <h2 data-aos="fade-left" className="text-3xl md:text-5xl font-serif mb-4">Memori Indah</h2>
              <p className="text-white/60 font-sans">Beberapa momen yang tidak akan terlupakan</p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <DomeGallery images={ASSETS.photos} />
            </ScrollReveal>
          </section>

          {/* Footer */}
          <section className="pt-24 pb-12 px-6 text-center max-w-2xl mx-auto relative cursor-default">
            <ScrollReveal direction="up" delay={0.2}>
              <div className="w-16 h-px bg-primary/50 mx-auto mb-10" />
              <p className="text-lg font-serif italic text-white/80 mb-8">
                &ldquo;{PERSONAL_INFO.shortQuote}&rdquo;
              </p>
              <p className="text-primary font-medium tracking-widest text-sm uppercase">
                Dari {PERSONAL_INFO.senderName}
              </p>
            </ScrollReveal>
          </section>

        </div>
      )}

      {/* Global Persisten Components */}
      {hasStarted && (
        <>
          <MusicPlayer />

          {/* Confetti button */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2, type: "spring" }}
            onClick={triggerConfetti}
            className="fixed bottom-24 right-6 w-12 h-12 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full flex items-center justify-center text-primary hover:bg-primary/40 transition-colors z-40"
            title="Fire Confetti!"
          >
            <Sparkles className="w-5 h-5" />
          </motion.button>
        </>
      )}
    </main>
  );
}

function QuoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}
