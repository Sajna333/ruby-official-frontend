// src/components/HeroCarousel.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import "./HeroCarousel.css";

const slides = [
  {
    id: 1,
    image: "/assets/images/hero-slide-1.jpg",
    alt: "Ruby Official — Timeless Traditions, Modern Elegance. Handpicked ethnic wear that celebrates grace, culture & femininity.",
  },
  {
    id: 2,
    image: "/assets/images/hero-slide-2.jpg",
    alt: "Ruby Official — Embrace Colors, Embrace Culture. Kurtis for every occasion.",
  },
  {
    id: 3,
    image: "/assets/images/hero-slide-3.jpg",
    alt: "Ruby Official — Rooted in Tradition, Styled for Today. Olive green & ivory hues for every occasion.",
  },
];

const AUTO_SLIDE_INTERVAL = 5000;

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const goTo = useCallback((i) => {
    setIndex((i + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, AUTO_SLIDE_INTERVAL);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const handleNext = () => {
    next();
    resetTimer();
  };

  const handlePrev = () => {
    prev();
    resetTimer();
  };

  const handleDot = (i) => {
    goTo(i);
    resetTimer();
  };

  return (
    <div
      className="hero-carousel"
      onMouseEnter={() => clearInterval(timerRef.current)}
      onMouseLeave={resetTimer}
    >
      <div
        className="hero-carousel-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide) => (
          <Link
            to="/products"
            className="hero-slide"
            key={slide.id}
            aria-label="Shop Now"
          >
            <img src={slide.image} alt={slide.alt} draggable="false" />
          </Link>
        ))}
      </div>

      <button
        className="hero-arrow hero-arrow-left"
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        &#8249;
      </button>
      <button
        className="hero-arrow hero-arrow-right"
        onClick={handleNext}
        aria-label="Next slide"
      >
        &#8250;
      </button>

      <div className="hero-dots">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            className={`hero-dot ${i === index ? "active" : ""}`}
            onClick={() => handleDot(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;