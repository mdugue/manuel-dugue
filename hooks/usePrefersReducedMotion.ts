import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';
const isRenderingOnServer = typeof window === 'undefined';
const getInitialState = () => {
  return isRenderingOnServer ? true : window.matchMedia(QUERY).matches;
};

export default function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(getInitialState);
  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    const listener = (event: MediaQueryListEvent) =>
      setPrefersReducedMotion(event.matches);
    mediaQueryList.addEventListener('change', listener);
    return () => mediaQueryList.removeEventListener('change', listener);
  }, []);
  return prefersReducedMotion;
}
