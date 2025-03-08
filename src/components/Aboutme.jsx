import React from "react";
import ParticleBackground from "./Stars2D";
import avatar from "./avatar.png";

const AboutMe = () => {
  return (
    
    <div className="relative flex flex-col items-center justify-center h-screen text-white text-center font-Exo2">
      <ParticleBackground />

      <div className="absolute z-40 max-w-xl p-10">
        <div className="absolute inset-0 rounded-lg" />

        <h1 className="text-5xl font-bold tracking-wide relative z-10">
          About Me
        </h1>
        <div className="absolute left-1/2 transform -translate-x-1/2 w-55 h-2 bg-[#B069DB] z-0" />

        <img
          src={avatar}
          alt="avatar"
          className="h-32 w-32 mx-auto mb-16 mt-7 "
        />

        <p className="mt-7 text-lg leading-relaxed tracking-wide">
          I’m a full-stack developer passionate about problem-solving, logical
          thinking, and building interactive experiences. I love bringing ideas
          to life through JavaScript, React, and Three.js.
          <br />
          My curiosity drives me to keep learning and pushing boundaries,
          whether in tech or beyond. When I’m not coding, I’m reading detective
          novels, exploring new ideas, or diving into creative projects.
          Late-night coding and coffee fuel my passion for innovation and
          growth.
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
