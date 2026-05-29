import { people } from '../data'
import { container, sectionPy, sectionTitle } from '../constants/tw'

export function PeopleSection() {
  return (
    <section id="people" className={`people ${sectionPy} bg-gray-50 text-gray-800`}>
      <div className={container}>
        <h2 className={sectionTitle}>Выдающиеся личности</h2>
        {/* Изменена сетка для лучшего отображения на мобильных устройствах */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12">
          {people.map((person) => (
            <div
              key={person.name}
              className="reveal text-center bg-white p-4 md:p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <h3 className="text-base md:text-xl font-bold">{person.name}</h3>
              <p className="text-xs md:text-sm text-gray-600 mt-1">{person.years}</p>
              {/* Убран whitespace-nowrap для корректного переноса на мобильных */}
              <p className="mt-2 md:mt-4 text-sm font-semibold text-accent">{person.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}