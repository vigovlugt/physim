import { Circle, Text } from "react-konva";
import { FC } from "react";
import useBody from "../hooks/useBody";
import IBody from "../models/IBody";
import { IParticlePreset } from "../constants/particles";
import IVector2 from "../models/IVector2";

export interface IParticleProps {
  preset: IParticlePreset;
  position: IVector2;
  velocity?: IVector2;
}

const Particle: FC<IParticleProps> = props => {
  const { charge, mass } = props.preset;

  const body: IBody = {
    mass,
    position: props.position,
    velocity: props.velocity || { x: 0, y: 0 },
    acceleration: { x: 0, y: 0 },
    forces: [],
    charge
  };

  const { position, bodyInfo } = useBody(body);

  return (
    <>
      <Circle
        x={position.x}
        y={position.y}
        radius={30}
        fill={charge > 0 ? "#ff2e63" : "#08d9d6"}
      ></Circle>
      <Text
        x={position.x - 5}
        y={position.y - 15}
        text={charge > 0 ? "+" : "-"}
        fill={"white"}
        fontSize={30}
      ></Text>
      <Text
        x={position.x + 100}
        y={position.y}
        text={`x: ${position.x}`}
      ></Text>
      <Text
        x={position.x + 100}
        y={position.y + 30}
        text={`y: ${position.y}`}
      ></Text>
      <Text
        x={position.x + 100}
        y={position.y + 60}
        text={`vx: ${bodyInfo.velocity.x}`}
      ></Text>
      <Text
        x={position.x + 100}
        y={position.y + 90}
        text={`vy: ${bodyInfo.velocity.y}`}
      ></Text>
    </>
  );
};

export default Particle;
