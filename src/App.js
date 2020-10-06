// Frameworks
import React from 'react';

// Utils
import { useState, useEffect } from "react";

// Pages
import Home from './pages/Home';
import StartUp from './pages/StartUp';

const prefix = 'dpw-'; //Daniel personal website

function App() {
  const [engineState, setEngineState] = useState(false);
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    // Cancel loading state after loaded
    setTimeout(() => {
      setLoadingState(false);
    }, 1000);

  }, []);

  const onStartedEngine = () => {
    setEngineState(true);
  }
  return (
    <div className={`${prefix}home-container`}>
      { !engineState && <StartUp loading={loadingState} onStartedEngine={onStartedEngine}/> }
      <Home visible={engineState}/>
    </div> 
  );
}

export default App;
