import { people } from '../data'
import { container, sectionPy, sectionTitle } from '../constants/tw'

export function PeopleSection() {
  return (
    <section className={`people ${sectionPy} bg-gray-50 text-gray-800`}>
      <div className={container}>
        <h2 className={sectionTitle}>Выдающиеся личности</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          {people.map((person) => (
            <div
              key={person.name}
              className="reveal text-center bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <h3 className="text-xl font-bold">{person.name}</h3>
              <p className="text-sm text-gray-600">{person.years}</p>
              <p className="mt-4 font-semibold text-accent">{person.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}