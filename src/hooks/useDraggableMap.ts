import { useEffect, type RefObject } from 'react'
import { updateLines } from '../utils/mapLines'
import { initJellyDrag } from '../utils/drag'

/** Sets up jelly-drag on map nodes and sandbox hubs, and keeps SVG lines in sync. */
export function useDraggableMap(
  mapRef:     RefObject<HTMLDivElement | null>,
  sandboxRef: RefObject<HTMLDivElement | null>,
): void {
  useEffect(() => {
    const mapContainer = mapRef.current
    const sandbox      = sandboxRef.current
    const updateMapLines = () => updateLines(mapContainer)

    const cleanupMap = initJellyDrag(
      Array.from(mapContainer?.querySelectorAll<HTMLElement>('.node-card') ?? []),
      { isMapNode: true, onMapDrag: updateMapLines },
    )
    const cleanupSandbox = initJellyDrag(
      Array.from(sandbox?.querySelectorAll<HTMLElement>('.drag-item-free') ?? []),
      { container: sandbox },
    )

    updateMapLines()
    window.addEventListener('load',   updateMapLines)
    window.addEventListener('resize', updateMapLines)

    return () => {
      cleanupMap()
      cleanupSandbox()
      window.removeEventListener('load',   updateMapLines)
      window.removeEventListener('resize', updateMapLines)
    }
  }, [mapRef, sandboxRef])
}
