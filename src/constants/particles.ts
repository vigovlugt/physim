import IParticle from "../models/IParticle";
import { ELEMENTARY_CHARGE } from "./constants";

export interface IParticlePreset {
  mass: number;
  charge: number;
}

const ParticlePreset: { [preset: string]: IParticlePreset } = {
  ELECTRON: {
    mass: 9.10938356e-31,
    charge: -ELEMENTARY_CHARGE
  },
  PROTON: {
    mass: 1.67262192369e-27,
    charge: ELEMENTARY_CHARGE
  }
};

export default ParticlePreset;
