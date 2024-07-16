import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  color: string;
  setColor: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, setColor }) => {
  return <HexColorPicker color={color} onChange={setColor} />;
}
