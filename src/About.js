import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Timeline = ({
  icon,
  title,
  date,
  content,
  rowStatus,
  buttonContent,
  buttonURL,
  additionalContent,
  isClicked,
}) => {
  const inView = useRef(null);
  const isInView = useInView(inView, { once: true });
  return (
    <div className={`row row-${rowStatus}`}>
      <section
        className={`${isClicked ? 'clicked' : ''}`}
        ref={inView}
        style={{
          background: `${isClicked ? '#000' : '#fff'}`,
          color: `${isClicked ? '#fff' : '#000'}`,
          transform: isInView ? 'scale(1)' : 'scale(0)',
          animation: isInView
            ? 'scaleTimelineAnimation 1s cubic-bezier(0.17, 0.55, 0.55, 1)'
            : 'none',
        }}>
        <i
          className={`timeline_icon fas fa-${icon}`}
          style={{
            boxShadow: `${
              isClicked
                ? '0 0 0 4px #fff, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05)'
                : '0 0 0 4px #000, inset 0 2px 0 rgba(255, 255, 255, 255.08), 0 3px 0 4px rgba(255, 255, 255, 0.05)'
            }`,
            background: `${isClicked ? '#000' : '#f2f2f2'}`,
          }}></i>
        <div className='details'>
          <span className='title'>{title}</span>
          <span>{date}</span>
        </div>
        <p>{content}</p>
        <div className='bottom'>
          {buttonContent ? (
            <a
              href={`${buttonURL}`}
              target='_blank'
              rel='noreferrer'>
              Check it out
            </a>
          ) : (
            ''
          )}
          <i>{additionalContent}</i>
        </div>
      </section>
    </div>
  );
};

export const About = ({ isClicked }) => {
  const timeline_details = [
    {
      icon: 'home',
      title: '12th CBSE Board',
      date: '2020-2021',
      content:
        'Completed my 12th from Mansarovar Public School, Bhopal, Madhya Pradesh.',
      rowStatus: 1,
      buttonContent: 0,
      buttonURL: '',
      additionalContent: '- With an aggregate of 89%',
    },
    {
      icon: 'star',
      title: 'College Life',
      date: '2021-2025',
      content:
        'Currently enrolled in the Bachelor of Engineering (B.E.) program at Chandigarh University, specializing in Electrical Engineering.',
      rowStatus: 2,
      buttonContent: 0,
      buttonURL: '',
      additionalContent: '- With 8.26 CGPA till my 2nd year',
    },
    {
      icon: 'rocket',
      title: 'First Internship',
      date: '30th Oct 2022',
      content:
        'Completed my first internship with Edu-versity in the domain of Embedded System.',
      rowStatus: 1,
      buttonContent: 1,
      buttonURL:
        'https://drive.google.com/file/d/15xTtBfKNPZ9K3ihtYn-8YQDOUyctWQEZ/view?usp=share_link',
      additionalContent: '',
    },
    {
      icon: 'globe',
      title: 'First Appreciation Letter',
      date: '6th Jan 2023',
      content:
        'Got Appreciation Letter from RCB (Royal Challengers Bangalore) for completing my first week in Code to Win Challenge.',
      rowStatus: 2,
      buttonContent: 1,
      buttonURL:
        'https://drive.google.com/file/d/1M8f6ayb49fWlNU3o9qrN38fQBIbD_Fpa/view?usp=share_link',
      additionalContent: '',
    },
    {
      icon: 'paper-plane',
      title: 'College Project',
      date: 'March-May 2023',
      content:
        'I collaborated with my colleagues on a project centered around Home Automation utilizing Esp32 technology.',
      rowStatus: 1,
      buttonContent: 1,
      buttonURL:
        'https://www.linkedin.com/posts/priyanshu-baran_homeautomation-matlabproject-teamwork-activity-7065665431537143808-_9pB?utm_source=share&utm_medium=member_desktop',
      additionalContent: '',
    },
    // {
    //   icon: 'map-marker-alt',
    //   title: 'Title of Section 6',
    //   date: '6th Jan 2021',
    //   content:
    //     'Lorem ipsum dolor sit ameters consectetur adipisicing elit. Sed qui veroes praesentium maiores, sint eos vero sapiente voluptas debitis dicta dolore.',
    //   rowStatus: 2,
    //   buttonContent: 1,
    //   buttonURL: '',
    //   additionalContent: '',
    // },
  ];
  return (
    <div id='about'>
      <center>
        <a href='#about'>
          <h1
            className='section_heading'
            style={{
              color: `${isClicked ? '#fff' : '#000'}`,
            }}>
            <i className='fa-solid fa-hashtag'></i> My Journey
          </h1>
        </a>
      </center>
      <div className='wrapper'>
        <div className='center-line'>
          <a
            href='#about'
            className='scroll-icon'
            style={{
              boxShadow: `${
                isClicked
                  ? '0 0 0 4px #fff, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05)'
                  : '0 0 0 4px #000, inset 0 2px 0 rgba(255, 255, 255, 255.08), 0 3px 0 4px rgba(255, 255, 255, 0.05)'
              }`,
              background: `${isClicked ? '#000' : '#f2f2f2'}`,
            }}>
            <i className='fas fa-caret-up'></i>
          </a>
        </div>
        {timeline_details.map((timeline, index) => (
          <Timeline
            key={index}
            icon={timeline.icon}
            title={timeline.title}
            date={timeline.date}
            content={timeline.content}
            rowStatus={timeline.rowStatus}
            buttonContent={timeline.buttonContent}
            buttonURL={timeline.buttonURL}
            additionalContent={timeline.additionalContent}
            isClicked={isClicked}
          />
        ))}
      </div>
    </div>
  );
};
