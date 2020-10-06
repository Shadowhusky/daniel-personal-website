// Frameworks
import React from 'react';

// Pages
import Home from './pages/Home';
import StartUp from './pages/StartUp';

const prefix = 'dpw-'; //Daniel personal website

function App() {
  return (
    <div className={`${prefix}home-container`}>
      {/* <Home/> */}
      <StartUp/>
    </div> 
  );
}

export default App;
