import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const Skills = ({ isClicked }) => {
  const inView = useRef(null);
  const isInView = useInView(inView, { once: true });
  const skills_details = [
    {
      class: 'html',
      headline: 'HTML',
    },
    {
      class: 'css',
      headline: 'CSS',
    },
    {
      class: 'react',
      headline: 'React',
    },
    {
      class: 'mongodb',
      headline: 'MongoDB',
    },
    {
      class: 'java',
      headline: 'Java',
    },
    {
      class: 'mysql',
      headline: 'MySQL',
    },
  ];
  return (
    <div id='skills'>
      <center>
        <a href='#skills'>
          <h1
            className='section_heading'
            style={{ color: `${isClicked ? '#fff' : '#000'}` }}>
            <i className='fa-solid fa-hashtag'></i> Skills I am good at
          </h1>
        </a>
      </center>
      <div className='skill_body'>
        <div
          ref={inView}
          style={{
            transform: isInView ? 'none' : 'translateX(-200px)',
            opacity: isInView ? 1 : 0,
            transition: 'all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
            color: `${isClicked ? '#fff' : '#000'}`,
            background: `${isClicked ? '#000' : '#fff'}`,
          }}
          className='skill-bars'>
          {isInView && (
            <div>
              {skills_details.map((skills, index) => (
                <div
                  key={index}
                  className='bar'>
                  <div className='info'>
                    <span>{skills.headline}</span>
                  </div>
                  <div className={`progress-line ${skills.class}`}>
                    <span className={`${isClicked ? 'clicked' : ''}`}></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <img
          style={{
            transform: isInView ? 'scale(1)' : 'scale(0)',
            animation: isInView
              ? 'scaleAnimation 0.8s cubic-bezier(0.17, 0.55, 0.55, 1)'
              : 'none',
          }}
          className='skill_img'
          src='img/skills.png'
          alt=''
        />
      </div>
    </div>
  );
};
