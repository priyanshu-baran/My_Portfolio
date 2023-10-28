import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export const ProjectData = ({
  photoUrl,
  heading,
  shortDesc,
  content,
  altStatus,
  readMore,
  codeLink,
  demoLink,
  videoLink,
  isClicked,
}) => {
  const inView = useRef(null);
  const isInView = useInView(inView, { once: true });
  return (
    <div className='project_content'>
      <div
        className={`blog-card ${altStatus === 1 && 'alt'}`}
        ref={inView}
        style={{
          transform: isInView ? 'none' : 'translateX(-200px)',
          opacity: isInView ? 1 : 0,
          transition: 'all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
          color: `${isClicked ? '#fff' : '#000'}`,
          background: `${isClicked ? '#000' : '#fff'}`,
        }}>
        <div className='meta'>
          <div
            className='photo'
            style={{
              backgroundImage: `url(${photoUrl})`,
            }}></div>
          <ul
            className='details'
            style={{
              background: `${
                isClicked ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)'
              }`,
              color: `${isClicked ? '#fff' : 'black'}`,
            }}>
            <li className='author'>
              <a
                href='https://github.com/priyanshu-baran'
                target='_blank'
                rel='noreferrer'>
                Priyanshu
              </a>
            </li>
            <li className='date'>June 24, 2023</li>
            <li className='tags'>
              <ul>
                <li>Learn</li>
                <li>Code</li>
                <li>HTML</li>
                <li>CSS</li>
              </ul>
            </li>
          </ul>
        </div>
        <div
          className={`description ${isClicked ? '' : 'clicked'}`}
          style={{
            background: `${isClicked ? '#fff' : 'black'}`,
            color: `${isClicked ? 'black' : '#fff'}`,
          }}>
          <h1>{heading}</h1>
          <h2>{shortDesc}</h2>
          <p>{content}</p>
          <p className='read-more'>
            <i className='fa-brands fa-github social_icons'></i>
            <i className='fa-solid fa-link social_icons2'></i>
            <a
              href={`${readMore}`}
              target='_blank'
              rel='noreferrer'>
              Read More
            </a>
          </p>
        </div>
      </div>
      {codeLink && (
        <div className='box'>
          <div className='front-face'>
            <div className='icon'>
              <i className='fa fa-code'></i>
            </div>
            <span>Code</span>
          </div>
          <div className='back-face'>
            <span>
              <a
                href={`${codeLink}`}
                target='_blank'
                rel='noreferrer'>
                Click here
              </a>
            </span>
          </div>
        </div>
      )}
      {(demoLink || videoLink) && (
        <div className='box'>
          <div className='front-face'>
            <div className='icon'>
              <i className='fa fa-rocket'></i>
            </div>
            <span>Demo</span>
          </div>
          <div className='back-face'>
            <span>
              {demoLink && (
                <a
                  href={`${demoLink}`}
                  target='_blank'
                  rel='noreferrer'>
                  Demo Link
                </a>
              )}
              <br />
              {videoLink && (
                <a
                  href={`${videoLink}`}
                  target='_blank'
                  rel='noreferrer'>
                  Video Link
                </a>
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export const Projects = ({ isClicked }) => {
  const project_details = [
    {
      photoUrl: 'img/project_1.jpeg',
      heading: 'Boilerplate for websites',
      shortDesc: 'Mar 2023 - Apr 2023',
      content:
        'I have made a starter template kind of thing for other websites to use directly mine, if they want to include the same features which I added in mine few of them which are, Login and Signup page, Home page, About page, Profile page, Error page etc.',
      altStatus: 0,
      readMore:
        'https://github.com/priyanshu-baran/Boilerplate_For_Websites/blob/master/README.md',
      codeLink: 'https://github.com/priyanshu-baran/Boilerplate_For_Websites',
      demoLink: 'https://boilerplate-for-websites.netlify.app/',
    },
    {
      photoUrl: 'img/project_2.jpeg',
      heading: 'Voice Assistant Using Java',
      shortDesc: 'Dec 2022 - Apr 2023',
      content:
        "In this project, I have made a Voice Assistant named Jarvis which till now can perform basic tasks like opening or closing any application, sending messages, playing songs and showing weather forecast. I'm looking forward to add more feature in this.",
      altStatus: 1,
      readMore:
        'https://github.com/priyanshu-baran/Voice_Assistant_Using_Java/blob/master/README.md',
      codeLink: 'https://github.com/priyanshu-baran/Voice_Assistant_Using_Java',
      videoLink: 'https://clipchamp.com/watch/zpvuGlC85DW',
    },
    {
      photoUrl: 'img/project_3.jpeg',
      heading: 'Chat Application',
      shortDesc: 'Jun 2023 - July 2023',
      content:
        'This website is made to know and get hands-on on the web socket concept and its real-time data transfer ability. In this I have used a tailwind pre-made template to make the things easier since I want to focus mostly on the backend part.',
      altStatus: 0,
      readMore:
        'https://github.com/priyanshu-baran/Chat_Application/blob/main/README.md',
      codeLink: 'https://github.com/priyanshu-baran/Chat_Application',
      demoLink: 'https://web-based-real-time-chat-app.netlify.app/',
      videoLink: 'https://clipchamp.com/watch/B3gtuU7A1nO',
    },
    {
      photoUrl: 'img/project_4.jpeg',
      heading: 'E-Learning Website UI Design',
      shortDesc: 'May 2023 - Present',
      content:
        'This website is all about any other E-Learning websites where any user used to login and select the course of his/her own preference from the given lists of courses. The user can also attempt a free quiz and then buy it according to the requirement.',
      altStatus: 1,
      // readMore: '',
      // codeLink: '',
      // demoLink: '',
    },
    {
      photoUrl: 'img/project_5.jpeg',
      heading: 'Digital Adda Website',
      shortDesc: 'May 2023 - Present',
      content:
        'This website is a combination of almost all the commonly used modern digital tools that are available in any websites, such as calculator, weather app, notes, to-do list, file uploading and downloading, etc. along with user login and signup page.',
      altStatus: 0,
      // readMore: '',
      // codeLink: '',
      // demoLink: '',
    },
  ];
  const [projectsToShow, setProjectsToShow] = useState(3);
  const toggleProjectsToShow = () => {
    if (projectsToShow === 3) {
      setProjectsToShow(project_details.length);
    } else {
      setProjectsToShow(3);
    }
    // window.location.href = '/main#showhide_btn';
  };
  return (
    <div id='projects'>
      <center>
        <a href='#projects'>
          <h1
            className='section_heading'
            style={{
              color: `${isClicked ? '#000' : '#fff'}`,
              paddingTop: '100px',
            }}>
            <i className='fa-solid fa-hashtag'></i> My Work
          </h1>
        </a>
      </center>
      <div className='project_section'>
        {project_details.slice(0, projectsToShow).map((project, index) => (
          <ProjectData
            key={index}
            photoUrl={project.photoUrl}
            heading={project.heading}
            shortDesc={project.shortDesc}
            content={project.content}
            altStatus={project.altStatus}
            readMore={project.readMore}
            codeLink={project.codeLink}
            demoLink={project.demoLink}
            videoLink={project.videoLink}
            isClicked={isClicked}
          />
        ))}
        {project_details.length > 3 && (
          <div
            // id='showhide_btn'
            className='sh_container'
            onClick={toggleProjectsToShow}>
            <div className='sh_bg'></div>
            <div className='sh_button'>
              <a href='#showhide_btn'>
                <i
                  className={`fa fa-chevron-${
                    projectsToShow === 3 ? 'down' : 'up'
                  }`}
                  aria-hidden='true'></i>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
