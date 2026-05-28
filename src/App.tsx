import { useRef } from 'react'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { HistorySection } from './components/HistorySection'
import { StatsSection } from './components/StatsSection'
import { PeopleSection } from './components/PeopleSection'
import { MapSection } from './components/MapSection'
import { IThubSection } from './components/IThubSection'
import { ReviewsSection } from './components/ReviewsSection'
import { Footer } from './components/Footer'
import { ScrollTopButton } from './components/ScrollTopButton'

import { useTypingAnimation } from './hooks/useTypingAnimation'
import { useScrollReveal } from './hooks/useScrollReveal'
import { useHeaderScroll } from './hooks/useHeaderScroll'
import { useBentoTilt } from './hooks/useBentoTilt'
import { useDraggableMap } from './hooks/useDraggableMap'

export function App() {
  const heroText = useTypingAnimation('Сердце России')
  useScrollReveal()
  const { isScrolled, isScrollTopVisible } = useHeaderScroll()
  useBentoTilt()

  const mapRef     = useRef<HTMLDivElement>(null)
  const sandboxRef = useRef<HTMLDivElement>(null)
  useDraggableMap(mapRef, sandboxRef)

  return (
    <>
      <Header isScrolled={isScrolled} />
      <HeroSection heroText={heroText} />
      <HistorySection />
      <StatsSection />
      <PeopleSection />
      <MapSection mapRef={mapRef} />
      <IThubSection sandboxRef={sandboxRef} />
      <ReviewsSection />
      <Footer />
      <ScrollTopButton isVisible={isScrollTopVisible} />
    </>
  )
}

export default App
