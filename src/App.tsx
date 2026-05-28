import { useEffect, useRef, useState } from 'react'

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
  { value: '879',   text: 'Лет со дня основания' },
  { value: '№1',    text: 'В России по IT-технологиям', className: 'accent-bg' },
  { value: '200+',  text: 'Музеев и галерей' },
]

type Person = {
  name: string
  years: string
  description: string
}

const people: Person[] = [
  { name: 'Георгий Жуков',       years: '1896–1974', description: 'Армия и Наука' },
  { name: 'Сергей Королёв',      years: '1907–1966', description: 'Армия и Наука' },
  { name: 'Михаил Булгаков',     years: '1891–1940', description: 'Общество и Культура' },
  { name: 'Раневская',           years: '1896–1984', description: 'Общество и Культура' },
  { name: 'Владимир Высоцкий',   years: '1938–1980', description: 'Общество и Культура' },
  { name: 'Сергей Собянин',      years: 'род. 1971',  description: 'Экономика и Государство' },
  { name: 'Юрий Долгорукий',     years: '1086–1157', description: 'Экономика и Государство' },
  { name: 'Иван III',            years: '1440–1505', description: 'Экономика и Государство' },
]

function updateLines(mapContainer: HTMLDivElement | null) {
  if (!mapContainer) return
  const nodes = Array.from(mapContainer.querySelectorAll<HTMLElement>('.node-card'))
  const lines = Array.from(mapContainer.querySelectorAll<SVGLineElement>('.map-connections line'))
  const containerRect = mapContainer.getBoundingClientRect()
  nodes.forEach((node, index) => {
    const rect = node.getBoundingClientRect()
    const x = `${(((rect.left + rect.width / 2) - containerRect.left) / containerRect.width) * 100}%`
    const y = `${(((rect.top + rect.height / 2) - containerRect.top) / containerRect.height) * 100}%`
    if (index === 0 && lines[0]) { lines[0].setAttribute('x1', x); lines[0].setAttribute('y1', y) }
    if (index === 1) {
      if (lines[0]) { lines[0].setAttribute('x2', x); lines[0].setAttribute('y2', y) }
      if (lines[1]) { lines[1].setAttribute('x1', x); lines[1].setAttribute('y1', y) }
    }
    if (index === 2 && lines[1]) { lines[1].setAttribute('x2', x); lines[1].setAttribute('y2', y) }
  })
}

