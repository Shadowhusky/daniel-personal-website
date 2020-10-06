// Frameworks
import React from "react";

// Utils
import { useState, useEffect, useRef } from "react";

// Styles
import "./StartUp.css";

// Components

const prefix = "dpw-startup-";

function StartUp() {
  return (
    <div className={`${prefix}container`}>
      <div className={`${prefix}start-button-container ${prefix}start-button-border-container`}>
        <div className={`${prefix}start-button-border`}>
          
        </div>
      </div>
      <div className={`${prefix}start-button-container`}>
        <div className={`${prefix}start-button`}>
          <div className={`${prefix}start-button-text`}>Engine start</div>
        </div>
      </div>
    </div>
  );
}

export default StartUp;
