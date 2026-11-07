/* ============================================================================
   YOUR PORTFOLIO CONTENT. This is the only file you need to edit to update the
   main page. Everything below is plain text/objects; the page rebuilds itself.

   HOW TO ADD THINGS
   -----------------
   Add a skill      -> put  { name: 'Docker' }  inside a group's `skills` list
                       (optional: level: 1-5 shows proficiency dots)
   Add a skill group-> copy one { title, icon, skills: [...] } block in `skillGroups`
                       (icons: any Font Awesome name, e.g. 'fa-server')
   Add a project    -> copy a block in `projects`; newest first.
                       Leave out any link you do not have (demo/video/details).
   Add a journey item-> copy a block in `journey`; newest first.
                       type: 'education' | 'school' | 'achievement' | 'work' | 'project'
   Images           -> put files in public/img and refer to them as '/img/<name>'.
                       If you replace an image, give the new file a NEW name
                       (images are cached by browsers for 30 days).
   ========================================================================== */

export const profile = {
  name: 'Priyanshu Baran',
  firstName: 'Priyanshu',
  role: 'Full-Stack Developer',
  eyebrow: 'Hello, World!',
  status: 'M.Tech CSE student at VNIT',
  summary:
    'A full-stack developer who is eager to learn new things anytime. I build web applications with Java, Spring Boot, React and Node.js, and deploy them on AWS.',
  // Portrait: files /img/portrait.avif and /img/portrait.webp
  photo: '/img/portrait',
  photoAlt: 'Portrait of Priyanshu Baran',
  // Small badges floating around the portrait (max 3 look best)
  floatingTags: ['Java', 'Spring Boot', 'React'],
  coreStack: 'Java · Spring Boot · React · Node.js',
  resume: { url: '/My_CV.pdf', fileName: 'Priyanshu_Baran_CV.pdf' },
  // Extra numbers shown next to the automatic "projects" and "technologies" counts
  highlights: [{ value: 8.43, decimals: 2, label: 'M.Tech CGPA (ongoing)' }],
  links: {
    github: 'https://github.com/priyanshu-baran',
    linkedin: 'https://www.linkedin.com/in/priyanshu-baran/',
    twitter: 'https://twitter.com/Priyanshu_Baran',
  },
  shareUrl: 'https://my-webfolio.netlify.app/',
};

export const settings = {
  projectsVisible: 4, // projects shown before the "Show all" button appears
};

/* ----------------------------- JOURNEY (newest first) -------------------- */
export const journey = [
  {
    type: 'education',
    title: 'Master of Technology (M.Tech)',
    org: 'Visvesvaraya National Institute of Technology (VNIT)',
    period: '2025 – 2027',
    description: 'Pursuing my Master’s in Computer Science Engineering.',
    highlight: '8.43 CGPA (ongoing)',
  },
  {
    type: 'education',
    title: 'Bachelor of Engineering (B.E.)',
    org: 'Chandigarh University',
    period: '2021 – 2025',
    description: 'Completed my Bachelor’s program in Electrical Engineering.',
    highlight: '8.2 CGPA',
  },
  {
    type: 'achievement',
    title: 'First Appreciation Letter',
    org: 'Royal Challengers Bangalore (RCB)',
    period: '6 Jan 2023',
    description:
      'Received an appreciation letter from RCB for completing my first week in the Code to Win Challenge.',
    link: {
      label: 'View letter',
      url: 'https://drive.google.com/file/d/1M8f6ayb49fWlNU3o9qrN38fQBIbD_Fpa/view?usp=share_link',
    },
  },
  {
    type: 'school',
    title: '12th CBSE Board',
    org: 'Mansarovar Public School, Bhopal',
    period: '2020 – 2021',
    description: 'Completed my 12th in Bhopal, Madhya Pradesh.',
    highlight: '89% aggregate',
  },
  {
    type: 'school',
    title: '10th CBSE Board',
    org: 'Mansarovar Public School, Bhopal',
    period: '2018 – 2019',
    description: 'Completed my 10th in Bhopal, Madhya Pradesh.',
    highlight: '91% aggregate',
  },

  // Hidden items from your old file (move one up into the list to show it):
  // {
  //   type: 'work',
  //   title: 'First Internship',
  //   org: 'Edu-versity',
  //   period: '30 Oct 2022',
  //   description: 'Completed my first internship in the domain of Embedded Systems.',
  //   link: { label: 'View certificate', url: 'https://drive.google.com/file/d/15xTtBfKNPZ9K3ihtYn-8YQDOUyctWQEZ/view?usp=share_link' },
  // },
  // {
  //   type: 'project',
  //   title: 'College Project: Home Automation',
  //   period: 'Mar – May 2023',
  //   description: 'Collaborated with colleagues on a Home Automation project using ESP32.',
  //   link: { label: 'View post', url: 'https://www.linkedin.com/posts/priyanshu-baran_homeautomation-matlabproject-teamwork-activity-7065665431537143808-_9pB?utm_source=share&utm_medium=member_desktop' },
  // },
];

