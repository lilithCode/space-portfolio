import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Box3, Color, Vector3 } from "three";

function Planet({ onReady }) {
  const { scene } = useGLTF("/Planet.glb");
  const ref = useRef();
  const viewport = useThree((st) => st.viewport);
  const target = Math.min(viewport.width, viewport.height) * 0.86;

  const { scale, offset } = useMemo(() => {
    scene.traverse((o) => {
      if (o.isMesh && o.material) {
        const m = o.material;
        m.emissive = new Color("#b069db");
        if (m.map) m.emissiveMap = m.map;
        m.emissiveIntensity = 0.6;
        m.roughness = 0.55;
        m.needsUpdate = true;
      }
    });
    const box = new Box3().setFromObject(scene.clone());
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const s = target / Math.max(size.x, size.y, size.z);
    return { scale: s, offset: center.multiplyScalar(-s) };
  }, [scene, target]);

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={ref}>
      <group scale={scale} position={offset}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

export default function PlanetScene({ onReady }) {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 5.4], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true, toneMappingExposure: 1.45 }}
    >
      <ambientLight intensity={0.7} />
      <hemisphereLight args={["#d9c2ff", "#0d0920", 1.4]} />
      <directionalLight position={[-4, 5, 5]} intensity={3.6} color="#f3eeff" />
      <pointLight position={[-4, 2, -3]} intensity={90} color="#7fe3ff" />
      <pointLight position={[4, -1.5, -3]} intensity={110} color="#ff7ad9" />
      <pointLight position={[0, -4, 2]} intensity={40} color="#b069db" />

      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.7}>
        <Planet onReady={onReady} />
      </Float>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  );
}
