import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const Skills = ({ isClicked }) => {
  const inView = useRef(null);
  const isInView = useInView(inView, { once: true });
  const skills_details = [
    {
      class: 'css',
      headline: 'CSS',
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
      <div
        className='skills_bubble'
        style={{
          transform: isInView ? 'scale(1)' : 'scale(0)',
          animation: isInView
            ? 'scaleAnimation 0.8s cubic-bezier(0.17, 0.55, 0.55, 1)'
            : 'none',
        }}>
        <p style={{ opacity: '0.6' }}>
          Linode
          <br />
          &#10025; &#10025; &#10025;
        </p>
        <p style={{ top: '50px', left: '850px' }}>
          AWS
          <br />
          &#10025;&#10025;&#10025;
        </p>
        <p style={{ top: '-350px', left: '700px' }}>
          Firebase
          <br />
          &#10025;&#10025;&#10025;&#10025;
        </p>
        <p style={{ top: '25px', left: '500px', opacity: '0.8' }}>
          AWS EC2
          <br />
          &#10025;&#10025;&#10025;&#10025;
        </p>
        <p style={{ top: '-75px', left: '1350px', opacity: '0.5' }}>
          AWS Amplify
          <br />
          &#10025;&#10025;
        </p>
        <p style={{ top: '-220px', left: '50px', opacity: '1' }}>
          MERN Stack
          <br />
          &#10025;&#10025;&#10025;&#10025;&#10025;
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
