import { useEffect, useState } from 'react'

type HeaderScrollState = {
  isScrolled: boolean
  isScrollTopVisible: boolean
}

/** Tracks scroll position to control header appearance and scroll-to-top visibility. */
export function useHeaderScroll(): HeaderScrollState {
  const [isScrolled,         setIsScrolled]         = useState(false)
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setIsScrollTopVisible(window.scrollY > 500)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { isScrolled, isScrollTopVisible }
}
