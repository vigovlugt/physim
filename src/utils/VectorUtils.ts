import IVector2 from "../models/IVector2";

export const rotateVector = ({ x, y }: IVector2, angle: number): IVector2 => ({
  x: x * Math.cos(angle) - Math.sin(angle) * y,
  y: x * Math.sin(angle) + Math.cos(angle) * y
});
