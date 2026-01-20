import SkillsData from "./SkillsData";
import { useMemo } from "react";
import { motion } from "framer-motion";

const Skills = () => {
  const delays = useMemo(
    () => SkillsData.map(() => Math.random() * 0.5 + 0.2),
    [],
  );

  return (
    <div id="skills" className="relative text-white  scroll-mt-24">
      <div className="flex flex-col mt-32 mb-8 mx-auto items-center">
        <h2 className="relative text-6xl md:text-7xl font-bold tracking-wide text-center z-10">
          <motion.span
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute -z-10 left-[160px] transform -translate-x-1/2 bottom-[-10px] block w-full h-10 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
          ></motion.span>
          Skills
        </h2>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-6 md:gap-8 lg:gap-10 mt-10 max-w-5xl mx-4">
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
      </div>
    </div>
  );
};

export default Skills;
