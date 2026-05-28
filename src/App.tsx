import { useEffect, useRef, useState } from 'react'
import './App.css'

type HistoryItem = {
  number: string
  title: string
  text: string
  image: string
  alt: string
}

type LocationNode = {
  title: string
  detail: string
  image: string
  alt: string
  top: string
  left: string
}

type Hub = {
  title: string
  text: string
  image: string
  top: string
  left: string
  color?: string
}

type DragState = {
  isDragging: boolean
  startX: number
  startY: number
  currentX: number
  currentY: number
}

const historyItems: HistoryItem[] = [
  {
    number: '01',
    title: '1147: Начало пути',
    text: 'Первое письменное упоминание Москвы датируется 4 апреля 1147 года. Об этом сообщает Ипатьевская летопись: в этот день ростово-­суздальский князь Юрий Долгорукий встретился в «поселении Москов» со своим союзником князем Святославом Ольговичем. Именно от этой даты российская историческая наука ведёт отсчёт истории города.',
    image: '/img/1147.jpg',
    alt: '1147',
  },
  {
    number: '02',
    title: '1555 - 1561: Златоглавая',
    text: 'Собор Покрова Пресвятой Богородицы (известный как Храм Василия Блаженного) был возведён в честь взятия Казани и освящён 29 июня 1561 года. Его строительство велось в 1555–1561 годах по указу царя Ивана IV Грозного. Именно 29 июня 1561 года, по найденной «летописи» на стенах храма, датировано полное завершение стройки.',
    image: '/img/Sobor.jpg',
    alt: '1561',
  },
  {
    number: '03',
    title: 'Сегодня: Мегаполис',
    text: 'Сегодня Москва — крупнейший город России и один из самых крупных мегаполисов мира. По данным властей, к январю 2025 года её население достигло 13,3 млн человек. Столица сочетает в себе исторические традиции и технологические новшества: на компактной территории рядом с древними памятниками (Кремлёвские стены, храмы, исторические кварталы) выросли ультрасовременные небоскрёбы.',
    image: '/img/moscow_city_history.jpg',
    alt: 'Сегодня',
  },
]

const locationNodes: LocationNode[] = [
  {
    title: 'Кремль',
    detail: 'Главная крепость страны. Здесь принимаются важнейшие решения.',
    image: '/img/kreml.jpg',
    alt: 'Кремль',
    top: '10%',
    left: '15%',
  },
  {
    title: 'Храм Василия Блаженного',
    detail: 'Архитектурный шедевр XVI века, ставший символом всей России.',
    image: '/img/vsiliy_blaj.jpg',
    alt: 'Собор',
    top: '50%',
    left: '45%',
  },
  {
    title: 'Москва-Сити',
    detail: 'Современный деловой квартал с самыми высокими небоскребами Европы.',
    image: '/img/moscow_city.jpg',
    alt: 'Сити',
    top: '15%',
    left: '70%',
  },
]

const hubs: Hub[] = [
  {
    title: 'Центральный филиал',
    text: 'Флагманский кампус в центре. 5 этажей технологий и дизайна.',
    image: '/img/Kurskaya.jpg',
    top: '40px',
    left: '40px',
  },
  {
    title: 'Северный хаб',
    text: 'Уютный кампус рядом с ВДНХ. Идеально для глубокого кодинга.',
    image: '/img/VDNH.jpg',
    top: '120px',
    left: '420px',
    color: '#ff7e05',
  },
  {
    title: 'Восточный кампус',
    text: 'Инновационная точка с акцентом на GameDev и киберспорт.',
    image: '/img/Vostochniy.jpg',
    top: '100px',
    left: '750px',
    color: '#3498db',
  },
]

const stats = [
  { value: '13.1м', text: 'Жителей — самый населенный город Европы', className: 'main-fact' },
  { value: '879', text: 'Лет со дня основания' },
  { value: '№1', text: 'В России по IT-технологиям', className: 'accent-bg' },
  { value: '200+', text: 'Музеев и галерей' },
];


type Person = {
  name: string;
  years: string;
  description: string;
};

