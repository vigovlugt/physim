import IVector2 from "./IVector2";

export default interface IBody {
  mass: number;
  position: IVector2;
  velocity: IVector2;
  acceleration: IVector2;
  forces: IVector2[];
  charge: number;
  //{ position, velocity, acceleration, forces }
}
