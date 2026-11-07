import { gsap } from 'gsap';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Preloader } from './Preloader';
import { usePrefersReducedMotion } from './hooks';
import {
  detectFormat,
  imageUrl,
  isSmallScreen,
  loadImage,
  prefetchMainPage,
  STATIC,
  TIER1,
  TIER2,
} from './landingAssets';

/**
 * Parallax layers, back to front. Values are the originals:
 * [image, css class, speedX, speedY, speedZ, rotation, entrance distance]
 * `null` marks where the hero text sits in the stack (between the far and
 * near mountains, as in the original design).
 */
// (image names are loaded in tiers, see landingAssets.js)
const LAYERS = [
  ['background', 'bg-img', 0.3, 0.38, 0, 0, -200],
  ['fog_7', 'fog-7', 0.27, 0.32, 0, 0, 850],
  ['mountain_10', 'mountain-10', 0.195, 0.305, 0, 0, 1100],
  ['fog_6', 'fog-6', 0.25, 0.28, 0, 0, 1400],
  ['mountain_9', 'mountain-9', 0.125, 0.155, 0.15, 0.02, 1700],
  ['mountain_8', 'mountain-8', 0.1, 0.11, 0, 0.02, 1800],
  ['fog_5', 'fog-5', 0.16, 0.105, 0, 0, 1900],
  ['mountain_7', 'mountain-7', 0.1, 0.1, 0, 0.09, 2000],
  null,
  ['mountain_6', 'mountain-6', 0.065, 0.05, 0.05, 0.12, 2300],
  ['fog_4', 'fog-4', 0.135, 0.1, 0, 0, 2400],
  ['mountain_5', 'mountain-5', 0.08, 0.045, 0.13, 0.1, 2550],
  ['fog_3', 'fog-3', 0.11, 0.018, 0, 0, 2800],
  ['mountain_4', 'mountain-4', 0.059, 0.024, 0.35, 0.14, 3200],
  ['mountain_3', 'mountain-3', 0.04, 0.018, 0.32, 0.05, 3400],
  ['fog_2', 'fog-2', 0.15, 0.0115, 0, 0, 3600],
  ['mountain_2', 'mountain-2', 0.0235, 0.013, 0.42, 0.15, 3800],
  ['mountain_1', 'mountain-1', 0.027, 0.018, 0.53, 0.2, 4000],
  ['fog_1', 'fog-1', 0.12, 0.01, 0, 0, 4200],
];

const ROLES = [
  'Java · Spring Boot · React · Node.js',
  'Building full-stack web apps on AWS',
  'M.Tech CSE student at VNIT',
];

const Picture = ({ name, small, format, ...rest }) => (
  <img
    src={imageUrl(name, small, format)}
    alt=''
    decoding='async'
    draggable='false'
    {...rest}
  />
);

/** Rotating subtitle that types itself. Static when motion is reduced. */
const TypedRole = ({ reduce }) => {
  const [text, setText] = useState(reduce ? ROLES[0] : '');
  useEffect(() => {
    if (reduce) {
      setText(ROLES[0]);
      return undefined;
    }
    let phrase = 0;
    let char = 0;
    let deleting = false;
    let timer;
    const step = () => {
      const full = ROLES[phrase];
      char += deleting ? -1 : 1;
      setText(full.slice(0, char));
      let delay = deleting ? 22 : 48;
      if (!deleting && char === full.length) {
        deleting = true;
        delay = 2200;
      } else if (deleting && char === 0) {
        deleting = false;
        phrase = (phrase + 1) % ROLES.length;
        delay = 350;
      }
      timer = setTimeout(step, delay);
    };
    timer = setTimeout(step, 1900);
    return () => clearTimeout(timer);
  }, [reduce]);
  return (
    <>
      <span className='sr-only'>{ROLES.join('. ')}</span>
      <span aria-hidden='true'>
        {text}
        <span className='caret'></span>
      </span>
    </>
  );
};

