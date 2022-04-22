import { ColorModel } from "models";

export interface ColorsListItemProps {
  color: ColorModel;
  handleDeleteColor: (colorHex: string) => void;
}
