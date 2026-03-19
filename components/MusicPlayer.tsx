"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Music } from "lucide-react";
import { Howl } from "howler";
import { ASSETS } from "@/constants";

export function MusicPlayer() {
   const [isPlaying, setIsPlaying] = useState(true);
   const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
   const soundRef = useRef<Howl | null>(null);

   
   useEffect(() => {
      if (soundRef.current) {
         if (isPlaying) {
            soundRef.current.play();
         } else {
            soundRef.current.pause();
         }
      }
   }, [isPlaying]);

   // Global expose for Starting from cover button
   useEffect(() => {
      const handlePlayMusicEvent = () => {
         setIsPlaying(true);
      };
      window.addEventListener("playMusic", handlePlayMusicEvent);
      return () => window.removeEventListener("playMusic", handlePlayMusicEvent);
   }, []);

   const handlePlayPause = () => {
      setIsPlaying(!isPlaying);
   };

   const handleNext = () => {
      setCurrentTrackIndex((prev) => (prev + 1) % ASSETS.music.length);
      setIsPlaying(true);
   };

   const handlePrev = () => {
      setCurrentTrackIndex((prev) => (prev - 1 + ASSETS.music.length) % ASSETS.music.length);
      setIsPlaying(true);
   };

   useEffect(() => {
      // Initialize sound
      const track = ASSETS.music[currentTrackIndex];
      if (track) {
         if (soundRef.current) {
            soundRef.current.unload();
         }

         soundRef.current = new Howl({
            src: [track.src],
            html5: true,
            autoplay: isPlaying,
            loop: false,
            volume: 1,
            onend: handleNext,
         });
      }

      return () => {
         if (soundRef.current) {
            soundRef.current.unload();
         }
      };
   }, [currentTrackIndex]);


   const currentTrack = ASSETS.music[currentTrackIndex];

   if (!currentTrack) return null;

   return (
      <motion.div
         initial={{ y: 100, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 1, duration: 0.5 }}
         className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass rounded-2xl px-4 py-3 flex items-center gap-4 max-w-70"
      >
         <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center relative overflow-hidden shrink-0">
            <Music className="w-5 h-5 text-primary" />
            {isPlaying && (
               <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-primary/20 rounded-full"
               />
            )}
         </div>

         <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{currentTrack.title}</p>
            <p className="text-xs text-white/60">Music for You</p>
         </div>

         <div className="flex items-center gap-2 shrink-0">
            <button
               onClick={handlePrev}
               className="p-1.5 text-white/80 hover:text-white transition-colors"
               title="Previous"
            >
               <SkipBack className="w-4 h-4" />
            </button>
            <button
               onClick={handlePlayPause}
               className="w-8 h-8 rounded-full bg-primary text-dark flex items-center justify-center hover:scale-105 transition-transform"
            >
               {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
               ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
               )}
            </button>
            <button
               onClick={handleNext}
               className="p-1.5 text-white/80 hover:text-white transition-colors"
               title="Next"
            >
               <SkipForward className="w-4 h-4" />
            </button>
         </div>
      </motion.div>
   );
}
