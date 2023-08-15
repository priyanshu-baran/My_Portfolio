import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import { Dock } from './Dock';
import { Cursor } from './Cursor';
import { Home } from './Home';
import { Preloader } from './Preloader';
import { Main } from './Main';

const App = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              isLoading ? (
                <Preloader />
              ) : (
                <>
                  <Cursor />
                  <Home />
                </>
              )
            }
          />
          <Route
            path='/main'
            element={
              <>
                <Cursor isClicked={isClicked} />
                <Main
                  isClicked={isClicked}
                  setIsClicked={setIsClicked}
                />
                <Dock isClicked={isClicked} />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
