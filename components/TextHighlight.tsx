"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TextHighlightProps {
   text: string;
   className?: string;
   delay?: number;
}

export function TextHighlight({ text, className, delay = 0 }: TextHighlightProps) {
   const ref = useRef(null);
   const isInView = useInView(ref, { once: true, margin: "-50px" });

   return (
      <span ref={ref} className={cn("relative inline-block whitespace-nowrap", className)}>
         <motion.span
            initial={{ width: "0%" }}
            animate={isInView ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 0.6, delay: delay + 0.1, ease: "easeOut" }}
            className="absolute left-0 bottom-1 h-[40%] bg-primary/40 -z-10 rounded-sm"
         />
         <span className="relative z-10">{text}</span>
      </span>
   );
}
