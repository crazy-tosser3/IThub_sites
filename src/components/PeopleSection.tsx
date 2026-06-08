import { people } from '../data'
import { container, sectionPy, sectionTitle } from '../constants/tw'

export function PeopleSection() {
  return (
    <section id="people" className={`people-section ${sectionPy} bg-gray-50 text-gray-800`}>
      <div className={container}>
        <h2 className={sectionTitle}>Выдающиеся личности</h2>
        <div className="people-grid mt-12">
          {people.map((person) => (
            <div
              key={person.name}
              className="person-card reveal"
            >
              <div className="person-image-wrapper">
                <img
                  src={person.image}
                  alt={person.name}
                  className="person-image"
                  loading="lazy"
                />
                <div className="person-image-overlay" />
              </div>
              <div className="person-info">
                <h3 className="person-name">{person.name}</h3>
                <p className="person-years">{person.years}</p>
                <span className="person-tag">{person.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}