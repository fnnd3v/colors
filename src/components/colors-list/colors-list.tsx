import React, { useEffect, useState } from "react";

import { RGBToHSL, RGBToObject } from "utils.ts";
import { colors as colorsDataList } from "data";
import ColorsListItem from "./colors-list-item/colors-list-item";
import { ColorModel } from "models";
import ButtonsPanel from "./buttons-panel/buttons-panel";

import "./colors-list.scss";

const ColorsList: React.FC<{ handleToggleColorsList: () => void }> = ({
  handleToggleColorsList,
}) => {
  const [colors, setColors] = useState<ColorModel[]>([]);
  const [filteredColors, setFilteredColors] = useState<ColorModel[]>([]);

  useEffect(() => {
    const colorsList: ColorModel[] = [];

    colorsDataList.forEach((color: ColorModel) => {
      color.RGBValues = RGBToObject(color.colorRGB);
      color.HSL = RGBToHSL(
        color.RGBValues.red,
        color.RGBValues.green,
        color.RGBValues.blue
      );

      colorsList.push(color);
    });

    const keys = Object.keys(localStorage);
    const storageColors: ColorModel[] = [];

    for (let key of keys) {
      storageColors.push({
        colorHex: key,
        removable: true,
        colorRGB: localStorage.getItem(key) + "",
        HSL: [],
        RGBValues: { red: 0, green: 0, blue: 0 },
      });
    }

    storageColors.forEach((color) => {
      color.RGBValues = RGBToObject(color.colorRGB);
      color.HSL = RGBToHSL(
        color.RGBValues.red,
        color.RGBValues.green,
        color.RGBValues.blue
      );

      colorsList.push(color);
    });

    setColors(sortColors(colorsList));
  }, []);

  useEffect(() => {
    setColorsBackground();
  }, [colors, filteredColors]);

  const setColorsBackground = () => {
    const list = document.querySelectorAll("li");
    const liArray = [...list];
    liArray.forEach((item) => {
      const currentColor = item.getAttribute("data-color");
      if (currentColor !== null) {
        item.style.backgroundColor = currentColor;
      }
    });
  };

  const handleDeleteColor = (colorHex: string) => {
    const filtratedByColors = colors.filter((color) => {
      return color.colorHex !== colorHex;
    });
    setColors(filtratedByColors);
    localStorage.removeItem(colorHex);

    if (filteredColors.length !== 0) {
      const filtratedByColors = filteredColors.filter((color) => {
        return color.colorHex !== colorHex;
      });
      setFilteredColors(filtratedByColors);
    }
  };

  const handleFilterColors = (
    e: React.SyntheticEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const filterColor = e.currentTarget.dataset.color;

    switch (filterColor) {
      case "red":
        const filtratedListRed = colors.filter((color) => {
          return color.RGBValues.red > 127;
        });
        setFilteredColors(filtratedListRed);

        break;
      case "green":
        const filtratedListGreen = colors.filter((color) => {
          return color.RGBValues.green > 127;
        });
        setFilteredColors(filtratedListGreen);
        break;
      case "blue":
        const filtratedListBlue = colors.filter((color) => {
          return color.RGBValues.blue > 127;
        });
        setFilteredColors(filtratedListBlue);
        break;
      case "saturation":
        const filtratedListSaturation = colors.filter((color) => {
          return color.HSL[1] >= 50;
        });
        setFilteredColors(filtratedListSaturation);
        break;
      default:
        setFilteredColors(colors);
        break;
    }
  };

  const sortColors = (array: ColorModel[]) => {
    let sortedColorsRed = array.sort((a, b) => {
      if (b.RGBValues.red !== a.RGBValues.red) {
        return b.RGBValues.red - a.RGBValues.red;
      } else {
        if (b.RGBValues.green !== a.RGBValues.green) {
          return b.RGBValues.green - a.RGBValues.green;
        } else {
          return b.RGBValues.blue - a.RGBValues.blue;
        }
      }
    });

    return sortedColorsRed;
  };

  return (
    <div className="wrapper">
      <ButtonsPanel handleFilterColors={handleFilterColors} />
      <ul className="colors-container">
        {filteredColors.length === 0
          ? colors.map((color) => {
              return (
                <ColorsListItem
                  color={color}
                  handleDeleteColor={handleDeleteColor}
                  key={color.colorHex}
                />
              );
            })
          : filteredColors.map((color) => {
              return (
                <ColorsListItem
                  color={color}
                  handleDeleteColor={handleDeleteColor}
                  key={color.colorHex}
                />
              );
            })}
      </ul>
      <button className="close-button" onClick={handleToggleColorsList}>
        close
      </button>
    </div>
  );
};

export default ColorsList;
