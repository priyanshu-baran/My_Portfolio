// Code-split entry for the /main route (see App.js).
import { Main } from './Main';
import { Dock } from './Dock';

const MainPage = ({ isClicked, toggleTheme }) => (
  <>
    <Main
      isClicked={isClicked}
      toggleTheme={toggleTheme}
    />
    <Dock isClicked={isClicked} />
  </>
);

export default MainPage;
