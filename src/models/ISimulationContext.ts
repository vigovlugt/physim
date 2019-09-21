import IForceProvider from "./ForceProviders/IForceProvider";

export default interface ISimulationContext {
  forces: IForceProvider[];
  fps: number;
  updates: IUpdate[];
}

export interface IUpdate {
  id: number;
  function: UpdateFunction;
}

type UpdateFunction = (deltaTime: number) => void;
