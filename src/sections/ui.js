import { useEffect, useRef } from 'react';
import { animate, motion, useInView } from 'framer-motion';

import { useFinePointer, usePrefersReducedMotion } from '../hooks';

/** Fade-up reveal used by every section. `custom` = stagger index. */
export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.08,
      ease: [0.22, 0.61, 0.36, 1],
    },
  }),
};

export const Reveal = ({
  as = 'div',
  index = 0,
  className,
  children,
  ...rest
}) => {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={fadeUp}
      custom={index}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, margin: '-70px' }}
      {...rest}>
      {children}
    </Tag>
  );
};

export const SectionHeader = ({ id, index, eyebrow, title, subtitle }) => (
  <Reveal
    as='header'
    className='sec-head'>
    <span className='sec-eyebrow'>{`// ${index} · ${eyebrow}`}</span>
    <h2 id={id}>{title}</h2>
    {subtitle && <p>{subtitle}</p>}
  </Reveal>
);

/** Counts up to `value` once it scrolls into view. */
export const CountUp = ({ value, decimals = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = usePrefersReducedMotion();
  useEffect(() => {
    if (!inView || !ref.current) return undefined;
    if (reduce) {
      ref.current.textContent = value.toFixed(decimals);
      return undefined;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals, reduce]);
  return <span ref={ref}>{(0).toFixed(decimals)}</span>;
};

/**
 * Subtle 3D tilt that follows the mouse (mouse users only, never with reduced
 * motion). Attach the returned handlers to the element.
 */
export const useTilt = (max = 8) => {
  const ref = useRef(null);
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  const enabled = fine && !reduce;
  const onPointerMove = (e) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty('--ry', `${x * max}deg`);
    ref.current.style.setProperty('--rx', `${-y * max}deg`);
  };
  const onPointerLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty('--ry', '0deg');
    ref.current.style.setProperty('--rx', '0deg');
  };
  return { ref, onPointerMove, onPointerLeave };
};
