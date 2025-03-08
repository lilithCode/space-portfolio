import React from "react";
import { useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";

const ContactPlanet = () => {
  const aboutTexture = useLoader(TextureLoader, "/textures/marsmap.jpg");
  const planet = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (planet.current) {
      planet.current.rotation.z = time * 0.03;
    }
  });
  return (
    <mesh ref={planet} position={[-2, -1, 1]}>
      <sphereGeometry args={[0.6, 64, 64]} />
      <meshLambertMaterial map={aboutTexture} />
    </mesh>
  );
};

export default ContactPlanet;
