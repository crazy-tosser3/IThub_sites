import { stats } from '../data'
import { container, sectionPy, sectionTitle } from '../constants/tw'

export function StatsSection() {
  return (
    <section id="stats" className={`stats ${sectionPy}`}>
      <div className={container}>
        <h2 className={sectionTitle}>Москва в цифрах</h2>
        <div
          className={[
            'grid grid-cols-4 auto-rows-[180px] gap-5',
            'max-[900px]:grid-cols-2',
            'max-[768px]:grid-cols-1 max-[768px]:auto-rows-auto',
          ].join(' ')}
        >
          {stats.map((item) => (
            <div key={item.value} className={`bento-item reveal ${item.className ?? ''}`}>
              <span className="bento-num">{item.value}</span>
              <p>{item.text}</p>
            </div>
          ))}

          {/* quote card */}
          <div className="bento-item reveal wide">
            <p>
              «Москва — это город, который никогда не спит, объединяя в себе энергию будущего
              и величие прошлого»
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
