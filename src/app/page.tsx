import React from 'react'
import { HeroPage } from './components/Hero'
import About from './components/About'
import TimelineDemo from './components/TimelineDemo'
import AnimatedTestimonialsDemo from './components/AnimatedTestimonialsDemo'
import { CarouselDemo } from './components/CarouselDemo'

// import StickyScrollRevealDemo from './components/StickyScrollRevealDemo'

export default function page() {
  return (
    <>
      {/* <div className='bg-black'> */}
      <HeroPage />
      <About />
      <TimelineDemo />
      <AnimatedTestimonialsDemo />
      <CarouselDemo />

      {/* We'll use this in a seperate page */}
      {/* <StickyScrollRevealDemo /> */}
    {/* </div> */}
    </>
  )
}