const people: Person[] = [
  { name: "Георгий Жуков", years: "1896–1974", description: "Армия и Наука" },
  { name: "Сергей Королёв", years: "1907–1966", description: "Армия и Наука" },
  { name: "Михаил Булгаков", years: "1891–1940", description: "Общество и Культура" },
  { name: "Раневская", years: "1896–1984", description: "Общество и Культура" },
  { name: "Владимир Высоцкий", years: "1938–1980", description: "Общество и Культура" },
  { name: "Сергей Собянин", years: "род. 1971", description: "Экономика и Государство" },
  { name: "Юрий Долгорукий", years: "1086–1157", description: "Экономика и Государство" },
  { name: "Иван III", years: "1440–1505", description: "Экономика и Государство" },
];

function updateLines(mapContainer: HTMLDivElement | null) {
  if (!mapContainer) return

  const nodes = Array.from(mapContainer.querySelectorAll<HTMLElement>('.node-card'))
  const lines = Array.from(mapContainer.querySelectorAll<SVGLineElement>('.map-connections line'))
  const containerRect = mapContainer.getBoundingClientRect()

  nodes.forEach((node, index) => {
    const rect = node.getBoundingClientRect()
    const x = `${(((rect.left + rect.width / 2) - containerRect.left) / containerRect.width) * 100}%`
    const y = `${(((rect.top + rect.height / 2) - containerRect.top) / containerRect.height) * 100}%`

    if (index === 0 && lines[0]) {
      lines[0].setAttribute('x1', x)
      lines[0].setAttribute('y1', y)
    }
    if (index === 1) {
      if (lines[0]) {
        lines[0].setAttribute('x2', x)
        lines[0].setAttribute('y2', y)
      }
      if (lines[1]) {
        lines[1].setAttribute('x1', x)
        lines[1].setAttribute('y1', y)
      }
    }
    if (index === 2 && lines[1]) {
      lines[1].setAttribute('x2', x)
      lines[1].setAttribute('y2', y)
    }
  })
}

function initJellyDrag(
  elements: HTMLElement[],
  options: { isMapNode?: boolean; onMapDrag?: () => void; container?: HTMLElement | null } = {},
) {
  const cleanups = elements.map((element) => {
    const state: DragState = {
      isDragging: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
    }

    // Natural (untransformed) position relative to container, captured on pointerdown
    let naturalLeft = 0
    let naturalTop = 0
    let naturalW = 0
    let naturalH = 0

    const handlePointerDown = (event: PointerEvent) => {
      state.isDragging = true
      element.classList.add('grabbing')

      elements.forEach((item) => {
        item.style.zIndex = '10'
      })
      element.style.zIndex = '1000'

      state.startX = event.clientX - state.currentX
      state.startY = event.clientY - state.currentY

      // Capture natural position BEFORE any new transform is applied.
      // elemRect already includes the current translate(currentX, currentY),
      // so subtract it to get the untransformed offset from the container.
      if (options.container) {
        const containerRect = options.container.getBoundingClientRect()
        const elemRect = element.getBoundingClientRect()
        naturalLeft = elemRect.left - containerRect.left - state.currentX
        naturalTop  = elemRect.top  - containerRect.top  - state.currentY
        naturalW    = elemRect.width
        naturalH    = elemRect.height
      }

      element.setPointerCapture(event.pointerId)
      element.style.transition = 'none'
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!state.isDragging) return

      let x = event.clientX - state.startX
      let y = event.clientY - state.startY

      if (options.container) {
        // Use natural position captured at pointerdown — stable, no transform drift
        const containerRect = options.container.getBoundingClientRect()
        const minX = -naturalLeft
        const maxX = containerRect.width  - naturalLeft - naturalW
        const minY = -naturalTop
        const maxY = containerRect.height - naturalTop  - naturalH

        x = Math.max(minX, Math.min(maxX, x))
        y = Math.max(minY, Math.min(maxY, y))
      }

      const diffX = x - state.currentX
      const skewX = Math.max(Math.min(diffX * 0.5, 15), -15)
      const scaleY = 1 + Math.min(Math.abs(diffX) * 0.003, 0.2)

      state.currentX = x
      state.currentY = y
      element.style.transform = `translate(${x}px, ${y}px) skewX(${skewX}deg) scaleY(${scaleY})`

      if (options.isMapNode) options.onMapDrag?.()
    }

    const handlePointerUp = () => {
      if (!state.isDragging) return
      state.isDragging = false
      element.classList.remove('grabbing')

      if (options.isMapNode) {
        element.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
        state.currentX = 0
        state.currentY = 0
        element.style.transform = 'translate(0px, 0px)'

        const start = performance.now()
        const animate = (time: number) => {
          options.onMapDrag?.()
          if (time - start < 800) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      } else {
        element.style.transition = 'transform 0.5s ease'
        element.style.transform = `translate(${state.currentX}px, ${state.currentY}px) scale(1) skew(0)`
      }
    }

    element.addEventListener('pointerdown', handlePointerDown)
    element.addEventListener('pointermove', handlePointerMove)
    element.addEventListener('pointerup', handlePointerUp)
    element.addEventListener('pointercancel', handlePointerUp)

    return () => {
      element.removeEventListener('pointerdown', handlePointerDown)
      element.removeEventListener('pointermove', handlePointerMove)
      element.removeEventListener('pointerup', handlePointerUp)
      element.removeEventListener('pointercancel', handlePointerUp)
    }
  })

  return () => {
    cleanups.forEach((cleanup) => cleanup())
  }
}

