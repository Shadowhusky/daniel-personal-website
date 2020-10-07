// Frameworks
import React from 'react';

// Utils
import { useState, useEffect } from "react";

// Pages
import StartUp from './pages/StartUp';
import Home from './pages/Home';

// Styles
import "./App.css";

const prefix = 'dpw-app-'; //Daniel personal website

function App() {
  const [engineState, setEngineState] = useState(false);
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    // Cancel loading state after loaded
      setLoadingState(false);
  }, []);

  const onStartedEngine = () => {
    setEngineState(true);
  }
  return (
    <div className={`${prefix}container`}>
      { !engineState && <StartUp loading={loadingState} onStartedEngine={onStartedEngine}/> }
      <Home visible={engineState}/>
    </div> 
  );
}

export default App;
