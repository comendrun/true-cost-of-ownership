'use client'
import React from 'react'
import LandingPageNavbar from '@/features/landing-page/components/navbar'
import { Button } from '@/components/ui/button'
import { ContainerTextFlip } from '@/components/ui/container-text-flip'
import { motion } from 'framer-motion'
import Link from 'next/link'
//
// const HeroSection = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
//   return (
//     <motion.section
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 100 }}
//       transition={{ duration: 2 }}
//     >
//       <div className="flex flex-col gap-4 max-w-[40rem]">
//         <div className="flex gap-2 items-end">
//           <p className="text-3xl font-semibold">
//             AutoMon - Discover the True Cost of Car Ownership — It&#39;s<ContainerTextFlip
//             words={['Free', 'Easy', 'Fast', 'Smart']}
//             className="text-md" />
//           </p>
//
//         </div>
//         <p className="md:max-w-[70%]">
//           Add the car that you are tracking in seconds and let AutoMon&#39;s AI show you the real-world costs, hidden
//           expenses and comparisons.
//         </p>
//         <div className="flex gap-2 items-center mt-5">
//           <Button asChild variant="default">
//             <a href={`${isAuthenticated ? '/dashboard/add-car' : '/auth/login'}`}>Get Started</a>
//           </Button>
//           <p>It&#39;s FREE</p>
//         </div>
//       </div>
//     </motion.section>
//   )
// }
//
// export default HeroSection


export const LandingPageHeroSection = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return (
    <>
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="px-4 py-10 md:py-20">
        <h1
          className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {'Discover the True Cost of Car Ownership'
            .split(' ')
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}

                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: 'easeInOut'
                }}
                className="mr-3 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>

        <motion.p
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            duration: 0.3,
            delay: 0.8
          }}
          className="relative flex items-center justify-center gap-3 z-10 mx-auto max-w-xl py-4 text-center text-3xl font-normal text-neutral-600 dark:text-neutral-400"
        >
          Add your car in seconds and get AI-powered insights, cost breakdowns, and real-world comparisons.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            duration: 0.3,
            delay: 1
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            asChild
            className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            <Link href={isAuthenticated ? '/dashboard' : '/auth/login'} className='text-4xl'>
              Explore Now
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            <a href="https://comednrun.com" target='_blank' className='text-4xl'>
              Get in Contact
            </a>
          </Button>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.3,
            delay: 1.2
          }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <img
              src="/assets/analysis-page-screen-shot.png"
              alt="Landing page preview"
              className=" h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div>
      </div>
    </>
  )
}

