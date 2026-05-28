import { type RefObject } from 'react'
import { hubs } from '../data'
import { container, sectionPy, sectionTitle } from '../constants/tw'

type Props = { sandboxRef: RefObject<HTMLDivElement | null> }

export function IThubSection({ sandboxRef }: Props) {
  return (
    <section className={`bg-[#f8f9fa] ${sectionPy}`} id="ithub">
      <div className={container}>
        <h2 className={sectionTitle}>Филиалы IThub</h2>
        <div className="ithub-sandbox" ref={sandboxRef}>
          {hubs.map((hub) => (
            <div
              key={hub.title}
              className="drag-item-free"
              style={{ top: hub.top, left: hub.left }}
            >
              <div className="flex items-center">
                <span
                  className="status-dot"
                  style={hub.color ? { background: hub.color } : undefined}
                />
                <strong>{hub.title}</strong>
              </div>
              <div className="hub-details">
                <img src={hub.image} alt={hub.title} />
                <p className="text-sm mt-2 text-[#555]">{hub.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
