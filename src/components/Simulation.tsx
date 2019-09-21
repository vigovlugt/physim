import { Stage, Layer, Rect } from "react-konva";
import { FC, useState, useEffect, CSSProperties } from "react";
import SimulationContext from "../contexts/SimulationContext";
import SimulationLoop from "./SimulationLoop";

const stageStyle: CSSProperties = {
  backgroundColor: "#252a34",
  position: "absolute",
  top: "0px",
  left: "0px"
};

interface IProps {
  fps: number;
}

const Simulation: FC<IProps> = ({ children, fps }) => {
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  return (
    <Stage width={width} height={height} className="stage" style={stageStyle}>
      <Layer>
        <SimulationContext.Provider value={{ forces: [], fps, updates: [] }}>
          <SimulationLoop>{children}</SimulationLoop>
        </SimulationContext.Provider>
      </Layer>

      <style jsx global>{`
        body {
          margin: 0px;
        }
      `}</style>
    </Stage>
  );
};

export default Simulation;
