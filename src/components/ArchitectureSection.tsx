import { architectureEras } from '../data'
import { container, sectionPy, sectionTitle } from '../constants/tw'

export function ArchitectureSection() {
  return (
    <section id="architecture" className={`architecture-section ${sectionPy} bg-gray-50 text-gray-800`}>
      <div className={container}>
        <h2 className={sectionTitle}>Архитектурные эпохи</h2>
        <div className="arch-grid mt-12">
          {architectureEras.map((era) => (
            <div
              key={era.name}
              className="arch-card reveal"
            >
              <div className="arch-image-wrapper">
                <img
                  src={era.image}
                  alt={era.alt}
                  className="arch-image"
                  loading="lazy"
                />
                <div className="arch-image-overlay" />
                <span className="arch-label">{era.description}</span>
              </div>
              <div className="arch-info">
                <h3 className="arch-name">{era.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}