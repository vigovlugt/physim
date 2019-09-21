import { useEffect, useContext } from "react";
import SimulationContext from "../contexts/SimulationContext";
import IForceProvider from "../models/ForceProviders/IForceProvider";

const getNewId = (forces: IForceProvider[]) => {
  const ids = forces.map(f => f.id);
  return ids.length ? ids.reduce((a, b) => (a > b ? a : b)) + 1 : 0;
};

const useForceProvider = (force: IForceProvider) => {
  const simulationContext = useContext(SimulationContext);
  useEffect(() => {
    const id = getNewId(simulationContext.forces);
    simulationContext.forces.push({
      ...force,
      id
    });
    return () => {
      simulationContext.forces = simulationContext.forces.filter(
        f => f.id !== id
      );
    };
  }, [force]);
};

export default useForceProvider;
