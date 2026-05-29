import { symbols } from '../data'
import { container, sectionPy, sectionTitle } from '../constants/tw'

export function SymbolsSection() {
  return (
    <section id="symbols" className={`symbols ${sectionPy}`}>
      <div className={container}>
        <h2 className={sectionTitle}>Символы Москвы</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {symbols.map((symbol) => (
            <div
              key={symbol.name}
              className="reveal flex flex-col bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <h3 className="text-2xl font-bold text-gray-800">{symbol.name}</h3>
              <p className="mt-4 text-gray-600 flex-grow">{symbol.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
