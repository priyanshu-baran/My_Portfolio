import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { toast } from 'react-hot-toast';

export const ContactUs = ({ isClicked }) => {
  const inView = useRef(null);
  const isInView = useInView(inView, { once: true });
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [msg, setMsg] = useState('');
  const globeEl = useRef();
  const arcData = [...Array(10).keys()].map(() => ({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    color: [
      ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
      ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
    ],
  }));
  const handleSubmit = (e) => {
    e.preventDefault();
    toast('Currently not working', {
      icon: '😞',
      style: isClicked && {
        background: '#333',
        color: '#fff',
      },
    });
  };
  useEffect(() => {
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 1.2;
    globeEl.current.controls().enableZoom = false;
  }, []);
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
            <i className='fa-solid fa-hashtag'></i> Contact
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
          style={{
            background: isClicked
              ? 'linear-gradient(to bottom, rgba(83, 203, 241, 0.1) 87%, rgba(5, 171, 224, 0.1) 100%)'
              : 'linear-gradient(to bottom, rgba(24, 26, 66, 0.1) 0%, rgba(17, 28, 43, 0.1) 12%)',
          }}>
          <Globe
            ref={globeEl}
            width={650}
            height={600}
            globeImageUrl={`//unpkg.com/three-globe/example/img/earth-${
              isClicked ? 'day' : 'blue-marble'
            }.jpg`}
            backgroundImageUrl={`${
              isClicked
                ? ''
                : '//unpkg.com/three-globe/example/img/night-sky.png'
            }`}
            atmosphereAltitude={0.25}
            arcsData={arcData}
            arcColor={'color'}
            arcDashLength={() => Math.random()}
            arcDashGap={() => Math.random()}
            arcDashAnimateTime={() => Math.random() * 4000 + 500}
          />
        </div>
        <div className={`cu_container ${isClicked ? '' : 'dark'}`}>
          <div className='cu_content'>
            <div className='left-side'>
              <div className='address cu_details'>
                <i className='fas fa-map-marker-alt'></i>
                <div className='topic'>Address</div>
                <div className='text-one'>Kharar, Mohali</div>
                <div className='text-two'>Chandigarh</div>
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
                <div className='text-one'>baranpriyanshu3@gmail.com</div>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label>Enter your name</label>
                </div>
                <div className={`cu_input-box ${isClicked ? '' : 'dark'}`}>
                  <input
                    type='text'
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    required
                  />
                  <label>Enter your email</label>
                </div>
                <div className={`message-box ${isClicked ? '' : 'dark'}`}>
                  <textarea
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    required></textarea>
                  <label>Enter your message</label>
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
