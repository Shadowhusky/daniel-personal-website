// Frameworks
import React from "react";

// Utils
import { useState } from "react";
import * as classNames from 'classnames';

// Styles
import "./StartUp.css";

// Components

const prefix = "dpw-startup-";

function StartUp(props) {
  const { onStartedEngine, loading } = props;
  const [meterVisibility, setMeterVisibility] = useState(false);
  const onStartButtonClick = () => {
    setMeterVisibility(true);
    setTimeout(() => {
      onStartedEngine();
    }, 2500);
  };
  return (
    <div className={`${prefix}container`}>
      <div
        className={`${prefix}start-button-container`}
        onClick={onStartButtonClick}
        style={{ display: loading ? "none" : "flex" }}
      >
        <div className={`${prefix}start-button`}>
          <span className={`${prefix}start-button-text`}>ENGINE START</span>
        </div>
      </div>
      <div
        className={classNames(`${prefix}start-button-container`, `${prefix}start-button-border-container`)}
      >
        <div className={classNames(`${prefix}start-button-border`, (loading && `${prefix}loading-animated`))}></div>
      </div>
      {meterVisibility && <Meters />}
    </div>
  );
}

const Meters = () => {
  return (
    <div className={`${prefix}start-speed-meter-container`}>
      <div className={`${prefix}start-speed-meter`}>
        <div className={`${prefix}start-speed-meter-pointer-container`}>
          <div className={`${prefix}start-speed-meter-pointer`}></div>
        </div>
        <span type="P"> P </span>
        <span type="R"> R </span>
      </div>
      <div className={`${prefix}start-speed-meter`}>
        <div
          className={classNames(`${prefix}start-speed-meter-pointer-container`, `dpw-startup-start-speed-meter-pointer-animated`)}
        >
          <div className={`${prefix}start-speed-meter-pointer`}></div>
        </div>
      </div>
    </div>
  );
};

export default StartUp;
