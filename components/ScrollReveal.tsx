"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
   children: React.ReactNode;
   className?: string;
   delay?: number;
   direction?: "up" | "down" | "left" | "right" | "none";
   duration?: number;
}

export function ScrollReveal({
   children,
   className,
   delay = 0,
   direction = "up",
   duration = 0.8,
}: ScrollRevealProps) {
   const ref = useRef(null);
   const isInView = useInView(ref, { once: true, margin: "-100px" });

   const getVariants = () => {
      switch (direction) {
         case "up":
            return { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };
         case "down":
            return { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } };
         case "left":
            return { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } };
         case "right":
            return { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } };
         case "none":
         default:
            return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
      }
   };

   const variants = getVariants();

   return (
      <motion.div
         ref={ref}
         initial="hidden"
         animate={isInView ? "visible" : "hidden"}
         variants={variants}
         transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
         className={cn(className)}
      >
         {children}
      </motion.div>
   );
}
