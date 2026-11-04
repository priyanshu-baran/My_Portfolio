import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { Skills } from './Skills';
import { Projects } from './Projects';
import { About } from './About';
import { ContactUs } from './ContactUs';
import { scrollToSection } from './Dock';
import { usePrefersReducedMotion } from './hooks';

const SHARE_URL = 'https://my-webfolio.netlify.app/';

export const Main = ({ isClicked, toggleTheme }) => {
  const navigate = useNavigate();
  const reduce = usePrefersReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const shareBtnRef = useRef(null);
  const closeBtnRef = useRef(null);
  const toastStyle = !isClicked && { background: '#333', color: '#fff' };

  const handleShare = async () => {
    // Phones/tablets: use the native share sheet when there is one.
    if (navigator.share && window.matchMedia('(pointer: coarse)').matches) {
      try {
        await navigator.share({
          title: 'Priyanshu Baran | Portfolio',
          text: 'Hey, checkout this web-folio...!!!',
          url: SHARE_URL,
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
    link.href = '/My_CV.pdf';
    link.download = 'Priyanshu_Baran_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('File Downloaded', { style: toastStyle });
    setTimeout(() => setIsDownloading(false), 700);
  };

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY < 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <main id='content'>
      <div className='img_body'>
        <header className='img_header'>
          <a
            href='/'
            aria-label='Back to the intro page'
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}>
            <img
              src={`img/logo_${!isClicked ? 'light' : 'dark'}.png`}
              alt='PB portfolio logo'
              className='logo main-logo'
            />
          </a>
        </header>
        <div
          className='Switch'
          data-time={time}>
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
        <div className='center'>
          <input type='radio' defaultChecked name='active' id='tab-1' />
          <input type='radio' name='active' id='tab-2' />
          <input type='radio' name='active' id='tab-3' />
          <input type='radio' name='active' id='tab-4' />
          <div className='sliders'>
            {[1, 2, 3, 4].map((n) => (
              <label
                key={n}
                htmlFor={`tab-${n}`}>
                <img
                  alt={`Select view ${n}`}
                  src={`img/img_${n}.webp`}
                  loading='lazy'
                />
              </label>
            ))}
          </div>
          <div className='img-card'>
            {[1, 2, 3, 4].map((n) => (
              <img
                key={n}
                alt={n === 1 ? 'Priyanshu Baran' : ''}
                src={`img/img_${n}.webp`}
                decoding='async'
              />
            ))}
          </div>
        </div>
        <div className='front_text'>
          <h1 className='purples'>Hii, My Name is</h1>
          <h1 className='mint'>Priyanshu Baran</h1>
          <p
            className='tagline'
            style={{ color: `${isClicked ? '#fff' : '#000'}` }}>
            A full-stack developer who is eager <br />
            to learn new things anytime..!!
          </p>
          <div className='front_btns'>
            <button
              type='button'
              className={`download_btn ${isDownloading && 'active'}`}
              onClick={handleDownload}>
              &ensp;<div className='spinner'></div>Download My CV&ensp;
            </button>
            <div className='share_btn'>
              <button
                type='button'
                ref={shareBtnRef}
                className='view-modal'
                aria-haspopup='dialog'
                aria-expanded={isOpen}
                onClick={handleShare}>
                Share My Webfolio
              </button>
              {isOpen && (
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
                </>
              )}
            </div>
          </div>
        </div>
        <button
          type='button'
          className='scrolldown'
          aria-label='Scroll down to My Journey'
          onClick={() => scrollToSection('about', reduce)}
          style={{
            '--color': `${isClicked ? 'yellow' : 'orangered'}`,
            opacity: `${isVisible ? '1' : '0'}`,
            pointerEvents: isVisible ? 'auto' : 'none',
            transition: 'opacity 0.5s ease-in-out',
          }}>
          <div className='chevrons'>
            <div className='chevrondown'></div>
            <div className='chevrondown'></div>
          </div>
        </button>
      </div>
      <About isClicked={isClicked} />
      <Skills isClicked={isClicked} />
      <Projects isClicked={!isClicked} />
      <ContactUs isClicked={!isClicked} />
      <div
        className='dock-spacer'
        aria-hidden='true'></div>
      </main>
    </>
  );
};
