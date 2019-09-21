import { useContext, useEffect } from "react";
import Simulation from "../components/Simulation";
import SimulationContext from "../contexts/SimulationContext";
import { IUpdate } from "../models/ISimulationContext";

const getNewId = (updates: IUpdate[]) => {
  const ids = updates.map(u => u.id);
  return ids.length ? ids.reduce((a, b) => (a > b ? a : b)) + 1 : 0;
};

const useUpdate = (f: (delta: number) => void) => {
  const simulationContext = useContext(SimulationContext);

  useEffect(() => {
    const id = getNewId(simulationContext.updates);
    simulationContext.updates.push({
      function: f,
      id
    });
    return () => {
      simulationContext.updates = simulationContext.updates.filter(
        u => u.id !== id
      );
    };
  }, [f]);
};

export default useUpdate;
