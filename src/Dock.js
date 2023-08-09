import React, { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
} from 'framer-motion';

import { images } from './icons';
import { useNavigate } from 'react-router-dom';

export const Dock = ({ isClicked }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <div className='app'>
      <motion.div
        className='progress-bar'
        style={{ scaleX }}
      />
      <Docks isClicked={isClicked} />
    </div>
  );
};

const Docks = ({ isClicked }) => {
  const usenavigate = useNavigate('');
  const mouseX = useMotionValue(null);
  const handleImgClick = (index) => {
    switch (index) {
      case 0:
        usenavigate('/');
        break;
      case 1:
        window.location.href = '/main#about';
        break;
      case 2:
        window.location.href = '/main#skills';
        break;
      case 3:
        window.location.href = '/main#projects';
        break;
      case 4:
        console.log('contact');
        break;
      case 5:
        window.open('https://www.linkedin.com/in/priyanshu-baran/', '_blank');
        break;
      case 6:
        window.open('https://github.com/priyanshu-baran', '_blank');
        break;
      case 7:
        window.open('https://twitter.com/Priyanshu_Baran', '_blank');
        break;
      default:
        break;
    }
  };
  return (
    <div className='dock'>
      <div
        className='dock_icons'
        style={{
          background: `${
            isClicked ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'
          }`,
          backdropFilter: 'blur(15px)',
        }}
        onMouseMove={(event) => mouseX.set(event.nativeEvent.x)}
        onMouseLeave={() => mouseX.set(null)}>
        {isClicked
          ? images.dark.map((image, index) => (
              <Img
                src={image}
                key={index}
                mouseX={mouseX}
                onClick={() => handleImgClick(index)}
              />
            ))
          : images.light.map((image, index) => (
              <Img
                src={image}
                key={index}
                mouseX={mouseX}
                onClick={() => handleImgClick(index)}
              />
            ))}
      </div>
    </div>
  );
};

const baseWidth = 60;
const distanceLimit = baseWidth * 6;
const beyondTheDistanceLimit = distanceLimit + 1;
const distanceInput = [
  -distanceLimit,
  -distanceLimit / 1.25,
  -distanceLimit / 2,
  0,
  distanceLimit / 2,
  distanceLimit / 1.25,
  distanceLimit,
];
const widthOutput = [
  baseWidth,
  baseWidth * 1.3,
  baseWidth * 1.7,
  baseWidth * 2.5,
  baseWidth * 1.7,
  baseWidth * 1.3,
  baseWidth,
];

const Img = ({ src, mouseX, onClick }) => {
  const distance = useMotionValue(beyondTheDistanceLimit);
  const width = useSpring(useTransform(distance, distanceInput, widthOutput), {
    damping: 25,
    stiffness: 250,
  });
  const ref = useRef();
  useEffect(() => {
    const updateDistance = () => {
      const el = ref.current;
      const mouseXVal = mouseX.get();
      if (el && mouseXVal !== null) {
        const rect = el.getBoundingClientRect();
        const imgCenterX = rect.left + rect.width / 2;
        const distanceDelta = mouseXVal - imgCenterX;
        distance.set(distanceDelta);
      } else {
        distance.set(beyondTheDistanceLimit);
      }
      requestAnimationFrame(updateDistance);
    };
    requestAnimationFrame(updateDistance);
    return () => {
      cancelAnimationFrame(updateDistance);
    };
  }, [distance, mouseX]);
  return (
    <motion.img
      ref={ref}
      src={src}
      className='icon'
      style={{ width }}
      onClick={onClick}
    />
  );
};
