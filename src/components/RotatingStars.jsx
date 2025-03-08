import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";

const RotatingStars = () => {
  const starsRef = useRef();
  const starTexture = useLoader(TextureLoader, "/textures/star.jpg");
  const nebulaTexture = useLoader(TextureLoader, "/textures/milkyway.jpg");

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (starsRef.current) {
      starsRef.current.rotation.z = time * 0.02;
    }
  });

  return (
    <>
      <group ref={starsRef}>
        {[...Array(10000)].map((_, i) => {
          const [x, y, z] = Array(3)
            .fill()
            .map(() => (Math.random() - 0.5) * 100);
          const size = Math.random() * 0.02 + 0.01;
          const color = Math.random() > 0.5 ? "white" : "#FFD700";
          return (
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[size, 8, 8]} />
              <meshLambertMaterial
                emissive={color}
                emissiveIntensity={1}
                map={starTexture}
              />
            </mesh>
          );
        })}
      </group>

      <mesh position={[0, 0, -50]}>
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial map={nebulaTexture} transparent opacity={0.7} />
      </mesh>
    </>
  );
};

export default RotatingStars;
