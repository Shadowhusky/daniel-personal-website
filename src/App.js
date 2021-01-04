// Frameworks
import React from "react";

// Utils
import { useState, useEffect } from "react";

// Pages
import StartUp from "./pages/StartUp";

// Styles
import "./App.css";

// Components
import { Suspense } from "react";

const Home = React.lazy(() => import("./pages/Home"));

const prefix = "dpw-app-"; //Daniel personal website

function App() {
  const [engineState, setEngineState] = useState(false);
  const [loadingState, setLoadingState] = useState(true);

  const onStartedEngine = () => {
    setEngineState(true);
  };
  return (
    <div className={`${prefix}container`}>
      {!engineState && (
        <StartUp loading={loadingState} onStartedEngine={onStartedEngine} />
      )}
      <Suspense fallback={<div/>}>
        <Home
          onMainImgLoaded={() => setLoadingState(false)}
          visible={engineState}
        />
      </Suspense>
    </div>
  );
}

export default App;
