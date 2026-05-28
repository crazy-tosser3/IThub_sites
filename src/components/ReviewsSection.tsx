export function ReviewsSection() {
  return (
    <section className="py-[100px] max-[768px]:py-[40px]" id="reviews">
      <div className="max-w-[1200px] mx-auto px-5">
        <h2 className="text-center text-[2.5rem] font-bold mb-[50px] reveal max-[768px]:text-[1.8rem] max-[768px]:mb-[30px]">
          Отзывы студентов
        </h2>
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
  )
}
