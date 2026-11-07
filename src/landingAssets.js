/**
 * Landing page image loading.
 * Tier 1 = the back layers that must be ready before the intro starts.
 * Tier 2 = the near layers; they load right after and rise into place as soon
 *          as each one arrives (so a slow connection never blocks the intro).
 * KEEP TIER1 IN SYNC with public/preload.js, which starts fetching it before React loads.
 */
export const TIER1 = [
  'background',
  'fog_7',
  'mountain_10',
  'fog_6',
  'mountain_9',
  'mountain_8',
  'fog_5',
  'mountain_7',
];
export const TIER2 = [
  'mountain_6',
  'fog_4',
  'mountain_5',
  'fog_3',
  'mountain_4',
  'mountain_3',
  'fog_2',
  'mountain_2',
  'mountain_1',
  'fog_1',
];
export const STATIC = ['sun_rays', 'black_shadow'];

export const isSmallScreen = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(max-width: 800px)').matches;

const AVIF_PROBE =
  'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADrbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAAAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAETAAAAFgAAAChpaW5mAAAAAAABAAAAGmluZmUCAAAAAAEAAGF2MDFDb2xvcgAAAABqaXBycAAAAEtpcGNvAAAAFGlzcGUAAAAAAAAAAgAAAAIAAAAQcGl4aQAAAAADCAgIAAAADGF2MUOBAAwAAAAAE2NvbHJuY2x4AAEADQAGgAAAABdpcG1hAAAAAAAAAAEAAQQBAoMEAAAAHm1kYXQSAAoFGAA2BCAyCxsAGmmmhAAAq1nM';

let avifPromise;
/** Resolves 'avif' when the browser can decode AVIF, otherwise 'webp'. */
export const detectFormat = () => {
  if (!avifPromise) {
    avifPromise = new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img.width > 0 ? 'avif' : 'webp');
      img.onerror = () => resolve('webp');
      img.src = AVIF_PROBE;
    });
  }
  return avifPromise;
};

export const imageUrl = (name, small, format) =>
  `/img/${name}${small ? '-sm' : ''}.${format}`;

/** Load + decode one image. Never rejects (a missing image shouldn't block the page). */
export const loadImage = (url) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      (img.decode ? img.decode() : Promise.resolve()).then(
        () => resolve(true),
        () => resolve(true),
      );
    };
    img.onerror = () => resolve(false);
    img.src = url;
  });

/** Warm the main page (code + first images) while the visitor reads the intro. */
export const prefetchMainPage = () => {
  const run = () =>
    import('./MainPage').then((m) => m.warmAssets && m.warmAssets());
  if ('requestIdleCallback' in window) window.requestIdleCallback(run);
  else setTimeout(run, 1500);
};
