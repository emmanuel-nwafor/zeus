import React from 'react'
import { HeroPage } from './components/Hero'
import About from './components/About'
// import StickyScrollRevealDemo from './components/StickyScrollRevealDemo'

export default function page() {
  return (
    <div className='bg-black'>
      <HeroPage />
      <About />
      
      {/* We'll use this in a seperate page */}
      {/* <StickyScrollRevealDemo /> */}
    </div>
  )
}
