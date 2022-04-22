import React from "react";

import { FormHexProps } from "./form-hex.types";

class FormHex extends React.Component<FormHexProps> {
  handleColorHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reg = "#0123456789abcdefABCDEF";
    const value = e.target.value;
    if (value.charAt(0) !== "#") {
      this.props.setColorInHex("#");
    } else {
      if (
        reg.includes(value.charAt(value.length - 1)) &&
        value.charAt(value.length - 1) !== "#"
      ) {
        this.props.setColorInHex(value);
      }
    }
  };

  render() {
    return (
      <input
        placeholder="color to add in HEX"
        maxLength={7}
        value={this.props.colorInHex}
        onChange={this.handleColorHexChange}
      />
    );
  }
}

export default FormHex;
