import React from 'react';
import { motion } from 'framer-motion';
import NetworkBackground from './NetworkBackground';

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-white overflow-hidden">
      <NetworkBackground />

      <div className="z-10 text-center px-4 max-w-5xl -mt-8 md:-mt-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-soviet-red mb-6 uppercase leading-[1.15]">
            Đời Sống <br />
          </h1>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-soviet-red mb-6 uppercase leading-[1.15]">
            <span className="text-soviet-orange">Quyết Định Ý Thức</span>
          </h1>
          <div className="h-2 w-48 bg-soviet-gold mx-auto mb-10 shadow-sm rounded-full" />
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="text-2xl md:text-4xl font-serif italic text-zinc-700 leading-tight max-w-4xl mx-auto"
        >
          "It is not the consciousness of men that determines their existence, but their social existence that determines their consciousness."
          <span className="block mt-6 text-xl md:text-2xl font-sans not-italic text-zinc-500 font-bold leading-normal">
            (Không phải ý thức của con người quyết định tồn tại của họ; trái lại, tồn tại xã hội của họ quyết định ý thức của họ)
          </span>
          <footer className="mt-8 text-sm md:text-xl font-sans uppercase tracking-[0.3em] text-soviet-red font-black not-italic">
            — Karl Marx —
          </footer>
        </motion.blockquote>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-4">
          {/* <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-black">Khám phá biện chứng đời sống vật chất &amp; tinh thần</span> */}
          <div className="w-1 h-16 bg-gradient-to-b from-soviet-red via-soviet-gold to-transparent rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
