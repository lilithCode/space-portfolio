import React from "react";
import { Github, Linkedin } from "lucide-react";
import { FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 flex flex-col items-center absolute w-full">
      <motion.div
        className="text-white text-3xl cursor-pointer p-2 absolute bottom-15 bg-purple-400 right-10 h-15"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        onClick={() =>
          document.getElementById("home").scrollIntoView({ behavior: "smooth" })
        }
      >
        <FaArrowUp />
      </motion.div>

      <div className="flex gap-16">
        <a
          href="https://github.com/lilithCode"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
        >
          <Github size={32} />
        </a>
        <a
          href="https://www.linkedin.com/in/miss-lilith-b863432a4/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
        >
          <Linkedin size={32} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
