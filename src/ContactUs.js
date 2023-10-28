import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import emailjs from 'emailjs-com';

export const ContactUs = ({ isClicked }) => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [msg, setMsg] = useState('');
  const globeEl = useRef();
  const N = 10;
  const arcData = [...Array(N).keys()].map(() => ({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    color: [
      ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
      ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
    ],
  }));
  const handleSubmit = () => {
    // emailjs.send(
    //   'service_3p3itef',
    //   'template_m3ad2dr',
    //   '',
    //   'If6sZzUtnmSZ5Df7D'
    // );
  };
  useEffect(() => {
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 1.2;
    globeEl.current.controls().minZoom = 20;
    globeEl.current.controls().enableZoom = false;
  }, []);
  return (
    <div id='contact'>
      <center>
        <a href='#contact'>
          <h1
            className='section_heading'
            style={{ color: `${isClicked ? '#000' : '#fff'}` }}>
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
            width={700}
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
              <form action='#'>
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
                    onClick={handleSubmit}
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
