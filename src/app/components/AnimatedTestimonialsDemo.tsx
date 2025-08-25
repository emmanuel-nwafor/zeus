"use client"; // Add this to ensure client-side rendering

import { AnimatedTestimonials } from "./ui/animated-testimonials";

const AnimatedTestimonialsDemo = () => {
  const testimonials = [
    {
      quote:
        "Flying with Zeus Airline was a game-changer! The booking process was seamless, and the in-flight service was top-notch. I felt like a VIP from start to finish.",
      name: "Mike Newman",
      designation: "Travel Blogger",
      src: "https://i.pinimg.com/1200x/80/ae/13/80ae13be55fbc3b7d9e9a7840562e944.jpg",
      alt: "Zeus Airline Passenger in Airport",
    },
    {
      quote:
        "Zeus Airline’s affordable fares and modern fleet made my trip unforgettable. The crew’s attention to detail was beyond my expectations.",
      name: "Maggie Daniels",
      designation: "Business Consultant",
      src: "https://i.pinimg.com/736x/7e/bd/91/7ebd911eb9396886072487acf5028230.jpg",
      alt: "Zeus Airline Passenger on Plane",
    },
    {
      quote:
        "The smoothest flight I’ve ever taken! Zeus Airline’s intuitive app and comfortable seats made traveling a breeze. Highly recommend!",
      name: "Daniel Nwosu",
      designation: "Marketing Manager",
      src: "https://i.pinimg.com/736x/41/4d/d5/414dd56201b6a77b35f5b4440e7bb813.jpg",
      alt: "Zeus Airline Passenger at Gate",
    },
    {
      quote:
        "Zeus Airline delivered exceptional service and unbeatable prices. Their eco-friendly initiatives made me proud to fly with them.",
      name: "James Adeyemi",
      designation: "Environmental Researcher",
      src: "https://i.pinimg.com/1200x/3e/f3/50/3ef350dc86cc82a092463e5d795654b5.jpg",
      alt: "Zeus Airline Passenger on Board",
    },
    {
      quote:
        "From check-in to landing, Zeus Airline made my family’s vacation stress-free. The loyalty program perks are a fantastic bonus!",
      name: "Tunde Ibrahim",
      designation: "Family Travel Planner",
      src: "https://i.pinimg.com/736x/0d/81/29/0d8129117fc06f0c440d64758b7d7655.jpg",
      alt: "Zeus Airline Family at Airport",
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials} />;
};

export default AnimatedTestimonialsDemo;