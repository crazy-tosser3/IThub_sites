import { useEffect, useState } from 'react'

/** Animates a string character by character and returns the current slice. */
export function useTypingAnimation(fullText: string, speed = 100): string {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    let index = 0
    const id = window.setInterval(() => {
      index += 1
      setDisplayed(fullText.slice(0, index))
      if (index >= fullText.length) window.clearInterval(id)
    }, speed)
    return () => window.clearInterval(id)
  }, [fullText, speed])

  return displayed
}
