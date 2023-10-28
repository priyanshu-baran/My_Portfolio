import { gsap } from 'gsap';
import { useEffect, useState } from 'react';
import { Preloader } from './Preloader';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isBigger, setIsBigger] = useState();
  const timeline = gsap.timeline();
  const usenavigate = useNavigate('');
  useEffect(() => {
    const parallax_el = document.querySelectorAll('.parallax');
    let xValue = 0,
      yValue = 0,
      rotateDegrees = 0;
    const update = (cursorPosition) => {
      parallax_el.forEach((el) => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let isinLeft =
          parseFloat(getComputedStyle(el).left) < window.innerWidth / 2
            ? 1
            : -1;
        let zValue =
          (cursorPosition - parseFloat(getComputedStyle(el).left)) *
          isinLeft *
          0.1;
        let speedz = el.dataset.speedz;
        let rotateSpeed = el.dataset.rotation;
        el.style.transform = `translateX(calc(-50% + ${
          -xValue * speedx
        }px)) translateY(calc(-50% + ${
          yValue * speedy
        }px)) perspective(2300px) translateZ(${zValue * speedz}px) rotateY(${
          rotateDegrees * rotateSpeed
        }deg)`;
      });
    };
    timeline.fromTo(
      '.home_body',
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
      '0'
    );
    timeline.delay(3);
    timeline.fromTo(
      '.bg-img',
      {
        opacity: 0,
      },
      {
        opacity: 1,
        onComplete: () => {
          update(0);
        },
      },
      '1'
    );
    Array.from(parallax_el)
      .filter((el) => !el.classList.contains('text'))
      .forEach((el) => {
        const distance = Number(el.dataset.distance);
        timeline.from(
          el,
          {
            y: el.offsetHeight / 2 + distance,
            duration: 3,
            ease: 'power3.out',
          },
          '1'
        );
      });
    timeline
      .from(
        '.text h3',
        {
          y:
            window.innerHeight -
            document.querySelector('.text h3')?.getBoundingClientRect().top +
            200,
          duration: 2,
        },
        '2.5'
      )
      .from(
        '.text h1',
        {
          y: -150,
          opacity: 0,
          duration: 1.5,
        },
        '3'
      )
      .from(
        '.hiding',
        {
          opacity: 0,
          duration: 1.5,
        },
        '3'
      );
    setTimeout(() => {
      update(0);
    }, 2000);
    window.addEventListener('mousemove', (e) => {
      if (timeline.isActive()) return;
      xValue = e.clientX - window.innerWidth / 2;
      yValue = e.clientY - window.innerHeight / 2;
      rotateDegrees = (xValue / window.innerWidth) * 20;
      update(e.clientX);
    });
    if (window.innerWidth >= 1100) {
      setIsBigger(window.innerWidth * 0.6);
    } else {
      setIsBigger(window.innerWidth * 1.6);
    }
    return () => {
      timeline.kill();
    };
  }, [timeline]);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <div>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className='home_body'>
          <header className='img_header hiding'>
            <img
              src='img/logo_light.png'
              alt='logo'
              className='logo'
            />
          </header>
          <main style={{ maxHeight: `${isBigger}px` }}>
            <div className='vignette hiding'></div>
            <img
              src='img/background.png'
              alt=''
              data-speedx='0.3'
              data-speedy='0.38'
              data-speedz='0'
              data-rotation='0'
              data-distance='-200'
              className='parallax bg-img'
            />
            <img
              src='img/fog_7.png'
              alt=''
              data-speedx='0.27'
              data-speedy='0.32'
              data-speedz='0'
              data-rotation='0'
              data-distance='850'
              className='parallax fog-7'
            />
            <img
              src='img/mountain_10.png'
              alt=''
              data-speedx='0.195'
              data-speedy='0.305'
              data-speedz='0'
              data-rotation='0'
              data-distance='1100'
              className='parallax mountain-10'
            />
            <img
              src='img/fog_6.png'
              alt=''
              data-speedx='0.25'
              data-speedy='0.28'
              data-speedz='0'
              data-rotation='0'
              data-distance='1400'
              className='parallax fog-6'
            />
            <img
              src='img/mountain_9.png'
              alt=''
              data-speedx='0.125'
              data-speedy='0.155'
              data-speedz='0.15'
              data-rotation='0.02'
              data-distance='1700'
              className='parallax mountain-9'
            />
            <img
              src='img/mountain_8.png'
              alt=''
              data-speedx='0.1'
              data-speedy='0.11'
              data-speedz='0'
              data-rotation='0.02'
              data-distance='1800'
              className='parallax mountain-8'
            />
            <img
              src='img/fog_5.png'
              alt=''
              data-speedx='0.16'
              data-speedy='0.105'
              data-speedz='0'
              data-rotation='0'
              data-distance='1900'
              className='parallax fog-5'
            />
            <img
              src='img/mountain_7.png'
              alt=''
              data-speedx='0.1'
              data-speedy='0.1'
              data-speedz='0'
              data-rotation='0.09'
              data-distance='2000'
              className='parallax mountain-7'
            />
            <div
              data-speedx='0.07'
              data-speedy='0.07'
              data-speedz='0'
              data-rotation='0.11'
              className='text parallax'>
              <h2>Hi There...!!!</h2>
              <h1>I am Priyanshu Baran</h1>
              <h3>A FullStack Developer</h3>
              <button
                onClick={() => usenavigate('/main')}
                className='cssbuttons-io-button hiding'>
                Explore
                <div className='btn_icon'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='24'
                    height='24'>
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
            <img
              src='img/mountain_6.png'
              alt=''
              data-speedx='0.065'
              data-speedy='0.05'
              data-speedz='0.05'
              data-rotation='0.12'
              data-distance='2300'
              className='parallax mountain-6'
            />
            <img
              src='img/fog_4.png'
              alt=''
              data-speedx='0.135'
              data-speedy='0.1'
              data-speedz='0'
              data-rotation='0'
              data-distance='2400'
              className='parallax fog-4'
            />
            <img
              src='img/mountain_5.png'
              alt=''
              data-speedx='0.08'
              data-speedy='0.045'
              data-speedz='0.13'
              data-rotation='0.1'
              data-distance='2550'
              className='parallax mountain-5'
            />
            <img
              src='img/fog_3.png'
              alt=''
              data-speedx='0.11'
              data-speedy='0.018'
              data-speedz='0'
              data-rotation='0'
              data-distance='2800'
              className='parallax fog-3'
            />
            <img
              src='img/mountain_4.png'
              alt=''
              data-speedx='0.059'
              data-speedy='0.024'
              data-speedz='0.35'
              data-rotation='0.14'
              data-distance='3200'
              className='parallax mountain-4'
            />
            <img
              src='img/mountain_3.png'
              alt=''
              data-speedx='0.04'
              data-speedy='0.018'
              data-speedz='0.32'
              data-rotation='0.05'
              data-distance='3400'
              className='parallax mountain-3'
            />
            <img
              src='img/fog_2.png'
              alt=''
              data-speedx='0.15'
              data-speedy='0.0115'
              data-speedz='0'
              data-rotation='0'
              data-distance='3600'
              className='parallax fog-2'
            />
            <img
              src='img/mountain_2.png'
              alt=''
              data-speedx='0.0235'
              data-speedy='0.013'
              data-speedz='0.42'
              data-rotation='0.15'
              data-distance='3800'
              className='parallax mountain-2'
            />
            <img
              src='img/mountain_1.png'
              alt=''
              data-speedx='0.027'
              data-speedy='0.018'
              data-speedz='0.53'
              data-rotation='0.2'
              data-distance='4000'
              className='parallax mountain-1'
            />
            <img
              src='img/sun_rays.png'
              alt=''
              className='sun-rays hiding'
            />
            <img
              src='img/black_shadow.png'
              alt=''
              className='black-shadow hiding'
            />
            <img
              src='img/fog_1.png'
              alt=''
              data-speedx='0.12'
              data-speedy='0.01'
              data-speedz='0'
              data-rotation='0'
              data-distance='4200'
              className='parallax fog-1'
            />
          </main>
        </div>
      )}
    </div>
  );
};
