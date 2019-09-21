import React, { FC, useContext, useEffect } from "react";
import SimulationContext from "../contexts/SimulationContext";

const SimulationLoop: FC = ({ children }) => {
  const simulationContext = useContext(SimulationContext);

  useEffect(() => {
    let lastDate = new Date();
    const interval = setInterval(() => {
      const date = new Date();
      const secondsDelta = (date.getTime() - lastDate.getTime()) / 1000;
      simulationContext.updates.forEach(u => u.function(secondsDelta));
      lastDate = date;
    }, 1000 / simulationContext.fps);
    return () => {
      clearInterval(interval);
    };
  }, [simulationContext.fps, simulationContext.updates]);

  return <>{children}</>;
};

export default SimulationLoop;
