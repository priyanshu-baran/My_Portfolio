import { useEffect, useState } from 'react';

/** Subscribe to a CSS media query. */
export const useMediaQuery = (query) => {
  const get = () =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia(query).matches
      : false;
  const [matches, setMatches] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
};

export const usePrefersReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)');

/** True on devices with a mouse/trackpad (not touch-first). */
export const useFinePointer = () =>
  useMediaQuery('(hover: hover) and (pointer: fine)');

/** Resolve once every image URL has loaded (or failed), or after `timeout` ms. */
export const preloadImages = (urls, timeout = 4500) =>
  new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (!done) {
        done = true;
        resolve();
      }
    };
    const timer = setTimeout(finish, timeout);
    Promise.all(
      urls.map(
        (src) =>
          new Promise((res) => {
            const img = new Image();
            img.onload = img.onerror = res;
            img.src = src;
          }),
      ),
    ).then(() => {
      clearTimeout(timer);
      finish();
    });
  });
