import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // Use slim version

const ParticleBackground = () => {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "#111",
        },
        particles: {
          number: {
            value: 100,
          },
          color: {
            value: [
              "#B069DB",
              "#ffffff",
              "#9f45b0",
              "#5E00A0",
              "#c7f5ee",
              "#840b0b",
            ],
          },

          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
          },
          size: {
            value: 2,
            random: true,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: false,
            straight: false,
            outModes: { default: "out" },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
      }}
    />
  );
};

export default ParticleBackground;
