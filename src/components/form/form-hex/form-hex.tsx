import React, { useEffect } from "react";

const FormHex: React.FC<any> = ({
  colorInHex,
  setColorInHex,
  setColorChecked,
}) => {
  const handleColorHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reg = "#0123456789abcdefABCDEF";
    const value = e.target.value;
    if (value.charAt(0) !== "#") {
      setColorInHex("#");
    } else {
      if (
        reg.includes(value.charAt(value.length - 1)) &&
        value.charAt(value.length - 1) !== "#"
      ) {
        setColorInHex(value);
      }
    }
  };

  useEffect(() => {
    setColorChecked(false);
  }, [colorInHex]);

  return (
    <input
      placeholder="color to add in HEX"
      maxLength={7}
      value={colorInHex}
      onChange={handleColorHexChange}
    />
  );
};

export default FormHex;
