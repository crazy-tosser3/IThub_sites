import { people } from '../data'
import { container, sectionPy, sectionTitle } from '../constants/tw'

export function PeopleSection() {
  return (
    <section className={`people-section ${sectionPy} pb-[30px]`}>
      <div className={container}>
        <h2 className={sectionTitle}>Выдающиеся личности</h2>
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))] gap-[10px] reveal">
          {people.map((person) => (
            <div key={person.name} className="bento-item reveal">
              <h3 className="text-lg font-semibold mb-1">{person.name}</h3>
              <span className="bento-num">{person.years}</span>
              <p>{person.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
