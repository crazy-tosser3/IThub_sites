import { symbols } from '../data'
import { container, sectionPy, sectionTitle } from '../constants/tw'

export function SymbolsSection() {
  return (
    <section id="symbols" className={`symbols-section ${sectionPy}`}>
      <div className={container}>
        <h2 className={sectionTitle}>Символы Москвы</h2>
        <div className="symbols-grid mt-12">
          {symbols.map((symbol) => (
            <div
              key={symbol.name}
              className="symbol-card reveal"
            >
              {symbol.image && (
                <div className="symbol-image-wrapper">
                  <img
                    src={symbol.image}
                    alt={symbol.alt || symbol.name}
                    className="symbol-image"
                    loading="lazy"
                  />
                  <div className="symbol-image-overlay" />
                </div>
              )}
              <div className="symbol-info">
                <h3 className="symbol-name">{symbol.name}</h3>
                <p className="symbol-description">{symbol.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
