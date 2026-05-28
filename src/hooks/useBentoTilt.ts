import { useEffect } from 'react'

/** Applies a 3-D tilt transform on all `.bento-item` cards on mousemove. */
export function useBentoTilt(): void {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.bento-item'))

    const listeners = cards.map((card) => {
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const rotX = (((e.clientY - rect.top)  / rect.height) - 0.5) * -16
        const rotY = (((e.clientX - rect.left) / rect.width)  - 0.5) *  16
        card.style.transition = 'box-shadow 0.1s ease, background 0.4s ease, color 0.3s ease'
        card.style.transform  =
          `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale(1.04)`
      }

      const onLeave = () => {
        card.style.transition =
          'transform 0.6s cubic-bezier(0.23,1,0.32,1), ' +
          'box-shadow 0.35s ease, background 0.45s ease, color 0.35s ease'
        card.style.transform = ''
        setTimeout(() => { card.style.transition = '' }, 650)
      }

      card.addEventListener('mousemove',  onMove)
      card.addEventListener('mouseleave', onLeave)
      return { card, onMove, onLeave }
    })

    return () => {
      listeners.forEach(({ card, onMove, onLeave }) => {
        card.removeEventListener('mousemove',  onMove)
        card.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])
}
