import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
<<<<<<< HEAD
import ParticleBackground from "./Stars2D";
import Navbar from "./Navbar";
import { useNavigation } from "./NavigationContext";

const Contact = () => {
  const handleNavigate = useNavigation();
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

=======
import ParticleBackground from "./ParticleBackground";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Model = () => {
  const gltf = useGLTF("/Planet.glb");
  const planetRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (planetRef.current) {
      planetRef.current.rotation.y = time * 0.05;
      planetRef.current.rotation.x = time * 0.01;
    }
  });

  return <primitive ref={planetRef} object={gltf.scene} scale={1.5} />;
};

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
>>>>>>> f2d5575 (Initial commit)
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Hamna Mubarak",
          from_email: form.email,
          to_email: "hamnamubarak.contact@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you! I will get back to you soon.");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Something went wrong. Please try again.");
        }
      );
  };

  return (
<<<<<<< HEAD
    <div className="relative text-white min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <ParticleBackground />
      <Navbar onNavigate={handleNavigate} />

      <div className="px-4 sm:px-8 w-full flex justify-center">
        <div className="m-8 z-40 w-full max-w-3xl p-10 bg-gray-800 rounded-xl shadow-xl">
          <div className="flex flex-col mt-8 mb-32 mx-auto items-center">
            <h1 className="relative text-6xl md:text-7xl font-bold tracking-wide text-center">
              Contact
              <span className="absolute -z-10 left-[190px] transform -translate-x-1/2 bottom-[-5px] block w-60 h-10 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></span>
=======
    <div
      id="contact"
      className="relative text-white  flex items-center justify-center my-45"
    >
      <ParticleBackground />

      <div className="flex flex-col-reverse lg:flex-row w-full p-6 gap-2 mt-8 ">
        <div className="w-full md:w-1/2 p-6 bg-gray-800 rounded-xl shadow-xl">
          <div className="flex flex-col items-center mb-6">
            <h1 className="relative text-4xl md:text-5xl font-bold text-center z-10 mb-8">
              <motion.span
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="absolute -z-10 left-[75%] transform -translate-x-1/2 bottom-[-9px] block w-full h-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
              />
              Contact
>>>>>>> f2d5575 (Initial commit)
            </h1>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
<<<<<<< HEAD
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col">
                <span className="text-gray-300 font-medium mb-2">
=======
            className="flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="flex flex-col">
                <span className="text-gray-300 font-medium mb-1">
>>>>>>> f2d5575 (Initial commit)
                  Your Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
<<<<<<< HEAD
                  className="bg-gray-900 py-3 px-5 placeholder-gray-400 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
=======
                  className="bg-gray-900 py-3 px-4 placeholder-gray-400 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
>>>>>>> f2d5575 (Initial commit)
                />
              </label>

              <label className="flex flex-col">
<<<<<<< HEAD
                <span className="text-gray-300 font-medium mb-2">
=======
                <span className="text-gray-300 font-medium mb-1">
>>>>>>> f2d5575 (Initial commit)
                  Your Email
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
<<<<<<< HEAD
                  className="bg-gray-900 py-3 px-5 placeholder-gray-400 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
=======
                  className="bg-gray-900 py-3 px-4 placeholder-gray-400 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
>>>>>>> f2d5575 (Initial commit)
                />
              </label>
            </div>

            <label className="flex flex-col">
<<<<<<< HEAD
              <span className="text-gray-300 font-medium mb-2">
                Your Message
              </span>
              <textarea
                rows={6}
=======
              <span className="text-gray-300 font-medium mb-1">
                Your Message
              </span>
              <textarea
                rows={5}
>>>>>>> f2d5575 (Initial commit)
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Type your message..."
<<<<<<< HEAD
                className="bg-gray-900 py-3 px-5 placeholder-gray-400 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
=======
                className="bg-gray-900 py-3 px-4 placeholder-gray-400 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
>>>>>>> f2d5575 (Initial commit)
              />
            </label>

            <button
              type="submit"
<<<<<<< HEAD
              className="m-auto w-50 bg-gradient-to-r from-blue-500 to-purple-500 py-3 px-6 rounded-lg text-white font-bold shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
=======
              className="m-auto w-40 bg-gradient-to-r from-blue-500 to-purple-500 py-3 px-6 rounded-lg text-white font-bold shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
>>>>>>> f2d5575 (Initial commit)
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
<<<<<<< HEAD
=======

        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} />
            <spotLight position={[10, 10, 10]} intensity={1.5} />
            <Model />
            <OrbitControls
              enableZoom={false}
              minDistance={2}
              maxDistance={10}
            />
          </Canvas>
        </div>
>>>>>>> f2d5575 (Initial commit)
      </div>
    </div>
  );
};

export default Contact;