/* ----------------------------- SKILLS ------------------------------------ */
export const skillGroups = [
  {
    title: 'Languages',
    icon: 'fa-code',
    skills: [{ name: 'Java' }, { name: 'JavaScript' }],
  },
  {
    title: 'Frameworks & Runtimes',
    icon: 'fa-layer-group',
    skills: [{ name: 'Spring Boot' }, { name: 'React' }, { name: 'Node.js' }],
  },
  {
    title: 'Databases',
    icon: 'fa-database',
    skills: [{ name: 'MongoDB Atlas' }, { name: 'MySQL' }],
  },
  {
    title: 'Cloud & Services',
    icon: 'fa-cloud',
    skills: [
      { name: 'AWS' },
      { name: 'AWS Amplify' },
      { name: 'AWS Cognito' },
      { name: 'Firebase' },
    ],
  },
  // Example: a "Core CS" group is a common thing recruiters look for.
  // {
  //   title: 'Core CS',
  //   icon: 'fa-microchip',
  //   skills: [{ name: 'Data Structures & Algorithms' }, { name: 'OOP' }, { name: 'DBMS' }],
  // },
];

/* ----------------------------- PROJECTS (newest first) ------------------- */
export const projects = [
  {
    title: 'E-Learning Website (ConnectLearn)',
    period: 'Oct 2023 – Jan 2024',
    image: '/img/project_4.jpeg',
    description:
      'An e-learning platform where users log in and pick courses from a catalogue of their choice. Users can attempt a free quiz and then buy a course according to their requirement.',
    tech: ['React', 'AWS', 'MongoDB', 'Node.js'],
    links: {
      code: 'https://github.com/priyanshu-baran/E-Learning_Website',
      demo: 'https://connect-learn-frontend.netlify.app/',
      video:
        'https://www.linkedin.com/posts/priyanshu-baran_connectlearn-elearning-aws-activity-7150127207347105793-t1q2?utm_source=share&utm_medium=member_desktop',
      details:
        'https://github.com/priyanshu-baran/E-Learning_Website/blob/main/README.md',
    },
  },
  {
    title: 'Real-Time Chat Application (QuickChat)',
    period: 'Jun 2023 – Jul 2023',
    image: '/img/project_3.jpeg',
    description:
      'Built to get hands-on with WebSockets and real-time data transfer. I used a pre-made Tailwind template so I could focus mostly on the backend.',
    tech: [
      'Node.js',
      'Socket.IO',
      'Tailwind CSS',
      'Firebase Realtime Database',
    ],
    links: {
      code: 'https://github.com/priyanshu-baran/Chat_Application',
      demo: 'https://web-based-real-time-chat-app.netlify.app/',
      video:
        'https://www.linkedin.com/posts/priyanshu-baran_chatapplication-realtimechat-socketio-activity-7078430944554065920-BhLM?utm_source=share&utm_medium=member_desktop',
      details:
        'https://github.com/priyanshu-baran/Chat_Application/blob/main/README.md',
    },
  },
  {
    title: 'Jarvis: Voice Assistant in Java',
    period: 'Dec 2022 – Apr 2023',
    image: '/img/project_2.jpeg',
    description:
      'A voice assistant that can open and close applications, send messages, play songs and show the weather forecast. I am still adding more features to it.',
    tech: ['Java', 'Desktop GUI'],
    links: {
      code: 'https://github.com/priyanshu-baran/Voice_Assistant_Using_Java',
      video:
        'https://www.linkedin.com/posts/priyanshu-baran_jarvis-voiceassistant-java-activity-7051560861542326272-DZoq?utm_source=share&utm_medium=member_desktop',
      details:
        'https://github.com/priyanshu-baran/Voice_Assistant_Using_Java/blob/master/README.md',
    },
  },
  // {
  //   title: 'Website Boilerplate',
  //   period: 'Mar 2023 – Apr 2023',
  //   image: '/img/project_1.jpeg',
  //   description:
  //     'A starter template other websites can use directly, with common pages and features already built: login and signup, home, about, profile, error pages and more.',
  //   tech: ['React'],
  //   links: {
  //     code: 'https://github.com/priyanshu-baran/Boilerplate_For_Websites',
  //     demo: 'https://boilerplate-for-websites.netlify.app/',
  //     details:
  //       'https://github.com/priyanshu-baran/Boilerplate_For_Websites/blob/master/README.md',
  //   },
  // },
  // Hidden project from your old file:
  // {
  //   title: 'Digital Adda Website',
  //   period: 'Jan 2024 – Present',
  //   image: '/img/project_5.jpeg',
  //   description: 'A combination of commonly used digital tools: calculator, weather app, notes, to-do list, file upload/download, with user login and signup.',
  //   tech: [],
  //   links: {},
  // },
];

/* ----------------------------- CONTACT ----------------------------------- */
export const contact = {
  email: 'baranpriyanshu3@gmail.com',
  // Set showPhone to false if you would rather not publish your number
  showPhone: true,
  phone: '+91 6265788336',
  location: 'Varanasi, Uttar Pradesh',
};
