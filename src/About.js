import { useInView } from 'framer-motion';
import { useRef } from 'react';
// sk - ISMOvbCu3ZV2BRjn9THhT3BlbkFJaOj1yzIU5f8cLPzQpmIh;

const Timeline = ({ icon, title, date, content, rowStatus, isClicked }) => {
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
          <a href='#about'>Read more</a>
          <i>- Someone famous</i>
        </div>
      </section>
    </div>
  );
};

export const About = ({ isClicked }) => {
  const timeline_details = [
    {
      icon: 'home',
      title: 'Title of Section 1',
      date: '1st Jan 2021',
      content:
        'Lorem ipsum dolor sit ameters consectetur adipisicing elit. Sed qui veroes praesentium maiores, sint eos vero sapiente voluptas debitis dicta dolore.',
      rowStatus: 1,
    },
    {
      icon: 'star',
      title: 'Title of Section 2',
      date: '2nd Jan 2021',
      content:
        'Lorem ipsum dolor sit ameters consectetur adipisicing elit. Sed qui veroes praesentium maiores, sint eos vero sapiente voluptas debitis dicta dolore.',
      rowStatus: 2,
    },
    {
      icon: 'rocket',
      title: 'Title of Section 3',
      date: '3rd Jan 2021',
      content:
        'Lorem ipsum dolor sit ameters consectetur adipisicing elit. Sed qui veroes praesentium maiores, sint eos vero sapiente voluptas debitis dicta dolore.',
      rowStatus: 1,
    },
    {
      icon: 'globe',
      title: 'Title of Section 4',
      date: '4th Jan 2021',
      content:
        'Lorem ipsum dolor sit ameters consectetur adipisicing elit. Sed qui veroes praesentium maiores, sint eos vero sapiente voluptas debitis dicta dolore.',
      rowStatus: 2,
    },
    {
      icon: 'paper-plane',
      title: 'Title of Section 5',
      date: '5th Jan 2021',
      content:
        'Lorem ipsum dolor sit ameters consectetur adipisicing elit. Sed qui veroes praesentium maiores, sint eos vero sapiente voluptas debitis dicta dolore.',
      rowStatus: 1,
    },
    {
      icon: 'map-marker-alt',
      title: 'Title of Section 6',
      date: '6th Jan 2021',
      content:
        'Lorem ipsum dolor sit ameters consectetur adipisicing elit. Sed qui veroes praesentium maiores, sint eos vero sapiente voluptas debitis dicta dolore.',
      rowStatus: 2,
    },
  ];
  return (
    <div id='about'>
      <center>
        <a href='#about'>
          <h1
            className='section_heading'
            style={{ color: `${isClicked ? '#fff' : '#000'}` }}>
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
            isClicked={isClicked}
          />
        ))}
      </div>
    </div>
  );
};
