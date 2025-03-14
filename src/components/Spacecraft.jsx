import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Text } from "@react-three/drei";
import * as THREE from "three";
import { useNavigation } from "./NavigationContext";

useGLTF.preload("/spaceship.glb");

function SpacecraftModel() {
  const { scene } = useGLTF("/spaceship.glb");
  const spacecraftRef = useRef();
  const { viewport } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const proximityFlags = useRef({});
  const [message, setMessage] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const messageRef = useRef("");
  const { navigate } = useNavigation();

  const planets = useMemo(
    () => [
      {
        name: "About Planet",
        position: [3, -1, 1],
        radius: 1,
        route: "/about",
      },
      {
        name: "Project Planet",
        position: [-4, 1, 1],
        radius: 1,
        route: "/projects",
      },
      {
        name: "Skills Planet",
        position: [4, 2, 1],
        radius: 1.5,
        route: "/skills",
      },
      {
        name: "Contact Planet",
        position: [-2, -1, 1],
        radius: 0.6,
        route: "/contact",
      },
    ],
    []
  );

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        const currentPlanet = planets.find(
          (planet) => proximityFlags.current[planet.name]
        );
        if (currentPlanet) {
          navigate(currentPlanet.route); 
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, planets]); // ✅ Add 'navigate' to dependencies

  useEffect(() => {
    if (message) {
      messageRef.current = message;
      let index = 0;
      const interval = setInterval(() => {
        if (index < messageRef.current.length) {
          setDisplayedText(messageRef.current.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [message]);

  useFrame(() => {
    if (spacecraftRef.current) {
      targetPosition.current.x = mouse.current.x * 5;
      targetPosition.current.y = mouse.current.y * 5 - 2;

      targetRotation.current.x = mouse.current.y * -Math.PI * 0.1;
      targetRotation.current.y = mouse.current.x * Math.PI * 0.1;

      spacecraftRef.current.position.x +=
        (targetPosition.current.x - spacecraftRef.current.position.x) * 0.1;
      spacecraftRef.current.position.y +=
        (targetPosition.current.y - spacecraftRef.current.position.y) * 0.1;

      spacecraftRef.current.rotation.x +=
        (targetRotation.current.x - spacecraftRef.current.rotation.x) * 0.1;
      spacecraftRef.current.rotation.y +=
        (targetRotation.current.y - spacecraftRef.current.rotation.y) * 0.1;

      const spacecraftBoundingSphere = new THREE.Sphere(
        spacecraftRef.current.position,
        0.6
      );

      planets.forEach((planet) => {
        const planetBoundingSphere = new THREE.Sphere(
          new THREE.Vector3(...planet.position),
          planet.radius
        );

        if (spacecraftBoundingSphere.intersectsSphere(planetBoundingSphere)) {
          if (!proximityFlags.current[planet.name]) {
            setMessage(`${planet.name} reached!\n Press SPACEBAR to explore.`);
            proximityFlags.current[planet.name] = true;
          }
        } else {
          if (proximityFlags.current[planet.name]) {
            proximityFlags.current[planet.name] = false;
            setMessage(" ");
          }
        }
      });
    }
  });

  return (
    <>
      <primitive
        object={scene}
        scale={viewport.width / 5}
        ref={spacecraftRef}
      />
      {displayedText && (
        <Text
          position={[0, -0.3, -2]}
          fontSize={0.3}
          color="#00ff00"
          outlineColor="#00ff00"
          font="/fonts/Exo2-Regular.ttf"
          scale={[1, 1, 1]}
          maxWidth={12}
          textAlign="center"
          lineHeight={1.2}
        >
          {displayedText}
        </Text>
      )}
    </>
  );
}

export default SpacecraftModel;
