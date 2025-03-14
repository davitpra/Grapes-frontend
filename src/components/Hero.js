import { motion, useScroll, useTransform } from 'framer-motion';

const collections = [
  {
    name: "Women's",
    href: "#",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/home-page-04-collection-01.jpg",
    imageAlt: "Woman wearing a comfortable cotton t-shirt.",
  },
  {
    name: "Men's",
    href: "#",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/home-page-04-collection-02.jpg",
    imageAlt: "Man wearing a comfortable and casual cotton t-shirt.",
  },
  {
    name: "Desk Accessories",
    href: "#",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/home-page-04-collection-03.jpg",
    imageAlt:
      "Person sitting at a wooden desk with paper note organizer, pencil and tablet.",
  },
];
export function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const backgroundSize = useTransform(scrollY, [0, 600], ["100%", "200%"]);

  return (
    // <div className="relative z-10 lg:h-screen md:h-[60vh] sm:h-[60vh]">
    <div className="sticky top-0 lg:h-screen md:h-[60vh] sm:h-[60vh]">
      <motion.div
        style={{
          opacity,
          backgroundSize,
          backgroundImage: "url('/images/hero.png')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
        className="absolute inset-0 hidden sm:flex sm:flex-col"
      >
        {/* Background image and overlap */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden sm:flex sm:flex-col"
        >
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
        <div className="relative text-center sm:pb-0 sm:h-[60vh] lg:h-screen">
          {/* Background image and overlap */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex flex-col sm:hidden"
          >
            <div className="relative w-full flex-1 bg-gray-800">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  alt=""
                  src="/images/hero.png"
                  className="size-full object-cover filter blur-[2px]"
                />
              </div>
              <div className="absolute inset-0 bg-black opacity-60" />
            </div>
          </div>
          <div className="relative h-screen flex flex-col justify-center">
            <div className='bg-black bg-opacity-50 py-6 px-20 rounded h-full w-full mx-auto justify-center items-center flex flex-col'>
              <h1 className="text-xl font-bold tracking-tight text-white sm:text-xl md:text-2xl pb-10">
                What are you interested in?
              </h1>
              <div className="mt-8 grid grid-cols-2 gap-48 sm:grid-cols-4">
                <a
                  href="/page1"
                  className="flex flex-col items-center text-white hover:text-gray-300"
                >
                  <img
                    src="/images/photo.png"
                    alt="Icon 1"
                    className="h-12 w-12"
                  />
                  <span className="mt-2">Photo</span>
                </a>
                <a
                  href="/page2"
                  className="flex flex-col items-center text-white hover:text-gray-300"
                >
                  <img
                    src="/images/tattoo.png"
                    alt="Icon 2"
                    className="h-12 w-12"
                  />
                  <span className="mt-2">Tattoo</span>
                </a>
                <a
                  href="/page3"
                  className="flex flex-col items-center text-white hover:text-gray-300"
                >
                  <img
                    src="/images/makeup.png"
                    alt="Icon 3"
                    className="h-12 w-12"
                  />
                  <span className="mt-2">Makeup</span>
                </a>
                <a
                  href="/page4"
                  className="flex flex-col items-center text-white hover:text-gray-300"
                >
                  <img
                    src="/images/nail.png"
                    alt="Icon 4"
                    className="h-12 w-12"
                  />
                  <span className="mt-2">Nails</span>
                </a>
              </div>
              {/* appointment and rent */}
              <div className="mt-24 lg:hidden pt-15 flex flex-row justify-space-between">
                <div className="flex flex-1 items-center justify-center">
                  <button
                    type="button"
                    className="p-1 text-white-700 hover:text-gray-500 border-2 border-white "
                  >
                    Appointment
                  </button>
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <button
                    type="button"
                    className="p-1 text-white-700 hover:text-gray-500 border-2 border-white "
                  >
                    Rent a studio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
