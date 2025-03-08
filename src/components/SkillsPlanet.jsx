import React from "react";
import { useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";

const SkillsPlanet = () => {
  const aboutTexture = useLoader(TextureLoader, "/textures/jupitermap.jpg");
  const planet = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (planet.current) {
      planet.current.rotation.z = time * 0.03;
    }
  });
  return (
    <mesh ref={planet} position={[4, 2, 1]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshLambertMaterial map={aboutTexture} />
    </mesh>
  );
};

export default SkillsPlanet;
