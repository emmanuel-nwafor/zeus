import React from 'react'
import { HeroPage } from './components/Hero'
import About from './components/About'

export default function page() {
  return (
    <div className='bg-black'>
      <HeroPage />
      <About />
    </div>
  )
}
