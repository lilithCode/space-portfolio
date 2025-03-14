import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OrbitControls } from "@react-three/drei";
import { useNavigation } from "./NavigationContext";
import WarpScreen from "./components/WarpScreen";
import WarpTunnel from "./components/WarpEffect";
import RotatingStars from "./components/RotatingStars";
import SpacecraftModel from "./components/Spacecraft";
import HolographicMsg from "./components/HolographicMsg";
import AboutPlanet from "./components/AboutPlanet";
import ProjectPlanet from "./components/ProjectPlanet";
import ContactPlanet from "./components/ContactPlanet";
import SkillsPlanet from "./components/SkillsPlanet";

function Scene() {
  const { isNavigating, navigate } = useNavigation();
  const [key, setKey] = useState(0);
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
    setShowModel(true);
  }, [isNavigating]);

  return (
    <div className="bg-black w-full h-screen">
      <Navbar />
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 10]} intensity={5} />
      <Suspense fallback={null}>
        {!showModel && (
          <WarpTunnel key={key} onComplete={() => setShowModel(true)} />
        )}
        {!isNavigating && showModel && (
          <>
            <SpacecraftModel />
            <RotatingStars />
            <HolographicMsg />
            <AboutPlanet onClick={() => navigate("/about")} />
            <ProjectPlanet onClick={() => navigate("/projects")} />
            <SkillsPlanet onClick={() => navigate("/skills")} />
            <ContactPlanet onClick={() => navigate("/contact")} />
          </>
        )}
      </Suspense>
      <OrbitControls enablePan enableZoom enableRotate />
    </div>
  );
}

export default Scene;
