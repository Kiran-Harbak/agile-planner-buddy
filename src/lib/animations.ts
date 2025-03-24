
import { useEffect, useState } from 'react';

type AnimationProps = {
  duration?: number;
  delay?: number;
  once?: boolean;
  startVisible?: boolean;
};

// Fade in animation hook
export function useFadeIn({ 
  duration = 500, 
  delay = 0, 
  once = true, 
  startVisible = false
}: AnimationProps = {}) {
  const [isVisible, setIsVisible] = useState(startVisible);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  return {
    className: `transition-opacity duration-${duration} ${isVisible ? 'opacity-100' : 'opacity-0'}`,
    style: { transitionDelay: `${delay}ms` },
  };
}

// Staggered fade-in for children
export function useStaggeredChildren(itemCount: number, baseDelay = 100, initialDelay = 0) {
  return Array.from({ length: itemCount }).map((_, index) => ({
    className: 'animate-fade-in',
    style: { animationDelay: `${initialDelay + index * baseDelay}ms` },
  }));
}

// Slide up animation
export function useSlideUp({ 
  duration = 500, 
  delay = 0, 
  once = true,
  startVisible = false
}: AnimationProps = {}) {
  const [isVisible, setIsVisible] = useState(startVisible);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  return {
    className: `transition-all duration-${duration} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`,
    style: { transitionDelay: `${delay}ms` },
  };
}

// Intersection observer animation - reveals elements as they enter viewport
export function useIntersectionAnimation({
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px',
  animationClass = 'animate-fade-in',
} = {}) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(ref);
    
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, threshold, rootMargin]);

  return { 
    ref: setRef, 
    className: isVisible ? animationClass : 'opacity-0'
  };
}
