import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { Skills } from './Skills';
import { Preloader } from './Preloader';
import { Projects } from './Projects';
import { About } from './About';
import { ContactUs } from './ContactUs';

export const Main = ({ isClicked, setIsClicked }) => {
  const [time, setTime] = useState('day');
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const handleClick = () => {
    setTime(time === 'night' ? 'day' : 'night');
    setIsClicked(!isClicked);
  };
  const handleToggleModal = () => {
    setIsOpen((prev) => !prev);
  };
  const handleCopyLink = () => {
    const input = document.getElementById('shareLinkInput');
    input.select();
    navigator.clipboard
      .writeText(input.value)
      .then(() => {
        setIsActive(true);
        toast.success('Copied to Clipboard', {
          style: !isClicked && {
            background: '#333',
            color: '#fff',
          },
        });
        setTimeout(() => {
          window.getSelection().removeAllRanges();
          setIsActive(false);
        }, 3000);
      })
      .catch((error) => {
        console.error('Failed to copy: ', error);
      });
  };
  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      const fileUrl = '/My_CV.pdf';
      const fileName = 'My_CV.pdf';
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('File Downloaded', {
        style: !isClicked && {
          background: '#333',
          color: '#fff',
        },
      });
      setIsDownloading(false);
    }, 2000);
  };
  useEffect(() => {
    setIsClicked(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [setIsClicked]);
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY === 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <div className='img_body'>
            <header className='img_header'>
              <img
                src={`img/logo_${!isClicked ? 'light' : 'dark'}.png`}
                alt='logo'
                className='logo'
                style={{
                  width: '12%',
                  marginLeft: '-120px',
                }}
                onClick={() => window.location.reload()}
              />
            </header>
            <div
              className='Switch'
              data-time={time}>
              <div
                className='Toggle'
                onClick={handleClick}
                data-time={time}>
                <div className='Button'></div>
              </div>
            </div>
            <div className='center'>
              <input
                type='radio'
                defaultChecked
                name='active'
                id='tab-1'
              />
              <input
                type='radio'
                name='active'
                id='tab-2'
              />
              <input
                type='radio'
                name='active'
                id='tab-3'
              />
              <input
                type='radio'
                name='active'
                id='tab-4'
              />
              <div className='sliders'>
                <label htmlFor='tab-1'>
                  <img
                    alt=''
                    src='img/img_1.jpg'
                  />
                </label>
                <label htmlFor='tab-2'>
                  <img
                    alt=''
                    src='img/img_2.jpg'
                  />
                </label>
                <label htmlFor='tab-3'>
                  <img
                    alt=''
                    src='img/img_3.jpg'
                  />
                </label>
                <label htmlFor='tab-4'>
                  <img
                    alt=''
                    src='img/img_4.jpg'
                  />
                </label>
              </div>
              <div className='img-card'>
                <img
                  alt=''
                  src='img/img_1.jpg'
                />
                <img
                  alt=''
                  src='img/img_2.jpg'
                />
                <img
                  alt=''
                  src='img/img_3.jpg'
                />
                <img
                  alt=''
                  src='img/img_4.jpg'
                />
              </div>
            </div>
            <div className='front_text'>
              <h1 className='purples'>Hii, My Name is</h1>
              <h1 className='mint'>Priyanshu Baran</h1>
              <h6
                style={{
                  color: `${isClicked ? '#fff' : '#000'}`,
                }}>
                A full-stack developer who is eager <br />
                to learn new things anytime..!!
              </h6>
              <div className='front_btns'>
                <button
                  className={`download_btn ${isDownloading && 'active'}`}
                  onClick={handleDownload}>
                  &ensp;<div className='spinner'></div>Download My CV&ensp;
                </button>
                <div className='share_btn'>
                  <button
                    className='view-modal'
                    onClick={handleToggleModal}>
                    Share My Webfolio
                  </button>
                  {isOpen && (
                    <div className='popup show'>
                      <header>
                        <span>Share Modal</span>
                        <div
                          className='close'
                          onClick={handleToggleModal}>
                          <i className='uil uil-times'></i>
                        </div>
                      </header>
                      <div className='content'>
                        <p>Share this link via</p>
                        <ul className='icons'>
                          <a
                            href='https://www.linkedin.com/shareArticle?url=https://my-webfolio.netlify.app/'
                            target='_blank'
                            rel='noreferrer'>
                            <i className='fab fa-linkedin'></i>
                          </a>
                          <a
                            href='https://twitter.com/intent/tweet?url=https://my-webfolio.netlify.app/&text=Hey,%20checkout%20this%20web-folio...!!!%0a&via=Priyanshu_Baran'
                            target='_blank'
                            rel='noreferrer'>
                            <i className='fab fa-twitter'></i>
                          </a>
                          <a
                            href='https://www.facebook.com/sharer/sharer.php?u=https://my-webfolio.netlify.app/'
                            target='_blank'
                            rel='noreferrer'>
                            <i className='fab fa-facebook'></i>
                          </a>
                          <a
                            href='https://api.whatsapp.com/send?text=Hey,%20checkout%20this%20web-folio...!!!%0ahttps://my-webfolio.netlify.app/'
                            target='_blank'
                            rel='noreferrer'>
                            <i className='fab fa-whatsapp'></i>
                          </a>
                          <a
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
                            defaultValue='my-webfolio.netlify.app'
                            readOnly
                          />
                          <button onClick={handleCopyLink}>Copy</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              className='scrolldown'
              onClick={() => {
                window.location.href = '/main#about';
              }}
              style={{
                '--color': `${isClicked ? 'yellow' : 'orangered'}`,
                opacity: `${isVisible ? '1' : '0'}`,
                transition: 'opacity 0.5s ease-in-out',
              }}>
              <div className='chevrons'>
                <div className='chevrondown'></div>
                <div className='chevrondown'></div>
              </div>
            </div>
          </div>
          <About isClicked={isClicked} />
          <Skills isClicked={isClicked} />
          <Projects isClicked={!isClicked} />
          <ContactUs isClicked={!isClicked} />
        </>
      )}
    </div>
  );
};
