import { useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export const Skills = ({ isClicked }) => {
  const inView = useRef(null);
  const isInView = useInView(inView, { once: true });
  const inView2 = useRef(null);
  const isInView2 = useInView(inView2, { once: true });
  const skills_details = [
    {
      class: 'spring',
      headline: 'Spring',
    },
    {
      class: 'react',
      headline: 'React',
    },
    {
      class: 'nodejs',
      headline: 'NodeJs',
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
  useEffect(() => {
    const heading = document.getElementById('heading2');
    heading.addEventListener('animationend', (e) => {
      if (e.animationName === 'cursor') {
        heading.style.borderRight = 'none';
      }
    });
  }, []);
  return (
    <div id='skills'>
      <center>
        <a href='#skills'>
          <h1
            ref={inView2}
            className='section_heading'
            id='heading2'
            style={{
              color: `${isClicked ? '#fff' : '#000'}`,
              animation: isInView2
                ? 'cursor 1s 4 step-end, typingskills 2.5s steps(16)'
                : '',
              marginBottom: '160px',
            }}>
            <i className='fa-solid fa-hashtag'></i> Skills I am good at
          </h1>
        </a>
      </center>
      <div
        className='skills_bubble'
        style={{
          transform: isInView ? 'scale(1)' : 'scale(0)',
          animation: isInView
            ? 'scaleAnimation 0.8s cubic-bezier(0.17, 0.55, 0.55, 1)'
            : 'none',
        }}>
        <p id='linode'>
          Linode
          <br />
          &#10025; &#10025; &#10025;
        </p>
        <p id='aws'>
          AWS
          <br />
          &#10025; &#10025; &#10025;
        </p>
        <p id='firebase'>
          Firebase
          <br />
          &#10025; &#10025; &#10025; &#10025;
        </p>
        <p id='aws-ec2'>
          AWS EC2
          <br />
          &#10025; &#10025;
        </p>
        <p id='aws-amplify'>
          AWS Amplify
          <br />
          &#10025; &#10025; &#10025; &#10025;
        </p>
        <p id='mern-stack'>
          AWS Cognito
          <br />
          &#10025; &#10025; &#10025; &#10025;
        </p>
      </div>
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
