import React from 'react';
import { motion } from 'framer-motion'; 

const SplashScreen = () => {
  return (
    <motion.div
      className="h-screen w-full flex items-center justify-center bg-blue-600 text-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 1.5 }} // fade out after delay
    >
      <div className="text-center space-y-4">
      <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
            <span className="text-yellow-500">Focus</span>
            <span className="text-white">Hub</span>
            </h1>
        <p className="text-lg opacity-80">Fuel Your Focus. Master Your Day.</p>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
