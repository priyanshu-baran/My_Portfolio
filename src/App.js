import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { Toaster } from 'react-hot-toast';

import { Cursor } from './Cursor';
import { Home } from './Home';
import { Preloader } from './Preloader';
import { usePrefersReducedMotion } from './hooks';

// The main page pulls in framer-motion, the globe (three.js) etc.
// Loading it on demand keeps the landing page fast.
const MainPage = lazy(() => import('./MainPage'));

const readInitialNight = () => {
  try {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'night';
  } catch (e) {
    /* storage can be blocked, fall through */
  }
  return (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
};

const App = () => {
  // `isClicked` is the app's long-standing name for "night mode is on".
  const [isClicked, setIsClicked] = useState(readInitialNight);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', isClicked ? 'night' : 'day');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', isClicked ? '#111c2b' : '#05abe0');
    try {
      localStorage.setItem('theme', isClicked ? 'night' : 'day');
    } catch (e) {
      /* ignore */
    }
  }, [isClicked]);

  // Follow the OS setting live, but only until the visitor picks one themselves.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => {
      try {
        if (localStorage.getItem('theme-chosen')) return;
      } catch (err) {
        /* ignore */
      }
      setIsClicked(e.matches);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /**
   * Theme toggle. Where the browser supports the View Transitions API the new
   * theme is revealed as a circle expanding from the toggle button; elsewhere
   * (and with reduced motion) it falls back to the original slide/fade.
   */
  const toggleTheme = useCallback(
    (event) => {
      const next = !isClicked;
      try {
        localStorage.setItem('theme-chosen', '1');
      } catch (err) {
        /* ignore */
      }
      const root = document.documentElement;
      if (!document.startViewTransition || reduceMotion) {
        setIsClicked(next);
        return;
      }
      const rect = event?.currentTarget?.getBoundingClientRect?.();
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 60;
      const y = rect ? rect.top + rect.height / 2 : 60;
      root.style.setProperty('--vt-x', `${x}px`);
      root.style.setProperty('--vt-y', `${y}px`);
      root.style.setProperty(
        '--vt-r',
        `${Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))}px`
      );
      root.classList.add('vt-active');
      const t = document.startViewTransition(() => {
        flushSync(() => setIsClicked(next));
      });
      t.finished.finally(() => root.classList.remove('vt-active'));
    },
    [isClicked, reduceMotion]
  );

  return (
    <>
      <Toaster position='top-center' />
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Cursor />
                <Home />
              </>
            }
          />
          <Route
            path='/main'
            element={
              <Suspense fallback={<Preloader />}>
                <Cursor isClicked={isClicked} />
                <MainPage
                  isClicked={isClicked}
                  toggleTheme={toggleTheme}
                />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
