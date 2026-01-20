import React, { useRef, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage } from "@react-three/drei";

// Separate Model component to handle 3D logic
const Model = () => {
  const { scene } = useGLTF("/Planet.glb");
  const planetRef = useRef();

  // Optimized rotation animation
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (planetRef.current) {
      planetRef.current.rotation.y = time * 0.15;
      planetRef.current.rotation.x = time * 0.03;
    }
  });

  return <primitive ref={planetRef} object={scene} scale={1.5} />;
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
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Thank you! I will get back to you soon.");
        setForm({ name: "", email: "", message: "" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative text-white flex items-center justify-center my-32 md:my-45"
    >
      {/* ParticleBackground removed from here to App.jsx for performance */}

      <div className="flex flex-col-reverse lg:flex-row w-full max-w-7xl p-6 gap-10">
        {/* Form Container */}
        <div className="w-full lg:w-1/2 p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700">
          <div className="flex flex-col items-center mb-8">
            <h2 className="relative text-4xl md:text-5xl font-bold text-center z-10">
              <motion.span
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="absolute -z-10 left-0 bottom-1 block h-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-50"
              />
              Contact Me
            </h2>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-gray-300 font-medium">Name</span>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="bg-gray-900 py-3 px-4 text-white rounded-lg border border-gray-700 focus:border-purple-500 outline-none transition-all"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-gray-300 font-medium">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="bg-gray-900 py-3 px-4 text-white rounded-lg border border-gray-700 focus:border-purple-500 outline-none transition-all"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-gray-300 font-medium">Message</span>
              <textarea
                rows={5}
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                placeholder="How can I help you?"
                className="bg-gray-900 py-3 px-4 text-white rounded-lg border border-gray-700 focus:border-purple-500 outline-none transition-all resize-none"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full md:w-40 self-center bg-gradient-to-r from-blue-500 to-purple-600 py-3 px-6 rounded-lg text-white font-bold shadow-lg hover:from-purple-600 hover:to-pink-500 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="w-full lg:w-1/2 h-[350px] md:h-[500px] cursor-grab active:cursor-grabbing">
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center text-purple-400 font-bold">
                Loading Space...
              </div>
            }
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
              <ambientLight intensity={8} />
              <directionalLight position={[7, 5, 5]} intensity={2.5} />
              <spotLight position={[10, 10, 10]} intensity={8} />
              <Model />

              <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Contact;
