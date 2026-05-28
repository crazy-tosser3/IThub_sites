import { culturalTraditions } from '../data'
import { container, sectionPy, sectionTitle } from '../constants/tw'

export function CulturalTraditionsSection() {
  return (
    <section className={`traditions ${sectionPy}`}>
      <div className={container}>
        <h2 className={sectionTitle}>Культурные традиции</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12">
          {culturalTraditions.map((tradition) => (
            <div
              key={tradition.name}
              className="reveal text-center bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <h3 className="text-xl font-bold">{tradition.name}</h3>
              <p className="mt-4 text-gray-600">{tradition.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}