import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

function WarpTunnel() {
  const starsRef = useRef();
  const warpSpeed = useRef(0);

  useEffect(() => {
    gsap.to(warpSpeed, {
      current: 1,
      duration: 4,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(warpSpeed, {
          current: 0,
          duration: 1.5,
          ease: "power2.out",
        });
      },
    });
  }, []);
useFrame(({ clock }) => {
  const time = clock.getElapsedTime();
  if (starsRef.current) {
    starsRef.current.rotation.z = time * 0.05;
    starsRef.current.position.z += warpSpeed.current * 1.5;

    starsRef.current.children.forEach((star) => {
      const speedFactor = warpSpeed.current * 150;
      star.scale.set(1, 1, 1 + speedFactor); 
      star.material.opacity = Math.max(0.1, 1 - speedFactor * 0.5); 
    });
  }
});


  return (
    <group ref={starsRef}>
      {[...Array(3000)].map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            Math.random() * -10,
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshLambertMaterial emissive="white" emissiveIntensity={1} />
        </mesh>
      ))}
    </group>
  );
}

export default function WarpEffect() {
  return (
    <Canvas>
      <WarpTunnel />
    </Canvas>
  );
}
