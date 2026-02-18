"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Puram Consultancy completely transformed our operational workflow. We went from chaotic manual processes to a streamlined automated system that saved us 20 hours a week.",
    name: "Sarah Jenkins",
    role: "CEO, GrowthStart",
  },
  {
    quote:
      "The strategic roadmap they built for our product launch was flawless. We hit our year-one targets in just 4 months. Highly recommended for any startup.",
    name: "David Chen",
    role: "Founder, TechFlow",
  },
  {
    quote:
      "Finally, a consulting firm that speaks in results among a sea of noise. Their systems-first approach is exactly what we needed to scale efficiently.",
    name: "Elena Rodriguez",
    role: "COO, EcoSystems",
  },
  {
    quote:
      "Our digital presence has never been stronger. The team at Puram really understands how to translate vision into action and tangible growth.",
    name: "Mark Thompson",
    role: "Director, BlueWave",
  },
];

const AUTO_SLIDE_MS = 5000;
const TRANSITION_MS = 500;

const TestimonialContent = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <>
      <p className="text-left text-5xl leading-none text-orange-100 sm:text-6xl">&quot;</p>

      <blockquote className="mx-auto mt-2 max-w-4xl text-lg leading-relaxed text-(--color-primary) sm:text-2xl lg:text-[3.1rem] lg:leading-[1.32]">
        {testimonial.quote}
      </blockquote>

      <p className="mt-8 text-2xl font-semibold text-(--color-primary) sm:text-3xl lg:text-[2.7rem]">
        {testimonial.name}
      </p>
      <p className="mt-2 text-lg font-medium text-(--color-secondary) sm:text-2xl lg:text-[2rem]">
        {testimonial.role}
      </p>
    </>
  );
};

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [incomingVisible, setIncomingVisible] = useState(true);
  const timeoutRef = useRef<number | null>(null);

  const transitionTo = useCallback(
    (nextIndex: number, nextDirection: 1 | -1) => {
      if (nextIndex === currentIndex || isTransitioning) {
        return;
      }

      setDirection(nextDirection);
      setPreviousIndex(currentIndex);
      setCurrentIndex(nextIndex);
      setIsTransitioning(true);
      setIncomingVisible(false);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIncomingVisible(true);
        });
      });
    },
    [currentIndex, isTransitioning],
  );

  const handlePrev = () => {
    const nextIndex =
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    transitionTo(nextIndex, -1);
  };

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % testimonials.length;
    transitionTo(nextIndex, 1);
  }, [currentIndex, transitionTo]);

  useEffect(() => {
    if (!isTransitioning) {
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      setPreviousIndex(null);
      setIsTransitioning(false);
      setIncomingVisible(true);
    }, TRANSITION_MS);

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [isTransitioning]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      handleNext();
    }, AUTO_SLIDE_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [handleNext]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold text-(--color-primary) sm:text-4xl lg:text-5xl">
            Real Businesses. Real Growth.
          </h2>
        </div>

        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-6 lg:gap-8">
        <button
          type="button"
          aria-label="Previous testimonial"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition-colors duration-300 hover:bg-slate-100 sm:h-16 sm:w-16 lg:h-[4.5rem] lg:w-[4.5rem]"
          onClick={handlePrev}
        >
          <FiChevronLeft className="text-3xl lg:text-4xl" />
        </button>

        <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center sm:p-10 lg:p-12 xl:p-14">
          <div className="relative min-h-[19rem] sm:min-h-[22rem] lg:min-h-[25rem]">
            {previousIndex !== null ? (
              <div
                className={`absolute inset-0 transition-all duration-[500ms] ease-out ${
                  isTransitioning
                    ? direction === 1
                      ? "-translate-x-8 opacity-0"
                      : "translate-x-8 opacity-0"
                    : "translate-x-0 opacity-100"
                }`}
              >
                <TestimonialContent testimonial={testimonials[previousIndex]} />
              </div>
            ) : null}

            <div
              className={`relative transition-all duration-[500ms] ease-out ${
                incomingVisible
                  ? "translate-x-0 opacity-100"
                  : direction === 1
                    ? "translate-x-8 opacity-0"
                    : "-translate-x-8 opacity-0"
              }`}
            >
              <TestimonialContent testimonial={testimonials[currentIndex]} />
            </div>
          </div>

          <div className="mt-7 flex items-center justify-center gap-2.5">
            {testimonials.map((testimonial, index) => {
              const isActive = index === currentIndex;

              return (
                <button
                  key={testimonial.name}
                  type="button"
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={
                    isActive
                      ? "h-2.5 w-8 rounded-full bg-(--color-secondary)"
                      : "h-2.5 w-2.5 rounded-full bg-slate-300 transition-colors duration-300 hover:bg-slate-400"
                  }
                  onClick={() =>
                    transitionTo(index, index > currentIndex ? 1 : -1)
                  }
                />
              );
            })}
          </div>
        </article>

        <button
          type="button"
          aria-label="Next testimonial"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition-colors duration-300 hover:bg-slate-100 sm:h-16 sm:w-16 lg:h-[4.5rem] lg:w-[4.5rem]"
          onClick={handleNext}
        >
          <FiChevronRight className="text-3xl lg:text-4xl" />
        </button>

        </div>

        <div className="mx-auto mt-8 max-w-4xl">
          <ul className="grid gap-2 text-sm text-slate-600 sm:grid-cols-3 sm:text-base">
            <li className="rounded-xl bg-slate-50 px-3 py-2">
              Increased revenue 230% in 8 months
            </li>
            <li className="rounded-xl bg-slate-50 px-3 py-2">
              Reduced operational inefficiencies by 40%
            </li>
            <li className="rounded-xl bg-slate-50 px-3 py-2">
              Cut customer acquisition cost by 35%
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
