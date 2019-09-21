import IVector2 from "../../models/IVector2";
import IForceProvider, { ForceType } from "./IForceProvider";

export default interface IMagneticField extends IForceProvider {
  bounds: [IVector2, IVector2];
  tesla: number;
  type: ForceType.MAGNETIC_FIELD;
  direction: number;
}
