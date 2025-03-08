import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";

function WarpTunnel({ onComplete }) {
  const starsRef = useRef();
  const warpSpeed = useRef({ value: 0 });

  useEffect(() => {
    gsap.to(warpSpeed.current, {
      value: 1,
      duration: 3,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(warpSpeed.current, {
          value: 0,
          duration: 1.5,
          ease: "power2.out",
          onComplete: () => {
            if (onComplete) onComplete();
          },
        });
      },
    });
  }, [onComplete]);

  useFrame(() => {
    if (!starsRef.current) return;

    starsRef.current.children.forEach((star) => {
      const speedFactor = warpSpeed.current.value * 2;
      star.position.z += speedFactor;
      star.scale.set(1, 1, 1 + warpSpeed.current.value * 50);

      if (star.position.z > 5) {
        star.position.z = -50;
      }
    });
  });

  return (
    <group ref={starsRef}>
      {[...Array(6000)].map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30,
            Math.random() * -50,
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshLambertMaterial
            emissive="white"
            emissiveIntensity={1}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}

export default WarpTunnel;
