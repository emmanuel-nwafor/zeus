"use client";

import Carousel from "./ui/carousel";

export function CarouselDemo() {
  const slideData = [
    {
      title: "Lagos, Nigeria",
      description: "Experience the vibrant energy of Lagos with Zeus Airline’s seamless flights to this bustling cultural hub.",
      button: {
        text: "Book Now",
        className: "mt-3 bottom-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold px-6 py-2 rounded-md hover:bg-blue-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      },
      src: "https://i.pinimg.com/1200x/56/33/09/56330989fdacd69191e5b3b0dcdf56d8.jpg",
      alt: "Lagos Cityscape"
    },
    {
      title: "New York, USA",
      description: "Soar to the Big Apple with Zeus Airline for an unforgettable adventure in the city that never sleeps.",
      button: {
        text: "Book Now",
        className: "mt-3 bottom-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold px-6 py-2 rounded-md hover:bg-blue-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      },
      src: "https://cdn.pixabay.com/photo/2013/06/02/08/49/new-york-115626_640.jpg",
      alt: "New York Skyline"
    },
    {
      title: "Paris, France",
      description: "Discover romance and culture in Paris with Zeus Airline’s comfortable and affordable flights.",
      button: {
        text: "Book Now",
        className: "mt-3 bottom-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold px-6 py-2 rounded-md hover:bg-blue-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      },
      src: "https://i.pinimg.com/1200x/73/4f/63/734f63794802234f24e5ffcbdda1a0b0.jpg",
      alt: "Paris Eiffel Tower"
    },
    {
      title: "Tokyo, Japan",
      description: "Explore Tokyo’s blend of tradition and innovation with Zeus Airline’s reliable and modern fleet.",
      button: {
        text: "Book Now",
        className: "mt-3 bottom-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold px-6 py-2 rounded-md hover:bg-blue-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      },
      src: "https://i.pinimg.com/1200x/9c/d9/58/9cd958c7a75f80ff8c9772d3523f5ed2.jpg",
      alt: "Tokyo Cityscape"
    },
    {
      title: "Dubai, UAE",
      description: "Fly to Dubai’s dazzling skyline with Zeus Airline and enjoy world-class service at unbeatable prices.",
      button: {
        text: "Book Now",
        className: "mt-3 bottom-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold px-6 py-2 rounded-md hover:bg-blue-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      },
      src: "https://i.pinimg.com/736x/9b/a2/e8/9ba2e8790a7b9f85625908e882a62970.jpg",
      alt: "Dubai Skyline"
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
        <h2 className="text-black text-2xl mb-5 text-center dark:text-gray-300 font-bold">
            Our Routes
        </h2>
      <Carousel slides={slideData} />
    </div>
  );
}