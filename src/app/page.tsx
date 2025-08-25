import React from 'react'
import { HeroPage } from './components/Hero'
import About from './components/About'
import TimelineDemo from './components/TimelineDemo'

// import StickyScrollRevealDemo from './components/StickyScrollRevealDemo'

export default function page() {
  return (
    <div className='bg-black'>
      <HeroPage />
      <About />
      <TimelineDemo />

      {/* We'll use this in a seperate page */}
      {/* <StickyScrollRevealDemo /> */}
    </div>
  )
}
