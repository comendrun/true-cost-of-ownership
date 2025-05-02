'use client'
import { Accordion, AccordionItem } from '@heroui/react'
import React from 'react'
import LandingPageSection from '@/features/landing-page/components/landing-page-section'
import LandingPageSectionAnimatedHeaders from '@/features/landing-page/components/LandingPageSectionAnimatedHeaders'
import { motion } from 'framer-motion'

const faq = [
  {
    id: 1,
    question: 'What does this app do for me?',
    answer:
      'AutoMon helps you figure out what your car really costs you — not just the price tag, but everything from fuel and maintenance to depreciation. You add your car, and we break it all down for you with smart estimates and clear visuals. Simple, useful, and made for real-life drivers.'
  },
  {
    id: 2,
    question: 'What does AutoMon stand for?',
    answer:
      'AutoMon stands for *Automotive Monitor* — or how I like to call it: your car’s cost detective. It\'s a play on keeping track of everything your car costs you, without all the boring spreadsheets and guesswork.'
  },
  {
    id: 3,
    question: 'Do you save or track my information?',
    answer:
      'Absolutely not. The beautiful part of this app is that there\'s no need for any personal information at any stage. All fields and analysis can be used without entering anything about you. Everything stays anonymous — apart from your car data, of course.'
  },
  {
    id: 4,
    question: 'Can I compare my saved cars with each other?',
    answer:
      'That is a great idea! As of now, we’re working on this feature and it’ll hopefully be released very soon. Stay tuned — it’s one of the most requested features so far!'
  },
  {
    id: 5,
    question: 'How reliable are the AI-filled fields and information?',
    answer:
      'We all know the AI hype we\'ve been living through lately, right? But let’s be honest — AI isn’t magic. It’s useful and pretty accurate most of the time, but there’s always room for error. That’s why you can edit any field and even request a new AI analysis. Quick and easy.'
  }
]


const FaqSection = () => {

  return (
    <LandingPageSection className="w-full max-w-3xl">
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
        className=" w-full relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
      >
        <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
          <LandingPageSectionAnimatedHeaders text="FAQ" />
          <Accordion variant="splitted" className="flex w-full">
            {faq.map(({ id, question, answer }, idx) => (
              <AccordionItem key={id} aria-label={`Question Number ${id}`} title={question}>
                {answer}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.div>
    </LandingPageSection>
  )

}

export default FaqSection
