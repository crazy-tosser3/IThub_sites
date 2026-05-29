import { useState } from 'react'
import { container } from '../constants/tw'

interface HeaderProps {
  isScrolled: boolean
}

const navLinks = [
  { href: '#history', label: 'История' },
  { href: '#stats', label: 'Факты' },
  { href: '#people', label: 'Личности' },
  { href: '#symbols', label: 'Символы' },
  { href: '#architecture', label: 'Архитектура' },
  { href: '#traditions', label: 'Традиции' },
  { href: '#map', label: 'Карта' },
  { href: '#ithub', label: 'IThub' },
  { href: '#reviews', label: 'Отзывы' },
]

export function Header({ isScrolled }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // A simple burger menu icon
  const BurgerIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16m-7 6h7"
      />
    </svg>
  );

  // A simple close icon
  const CloseIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 shadow-lg backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <div className={`${container} flex items-center justify-between h-20`}>
        <a href="#" className="text-2xl font-bold text-gray-800">
          Москва
        </a>
        
        <nav className="hidden md:block">
          <ul className="flex items-center gap-x-6 lg:gap-x-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-gray-600 font-medium hover:text-accent transition-colors duration-300">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:hidden">
          <button
            className="text-gray-800"
            aria-label="Открыть меню"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <CloseIcon /> : <BurgerIcon />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg">
          <nav>
            <ul className="flex flex-col items-center gap-y-4 py-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-800 font-semibold text-lg hover:text-accent transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}