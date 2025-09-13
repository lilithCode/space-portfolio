import React, { useRef, useState } from "react";
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
      planetRef.current.rotation.y = time * 0.15; 
      planetRef.current.rotation.x = time * 0.03; 
    }
  });

  return <primitive ref={planetRef} object={gltf.scene} scale={1.5} />;
};

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            message: form.message,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setLoading(false);
          alert("Thank you! I will get back to you soon.");
          setForm({ name: "", email: "", message: "" });
        } else {
          setLoading(false);
          alert(`Something went wrong: ${data.error || "Please try again."}`);
        }
      } catch (error) {
        setLoading(false);
        console.error("Fetch Error:", error);
        alert("Failed to connect to the server. Please try again.");
      }
    };

  return (
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
            </h1>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="flex flex-col">
                <span className="text-gray-300 font-medium mb-1">
                  Your Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="bg-gray-900 py-3 px-4 placeholder-gray-400 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
              </label>

              <label className="flex flex-col">

                <span className="text-gray-300 font-medium mb-1">
                  Your Email
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"

                  className="bg-gray-900 py-3 px-4 placeholder-gray-400 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
              </label>
            </div>

            <label className="flex flex-col">
              <span className="text-gray-300 font-medium mb-1">
                Your Message
              </span>
              <textarea
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Type your message..."

                className="bg-gray-900 py-3 px-4 placeholder-gray-400 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              />
            </label>

            <button
              type="submit"
              className="m-auto w-40 bg-gradient-to-r from-blue-500 to-purple-500 py-3 px-6 rounded-lg text-white font-bold shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>


        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
            <ambientLight intensity={8} />
            <directionalLight position={[7, 5, 5]} intensity={2.5} />
            <spotLight position={[10, 10, 10]} intensity={8} />
            <Model />
            <OrbitControls
              enableZoom={false}
              minDistance={2}
              maxDistance={10}
            />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default Contact;
