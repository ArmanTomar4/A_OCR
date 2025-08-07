import React from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Opening from './components/Opening.jsx'
import IntelligenceLayer from './components/IntelligenceLayer.jsx'
import SolutionsByIndustry from './components/SolutionsByIndustry.jsx'
import WhyChooseAOCR from './components/WhyChooseAOCR.jsx'
import RequestAccess from './components/RequestAccess.jsx'
import Footer from './components/Footer.jsx'
import Pipeline from './components/Pipeline.jsx'
import AnimatedFAQDiagram from './components/FAQ.jsx'

/**
 * Main App Component
 * Clean blank screen ready for development
 */
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Opening />
      <IntelligenceLayer />
      <SolutionsByIndustry />
      <Pipeline />
      <WhyChooseAOCR />
      <AnimatedFAQDiagram />
      <RequestAccess />
      <Footer />
    </>
  )
}

export default App 