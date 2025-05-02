import React from 'react'
import { motion } from 'framer-motion'


const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const word = {
  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
}

const LandingPageSectionAnimatedHeaders = ({ text }: { text: string }) => {
  const words = text.split(' ')
  return (
    <motion.h1
      className="relative z-10 mx-auto mb-8 mt-8 max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {words.map((wordText, i) => (
        <motion.span
          key={i}
          variants={word}
          className="mr-3 inline-block"
        >
          {wordText}
        </motion.span>
      ))}
    </motion.h1>
  )
}

export default LandingPageSectionAnimatedHeaders