import CurveBottom from "./CurveBottom";
import Navbar from "./Navbar";
import ParticleBackground from "./ParticleBackground";
import { motion } from "framer-motion";


const Home = () => {
  return (
    <div id="home" className="w-full h-screen relative flex flex-col items-center justify-center overflow-hidden">
      <ParticleBackground />
      <Navbar />
      <div className="absolute z-10 bg-transparent text-4xl sm:text-6xl font-bold text-center text-white m-4 md:m-8">
        <motion.p
          initial={{ x: "-20vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring", stiffness: 40 }}
        >
          Hello, I'm <span className="text-purple-500">Hamna</span>
        </motion.p>

        <motion.p
          initial={{ x: "25vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 2.5,
            delay: 0.5,
            type: "spring",
            stiffness: 40,
          }}
          className="mt-4"
        >
          I'm a Full Stack Developer
        </motion.p>
        <motion.button
          initial={{ y: "20vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2.5, delay: 1, type: "spring", stiffness: 40 }}
          className="bg-transparent text-purple-600 text-xl px-6 py-3 rounded-lg shadow-lg 
          hover:scale-120 hover:text-purple-300 hover:cursor-pointer border-2 border-purple-400 flex items-center justify-center gap-2 m-auto mt-8 w-90"
          onClick={() =>
            document
              .getElementById("about")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          View My Work
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <path d="M12 19l-7-7 1.41-1.41L11 15.17V5h2v10.17l4.59-4.58L19 12z" />
          </motion.svg>
        </motion.button>
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <CurveBottom />
      </div>
    </div>
  );
};

export default Home;
