import IVector2 from "../IVector2";

export default interface IForceProvider {
  id?: number;
  type: ForceType;
}

export enum ForceType {
  MAGNETIC_FIELD,
  ELECTRIC_FIELD,
  CUSTOM
}

export type ForceFunction = CustomForceFunction | MagneticFieldForceFunction;

export type MagneticFieldForceFunction = (
  position: IVector2,
  mass: number,
  charge: number
) => IVector2;

export type CustomForceFunction = (...any: any) => IVector2;
