
export type HistoryItem = {
  number: string
  title: string
  text: string
  image: string
  alt: string
}

export type LocationNode = {
  title: string
  detail: string
  image: string
  alt: string
  top: string
  left: string
}

export type Hub = {
  title: string
  text: string
  image: string
  top: string
  left: string
  color?: string
}

export type DragState = {
  isDragging: boolean
  startX: number
  startY: number
  currentX: number
  currentY: number
}

export type Person = {
  name: string
  years: string
  description: string
}

export type StatItem = {
  value: string
  text: string
  className?: string
}
