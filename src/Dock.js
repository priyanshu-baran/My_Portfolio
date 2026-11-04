import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
} from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { images } from './icons';
import { useFinePointer, usePrefersReducedMotion } from './hooks';

/** Smooth-scroll to a section of the main page without reloading it. */
export const scrollToSection = (id, reduce) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  window.history.replaceState(null, '', `/main#${id}`);
};

// One entry per icon in icons.js, in the same order.
const ITEMS = [
  { label: 'Home', type: 'home' },
  { label: 'My Journey', type: 'section', id: 'about' },
  { label: 'Skills', type: 'section', id: 'skills' },
  { label: 'My Work', type: 'section', id: 'projects' },
  { label: 'Contact', type: 'section', id: 'contact' },
  {
    label: 'LinkedIn',
    type: 'external',
    href: 'https://www.linkedin.com/in/priyanshu-baran/',
  },
  {
    label: 'GitHub',
    type: 'external',
    href: 'https://github.com/priyanshu-baran',
  },
  {
    label: 'Twitter',
    type: 'external',
    href: 'https://twitter.com/Priyanshu_Baran',
  },
];

export const Dock = ({ isClicked }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <div className='app'>
      <motion.div
        className='progress-bar'
        aria-hidden='true'
        style={{ scaleX }}
      />
      <Docks isClicked={isClicked} />
    </div>
  );
};

const Docks = ({ isClicked }) => {
  const navigate = useNavigate();
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  const mouseX = useMotionValue(null);
  const [active, setActive] = useState(null);
  const [hidden, setHidden] = useState(false);
  const navRef = useRef(null);

  // Publish the dock's real height so page content can keep clear of it.
  useEffect(() => {
    const el = navRef.current;
    if (!el) return undefined;
    const set = () =>
      document.documentElement.style.setProperty(
        '--dock-h',
        `${el.offsetHeight}px`
      );
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Highlight the section currently on screen.
  useEffect(() => {
    const ids = ITEMS.filter((i) => i.id).map((i) => i.id);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    const onTop = () => window.scrollY < 200 && setActive(null);
    window.addEventListener('scroll', onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onTop);
    };
  }, []);

  // On phones the dock slides away while reading and returns on scroll-up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const nearEnd =
        window.innerHeight + y >= document.documentElement.scrollHeight - 80;
      if (Math.abs(y - lastY) > 8) {
        setHidden(y > lastY && y > 120 && !nearEnd);
        lastY = y;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const images_ = isClicked ? images.dark : images.light;

  const handle = (event, item) => {
    if (item.type === 'home') {
      event.preventDefault();
      navigate('/');
    } else if (item.type === 'section') {
      event.preventDefault();
      scrollToSection(item.id, reduce);
    }
  };

  return (
    <nav
      ref={navRef}
      className={`dock ${hidden ? 'dock-hidden' : ''}`}
      aria-label='Page sections and social links'>
      <ul
        className='dock_icons'
        style={{
          background: isClicked
            ? 'rgba(0, 0, 0, 0.5)'
            : 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
        }}
        onMouseMove={(event) => fine && mouseX.set(event.clientX)}
        onMouseLeave={() => mouseX.set(null)}>
        {ITEMS.map((item, index) => (
          <DockItem
            key={item.label}
            item={item}
            src={images_[index]}
            mouseX={mouseX}
            magnify={fine && !reduce}
            current={item.id && active === item.id}
            onClick={(e) => handle(e, item)}
          />
        ))}
      </ul>
    </nav>
  );
};

const baseWidth = 60;
const distanceLimit = baseWidth * 6;
const beyond = distanceLimit + 1;
const distanceInput = [
  -distanceLimit,
  -distanceLimit / 1.25,
  -distanceLimit / 2,
  0,
  distanceLimit / 2,
  distanceLimit / 1.25,
  distanceLimit,
];
const widthOutput = [
  baseWidth,
  baseWidth * 1.3,
  baseWidth * 1.7,
  baseWidth * 2.5,
  baseWidth * 1.7,
  baseWidth * 1.3,
  baseWidth,
];

const DockItem = ({ item, src, mouseX, magnify, current, onClick }) => {
  const ref = useRef(null);
  // Computed only when the mouse moves, no per-icon animation loop needed.
  const distance = useTransform(mouseX, (x) => {
    const el = ref.current;
    if (x === null || !el) return beyond;
    const r = el.getBoundingClientRect();
    return x - (r.left + r.width / 2);
  });
  const width = useSpring(useTransform(distance, distanceInput, widthOutput), {
    damping: 25,
    stiffness: 250,
  });
  const external = item.type === 'external';
  return (
    <li className='dock_li'>
      <motion.a
        ref={ref}
        className={`dock_item ${current ? 'is-current' : ''}`}
        data-label={item.label}
        aria-label={item.label}
        aria-current={current ? 'true' : undefined}
        href={
          item.type === 'home'
            ? '/'
            : item.type === 'section'
            ? `/main#${item.id}`
            : item.href
        }
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
        onClick={onClick}
        style={magnify ? { width } : undefined}>
        <img
          src={src}
          className='icon'
          alt=''
          draggable='false'
        />
      </motion.a>
    </li>
  );
};
