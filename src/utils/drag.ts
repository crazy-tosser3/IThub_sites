import type { DragState } from '../types'

type JellyDragOptions = {
  isMapNode?: boolean
  onMapDrag?: () => void
  container?: HTMLElement | null
}

/** Attaches jelly-physics pointer drag to a list of elements.
 *  Returns a cleanup function that removes all listeners. */
export function initJellyDrag(
  elements: HTMLElement[],
  options: JellyDragOptions = {},
): () => void {
  const cleanups = elements.map((element) => {
    const state: DragState = {
      isDragging: false,
      startX: 0, startY: 0,
      currentX: 0, currentY: 0,
    }
    let naturalLeft = 0, naturalTop = 0, naturalW = 0, naturalH = 0

    const onPointerDown = (event: PointerEvent) => {
      state.isDragging = true
      element.classList.add('grabbing')
      elements.forEach((el) => { el.style.zIndex = '10' })
      element.style.zIndex = '1000'
      state.startX = event.clientX - state.currentX
      state.startY = event.clientY - state.currentY
      if (options.container) {
        const cr = options.container.getBoundingClientRect()
        const er = element.getBoundingClientRect()
        naturalLeft = er.left - cr.left - state.currentX
        naturalTop  = er.top  - cr.top  - state.currentY
        naturalW    = er.width
        naturalH    = er.height
      }
      element.setPointerCapture(event.pointerId)
      element.style.transition = 'none'
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!state.isDragging) return
      let x = event.clientX - state.startX
      let y = event.clientY - state.startY
      if (options.container) {
        const cr = options.container.getBoundingClientRect()
        x = Math.max(-naturalLeft, Math.min(cr.width  - naturalLeft - naturalW, x))
        y = Math.max(-naturalTop,  Math.min(cr.height - naturalTop  - naturalH, y))
      }
      const diffX  = x - state.currentX
      const skewX  = Math.max(Math.min(diffX * 0.5, 15), -15)
      const scaleY = 1 + Math.min(Math.abs(diffX) * 0.003, 0.2)
      state.currentX = x
      state.currentY = y
      element.style.transform = `translate(${x}px, ${y}px) skewX(${skewX}deg) scaleY(${scaleY})`
      options.onMapDrag?.()
    }

    const onPointerUp = () => {
      if (!state.isDragging) return
      state.isDragging = false
      element.classList.remove('grabbing')
      if (options.isMapNode) {
        element.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
        state.currentX = 0
        state.currentY = 0
        element.style.transform = 'translate(0px, 0px)'
        const start = performance.now()
        const animate = (t: number) => {
          options.onMapDrag?.()
          if (t - start < 800) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      } else {
        element.style.transition = 'transform 0.5s ease'
        element.style.transform  = `translate(${state.currentX}px, ${state.currentY}px) scale(1) skew(0)`
      }
    }

    element.addEventListener('pointerdown',   onPointerDown)
    element.addEventListener('pointermove',   onPointerMove)
    element.addEventListener('pointerup',     onPointerUp)
    element.addEventListener('pointercancel', onPointerUp)

    return () => {
      element.removeEventListener('pointerdown',   onPointerDown)
      element.removeEventListener('pointermove',   onPointerMove)
      element.removeEventListener('pointerup',     onPointerUp)
      element.removeEventListener('pointercancel', onPointerUp)
    }
  })

  return () => cleanups.forEach((fn) => fn())
}
