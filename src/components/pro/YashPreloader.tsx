import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const EASE = [0.76, 0, 0.24, 1] as const;

export const YashPreloader: React.FC = () => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0a0a0a]"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-black text-4xl md:text-6xl text-white font-heading uppercase"
            >
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8a3d] via-[#ff3d77] via-[#a855f7] to-[#00d4ff]">
                Umar
              </span>
            </motion.span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default YashPreloader;
