import { type RefObject } from 'react'
import { locationNodes } from '../data'
import { container, sectionPy, sectionTitle } from '../constants/tw'

type Props = { mapRef: RefObject<HTMLDivElement | null> }

export function MapSection({ mapRef }: Props) {
  return (
    <section id="map" className={`pt-[30px] ${sectionPy}`}>
      <div className={container}>
        <h2 className={sectionTitle}>Интерактивные локации</h2>
        <div className="map-container reveal" ref={mapRef}>
          <svg className="map-connections" aria-hidden="true">
            <line stroke="#e74c3c" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
            <line stroke="#e74c3c" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
          </svg>

          {locationNodes.map((node) => (
            <div
              key={node.title}
              className="node-card"
              style={{ top: node.top, left: node.left }}
            >
              <div className="node-content">
                <img src={node.image} alt={node.alt} />
                <div className="node-text">
                  <h4 className="font-semibold text-sm">{node.title}</h4>
                  <p className="node-detail">{node.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
