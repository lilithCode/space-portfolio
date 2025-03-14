import { Canvas } from "@react-three/fiber";
import React, { Suspense, lazy } from "react";


const WarpTunnel = lazy(() => import("./WarpEffect"));

const WarpScreen = ({ onComplete }) => {

  return (
    

    <div className="fixed top-0 left-0 w-full h-full bg-black z-50">
      <Canvas>
        <Suspense fallback={null}>
          <WarpTunnel onComplete={onComplete} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default WarpScreen;
