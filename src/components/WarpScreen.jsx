import { Canvas } from "@react-three/fiber";
import WarpTunnel from "./WarpEffect";

const WarpScreen = ({ onComplete }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black z-50">
      <Canvas>
        <WarpTunnel onComplete={onComplete} />
      </Canvas>
    </div>
  );
};

export default WarpScreen;
