import React, { useEffect } from 'react'
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
  useEffect(() => {
    // Ensure smooth scrolling works across all browsers
    if ('scrollBehavior' in document.documentElement.style) {
      // Modern browsers support scroll-behavior: smooth
      document.documentElement.style.scrollBehavior = 'smooth';
    } else {
      // Fallback for older browsers
      const smoothScrollTo = (target, duration = 1000) => {
        const targetPosition = target.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const run = ease(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
      };

      // Add smooth scrolling to all anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) smoothScrollTo(target);
        });
      });
    }
  }, []);

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