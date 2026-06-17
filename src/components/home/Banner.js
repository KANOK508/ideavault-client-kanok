"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const slides = [
  {
    title: "Turn Your Ideas Into Reality",
    subtitle:
      "Share your startup vision with thousands of innovators, get feedback, and validate your concept before you build.",
    cta: "Explore Ideas",
    href: "/ideas",
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
    tag: "🚀 Innovation Hub",
  },
  {
    title: "Discover Trending Startups",
    subtitle:
      "Browse the hottest ideas across Tech, AI, Health, Education and more. Find co-founders and collaborators.",
    cta: "View Trending",
    href: "/ideas",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    tag: "🔥 Trending Now",
  },
  {
    title: "Validate Before You Build",
    subtitle:
      "Get real community feedback on your startup idea. Save time and resources by testing your concept first.",
    cta: "Share Your Idea",
    href: "/add-idea",
    gradient: "from-orange-500 via-amber-500 to-yellow-400",
    tag: "✅ Community Validated",
  },
];

export default function Banner() {
  const currentSlide = useRef(0);
  const slidesRef = useRef([]);
  const dotsRef = useRef([]);
  const intervalRef = useRef(null);

  const goToSlide = (index) => {
    slidesRef.current.forEach((s, i) => {
      if (!s) return;
      s.style.opacity = i === index ? "1" : "0";
      s.style.transform = i === index ? "translateX(0)" : "translateX(40px)";
    });
    dotsRef.current.forEach((d, i) => {
      if (!d) return;
      d.className =
        i === index
          ? "w-8 h-2 rounded-full bg-white transition-all duration-300"
          : "w-2 h-2 rounded-full bg-white/40 transition-all duration-300";
    });
    currentSlide.current = index;
  };

  useEffect(() => {
    goToSlide(0);
    intervalRef.current = setInterval(() => {
      const next = (currentSlide.current + 1) % slides.length;
      goToSlide(next);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="relative h-[520px] sm:h-[600px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          ref={(el) => (slidesRef.current[i] = el)}
          className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${slide.gradient} transition-all duration-700`}
          style={{ opacity: 0, transform: "translateX(40px)" }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white blur-3xl"></div>
          </div>

          <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-sm font-semibold mb-6 backdrop-blur-sm">
              {slide.tag}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              {slide.title}
            </h1>
            <p className="text-lg sm:text-xl text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed">
              {slide.subtitle}
            </p>
            <Link
              href={slide.href}
              className="inline-block bg-white text-gray-900 font-bold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
            >
              {slide.cta} →
            </Link>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            onClick={() => {
              clearInterval(intervalRef.current);
              goToSlide(i);
              intervalRef.current = setInterval(() => {
                const next = (currentSlide.current + 1) % slides.length;
                goToSlide(next);
              }, 5000);
            }}
            className="w-2 h-2 rounded-full bg-white/40 transition-all duration-300"
          />
        ))}
      </div>
    </div>
  );
}
