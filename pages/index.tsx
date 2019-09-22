import Simulation from "../src/components/Simulation";
import Particle from "../src/components/Particle";
import ParticlePreset from "../src/constants/particles";
import MagneticField from "../src/components/fields/MagneticField";
import ElectricField from "../src/components/fields/ElectricField";

export default () => (
  <Simulation fps={60}>
    <MagneticField
      bounds={[[10, 10], [6000, 4000]]}
      tesla={1e-11}
      direction={-1}
    />
    <ElectricField
      bounds={[[250 + 500, 10], [350 + 500, 800]]}
      volt={1e-9}
      direction={{ x: 1, y: 0 }}
    ></ElectricField>

    <Particle
      position={{ x: 800, y: 300 }}
      preset={ParticlePreset.ELECTRON}
    ></Particle>
    <Particle
      position={{ x: 800, y: 370 }}
      preset={ParticlePreset.PROTON}
    ></Particle>
  </Simulation>
);
