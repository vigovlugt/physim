import { createContext } from "react";
import ISimulationContext from "../models/ISimulationContext";

const SimulationContext = createContext<ISimulationContext>({
  forces: [],
  fps: 60,
  updates: []
});

export default SimulationContext;
