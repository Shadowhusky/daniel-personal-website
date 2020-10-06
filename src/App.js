// Frameworks
import React from 'react';

// Utils
import { useState } from "react";

// Pages
import Home from './pages/Home';
import StartUp from './pages/StartUp';

const prefix = 'dpw-'; //Daniel personal website

function App() {
  const [engineState, setEngineState] = useState(false);
  const onStartedEngine = () => {
    setEngineState(true);
    
  }
  return (
    <div className={`${prefix}home-container`}>
      <Home visible={engineState}/>
      { !engineState && <StartUp onStartedEngine={onStartedEngine}/> }
    </div> 
  );
}

export default App;
