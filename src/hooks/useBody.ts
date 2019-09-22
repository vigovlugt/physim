import IBody from "../models/IBody";
import { useState, useContext } from "react";
import IVector2 from "../models/IVector2";
import SimulationContext from "../contexts/SimulationContext";
import IForceProvider, {
  ForceType,
  CustomForceFunction
} from "../models/ForceProviders/IForceProvider";
import useUpdate from "./useUpdate";
import IMagneticField from "../models/ForceProviders/IMagneticField";
import { rotateVector } from "../utils/VectorUtils";
import IElectricField from "../models/ForceProviders/IElectricField";

export type BodyForceFunction = (
  body: IBody,
  force: IForceProvider
) => IVector2;

const useBody = (body: IBody) => {
  const { mass } = body;

  const [position, setPosition] = useState<IVector2>(
    body.position || { x: 0, y: 0 }
  );

  const [velocity, setVelocity] = useState<IVector2>(
    body.velocity || { x: 0, y: 0 }
  );

  const calculateNetForce = forces =>
    forces.length
      ? forces.reduce((forceA, forceB) => ({
          x: forceA.x + forceB.x,
          y: forceA.y + forceB.y
        }))
      : { x: 0, y: 0 };

  const calculateAcceleration = netForce => ({
    x: netForce.x / mass,
    y: netForce.y / mass
  });

  const calculateVelocity = (velocity, acceleration, delta) => ({
    x: velocity.x + acceleration.x * delta,
    y: velocity.y + acceleration.y * delta
  });

  const calculatePosition = (velocity, delta) => ({
    x: position.x + velocity.x * delta,
    y: position.y + velocity.y * delta
  });

  const update = delta => {
    const forces = simulationContext.forces.map(force => {
      //CHECK IN BOUNDS
      if (force.type == ForceType.MAGNETIC_FIELD || ForceType.ELECTRIC_FIELD) {
        const field = force as IMagneticField;
        if (
          !(
            position.x >= field.bounds[0].x &&
            position.x <= field.bounds[1].x &&
            position.y >= field.bounds[0].y &&
            position.y <= field.bounds[1].y
          )
        )
          return { x: 0, y: 0 };
      }
      switch (force.type) {
        case ForceType.MAGNETIC_FIELD:
          const magneticForce = force as IMagneticField;

          let angle = -(90 * Math.PI) / 180;
          if (magneticForce.direction > 0 && body.charge < 0) angle *= -1;
          if (magneticForce.direction < 0 && body.charge > 0) angle *= -1;

          const rotatedVector = rotateVector(velocity, angle);

          return {
            x: magneticForce.tesla * body.charge * rotatedVector.x,
            y: magneticForce.tesla * body.charge * rotatedVector.y
          };
        case ForceType.ELECTRIC_FIELD:
          const elektricForce = force as IElectricField;

          return {
            x: elektricForce.direction.x * -body.charge * elektricForce.volt,
            y: elektricForce.direction.y * -body.charge * elektricForce.volt
          };
          break;
      }
    });
    const netForce = calculateNetForce(forces);
    const acceleration = calculateAcceleration(netForce);
    const currentVelocity = calculateVelocity(velocity, acceleration, delta);
    const newPosition = calculatePosition(velocity, delta);

    setPosition(newPosition);
    setVelocity(currentVelocity);
  };

  useUpdate(update);

  const simulationContext = useContext(SimulationContext);

  return { position, bodyInfo: { velocity } };
};

export default useBody;
