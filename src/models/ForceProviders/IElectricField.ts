import IVector2 from "../../models/IVector2";
import IForceProvider from "./IForceProvider";

export default interface ElectricField extends IForceProvider {
  bounds: [IVector2, IVector2];
  volt: number;
}
