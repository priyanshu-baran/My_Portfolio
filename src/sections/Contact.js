import { useInView } from 'framer-motion';
import { lazy, Suspense, useMemo, useRef, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { contact, profile } from '../data/portfolio';
import { usePrefersReducedMotion } from '../hooks';
import { Reveal, SectionHeader } from './ui';

// three.js is big: only fetch it when the visitor actually reaches this section.
const Globe = lazy(() => import('react-globe.gl'));

export const Contact = ({ night }) => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [msg, setMsg] = useState('');
  const reduce = usePrefersReducedMotion();
  const globeEl = useRef();
  const wrapRef = useRef(null);
  const wrapInView = useInView(wrapRef, { once: true, margin: '200px' });
  const [size, setSize] = useState({ w: 480, h: 480 });

  const arcData = useMemo(
    () =>
      [...Array(10).keys()].map(() => ({
        startLat: (Math.random() - 0.5) * 180,
        startLng: (Math.random() - 0.5) * 360,
        endLat: (Math.random() - 0.5) * 180,
        endLng: (Math.random() - 0.5) * 360,
        color: [
          ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
          ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
        ],
      })),
    []
  );

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend: hand the message to the visitor's mail app, ready to send.
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${msg}\n\n${name}\n${mail}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    toast('Opening your email app...', {
      icon: '✉️',
      style: night ? undefined : { background: '#333', color: '#fff' },
    });
  };

  return (
    <section
      id='contact'
      className='section'
      aria-labelledby='contact-title'>
      <div className='container'>
        <SectionHeader
          id='contact-title'
          index='04'
          eyebrow='Contact'
          title="Let's Connect"
          subtitle='Open to internships, full-time roles and interesting projects. Say hello!'
        />
        <div className='contact-grid'>
          <Reveal
            className='card globe-card'
            index={0}>
            <div
              ref={wrapRef}
              className='globe_wrap'
              role='img'
              aria-label='Rotating globe with animated connection arcs'>
              {wrapInView && (
                <Suspense fallback={null}>
                  <Globe
                    ref={globeEl}
                    width={size.w}
                    height={size.h}
                    backgroundColor='rgba(0,0,0,0)'
                    onGlobeReady={onGlobeReady}
                    globeImageUrl={`/img/globe/earth-${night ? 'blue-marble' : 'day'}.webp`}
                    backgroundImageUrl='/img/globe/night-sky.webp'
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
            <p className='globe-caption mono'>
              <i
                className='fa-solid fa-location-dot'
                aria-hidden='true'></i>
              {contact.location}
            </p>
          </Reveal>

          <Reveal
            className='card contact-card'
            index={1}>
            <ul className='contact-list'>
              <li>
                <span
                  className='icon-bubble'
                  aria-hidden='true'>
                  <i className='fa-solid fa-envelope'></i>
                </span>
                <div>
                  <span className='label'>Email</span>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </div>
              </li>
              {contact.showPhone && (
                <li>
                  <span
                    className='icon-bubble'
                    aria-hidden='true'>
                    <i className='fa-solid fa-phone'></i>
                  </span>
                  <div>
                    <span className='label'>Phone</span>
                    <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
                  </div>
                </li>
              )}
              <li>
                <span
                  className='icon-bubble'
                  aria-hidden='true'>
                  <i className='fa-solid fa-location-dot'></i>
                </span>
                <div>
                  <span className='label'>Location</span>
                  <span>{contact.location}</span>
                </div>
              </li>
              <li>
                <span
                  className='icon-bubble'
                  aria-hidden='true'>
                  <i className='fa-brands fa-github'></i>
                </span>
                <div>
                  <span className='label'>GitHub</span>
                  <a
                    href={profile.links.github}
                    target='_blank'
                    rel='noreferrer noopener'>
                    github.com/priyanshu-baran
                  </a>
                </div>
              </li>
            </ul>

            <form
              className='contact-form'
              onSubmit={handleSubmit}>
              <h3>Send a message</h3>
              <div className='field-row'>
                <label htmlFor='cu-name'>
                  Name
                  <input
                    id='cu-name'
                    type='text'
                    autoComplete='name'
                    placeholder='Your name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
                <label htmlFor='cu-email'>
                  Email
                  <input
                    id='cu-email'
                    type='email'
                    autoComplete='email'
                    placeholder='you@company.com'
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    required
                  />
                </label>
              </div>
              <label htmlFor='cu-msg'>
                Message
                <textarea
                  id='cu-msg'
                  rows='4'
                  placeholder='How can I help?'
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  required></textarea>
              </label>
              <button
                type='submit'
                className='btn btn-primary'>
                <i
                  className='fa-solid fa-paper-plane'
                  aria-hidden='true'></i>
                Send message
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
