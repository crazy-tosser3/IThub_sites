import { culturalTraditions } from '../data'
import { container, sectionPy, sectionTitle } from '../constants/tw'

export function CulturalTraditionsSection() {
  return (
    <section id="traditions" className={`traditions ${sectionPy}`}>
      <div className={container}>
        <h2 className={sectionTitle}>Культурные традиции</h2>
        <div className="trad-grid mt-12">
          {culturalTraditions.map((tradition) => (
            <div key={tradition.name} className="reveal trad-card">
              <div className="trad-image-wrapper">
                <img
                  src={tradition.image}
                  alt={tradition.alt}
                  className="trad-image"
                  loading="lazy"
                />
                <div className="trad-image-overlay" />
                <span className="trad-label">{tradition.name}</span>
              </div>
              <div className="trad-info">
                <h3 className="trad-name">{tradition.name}</h3>
                <p className="trad-description">{tradition.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}