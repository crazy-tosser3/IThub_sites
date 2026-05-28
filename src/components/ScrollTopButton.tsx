export function ScrollTopButton({ isVisible }: { isVisible: boolean }) {
  return (
    <button
      type="button"
      aria-label="Наверх"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={[
        'fixed bottom-[30px] right-[30px] w-[50px] h-[50px] z-[999]',
        'bg-accent text-white border-0 rounded-full',
        'flex items-center justify-center cursor-pointer text-xl',
        'transition-[opacity,visibility] duration-300',
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible',
      ].join(' ')}
    >
      ↑
    </button>
  )
}
