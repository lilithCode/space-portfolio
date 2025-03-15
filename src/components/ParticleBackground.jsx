import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

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
            value: 80,
            density: {
              enable: true,
              area: 1000,
            },
          },
          color: {
            value: ["#ffffff", "#d6b3ec", "#FF00FF", "#FFFFFF"],
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.6,
            random: true,
            anim: {
              enable: true,
              speed: 0.5,
              opacity_min: 0.2,
              sync: false,
            },
          },
          size: {
            value: { min: 0.5, max: 2.5 },
            random: true,
            anim: {
              enable: true,
              speed: 1,
              size_min: 0.5,
              sync: false,
            },
          },
          move: {
            enable: true,
            speed: 1,
            direction: "random",
            random: false,
            straight: false,
            outModes: { default: "out" },
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 600,
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            repulse: {
              distance: 200, // Increased for a smoother effect
              duration: 1.5, // Extended for gradual repulsion
              factor: 50, // Controls strength over time (acts as a gradient)
              speed: 0.5, // Lower speed makes it more natural
              easing: "ease-out", // Smooth transition instead of abrupt repulsion
            },
            bubble: {
              distance: 150,
              size: 4,
              duration: 1,
              opacity: 0.8,
            },
          },
        },
      }}
    />
  );
};

export default ParticleBackground;
