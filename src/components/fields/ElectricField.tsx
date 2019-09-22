import { FC, useState } from "react";
import { ForceType } from "../../models/ForceProviders/IForceProvider";
import useForceProvider from "../../hooks/useForceProvider";
import IElectricField from "../../models/ForceProviders/IElectricField";
import { Line } from "react-konva";
import IVector2 from "../../models/IVector2";

interface IProps {
  bounds: number[][];
  volt: number;
  direction: IVector2;
}

const ElectricField: FC<IProps> = ({ bounds, volt, direction: initialDir }) => {
  const [direction, setDirection] = useState(initialDir);

  const electricField: IElectricField = {
    bounds: [
      { x: bounds[0][0], y: bounds[0][1] },
      { x: bounds[1][0], y: bounds[1][1] }
    ],
    type: ForceType.ELECTRIC_FIELD,
    volt,
    direction: direction
  };

  useForceProvider(electricField);
  let plusPoints = [];
  let minusPoints = [];
  if (direction.x == -1) {
    plusPoints = [
      electricField.bounds[0].x,
      electricField.bounds[0].y,
      electricField.bounds[0].x,
      electricField.bounds[1].y
    ];
    minusPoints = [
      electricField.bounds[1].x,
      electricField.bounds[0].y,
      electricField.bounds[1].x,
      electricField.bounds[1].y
    ];
  } else if (direction.x === 1) {
    minusPoints = [
      electricField.bounds[0].x,
      electricField.bounds[0].y,
      electricField.bounds[0].x,
      electricField.bounds[1].y
    ];
    plusPoints = [
      electricField.bounds[1].x,
      electricField.bounds[0].y,
      electricField.bounds[1].x,
      electricField.bounds[1].y
    ];
  } else if (direction.y === 1) {
    minusPoints = [
      electricField.bounds[1].x,
      electricField.bounds[1].y,
      electricField.bounds[1].x,
      electricField.bounds[0].y
    ];
    plusPoints = [
      electricField.bounds[0].x,
      electricField.bounds[1].y,
      electricField.bounds[0].x,
      electricField.bounds[0].y
    ];
  } else if (direction.x == -1) {
    plusPoints = [
      electricField.bounds[1].x,
      electricField.bounds[1].y,
      electricField.bounds[1].x,
      electricField.bounds[0].y
    ];
    minusPoints = [
      electricField.bounds[0].x,
      electricField.bounds[1].y,
      electricField.bounds[0].x,
      electricField.bounds[0].y
    ];
  }

  return (
    <>
      <Line
        strokeWidth={5}
        points={plusPoints}
        stroke={"#ff2e63"}
        onClick={e => {
          setDirection({ x: -direction.x, y: -direction.y });
          console.log(new Date().getSeconds());
        }}
      ></Line>
      <Line strokeWidth={5} points={minusPoints} stroke={"#08d9d6"}></Line>
    </>
  );
};

export default ElectricField;