export const Home = () => {
  const navigate = useNavigate();
  const reduce = usePrefersReducedMotion();
  const small = useRef(isSmallScreen()).current;
  const [format, setFormat] = useState(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const stageRef = useRef(null);
  // name -> Promise<boolean>; `done` flags let the intro know what is already loaded
  const assets = useRef({ promises: {}, done: {} }).current;

  /**
   * Loading strategy:
   *  1. TIER1 (back layers, small) starts at once, ideally already fetched by
   *     public/preload.js while the JS bundle was downloading.
   *  2. The intro starts as soon as TIER1 is in (max 6 s), not when everything is.
   *  3. TIER2 (near layers) follows immediately and each layer rises into place
   *     the moment it arrives.
   */
  useEffect(() => {
    let alive = true;
    (async () => {
      const fmt = await detectFormat();
      if (!alive) return;
      setFormat(fmt);
      const start = (name) => {
        const p = loadImage(imageUrl(name, small, fmt)).then((ok) => {
          assets.done[name] = true;
          return ok;
        });
        assets.promises[name] = p;
        return p;
      };
      const t0 = performance.now();
      const tier1 = TIER1.map((name) => {
        const p = start(name);
        p.then(() => alive && setProgress((v) => v + 1 / TIER1.length));
        return p;
      });
      await Promise.race([
        Promise.all(tier1),
        new Promise((r) => setTimeout(r, 6000)),
      ]);
      [...TIER2, ...STATIC].forEach(start);
      // keep the loader up a beat so it never just flashes
      await new Promise((r) =>
        setTimeout(r, Math.max(0, 450 - (performance.now() - t0))),
      );
      if (alive) setReady(true);
    })();
    return () => {
      alive = false;
    };
  }, [small, assets]);

  // Centre every layer on its (left, top) point before the first paint.
  // GSAP's percent-based offsets stay correct whatever the image size.
  useLayoutEffect(() => {
    if (!ready) return;
    gsap.set(stageRef.current.querySelectorAll('.layer'), {
      xPercent: -50,
      yPercent: -50,
    });
  }, [ready]);

  useEffect(() => {
    if (!ready) return undefined;
    const stage = stageRef.current;
    const layerEls = Array.from(stage.querySelectorAll('.layer'));
    const cleanups = [];

    // ---- Entrance animation (skippable by any tap / key) -------------------
    let alive = true;
    let skipped = false;
    let tl = null;
    if (!reduce) {
      const k = stage.offsetWidth / 1920;
      tl = gsap.timeline();
      tl.fromTo('.home_body', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0);
      tl.fromTo('.bg-img', { opacity: 0 }, { opacity: 1, duration: 1 }, 0);
      layerEls
        .filter(
          (el) =>
            !el.classList.contains('hero-layer') &&
            !el.classList.contains('cta-layer'),
        )
        .forEach((el) => {
          const name = el.dataset.name;
          const startY = () => {
            const img = el.querySelector('img');
            const ratio = img.naturalWidth
              ? img.naturalHeight / img.naturalWidth
              : 1;
            const height = el.offsetHeight || el.offsetWidth * ratio;
            return height / 2 + Number(el.dataset.distance) * k;
          };
          if (assets.done[name]) {
            tl.from(
              el,
              { y: startY(), duration: 2.2, ease: 'power3.out' },
              0.2,
            );
          } else {
            // Not downloaded yet: hidden now, rises in when it arrives.
            gsap.set(el, { autoAlpha: 0 });
            assets.promises[name].then(() => {
              if (!alive) return;
              if (skipped) gsap.set(el, { autoAlpha: 1 });
              else
                gsap.fromTo(
                  el,
                  { autoAlpha: 1, y: startY() },
                  { y: 0, duration: 1.8, ease: 'power3.out' },
                );
            });
          }
        });
      tl.from(
        '.hero-in',
        { y: 36, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.13 },
        1.1,
      );
      tl.from('.hiding', { opacity: 0, duration: 1 }, 1.4);

      const skip = () => {
        skipped = true;
        tl.timeScale(6);
      };
      window.addEventListener('pointerdown', skip, { once: true });
      window.addEventListener('keydown', skip, { once: true });
      cleanups.push(() => {
        alive = false;
        window.removeEventListener('pointerdown', skip);
        window.removeEventListener('keydown', skip);
        tl.kill();
      });
    }

    // ---- Parallax -----------------------------------------------------------
    if (!reduce) {
      const items = layerEls.map((el) => ({
        el: el.firstElementChild,
        sx: Number(el.dataset.speedx),
        sy: Number(el.dataset.speedy),
        sz: Number(el.dataset.speedz),
        rot: Number(el.dataset.rotation),
        left: el.offsetLeft,
        // keep the headline comfortably on-screen on narrow devices
        damp:
          (el.classList.contains('hero-layer') ||
            el.classList.contains('cta-layer')) &&
          window.innerWidth < 700
            ? 0.3
            : 1,
      }));
      const tgt = { x: 0, y: 0 };
      const cur = { x: 0, y: 0 };
      const touchFirst = !window.matchMedia(
        '(hover: hover) and (pointer: fine)',
      ).matches;
      let lastInput = performance.now();
      let hasGyro = false;
      let raf = 0;
      let last = performance.now();

      const render = () => {
        const vw = window.innerWidth;
        const stageW = stage.offsetWidth;
        const k = stageW / 1920;
        const stageLeft = (vw - stageW) / 2;
        const cx = vw / 2 + (cur.x * vw) / 2 - stageLeft;
        const xV = cur.x * 960 * k;
        const yV = cur.y * 540 * k;
        const deg = cur.x * 10;
        items.forEach((it) => {
          const dir = it.left < stageW / 2 ? 1 : -1;
          const z = (cx - it.left) * dir * 0.1 * k;
          it.el.style.transform = `translate3d(${-xV * it.sx * it.damp}px, ${
            yV * it.sy * it.damp
          }px, 0) perspective(2300px) translateZ(${z * it.sz}px) rotateY(${
            deg * it.rot
          }deg)`;
        });
      };

      const tick = (now) => {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        // Touch devices with no recent input (and no gyro): gentle auto-drift
        if (touchFirst && !hasGyro && now - lastInput > 2000) {
          tgt.x = Math.sin(now / 3200) * 0.55;
          tgt.y = Math.cos(now / 4100) * 0.3;
        }
        const f = 1 - Math.exp(-dt * 5);
        cur.x += (tgt.x - cur.x) * f;
        cur.y += (tgt.y - cur.y) * f;
        render();
        const settled =
          Math.abs(tgt.x - cur.x) < 0.0004 && Math.abs(tgt.y - cur.y) < 0.0004;
        raf =
          settled && !(touchFirst && !hasGyro)
            ? 0
            : requestAnimationFrame(tick);
      };
      const wake = () => {
        if (!raf) {
          last = performance.now();
          raf = requestAnimationFrame(tick);
        }
      };

      const onPointer = (e) => {
        if (e.pointerType === 'touch' && e.buttons === 0) return;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        tgt.x = (e.clientX - vw / 2) / (vw / 2);
        tgt.y = (e.clientY - vh / 2) / (vh / 2);
        lastInput = performance.now();
        wake();
      };
      const onTilt = (e) => {
        if (e.gamma == null || e.beta == null) return;
        hasGyro = true;
        tgt.x = Math.max(-1, Math.min(1, e.gamma / 25)) * 0.7;
        tgt.y = Math.max(-1, Math.min(1, (e.beta - 50) / 25)) * 0.5;
        lastInput = performance.now();
        wake();
      };
      window.addEventListener('pointermove', onPointer, { passive: true });
      window.addEventListener('deviceorientation', onTilt, { passive: true });
      render();
      wake();
      cleanups.push(() => {
        window.removeEventListener('pointermove', onPointer);
        window.removeEventListener('deviceorientation', onTilt);
        cancelAnimationFrame(raf);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [ready, reduce, assets]);

  // While the visitor reads the intro, quietly fetch the main page.
  useEffect(() => {
    if (ready) prefetchMainPage();
  }, [ready]);

  if (!ready)
    return (
      <Preloader
        preview
        progress={progress}
      />
    );

  return (
    <div className='home_body'>
      <header className='img_header hiding'>
        <img
          src='img/logo_light.png'
          alt='PB portfolio logo'
          className='logo'
        />
      </header>
      <main
        className='scene'
        aria-label='Introduction'>
        <div className='vignette hiding'></div>
        <div
          className='stage'
          ref={stageRef}>
          {LAYERS.map((layer) =>
            layer ? (
              <div
                key={layer[0]}
                className={`layer ${layer[1]}`}
                data-name={layer[0]}
                data-speedx={layer[2]}
                data-speedy={layer[3]}
                data-speedz={layer[4]}
                data-rotation={layer[5]}
                data-distance={layer[6]}>
                <Picture
                  name={layer[0]}
                  small={small}
                  format={format}
                />
              </div>
            ) : (
              <div
                key='hero'
                className='layer hero-layer'
                data-speedx='0.07'
                data-speedy='0.07'
                data-speedz='0'
                data-rotation='0.11'
                data-distance='0'>
                <div className='hero'>
                  <p className='hero-eyebrow hero-in'>
                    <span
                      className='dot'
                      aria-hidden='true'></span>
                    Hi there...!!!
                  </p>
                  <h1 className='hero-name hero-in'>
                    <span>Priyanshu</span> <span>Baran</span>
                  </h1>
                  <p className='hero-role hero-in'>
                    <span
                      className='rule'
                      aria-hidden='true'></span>
                    Full-Stack Developer
                    <span
                      className='rule'
                      aria-hidden='true'></span>
                  </p>
                  <p className='hero-typed hero-in'>
                    <TypedRole reduce={reduce} />
                  </p>
                </div>
              </div>
            ),
          )}
          <div
            className='layer cta-layer'
            data-speedx='0.05'
            data-speedy='0.05'
            data-speedz='0'
            data-rotation='0.05'
            data-distance='0'>
            <div className='cta-wrap'>
              <div className='hero-cta hero-in'>
                <button
                  type='button'
                  onClick={() => navigate('/main')}
                  className='cssbuttons-io-button'>
                  Explore
                  <div className='btn_icon'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      width='24'
                      height='24'
                      aria-hidden='true'>
                      <path
                        fill='none'
                        d='M0 0h24v24H0z'></path>
                      <path
                        fill='currentColor'
                        d='M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z'></path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <Picture
            name='sun_rays'
            small={small}
            format={format}
            className='sun-rays hiding'
          />
          <Picture
            name='black_shadow'
            small={small}
            format={format}
            className='black-shadow hiding'
          />
        </div>
      </main>
    </div>
  );
};
