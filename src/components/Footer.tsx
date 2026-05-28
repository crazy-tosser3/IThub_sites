export function Footer() {
  return (
    <footer className="py-[50px] bg-primary text-white text-center">
      <div className="max-w-[1200px] mx-auto">
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
              className="mx-[5px] inline-block no-underline text-[#8c8c8c] transition-[transform,color] duration-300 hover:scale-110 hover:text-accent"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
