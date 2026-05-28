import { reviews } from '../data'

export function ReviewsSection() {
  return (
    <section className="py-[100px] max-[768px]:py-[40px]" id="reviews">
      <div className="max-w-[1200px] mx-auto px-5">
        <h2 className="text-center text-[2.5rem] font-bold mb-[50px] reveal max-[768px]:text-[1.8rem] max-[768px]:mb-[30px]">
          Отзывы студентов
        </h2>
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {reviews.map((review) => (
            // flip card — perspective wrapper
            <div key={review.name} className="w-[350px] h-[450px] [perspective:1000px] group reveal">
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
                    src={review.image}
                    alt={review.name}
                  />
                  <h3 className="font-bold text-lg mb-1">{review.name}</h3>
                  <p className="text-[#666] mb-2">{review.title}</p>
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
                  <p className="text-center leading-relaxed text-sm">«{review.text}»</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
