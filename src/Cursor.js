import { useEffect, useRef } from 'react';
import { useFinePointer, usePrefersReducedMotion } from './hooks';

const TRAIL = 35;

/**
 * Glowing cursor trail.
 *  - Only for mouse/trackpad users and never with reduced motion.
 *  - Moves circles with transforms (GPU) rather than left/top (layout).
 *  - The animation loop is cancelled on unmount and sleeps when the mouse is idle.
 * Touch devices get a tap ripple instead (see `.tap-ripple` in responsive.css).
 */
export const Cursor = ({ isClicked }) => {
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  const rootRef = useRef(null);
  const enabled = fine && !reduce;

  useEffect(() => {
    if (!enabled) return undefined;
    const circles = Array.from(rootRef.current.children);
    const pos = circles.map(() => ({ x: -100, y: -100 }));
    const mouse = { x: -100, y: -100 };
    let raf = 0;
    let idleFrames = 0;

    const tick = () => {
      let x = mouse.x;
      let y = mouse.y;
      let moved = false;
      circles.forEach((circle, i) => {
        const p = pos[i];
        if (Math.abs(p.x - x) > 0.1 || Math.abs(p.y - y) > 0.1) moved = true;
        p.x = x;
        p.y = y;
        const s = (circles.length - i) / circles.length;
        circle.style.transform = `translate3d(${x - 10}px, ${y - 10}px, 0) scale(${s})`;
        const next = pos[i + 1] || pos[0];
        x += (next.x - x) * 0.2;
        y += (next.y - y) * 0.2;
      });
      idleFrames = moved ? 0 : idleFrames + 1;
      raf = idleFrames > 30 ? 0 : requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      idleFrames = 0;
      wake();
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  // Touch devices: a small ripple where you tap (replaces the mouse trail)
  useEffect(() => {
    if (fine || reduce) return undefined;
    const onDown = (e) => {
      const r = document.createElement('span');
      r.className = 'tap-ripple';
      r.style.left = `${e.clientX}px`;
      r.style.top = `${e.clientY}px`;
      r.style.backgroundImage = !isClicked
        ? 'linear-gradient(#F44336, #FFEB3B)'
        : 'linear-gradient(#ffffffa1, #242768)';
      r.addEventListener('animationend', () => r.remove());
      document.body.appendChild(r);
    };
    window.addEventListener('pointerdown', onDown, { passive: true });
    return () => window.removeEventListener('pointerdown', onDown);
  }, [fine, reduce, isClicked]);

  if (!enabled) return null;
  return (
    <div
      ref={rootRef}
      aria-hidden='true'>
      {Array.from({ length: TRAIL }).map((_, index) => (
        <div
          className='circle'
          style={{
            backgroundImage: !isClicked
              ? 'linear-gradient(#F44336, #FFEB3B)'
              : 'linear-gradient(#ffffffa1, #242768)',
          }}
          key={index}></div>
      ))}
    </div>
  );
};
