import React, { useState } from "react";

import ColorsList from "components/colors-list/colors-list";
import FormHex from "components/form/form";

import "./App.scss";

const App = () => {
  const [colorToAdd, setColorToAdd] = useState("#");
  const [isColorsListOpen, setIsColorsListOpen] = useState(false);

  const handleToggleColorsList = () => {
    setIsColorsListOpen((prevState) => !prevState);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>colors</h1>
      </div>
      <div data-color={colorToAdd} className="content">
        <FormHex colorToAdd={colorToAdd} setColorToAdd={setColorToAdd} />
      </div>
      {isColorsListOpen && (
        <ColorsList handleToggleColorsList={handleToggleColorsList} />
      )}
      <button className="colors-list--button" onClick={handleToggleColorsList}>
        show colors list
      </button>
    </div>
  );
};

export default App;
