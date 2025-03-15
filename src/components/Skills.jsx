<<<<<<< HEAD
import React from "react";
import Navbar from "./Navbar";
import ParticleBackground from "./Stars2D";
import SkillsData from "./SkillsData";
import { useNavigation } from "./NavigationContext";

const Skills = () => {
  const { navigate } = useNavigation();

  return (
    <div className="relative text-white min-h-screen">
=======
import React, { useMemo } from "react";
import ParticleBackground from "./ParticleBackground";
import SkillsData from "./SkillsData";
import { motion } from "framer-motion";

const Skills = () => {
  
  const delays = useMemo(
    () => SkillsData.map(() => Math.random() * 0.5 + 0.2), 
    []
  );

  return (
    <div id="skills" className="relative text-white  scroll-mt-24">
>>>>>>> f2d5575 (Initial commit)
      <div className="absolute inset-0 -z-10">
        <ParticleBackground />
      </div>

<<<<<<< HEAD
      <Navbar onNavigate={navigate} />

      <div className="flex flex-col mt-32 mb-8 mx-auto items-center">
        <h1 className="relative text-6xl md:text-7xl font-bold tracking-wide text-center ">
          Skills
          <span className="absolute -z-10 left-[160px] transform -translate-x-1/2 bottom-[-10px] block w-50 h-10 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></span>
        </h1>
      </div>

      <div className="flex flex-col items-center gap-16 mt-16 px-4">
        {SkillsData.map((skill, index) => (
          <div
            key={skill.id}
            className={`px-50 flex items-center ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            } w-full`}
          >
            <div className="relative flex flex-col items-center w-full max-w-lg">
              <div
                className={`absolute ${
                  index % 2 === 0
                    ? "-left-50 md:-left-50"
                    : "-right-50 md:-right-50"
                } w-60 md:w-80 h-0.5
              bg-gradient-to-r from-transparent via-gray-500/50 to-transparent z-[-1]`}
              ></div>

              <div
                className={`absolute top-0 h-16 md:h-20 ${
                  index % 2 === 0 ? "left-5 md:left-30" : "right-5 md:right-30"
                } w-1 
              bg-gradient-to-b from-transparent via-gray-500/50 to-transparent z-[-1]`}
              ></div>

              <div
                className={`absolute ${
                  index % 2 === 0
                    ? "left-50 md:left-80"
                    : "right-50 md:right-80"
                } w-60 md:w-80 h-0.5 top-16
              bg-gradient-to-r from-transparent via-gray-500/50 to-transparent z-[-1]`}
              ></div>

              <div
                className="border border-gray-500 relative flex flex-col items-center 
              bg-gradient-to-r from-transparent via-gray-800 to-transparent 
              rounded-3xl p-4 shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"
              >
                <div className="p-2 border border-gray-600 rounded-2xl shadow-lg bg-gray-900 relative group">
                  <p className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 text-white text-lg font-semibold rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {skill.title}
                  </p>
                  <img
                    src={skill.src}
                    alt={skill.title}
                    className="w-32 h-32 md:w-40 md:h-40 p-3 transition-opacity duration-300 group-hover:opacity-50"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
=======
      <div className="flex flex-col mt-32 mb-8 mx-auto items-center">
        <h1 className="relative text-6xl md:text-7xl font-bold tracking-wide text-center z-10">
          <motion.span
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute -z-10 left-[160px] transform -translate-x-1/2 bottom-[-10px] block w-full h-10 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
          ></motion.span>
          Skills
        </h1>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-6 md:gap-8 lg:gap-10 mt-10 max-w-5xl">
          {SkillsData.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: delays[index] }}
              viewport={{ once: false, amount: 0.2 }} 
              whileHover={{ scale: 1.1 }}
              className="relative flex flex-col items-center"
            >
              <div
                className={`relative flex flex-col items-center transform transition-all duration-300 ease-in-out hover:scale-105 
                ${
                  index % 3 === 1
                    ? "translate-y-6 md:translate-y-10"
                    : "translate-y-0"
                }`}
              >
                <div className="border border-gray-500 bg-gray-800 rounded-3xl p-4 shadow-lg">
                  <div className="p-2 border border-gray-600 rounded-2xl shadow-lg bg-gray-900 relative group">
                    <p className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 text-white text-xl font-semibold rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {skill.title}
                    </p>
                    <img
                      src={skill.src}
                      alt={skill.title}
                      className="w-32 h-32 md:w-40 md:h-40 p-3 transition-opacity duration-300 group-hover:opacity-30"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
>>>>>>> f2d5575 (Initial commit)
      </div>
    </div>
  );
};

export default Skills;