function App() {
  const [heroText, setHeroText] = useState('')
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false)
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const sandboxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const text = 'Сердце России'
    let index = 0
    const intervalId = window.setInterval(() => {
      index += 1
      setHeroText(text.slice(0, index))
      if (index >= text.length) window.clearInterval(intervalId)
    }, 100)

    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active')
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 50)
      setIsScrollTopVisible(window.scrollY > 500)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 3-D tilt for bento cards
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.bento-item'))

    const listeners = cards.map((card) => {
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const cx = rect.width / 2
        const cy = rect.height / 2
        const rotX = ((y - cy) / cy) * -8
        const rotY = ((x - cx) / cx) * 8
        card.style.transition =
          'box-shadow 0.1s ease, background 0.4s ease, color 0.3s ease'
        card.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale(1.04)`
      }

      const onLeave = () => {
        card.style.transition =
          'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.35s ease, background 0.45s ease, color 0.35s ease'
        card.style.transform = ''
        setTimeout(() => {
          card.style.transition = ''
        }, 650)
      }

      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
      return { card, onMove, onLeave }
    })

    return () => {
      listeners.forEach(({ card, onMove, onLeave }) => {
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  useEffect(() => {
    const mapContainer = mapRef.current
    const sandbox = sandboxRef.current
    const updateMapLines = () => updateLines(mapContainer)
    const cleanupMapDrag = initJellyDrag(
      Array.from(mapContainer?.querySelectorAll<HTMLElement>('.node-card') ?? []),
      { isMapNode: true, onMapDrag: updateMapLines },
    )
    const cleanupSandboxDrag = initJellyDrag(
      Array.from(sandbox?.querySelectorAll<HTMLElement>('.drag-item-free') ?? []),
      { container: sandbox },
    )

    updateMapLines()
    window.addEventListener('load', updateMapLines)
    window.addEventListener('resize', updateMapLines)

    return () => {
      cleanupMapDrag()
      cleanupSandboxDrag()
      window.removeEventListener('load', updateMapLines)
      window.removeEventListener('resize', updateMapLines)
    }
  }, [])

  return (
    <>
      <header className={`header${isHeaderScrolled ? ' scrolled' : ''}`}>
        <div className="container header__container">
          <div className="logo">МОСКВА</div>
          <nav className="nav">
            <a href="#hero" className="nav__link">Главная</a>
            <a href="#about" className="nav__link">О городе</a>
            <a href="#interactive-map" className="nav__link">Места</a>
            <a href="#ithub" className="nav__link">IThub</a>
            <a href="#reviews" className="nav__link">Отзывы</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="hero">
          <div className="hero__content reveal">
            <h1>{heroText}</h1>
            <a href="#about" className="btn">Узнать больше</a>
          </div>
        </section>

        <section className="history-modern" id="about">
          <div className="container">
            <h2 className="section-title reveal">История Москвы</h2>
            <div className="history-container">
              {historyItems.map((item) => (
                <div className="history-card reveal" key={item.number}>
                  <div className="history-card__image">
                    <img src={item.image} alt={item.alt} />
                  </div>
                  <div className="history-card__info">
                    <span className="history-card__number">{item.number}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="stats section">
          <div className="container">
            <h2 className="section-title reveal">Москва в цифрах</h2>
            <div className="bento-grid">
              {stats.map((item) => (
                <div className={`bento-item reveal ${item.className ?? ''}`} key={item.value}>
                  <span className="bento-num">{item.value}</span>
                  <p>{item.text}</p>
                </div>
              ))}
              <div className="bento-item reveal wide">
                <p>«Москва — это город, который никогда не спит, объединяя в себе энергию будущего и величие прошлого»</p>
              </div>
            </div>
          </div>
        </section>

        <section className="people-section section reveal">
          <div className="container">
            <h2 className="section-title reveal">Выдающиеся личности</h2>
            <div className="bento-grid reveal">
              {people.map((person) => (
                <div className="bento-item reveal" key={person.name}>
                  <h3>{person.name}</h3>
                  <span className="bento-num">{person.years}</span>
                  <p>{person.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="map-section section" id="interactive-map">
          <div className="container">
            <h2 className="section-title reveal">Интерактивные локации</h2>
            <div className="map-container reveal" ref={mapRef}>
              <svg className="map-connections" aria-hidden="true">
                <line stroke="#e74c3c" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
                <line stroke="#e74c3c" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
              </svg>
              {locationNodes.map((node) => (
                <div className="node-card" style={{ top: node.top, left: node.left }} key={node.title}>
                  <div className="node-content">
                    <img src={node.image} alt={node.alt} />
                    <div className="node-text">
                      <h4>{node.title}</h4>
                      <p className="node-detail">{node.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ithub section" id="ithub">
          <div className="container">
            <h2 className="section-title reveal">Филиалы IThub</h2>
            <div className="ithub-sandbox" ref={sandboxRef}>
              {hubs.map((hub) => (
                <div className="drag-item-free" style={{ top: hub.top, left: hub.left }} key={hub.title}>
                  <div className="hub-main-info">
                    <span className="status-dot" style={hub.color ? { background: hub.color } : undefined}></span>
                    <strong>{hub.title}</strong>
                  </div>
                  <div className="hub-details">
                    <img src={hub.image} alt={hub.title} />
                    <p>{hub.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="reviews section" id="reviews">
          <div className="container">
            <h2 className="section-title reveal">Отзывы студентов</h2>
            <div className="flip-card reveal">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img className="avatar" src="/img/Alisa.jpg" alt="Алиса Резниченко" />
                  <h3>Алиса Резниченко</h3>
                  <p>Студентка IThub</p>
                  <span>Наведи, чтобы прочитать</span>
                </div>
                <div className="flip-card-back">
                  <p>"Проучилась половину первого курса. Понравилось само помещение — чисто, без запаха сигарет, есть отдельные места для курения. В столовой вкусная еда. Вход по пропускам, что добавляет безопасности. Хорошее оснащение: современные компьютеры, в некоторых кабинетах — Mac, есть 3D-принтеры, электронные доски и стилусы. Записываются уроки, что удобно при пропусках. Преподаватели в основном объясняют понятно и спокойно."</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-links">
  <a href="https://github.com/crazy-tosser3" target="_blank" rel="noopener" className="footer-link">
    GitHub
  </a>
  <a href="https://t.me/crzto3" target="_blank" rel="noopener" className="footer-link">
    Telegram
  </a>
  <a href="mailto:crazytosser3@gmail.com" className="footer-link">
    Email
  </a>
</div>
        </div>
      </footer>

      <button
        className={`scroll-top${isScrollTopVisible ? ' show' : ''}`}
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Наверх"
      >
        ↑
      </button>
    </>
  )
}

export default App
