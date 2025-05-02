'use client'

import { memo, ReactNode, useCallback, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { animate, motion } from 'framer-motion'
import { Box, Lock, Search, Settings, Sparkles } from 'lucide-react'


interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: 'default' | 'white';
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

const GlowingEffect = memo(
  ({
     blur = 0,
     inactiveZone = 0.7,
     proximity = 0,
     spread = 20,
     variant = 'default',
     glow = false,
     className,
     movementDuration = 2,
     borderWidth = 1,
     disabled = true
   }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const lastPosition = useRef({ x: 0, y: 0 })
    const animationFrameRef = useRef<number>(0)

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current
          if (!element) return

          const { left, top, width, height } = element.getBoundingClientRect()
          const mouseX = e?.x ?? lastPosition.current.x
          const mouseY = e?.y ?? lastPosition.current.y

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY }
          }

          const center = [left + width * 0.5, top + height * 0.5]
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          )
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty('--active', '0')
            return
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity

          element.style.setProperty('--active', isActive ? '1' : '0')

          if (!isActive) return

          const currentAngle =
            parseFloat(element.style.getPropertyValue('--start')) || 0
          const targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
            Math.PI +
            90

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180
          const newAngle = currentAngle + angleDiff

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty('--start', String(value))
            }
          })
        })
      },
      [inactiveZone, proximity, movementDuration]
    )

    useEffect(() => {
      if (disabled) return

      const handleScroll = () => handleMove()
      const handlePointerMove = (e: PointerEvent) => handleMove(e)

      window.addEventListener('scroll', handleScroll, { passive: true })
      document.body.addEventListener('pointermove', handlePointerMove, {
        passive: true
      })

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
        window.removeEventListener('scroll', handleScroll)
        document.body.removeEventListener('pointermove', handlePointerMove)
      }
    }, [handleMove, disabled])

    return (
      <>
        <div
          className={cn(
            'pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity',
            glow && 'opacity-100',
            variant === 'white' && 'border-white',
            disabled && '!block'
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              '--blur': `${blur}px`,
              '--spread': spread,
              '--start': '0',
              '--active': '0',
              '--glowingeffect-border-width': `${borderWidth}px`,
              '--repeating-conic-gradient-times': '5',
              '--gradient':
                variant === 'white'
                  ? `repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  var(--black),
                  var(--black) calc(25% / var(--repeating-conic-gradient-times))
                )`
                  : `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
                radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
                radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%), 
                radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #dd7bbb 0%,
                  #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
                  #5a922c calc(50% / var(--repeating-conic-gradient-times)), 
                  #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
                  #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
                )`
            } as React.CSSProperties
          }
          className={cn(
            'pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity',
            glow && 'opacity-100',
            blur > 0 && 'blur-[var(--blur)] ',
            className,
            disabled && '!hidden'
          )}
        >
          <div
            className={cn(
              'glow',
              'rounded-[inherit]',
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              'after:[border:var(--glowingeffect-border-width)_solid_transparent]',
              'after:[background:var(--gradient)] after:[background-attachment:fixed]',
              'after:opacity-[var(--active)] after:transition-opacity after:duration-300',
              'after:[mask-clip:padding-box,border-box]',
              'after:[mask-composite:intersect]',
              'after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]'
            )}
          />
        </div>
      </>
    )
  }
)

GlowingEffect.displayName = 'GlowingEffect'

export { GlowingEffect }

const glowingEffectItems: GridItemProps[] = [
  {
    icon: <Box className="h-4 w-4 text-black dark:text-neutral-400" />,
    title: 'Add your Car',
    description: 'Use our quick form to add a vehicle manually — choose simple or advanced mode, depending on your level of detail.'
  }, {
    icon: <Settings className="h-4 w-4 text-black dark:text-neutral-400" />,
    title: 'We will do the heavy lifting',
    description: 'Our AI auto-fills essential data like maintenance costs, insurance estimates, fuel consumption, and depreciation rates — ready for your review or customization.'
  }, {
    icon: <Box className="h-4 w-4 text-black dark:text-neutral-400" />,
    title: 'Get smart insights and analysis',
    description: 'View interactive charts, real-time comparisons, and long-term ownership analysis. Discover how your car stacks up against similar models.'
  }
]


export function GlowingEffectCards() {
  return (
    <motion.ul
      className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:max-h-[34rem]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        visible: { transition: { staggerChildren: 0.5 } },
        hidden: {}
      }}
    >
      {glowingEffectItems.map((item, index) => (
        <AnimatedGridItem key={index} {...item} />
      ))}
    </motion.ul>

  )
}

type GridItemProps = {
  area?: string
  icon: ReactNode
  title: string
  description: ReactNode
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area} w-full`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div
          className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3
                className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2
                className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

const AnimatedGridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: 'easeOut' }
        }
      }}
      className={`min-h-[14rem] list-none ${area} w-full`}
    >
      <motion.div
        className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3"
        variants={{
          visible: {
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
          }
        }}
      >
        {/*<GlowingEffect spread={40} glow={true} proximity={64} inactiveZone={0.01} />*/}
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />

        <motion.div
          className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } }
          }}
        >
          <motion.div
            className="relative flex flex-1 flex-col justify-between gap-3"
            initial="hidden"
            animate="visible"
            variants={{}} // Nested stagger is handled by parent
          >
            <motion.div
              className="w-fit rounded-lg border border-gray-600 p-2"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
              }}
            >
              {icon}
            </motion.div>

            <motion.div className="space-y-3">
              <motion.h3
                className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
              >
                {title}
              </motion.h3>
              <motion.h2
                className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } }
                }}
              >
                {description}
              </motion.h2>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.li>
  )
}
