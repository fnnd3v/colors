import React, { useEffect, useState } from "react";

import { HEXToRGB } from "utils.ts";
import { FormProps } from "./form.types";
import { colors } from "data";
import FormHex from "./form-hex/form-hex";

import "./form.styles.scss";

const Form: React.FC<FormProps> = ({ colorToAdd, setColorToAdd }) => {
  const contentWrapper = document.querySelector<HTMLDivElement>(".content");

  const [colorInHex, setColorInHex] = useState("#");
  const [colorChecked, setColorChecked] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (contentWrapper) contentWrapper.style.backgroundColor = colorToAdd;
  }, [colorToAdd]);

  const handleCheckColor = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setColorChecked(true);
    setColorToAdd(colorInHex);
  };

  const handleAddColor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    colors.forEach((color) => {
      if (color.colorHex === colorToAdd) setError(true);
    });

    if (error) return;

    const reg = /^#([0-9a-f]{3}){1,2}$/i;

    if (!reg.test(colorToAdd)) return;
    const RGBColor = HEXToRGB(colorToAdd);
    localStorage.setItem(colorToAdd, RGBColor);
    setColorInHex("#");

    setColorToAdd("");
    if (contentWrapper) contentWrapper.style.backgroundColor = `transparent`;
  };

  return (
    <form className="form" onSubmit={handleAddColor}>
      <FormHex colorInHex={colorInHex} setColorInHex={setColorInHex} />
      <div className="form--buttons">
        <button className="form--button" onClick={handleCheckColor}>
          check color
        </button>
        <button
          disabled={!colorChecked}
          type="submit"
          className="form--button add-color"
        >
          add
        </button>
      </div>
    </form>
  );
};

export default Form;
