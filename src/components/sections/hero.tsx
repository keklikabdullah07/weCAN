"use client"; // Framer Motion kullandığımız için bu bir Client Component olmalı

import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section className="container mx-auto px-4 py-6 mb-16 md:mb-24 overflow-hidden">
      <div className="relative bg-indigo-950 rounded-[2.5rem] p-8 md:p-20 text-white overflow-hidden shadow-2xl shadow-indigo-900/40 min-h-150 flex items-center">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 z-0 pointer-events-none"></div>

        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob z-0 pointer-events-none"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob animation-delay-2000 z-0 pointer-events-none"></div>
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-4000 z-0 pointer-events-none"></div>

        <div className="absolute inset-0 bg-linear-to-t from-indigo-950 via-transparent to-indigo-950/50 z-0 pointer-events-none"></div>

        <motion.div
          className="relative z-10 max-w-3xl mx-auto text-center md:text-left md:mx-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-indigo-100 text-sm font-medium mb-6"
          >
            <PlayCircle size={16} className="text-orange-400" /> Pro Eğitmenle
            Tanışın
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight tracking-tight"
          >
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-white via-indigo-100 to-indigo-300">
              Özgürlüğe Giden Yolu
            </span>
            <span className="block">Patenle Keşfet.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-indigo-200 mb-10 text-lg md:text-xl max-w-xl mx-auto md:mx-0 leading-relaxed"
          >
            Kişiye özel derslerle dengenizi bulun, korkularınızı yenin ve şehrin
            ritmini yakalayın. Her seviyeye uygun, güvenli ve eğlenceli eğitim.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-5 justify-center md:justify-start"
          >
            <Button
              asChild // Bu özellik sayesinde buton bir Link gibi davranır
              size="lg"
              className="group bg-white text-indigo-950 hover:bg-indigo-50 rounded-full font-bold shadow-xl shadow-indigo-900/20 h-14 px-10 text-lg transition-all hover:scale-105 hover:shadow-indigo-900/40"
            >
              <Link href="#courses">
                Dersleri İncele
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            {/* <Button
              variant="outline"
              size="lg"
              className="bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 rounded-full font-bold h-14 px-10 text-lg transition-all hover:border-white/40"
            >
              Daha Fazla Bilgi
            </Button> */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
