import IVector2 from "./IVector2";
import IBody from "./IBody";

export default interface IParticle extends IBody {
  charge: number;

  variant: string;
}
