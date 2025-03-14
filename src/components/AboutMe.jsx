import React from "react";
import ParticleBackground from "./Stars2D";
import avatar from "./avatar.png";
import Navbar from "./Navbar";
import { useNavigation } from "./NavigationContext";

const AboutMe = () => {
  const { navigate } = useNavigation();

  return (
    <div className="relative flex flex-col items-center text-white text-center font-Exo2 min-h-screen">
      <div className="absolute inset-0 -z-10">
        <ParticleBackground />
      </div>

      <Navbar onNavigate={navigate} />

      <div className="w-[90%] max-w-2xl p-6 md:p-10 mt-10 z-10">
        <div className="flex flex-col mt-32 mb-8 mx-auto items-center">
          <h1 className="relative text-6xl md:text-7xl font-bold tracking-wide text-center ">
            About Me
            <span className="absolute -z-10 left-[240px] transform -translate-x-1/2 bottom-[-5px] block w-70 h-10 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></span>
          </h1>
        </div>

        <img
          src={avatar}
          alt="avatar"
          className="h-32 w-32 sm:h-40 sm:w-40 max-w-xs mx-auto mb-10 mt-16 rounded-full border-4 border-purple-400 shadow-lg"
        />

        <div className="text-xl md:text-2xl space-theme leading-loose">
          <p>
            I’m a full-stack developer passionate about problem-solving, logical
            thinking, and building interactive experiences. I love bringing
            ideas to life through JavaScript, React, and Three.js.
            <br />
            My curiosity drives me to keep learning and pushing boundaries,
            whether in tech or beyond. When I’m not coding, I’m reading
            detective novels, exploring new ideas, or diving into creative
            projects. Late-night coding and coffee fuel my passion for
            innovation and growth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