function initJellyDrag(
  elements: HTMLElement[],
  options: { isMapNode?: boolean; onMapDrag?: () => void; container?: HTMLElement | null } = {},
) {
  const cleanups = elements.map((element) => {
    const state: DragState = { isDragging: false, startX: 0, startY: 0, currentX: 0, currentY: 0 }
    let naturalLeft = 0, naturalTop = 0, naturalW = 0, naturalH = 0

    const handlePointerDown = (event: PointerEvent) => {
      state.isDragging = true
      element.classList.add('grabbing')
      elements.forEach((item) => { item.style.zIndex = '10' })
      element.style.zIndex = '1000'
      state.startX = event.clientX - state.currentX
      state.startY = event.clientY - state.currentY
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
        const containerRect = options.container.getBoundingClientRect()
        x = Math.max(-naturalLeft, Math.min(containerRect.width  - naturalLeft - naturalW, x))
        y = Math.max(-naturalTop,  Math.min(containerRect.height - naturalTop  - naturalH, y))
      }
      const diffX = x - state.currentX
      const skewX = Math.max(Math.min(diffX * 0.5, 15), -15)
      const scaleY = 1 + Math.min(Math.abs(diffX) * 0.003, 0.2)
      state.currentX = x; state.currentY = y
      element.style.transform = `translate(${x}px, ${y}px) skewX(${skewX}deg) scaleY(${scaleY})`
      if (options.isMapNode) options.onMapDrag?.()
    }

    const handlePointerUp = () => {
      if (!state.isDragging) return
      state.isDragging = false
      element.classList.remove('grabbing')
      if (options.isMapNode) {
        element.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
        state.currentX = 0; state.currentY = 0
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
    element.addEventListener('pointerup',   handlePointerUp)
    element.addEventListener('pointercancel', handlePointerUp)
    return () => {
      element.removeEventListener('pointerdown', handlePointerDown)
      element.removeEventListener('pointermove', handlePointerMove)
      element.removeEventListener('pointerup',   handlePointerUp)
      element.removeEventListener('pointercancel', handlePointerUp)
    }
  })
  return () => { cleanups.forEach((cleanup) => cleanup()) }
}

/* ─── shared Tailwind class snippets ─────────────────────── */
const container = 'max-w-[1200px] mx-auto px-5'
const sectionPy = 'py-[100px] max-[768px]:py-[40px]'
const sectionTitle =
  'text-center text-[2.5rem] font-bold mb-[50px] reveal ' +
  'max-[768px]:text-[1.8rem] max-[768px]:mb-[30px]'
const navLink =
  'no-underline text-primary font-medium transition-colors duration-300 hover:text-accent'

/* ─────────────────────────────────────────────────────────── */

function App() {
  const [heroText,          setHeroText]          = useState('')
  const [isHeaderScrolled,  setIsHeaderScrolled]  = useState(false)
  const [isScrollTopVisible,setIsScrollTopVisible] = useState(false)
  const mapRef     = useRef<HTMLDivElement>(null)
  const sandboxRef = useRef<HTMLDivElement>(null)

  /* typing animation */
  useEffect(() => {
    const text = 'Сердце России'
    let index = 0
    const id = window.setInterval(() => {
      index += 1
      setHeroText(text.slice(0, index))
      if (index >= text.length) window.clearInterval(id)
    }, 100)
    return () => window.clearInterval(id)
  }, [])

  /* scroll reveal */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('active') }) },
      { threshold: 0.1 },
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  /* header & scroll-top button */
  useEffect(() => {
    const onScroll = () => {
      setIsHeaderScrolled(window.scrollY > 50)
      setIsScrollTopVisible(window.scrollY > 500)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* 3-D tilt on bento cards */
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.bento-item'))
    const listeners = cards.map((card) => {
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const rotX = (((e.clientY - rect.top)  / rect.height) - 0.5) * -16
        const rotY = (((e.clientX - rect.left) / rect.width)  - 0.5) * 16
        card.style.transition = 'box-shadow 0.1s ease, background 0.4s ease, color 0.3s ease'
        card.style.transform  = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale(1.04)`
      }
      const onLeave = () => {
        card.style.transition =
          'transform 0.6s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s ease, background 0.45s ease, color 0.35s ease'
        card.style.transform = ''
        setTimeout(() => { card.style.transition = '' }, 650)
      }
      card.addEventListener('mousemove',  onMove)
      card.addEventListener('mouseleave', onLeave)
      return { card, onMove, onLeave }
    })
    return () => {
      listeners.forEach(({ card, onMove, onLeave }) => {
        card.removeEventListener('mousemove',  onMove)
        card.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  /* draggable map nodes & sandbox hubs */
  useEffect(() => {
    const mapContainer  = mapRef.current
    const sandbox       = sandboxRef.current
    const updateMapLines = () => updateLines(mapContainer)
    const cleanupMap  = initJellyDrag(
      Array.from(mapContainer?.querySelectorAll<HTMLElement>('.node-card') ?? []),
      { isMapNode: true, onMapDrag: updateMapLines },
    )
    const cleanupSandbox = initJellyDrag(
      Array.from(sandbox?.querySelectorAll<HTMLElement>('.drag-item-free') ?? []),
      { container: sandbox },
    )
    updateMapLines()
    window.addEventListener('load',   updateMapLines)
    window.addEventListener('resize', updateMapLines)
    return () => {
      cleanupMap(); cleanupSandbox()
      window.removeEventListener('load',   updateMapLines)
      window.removeEventListener('resize', updateMapLines)
    }
  }, [])

  return (
    <>
      {/* ── Header ──────────────────────────────────────────── */}
      <header
        className={[
          'fixed top-0 w-full z-[1000] flex items-center',
          'transition-all duration-[400ms] ease-[cubic-bezier(0.165,0.84,0.44,1)]',
          isHeaderScrolled
            ? 'h-[60px] bg-white/90 backdrop-blur-[10px] shadow-[0_2px_20px_rgba(0,0,0,0.1)]'
            : 'h-20',
        ].join(' ')}
      >
        <div className={`${container} flex justify-between items-center w-full`}>
          <div className="text-2xl font-extrabold text-accent tracking-[2px]">МОСКВА</div>
          <nav className="flex gap-[30px] max-[480px]:hidden">
            <a href="#hero"             className={navLink}>Главная</a>
            <a href="#about"            className={navLink}>О городе</a>
            <a href="#interactive-map"  className={navLink}>Места</a>
            <a href="#ithub"            className={navLink}>IThub</a>
            <a href="#reviews"          className={navLink}>Отзывы</a>
          </nav>
        </div>
      </header>

      <main>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section
          id="hero"
          className="h-screen flex items-center justify-center text-center text-white"
          style={{
            background:
              "linear-gradient(rgba(44,62,80,0.7),rgba(44,62,80,0.7)), url('/img/moscow_background.jpg') center/cover",
          }}
        >
          <div className="reveal">
            <h1
              className={[
                'hero-heading font-bold mb-5 min-h-[1.2em]',
                'text-[4rem] max-[768px]:text-[2rem] max-[768px]:px-[10px]',
              ].join(' ')}
            >
              {heroText}
            </h1>
            <a
              href="#about"
              className={[
                'inline-block py-[15px] px-10 bg-accent text-white no-underline',
                'rounded-[50px] font-bold',
                'transition-all duration-[400ms] ease-[cubic-bezier(0.165,0.84,0.44,1)]',
                'hover:-translate-y-[5px] hover:shadow-[0_10px_20px_rgba(231,76,60,0.3)]',
              ].join(' ')}
            >
              Узнать больше
            </a>
          </div>
        </section>

        {/* ── History ──────────────────────────────────────── */}
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

        {/* ── Stats (bento) ────────────────────────────────── */}
        <section className={`stats ${sectionPy}`}>
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
                <div
                  key={item.value}
                  className={`bento-item reveal ${item.className ?? ''}`}
                >
                  <span className="bento-num">{item.value}</span>
                  <p>{item.text}</p>
                </div>
              ))}
              <div className="bento-item reveal wide">
                <p>
                  «Москва — это город, который никогда не спит, объединяя в себе энергию будущего
                  и величие прошлого»
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Notable people ───────────────────────────────── */}
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

        {/* ── Interactive map ──────────────────────────────── */}
        <section
          className={`pt-[30px] ${sectionPy}`}
          id="interactive-map"
        >
          <div className={container}>
            <h2 className={sectionTitle}>Интерактивные локации</h2>
            <div className="map-container reveal" ref={mapRef}>
              <svg className="map-connections" aria-hidden="true">
                <line stroke="#e74c3c" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
                <line stroke="#e74c3c" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
              </svg>
              {locationNodes.map((node) => (
                <div
                  key={node.title}
                  className="node-card"
                  style={{ top: node.top, left: node.left }}
                >
                  <div className="node-content">
                    <img src={node.image} alt={node.alt} />
                    <div className="node-text">
                      <h4 className="font-semibold text-sm">{node.title}</h4>
                      <p className="node-detail">{node.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── IThub branches ───────────────────────────────── */}
        <section className={`bg-[#f8f9fa] ${sectionPy}`} id="ithub">
          <div className={container}>
            <h2 className={sectionTitle}>Филиалы IThub</h2>
            <div className="ithub-sandbox" ref={sandboxRef}>
              {hubs.map((hub) => (
                <div
                  key={hub.title}
                  className="drag-item-free"
                  style={{ top: hub.top, left: hub.left }}
                >
                  <div className="flex items-center">
                    <span
                      className="status-dot"
                      style={hub.color ? { background: hub.color } : undefined}
                    />
                    <strong>{hub.title}</strong>
                  </div>
                  <div className="hub-details">
                    <img src={hub.image} alt={hub.title} />
                    <p className="text-sm mt-2 text-[#555]">{hub.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Reviews (flip card) ──────────────────────────── */}
        <section className={sectionPy} id="reviews">
          <div className={container}>
            <h2 className={sectionTitle}>Отзывы студентов</h2>

            {/* flip card — perspective wrapper */}
            <div className="w-[350px] h-[450px] mx-auto [perspective:1000px] group reveal">
              {/* inner rotating layer */}
              <div
                className={[
                  'relative w-full h-full [transform-style:preserve-3d]',
                  'transition-transform duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
                  'group-hover:[transform:rotateY(180deg)]',
                ].join(' ')}
              >
                {/* front */}
                <div
                  className={[
                    'absolute inset-0 [backface-visibility:hidden]',
                    'flex flex-col items-center justify-center p-[30px]',
                    'rounded-[30px] bg-white shadow-[0_15px_35px_rgba(0,0,0,0.1)]',
                  ].join(' ')}
                >
                  <img
                    className="w-[40%] rounded-full my-[50px]"
                    src="/img/Alisa.jpg"
                    alt="Алиса Резниченко"
                  />
                  <h3 className="font-bold text-lg mb-1">Алиса Резниченко</h3>
                  <p className="text-[#666] mb-2">Студентка IThub</p>
                  <span className="text-sm text-[#999]">Наведи, чтобы прочитать</span>
                </div>

                {/* back */}
                <div
                  className={[
                    'absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]',
                    'flex flex-col items-center justify-center p-[30px]',
                    'rounded-[30px] bg-accent text-white shadow-[0_15px_35px_rgba(0,0,0,0.1)]',
                  ].join(' ')}
                >
                  <p className="text-center leading-relaxed text-sm">
                    «Проучилась половину первого курса. Понравилось само помещение — чисто, без
                    запаха сигарет, есть отдельные места для курения. В столовой вкусная еда. Вход
                    по пропускам, что добавляет безопасности. Хорошее оснащение: современные
                    компьютеры, в некоторых кабинетах — Mac, есть 3D-принтеры, электронные доски
                    и стилусы. Записываются уроки, что удобно при пропусках. Преподаватели в
                    основном объясняют понятно и спокойно.»
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="py-[50px] bg-primary text-white text-center">
        <div className={container}>
          <div>
            {[
              { href: 'https://github.com/crazy-tosser3', label: 'GitHub',   rel: 'noopener' },
              { href: 'https://t.me/crzto3',              label: 'Telegram', rel: 'noopener' },
              { href: 'mailto:crazytosser3@gmail.com',    label: 'Email' },
            ].map(({ href, label, rel }) => (
              <a
                key={label}
                href={href}
                target={rel ? '_blank' : undefined}
                rel={rel}
                className={[
                  'mx-[5px] inline-block no-underline text-[#8c8c8c]',
                  'transition-[transform,color] duration-300',
                  'hover:scale-110 hover:text-accent',
                ].join(' ')}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── Scroll-to-top button ────────────────────────────── */}
      <button
        type="button"
        aria-label="Наверх"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={[
          'fixed bottom-[30px] right-[30px] w-[50px] h-[50px] z-[999]',
          'bg-accent text-white border-0 rounded-full',
          'flex items-center justify-center cursor-pointer text-xl',
          'transition-[opacity,visibility] duration-300',
          isScrollTopVisible ? 'opacity-100 visible' : 'opacity-0 invisible',
        ].join(' ')}
      >
        ↑
      </button>
    </>
  )
}

export default App
