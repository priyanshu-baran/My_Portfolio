import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { Hero } from './sections/Hero';
import { Journey } from './sections/Journey';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { scrollToSection } from './Dock';
import { profile } from './data/portfolio';
import { usePrefersReducedMotion } from './hooks';

export const Main = ({ isClicked, toggleTheme }) => {
  const navigate = useNavigate();
  const reduce = usePrefersReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const shareBtnRef = useRef(null);
  const closeBtnRef = useRef(null);
  const toastStyle = !isClicked && { background: '#333', color: '#fff' };

  const handleShare = async () => {
    // Phones/tablets: use the native share sheet when there is one.
    if (navigator.share && window.matchMedia('(pointer: coarse)').matches) {
      try {
        await navigator.share({
          title: `${profile.name} | Portfolio`,
          text: 'Hey, checkout this web-folio...!!!',
          url: profile.shareUrl,
        });
        return;
      } catch (e) {
        if (e && e.name === 'AbortError') return;
      }
    }
    setIsOpen((prev) => !prev);
  };
  const closeModal = () => {
    setIsOpen(false);
    shareBtnRef.current?.focus();
  };
  const handleCopyLink = () => {
    const input = document.getElementById('shareLinkInput');
    input.select();
    navigator.clipboard
      .writeText(input.value)
      .then(() => {
        setIsActive(true);
        toast.success('Copied to Clipboard', { style: toastStyle });
        setTimeout(() => {
          window.getSelection().removeAllRanges();
          setIsActive(false);
        }, 3000);
      })
      .catch((error) => {
        console.error('Failed to copy: ', error);
        toast.error('Could not copy, please copy the link manually');
      });
  };
  const handleDownload = () => {
    setIsDownloading(true);
    const link = document.createElement('a');
    link.href = profile.resume.url;
    link.download = profile.resume.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('File Downloaded', { style: toastStyle });
    setTimeout(() => setIsDownloading(false), 700);
  };

  // Arriving on /main#projects etc. (the page used to reload to do this).
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return undefined;
    const t = setTimeout(() => scrollToSection(id, true), 150);
    return () => clearTimeout(t);
  }, []);

  // Share dialog: Esc closes, focus moves in.
  useEffect(() => {
    if (!isOpen) return undefined;
    closeBtnRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && closeModal();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const time = isClicked ? 'night' : 'day';

  return (
    <>
      <a
        className='skip-link'
        href='#about'
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('about', reduce);
        }}>
        Skip to content
      </a>

      {/* Fixed background layer (day/night gradient) and the theme switch */}
      <div
        className='Switch'
        data-time={time}
        aria-hidden='true'></div>
      <div
        className='toggle-dock'
        role='region'
        aria-label='Theme'>
        <button
          type='button'
          className='Toggle'
          role='switch'
          aria-checked={isClicked}
          aria-label='Night mode'
          onClick={toggleTheme}
          data-time={time}>
          <span className='Button'></span>
        </button>
      </div>

      <main
        id='content'
        className='page'>
        <header className='img_header'>
          <a
            href='/'
            aria-label='Back to the intro page'
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}>
            <img
              src={`/img/logo_${!isClicked ? 'light' : 'dark'}.png`}
              alt='PB portfolio logo'
              className='logo main-logo'
            />
          </a>
        </header>

        <Hero
          onDownload={handleDownload}
          isDownloading={isDownloading}
          onShare={handleShare}
          shareBtnRef={shareBtnRef}
          shareOpen={isOpen}
        />
        <Journey />
        <Skills />
        <Projects />
        <Contact night={isClicked} />

        <footer className='site-footer'>
          <p>
            &copy; {new Date().getFullYear()} {profile.name}. Built with React.
          </p>
          <button
            type='button'
            className='link-btn'
            onClick={() =>
              window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
            }>
            Back to top{' '}
            <i
              className='fa-solid fa-arrow-up'
              aria-hidden='true'></i>
          </button>
        </footer>
        <div
          className='dock-spacer'
          aria-hidden='true'></div>
      </main>

      {isOpen &&
        createPortal(
          <>
            <div
              className='popup-backdrop'
              onClick={closeModal}></div>
            <div
              className='popup show'
              role='dialog'
              aria-modal='true'
              aria-label='Share this portfolio'>
              <header>
                <span>Share Modal</span>
                <button
                  type='button'
                  ref={closeBtnRef}
                  className='close'
                  aria-label='Close'
                  onClick={closeModal}>
                  <i className='uil uil-times'></i>
                </button>
              </header>
              <div className='content'>
                <p>Share this link via</p>
                <ul className='icons'>
                  <a
                    aria-label='Share on LinkedIn'
                    href='https://www.linkedin.com/shareArticle?url=https://my-webfolio.netlify.app/'
                    target='_blank'
                    rel='noreferrer'>
                    <i className='fab fa-linkedin'></i>
                  </a>
                  <a
                    aria-label='Share on Twitter'
                    href='https://twitter.com/intent/tweet?url=https://my-webfolio.netlify.app/&text=Hey,%20checkout%20this%20web-folio...!!!%0a&via=Priyanshu_Baran'
                    target='_blank'
                    rel='noreferrer'>
                    <i className='fab fa-twitter'></i>
                  </a>
                  <a
                    aria-label='Share on Facebook'
                    href='https://www.facebook.com/sharer/sharer.php?u=https://my-webfolio.netlify.app/'
                    target='_blank'
                    rel='noreferrer'>
                    <i className='fab fa-facebook'></i>
                  </a>
                  <a
                    aria-label='Share on WhatsApp'
                    href='https://api.whatsapp.com/send?text=Hey,%20checkout%20this%20web-folio...!!!%0ahttps://my-webfolio.netlify.app/'
                    target='_blank'
                    rel='noreferrer'>
                    <i className='fab fa-whatsapp'></i>
                  </a>
                  <a
                    aria-label='Share on Telegram'
                    href='https://telegram.me/share/url?url=https://my-webfolio.netlify.app/&text=Hey,%20checkout%20this%20web-folio...!!!'
                    target='_blank'
                    rel='noreferrer'>
                    <i className='fab fa-telegram-plane'></i>
                  </a>
                </ul>
                <p>Or copy link</p>
                <div className={`field ${isActive && 'active'}`}>
                  <i className='url-icon uil uil-link'></i>
                  <input
                    type='text'
                    id='shareLinkInput'
                    aria-label='Portfolio link'
                    defaultValue='my-webfolio.netlify.app'
                    readOnly
                  />
                  <button
                    type='button'
                    onClick={handleCopyLink}>
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
};
