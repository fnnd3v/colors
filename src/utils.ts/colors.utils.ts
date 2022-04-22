export const RGBToObject = (rgb: string) => {
  let colors = ["red", "green", "blue", "alpha"];

  let colorArr = rgb.slice(rgb.indexOf("(") + 1, rgb.indexOf(")")).split(", ");

  const obj = {
    red: 0,
    green: 0,
    blue: 0,
  };

  colorArr.forEach((k, i) => {
    const index = colors[i];

    obj[index as keyof typeof obj] = parseInt(k);
  });

  return obj;
};

export const RGBToHSL = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

export const HEXToRGB = (h: string) => {
  let r: string = "0";
  let g: string = "0";
  let b: string = "0";

  if (h.length === 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];
  } else if (h.length === 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }

  return "rgb(" + +r + ", " + +g + ", " + +b + ")";
};
