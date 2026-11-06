import { motion } from 'framer-motion';

import { profile, projects, skillGroups } from '../data/portfolio';
import { CountUp, useTilt } from './ui';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] } },
};

export const Hero = ({ onDownload, isDownloading, onShare, shareBtnRef, shareOpen }) => {
  const tilt = useTilt(7);
  const technologies = skillGroups.reduce((n, g) => n + g.skills.length, 0);
  const stats = [
    { value: projects.length, label: 'Projects built' },
    { value: technologies, label: 'Technologies' },
    ...profile.highlights,
  ];

  return (
    <section
      className='hero-main'
      aria-labelledby='hero-title'>
      <div className='container hero-grid'>
        <motion.div
          className='hero-copy'
          variants={container}
          initial='hidden'
          animate='show'>
          <motion.p
            variants={item}
            className='mono-chip'>
            <span
              className='prompt'
              aria-hidden='true'>
              &gt;
            </span>
            {profile.eyebrow}
          </motion.p>
          <motion.h1
            variants={item}
            id='hero-title'
            className='hero-title'>
            <span className='sr-only'>{profile.name}</span>
            <span aria-hidden='true'>
              {profile.firstName}
              <br />
              {profile.name.replace(profile.firstName, '').trim()}
            </span>
          </motion.h1>
          <motion.p
            variants={item}
            className='hero-role-line'>
            <strong>{profile.role}</strong>
            <span aria-hidden='true'> · </span>
            <span>{profile.status}</span>
          </motion.p>
          <motion.p
            variants={item}
            className='hero-summary'>
            {profile.summary}
          </motion.p>

          <motion.div
            variants={item}
            className='hero-actions'>
            <button
              type='button'
              className={`btn btn-primary ${isDownloading ? 'is-loading' : ''}`}
              onClick={onDownload}>
              <i
                className='fa-solid fa-file-arrow-down'
                aria-hidden='true'></i>
              <span>Download CV</span>
              <span
                className='btn-spinner'
                aria-hidden='true'></span>
            </button>
            <button
              type='button'
              ref={shareBtnRef}
              className='btn btn-secondary'
              aria-haspopup='dialog'
              aria-expanded={shareOpen}
              onClick={onShare}>
              <i
                className='fa-solid fa-share-nodes'
                aria-hidden='true'></i>
              <span>Share<span className='hide-sm'> My Webfolio</span></span>
            </button>
            <a
              className='btn-icon'
              href={profile.links.github}
              target='_blank'
              rel='noreferrer noopener'
              aria-label='GitHub profile'>
              <i
                className='fa-brands fa-github'
                aria-hidden='true'></i>
            </a>
            <a
              className='btn-icon'
              href={profile.links.linkedin}
              target='_blank'
              rel='noreferrer noopener'
              aria-label='LinkedIn profile'>
              <i
                className='fa-brands fa-linkedin-in'
                aria-hidden='true'></i>
            </a>
          </motion.div>

          <motion.ul
            variants={item}
            className='stats'
            aria-label='Highlights'>
            {stats.map((s) => (
              <li
                key={s.label}
                className='stat'>
                <strong>
                  <CountUp
                    value={s.value}
                    decimals={s.decimals || 0}
                  />
                </strong>
                <span>{s.label}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className='hero-visual'
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}>
          <div
            className='portrait'
            {...tilt}>
            <div
              className='portrait-ring'
              aria-hidden='true'></div>
            <picture>
              <source
                srcSet={`${profile.photo}.avif`}
                type='image/avif'
              />
              <img
                src={`${profile.photo}.webp`}
                alt={profile.photoAlt}
                width='720'
                height='900'
                fetchpriority='high'
                decoding='async'
              />
            </picture>
            {profile.floatingTags.map((tag, i) => (
              <span
                key={tag}
                className={`float-tag float-${i}`}
                aria-hidden='true'>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
