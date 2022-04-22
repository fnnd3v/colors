import React from "react";

import { ColorsListItemProps } from "./colors-list-item.types";

import "./colors-list-item.scss";

const ColorsListItem: React.FC<ColorsListItemProps> = ({
  color,
  handleDeleteColor,
}) => {
  return (
    <li
      key={color.colorRGB}
      className="ColorSquare"
      data-color={color.colorHex}
    >
      <div>
        <p>{color.colorHex.toUpperCase()}</p>
        <p>{color.colorRGB.toUpperCase()}</p>
      </div>
      {color.removable && (
        <button
          className="delete-button"
          onClick={() => handleDeleteColor(color.colorHex)}
        />
      )}
    </li>
  );
};

export default ColorsListItem;
