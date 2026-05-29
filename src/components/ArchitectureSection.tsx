import { architectureEras } from '../data'
import { container, sectionPy, sectionTitle } from '../constants/tw'

export function ArchitectureSection() {
  return (
    <section id="architecture" className={`architecture ${sectionPy} bg-gray-50 text-gray-800`}>
      <div className={container}>
        <h2 className={sectionTitle}>Архитектурные эпохи</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12">
          {architectureEras.map((era) => (
            <div
              key={era.name}
              className="reveal text-center bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <h3 className="text-xl font-bold">{era.name}</h3>
              <p className="mt-4 text-gray-600">{era.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}