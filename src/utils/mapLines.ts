/** Redraws the two SVG lines connecting the three map node-cards. */
export function updateLines(mapContainer: HTMLDivElement | null): void {
  if (!mapContainer) return

  const nodes = Array.from(mapContainer.querySelectorAll<HTMLElement>('.node-card'))
  const lines = Array.from(mapContainer.querySelectorAll<SVGLineElement>('.map-connections line'))
  const containerRect = mapContainer.getBoundingClientRect()

  nodes.forEach((node, index) => {
    const rect = node.getBoundingClientRect()
    const x = `${(((rect.left + rect.width  / 2) - containerRect.left) / containerRect.width)  * 100}%`
    const y = `${(((rect.top  + rect.height / 2) - containerRect.top)  / containerRect.height) * 100}%`

    if (index === 0 && lines[0]) {
      lines[0].setAttribute('x1', x)
      lines[0].setAttribute('y1', y)
    }
    if (index === 1) {
      lines[0]?.setAttribute('x2', x)
      lines[0]?.setAttribute('y2', y)
      lines[1]?.setAttribute('x1', x)
      lines[1]?.setAttribute('y1', y)
    }
    if (index === 2 && lines[1]) {
      lines[1].setAttribute('x2', x)
      lines[1].setAttribute('y2', y)
    }
  })
}
