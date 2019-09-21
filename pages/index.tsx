import Simulation from "../src/components/Simulation";
import Particle from "../src/components/Particle";
import ParticlePreset from "../src/constants/particles";
import MagneticField from "../src/components/fields/MagneticField";

export default () => (
  <Simulation fps={60}>
    <MagneticField
      bounds={[[10, 10], [400, 400]]}
      tesla={1e-3}
      direction={-1}
    />
    <MagneticField
      bounds={[[10, 400], [400, 800]]}
      tesla={1e-3}
      direction={1}
    />

    <Particle
      position={{ x: 100, y: 100 }}
      preset={ParticlePreset.ELECTRON}
      velocity={{ x: 9.10938356e-10, y: 0 }}
    ></Particle>
  </Simulation>
);
