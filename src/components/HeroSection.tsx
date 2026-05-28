type Props = { heroText: string }

export function HeroSection({ heroText }: Props) {
  return (
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
  )
}
