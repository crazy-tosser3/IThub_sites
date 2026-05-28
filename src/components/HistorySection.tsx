import { historyItems } from '../data'
import { container, sectionPy, sectionTitle } from '../constants/tw'

export function HistorySection() {
  return (
    <section className={sectionPy} id="about">
      <div className={container}>
        <h2 className={sectionTitle}>История Москвы</h2>
        <div className="flex flex-col gap-[100px]">
          {historyItems.map((item, index) => (
            <div
              key={item.number}
              className={[
                'group flex items-center gap-[60px] min-h-[400px] reveal',
                'max-[992px]:flex-col max-[992px]:gap-[30px]',
                index % 2 === 1 ? 'flex-row-reverse' : '',
              ].join(' ')}
            >
              {/* image */}
              <div
                className={[
                  'flex-1 h-[400px] rounded-[40px] overflow-hidden',
                  'shadow-[20px_20px_60px_rgba(0,0,0,0.05)]',
                  'max-[992px]:w-full max-[992px]:h-[250px] max-[768px]:h-[200px]',
                ].join(' ')}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-[1000ms] ease-in-out group-hover:scale-105"
                />
              </div>

              {/* text */}
              <div className="flex-1 relative">
                <span
                  className="absolute top-[-60px] left-[-20px] -z-10 text-[6rem] font-black leading-none"
                  style={{ color: 'rgba(231,76,60,0.1)' }}
                >
                  {item.number}
                </span>
                <h3
                  className={[
                    'text-[2.5rem] font-bold mb-5 text-primary',
                    'max-[992px]:text-[1.8rem]',
                  ].join(' ')}
                >
                  {item.title}
                </h3>
                <p className="text-[1.1rem] text-[#666] leading-[1.8]">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
