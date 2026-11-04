import { useInView } from 'framer-motion';
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

import { usePrefersReducedMotion } from './hooks';

// three.js is big: only fetch it when the visitor actually reaches this section.
const Globe = lazy(() => import('react-globe.gl'));

const CONTACT_EMAIL = 'baranpriyanshu3@gmail.com';

export const ContactUs = ({ isClicked }) => {
  const inView = useRef(null);
  const isInView = useInView(inView, { once: true });
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [msg, setMsg] = useState('');
  const globeEl = useRef();
  const arcData = useMemo(() => [...Array(10).keys()].map(() => ({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    color: [
      ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
      ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
    ],
  })), []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend: hand the message to the visitor's mail app, ready to send.
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${msg}\n\n${name}\n${mail}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    toast('Opening your email app...', {
      icon: '✉️',
      style: isClicked && {
        background: '#333',
        color: '#fff',
      },
    });
  };
  const reduce = usePrefersReducedMotion();
  const wrapRef = useRef(null);
  const wrapInView = useInView(wrapRef, { once: true, margin: '200px' });
  const [size, setSize] = useState({ w: 650, h: 600 });
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => {
      const w = Math.round(el.clientWidth);
      const h = Math.round(el.clientHeight);
      if (w && h) setSize({ w, h });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const onGlobeReady = () => {
    const controls = globeEl.current?.controls();
    if (!controls) return;
    controls.autoRotate = !reduce;
    controls.autoRotateSpeed = 1.2;
    controls.enableZoom = false;
  };
  useEffect(() => {
    const heading = document.getElementById('heading4');
    heading.addEventListener('animationend', (e) => {
      if (e.animationName === 'cursor') {
        heading.style.borderRight = 'none';
      }
    });
  }, []);
  return (
    <div id='contact'>
      <center>
        <a href='#contact'>
          <h1
            ref={inView}
            className='section_heading'
            id='heading4'
            style={{
              color: `${isClicked ? '#000' : '#fff'}`,
              animation: isInView
                ? 'cursor 1s 3 step-end, typingprojects 1.5s steps(9)'
                : '',
            }}>
            <i className='fa-solid fa-hashtag'></i>Contact
          </h1>
        </a>
      </center>
      <div
        className='cu_body'
        style={{
          background: isClicked
            ? 'linear-gradient(to bottom, rgba(83, 203, 241, 0.1) 87%, rgba(5, 171, 224, 0.1) 100%)'
            : 'linear-gradient(to bottom, rgba(24, 26, 66, 0.1) 0%, rgba(17, 28, 43, 0.1) 12%)',
        }}>
        <div
          ref={wrapRef}
          className='globe_wrap'
          style={{
            background: isClicked
              ? 'linear-gradient(to bottom, rgba(83, 203, 241, 0.1) 87%, rgba(5, 171, 224, 0.1) 100%)'
              : 'linear-gradient(to bottom, rgba(24, 26, 66, 0.1) 0%, rgba(17, 28, 43, 0.1) 12%)',
          }}
          role='img'
          aria-label='Rotating globe with animated connection arcs'>
          {wrapInView && (
            <Suspense fallback={null}>
              <Globe
                ref={globeEl}
                width={size.w}
                height={size.h}
                onGlobeReady={onGlobeReady}
                globeImageUrl={`img/globe/earth-${
                  isClicked ? 'day' : 'blue-marble'
                }.webp`}
                backgroundImageUrl={`${
                  isClicked ? '' : 'img/globe/night-sky.webp'
                }`}
                atmosphereAltitude={0.25}
                arcsData={arcData}
                arcColor={'color'}
                arcDashLength={() => Math.random()}
                arcDashGap={() => Math.random()}
                arcDashAnimateTime={() => (reduce ? 0 : Math.random() * 4000 + 500)}
              />
            </Suspense>
          )}
        </div>
        <div className={`cu_container ${isClicked ? '' : 'dark'}`}>
          <div className='cu_content'>
            <div className='left-side'>
              <div className='address cu_details'>
                <i className='fas fa-map-marker-alt'></i>
                <div className='topic'>Address</div>
                <div className='text-one'>Varanasi</div>
                <div className='text-two'>Uttar Pradesh</div>
              </div>
              <div className='phone cu_details'>
                <i className='fas fa-phone-alt'></i>
                <div className='topic'>Phone</div>
                <div className='text-one'>+91 6265788336</div>
                {/* <div className='text-two'>+0096 3434 5678</div> */}
              </div>
              <div className='email cu_details'>
                <i className='fas fa-envelope'></i>
                <div className='topic'>Email</div>
                <a className='text-one' href='mailto:baranpriyanshu3@gmail.com'>baranpriyanshu3@gmail.com</a>
                <div className='text-two'>
                  elitecoder.coregamer1803@gmail.com
                </div>
              </div>
            </div>
            <div className='right-side'>
              <div className='topic-text'>Send us a message</div>
              <p>
                If you have any work from me or any types of queries related to
                my web-folio, you can send me message from here. It's my
                pleasure to help you.
              </p>
              <form onSubmit={handleSubmit}>
                <div className={`cu_input-box ${isClicked ? '' : 'dark'}`}>
                  <input
                    type='text'
                    id='cu-name'
                    autoComplete='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label htmlFor='cu-name'>Enter your name</label>
                </div>
                <div className={`cu_input-box ${isClicked ? '' : 'dark'}`}>
                  <input
                    type='email'
                    id='cu-email'
                    autoComplete='email'
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    required
                  />
                  <label htmlFor='cu-email'>Enter your email</label>
                </div>
                <div className={`message-box ${isClicked ? '' : 'dark'}`}>
                  <textarea
                    id='cu-msg'
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    required></textarea>
                  <label htmlFor='cu-msg'>Enter your message</label>
                </div>
                <div className='cu_input-box'>
                  <input
                    type='submit'
                    value='Send Message'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
