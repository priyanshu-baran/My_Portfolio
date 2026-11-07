// Code-split entry for the /main route (see App.js).
import { MotionConfig } from 'framer-motion';

import { Main } from './Main';
import { Dock } from './Dock';
import { profile, projects } from './data/portfolio';

/** Called from the landing page while the visitor reads the intro. */
export const warmAssets = () => {
  [
    `${profile.photo}.webp`,
    ...projects.slice(0, 2).map((p) => p.image),
  ].forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

const MainPage = ({ isClicked, toggleTheme }) => (
  // Respect the visitor's "reduce motion" setting for every animation below
  <MotionConfig reducedMotion='user'>
    <Main
      isClicked={isClicked}
      toggleTheme={toggleTheme}
    />
    <Dock isClicked={isClicked} />
  </MotionConfig>
);

export default MainPage;
