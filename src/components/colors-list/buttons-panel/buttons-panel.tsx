import React from "react";

import { ButtonsPanelProps } from "./buttons-panel.types";

import "./buttons-panel.styles.scss";

const ButtonsPanel: React.FC<ButtonsPanelProps> = ({ handleFilterColors }) => {
  return (
    <div className="panel">
      <button onClick={handleFilterColors} className="panel--button default">
        ALL COLORS
      </button>
      <button
        data-color="red"
        onClick={handleFilterColors}
        className="panel--button red"
      >
        RED
      </button>
      <button
        data-color="green"
        onClick={handleFilterColors}
        className="panel--button green"
      >
        GREEN
      </button>
      <button
        data-color="blue"
        onClick={handleFilterColors}
        className="panel--button blue"
      >
        BLUE
      </button>
      <button
        data-color="saturation"
        onClick={handleFilterColors}
        className="panel--button saturation"
      >
        SATURATION
      </button>
    </div>
  );
};

export default ButtonsPanel;
