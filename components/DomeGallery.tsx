"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DomeGalleryProps {
   images: string[];
   className?: string;
   autoSlide?: boolean;
   interval?: number;
}

export function DomeGallery({
   images,
   className,
   autoSlide = true,
   interval = 3000,
}: DomeGalleryProps) {
   const [currentIndex, setCurrentIndex] = useState(0);
   const containerRef = useRef<HTMLDivElement>(null);

   const nextSlide = () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
   };

   const prevSlide = () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
   };

   // ✅ AUTO SLIDE
   useEffect(() => {
      if (!autoSlide) return;

      const timer = setInterval(() => {
      nextSlide();
      }, interval);

      return () => clearInterval(timer);
   }, [currentIndex, autoSlide, interval]);

   if (!images?.length) return null;

   return (
      <div
      ref={containerRef}
      className={cn(
         "relative w-full h-75 sm:h-100 md:h-125 lg:h-150 flex items-center justify-center overflow-hidden perspective-1000",
         className
      )}
      >
      <div className="relative w-full max-w-[90%] sm:max-w-md md:max-w-lg aspect-3/4 flex items-center justify-center">
         <AnimatePresence mode="popLayout">
            {images.map((src, idx) => {
            const isActive = idx === currentIndex;
            const isPrev =
               idx === (currentIndex - 1 + images.length) % images.length;
            const isNext = idx === (currentIndex + 1) % images.length;

            if (!isActive && !isPrev && !isNext) return null;

            return (
               <motion.div
                  key={src}
                  className="absolute w-full h-full rounded-xl sm:rounded-2xl overflow-hidden glass shadow-xl sm:shadow-2xl cursor-pointer"
                  onClick={
                     isActive ? undefined : isNext ? nextSlide : prevSlide
                  }
                  layoutId={`card-${src}`}
                  initial={{
                     opacity: 0,
                     scale: 0.8,
                     rotateY: isNext ? 45 : isPrev ? -45 : 0,
                     z: -100,
                     x: isNext ? "50%" : isPrev ? "-50%" : "0%",
                  }}
                  animate={{
                     opacity: isActive ? 1 : 0.6,
                     scale: isActive ? 1 : 0.85,
                     rotateY: isActive ? 0 : isNext ? -15 : 15,
                     z: isActive ? 0 : -50,
                     x: isActive ? "0%" : isNext ? "55%" : "-55%",
                     zIndex: isActive ? 10 : 0,
                  }}
                  exit={{
                     opacity: 0,
                     scale: 0.8,
                     z: -100,
                  }}
                  transition={{
                     duration: 0.6,
                     type: "spring",
                     bounce: 0.3,
                  }}
               >
                  <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${src})` }}
                  >
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                  </div>
               </motion.div>
            );
            })}
         </AnimatePresence>

         {/* DOT NAVIGATION */}
         <div className="absolute -bottom-8 sm:-bottom-10 md:-bottom-12 left-0 right-0 flex justify-center gap-2 z-20">
            {images.map((_, idx) => (
            <button
               key={idx}
               onClick={() => setCurrentIndex(idx)}
               className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  idx === currentIndex
                  ? "w-6 bg-primary"
                  : "w-2 bg-white/30"
               )}
            />
            ))}
         </div>
      </div>
      </div>
   );
}