import { FC } from "react";
import { ForceType } from "../../models/ForceProviders/IForceProvider";
import useForceProvider from "../../hooks/useForceProvider";
import IMagneticField from "../../models/ForceProviders/IMagneticField";
import { Rect } from "react-konva";

interface IProps {
  bounds: number[][];
  tesla: number;
  direction: number;
}

const MagneticField: FC<IProps> = ({ bounds, tesla, direction }) => {
  const magneticField: IMagneticField = {
    bounds: [
      { x: bounds[0][0], y: bounds[0][1] },
      { x: bounds[1][0], y: bounds[1][1] }
    ],
    type: ForceType.MAGNETIC_FIELD,
    tesla,
    direction
  };

  useForceProvider(magneticField);

  const width = magneticField.bounds[1].x - magneticField.bounds[0].x;
  const height = magneticField.bounds[1].y - magneticField.bounds[0].y;
  console.log(magneticField.bounds, width, height);
  return (
    <Rect
      x={magneticField.bounds[0].x}
      y={magneticField.bounds[0].y}
      width={width}
      height={height}
      fill={direction > 0 ? "lightgrey" : "grey"}
    ></Rect>
  );
};

export default MagneticField;
