import { navLink } from '../constants/tw'

type Props = { isScrolled: boolean }

export function Header({ isScrolled }: Props) {
  return (
    <header
      className={[
        'fixed top-0 w-full z-[1000] flex items-center',
        'transition-all duration-[400ms] ease-[cubic-bezier(0.165,0.84,0.44,1)]',
        isScrolled
          ? 'h-[60px] bg-white/90 backdrop-blur-[10px] shadow-[0_2px_20px_rgba(0,0,0,0.1)]'
          : 'h-20',
      ].join(' ')}
    >
      <div className="max-w-[1200px] mx-auto px-5 flex justify-between items-center w-full">
        <div className="text-2xl font-extrabold text-accent tracking-[2px]">МОСКВА</div>
        <nav className="flex gap-[30px] max-[480px]:hidden">
          <a href="#hero"            className={navLink}>Главная</a>
          <a href="#about"           className={navLink}>О городе</a>
          <a href="#interactive-map" className={navLink}>Места</a>
          <a href="#ithub"           className={navLink}>IThub</a>
          <a href="#reviews"         className={navLink}>Отзывы</a>
        </nav>
      </div>
    </header>
  )
}
