import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { TextureLoader, DoubleSide } from "three";
import { useLoader } from "@react-three/fiber";

const ProjectPlanet = () => {
  const planetTexture = useLoader(TextureLoader, "/textures/saturnmap.jpg");
  const ringTexture = useLoader(TextureLoader, "/textures/ring.jpg");
  const planet = useRef();
  const rings = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (planet.current) {
      planet.current.rotation.y = time * 0.05;
    }
    if (rings.current) {
      rings.current.rotation.z = time * 0.01;
    }
  });

  return (
    <>
      <mesh ref={planet} position={[-4, 1, 1]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshLambertMaterial map={planetTexture} />
      </mesh>
      <mesh ref={rings} rotation={[Math.PI / 2, 0.5, 0]} position={[-4, 1, 1]}>
        <ringGeometry args={[1.2, 2, 64]} />
        <meshBasicMaterial
          map={ringTexture}
          transparent
          opacity={0.8}
          side={DoubleSide}
        />
      </mesh>
    </>
  );
};

export default ProjectPlanet;
