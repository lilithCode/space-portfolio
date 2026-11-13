import { Component, lazy, Suspense, useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Section from "./Section";
import { Reveal } from "./Reveal";

import PlanetFallback from "./PlanetFallback";

const PlanetScene = lazy(() => import("./PlanetScene"));

const canUseWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
};

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err) {
    console.warn("Planet scene unavailable, showing the drawn planet instead.", err);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const STATUS = {
  sending: "Sending…",
  sent: "Message sent. I'll get back to you soon.",
  failed: "Your message didn't send. Check your connection and try again.",
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const sceneRef = useRef(null);
  const nearScene = useInView(sceneRef, { once: true, margin: "1800px 0px" });
  const [webgl] = useState(canUseWebGL);
  const [sceneReady, setSceneReady] = useState(false);
  const handleReady = useCallback(() => setSceneReady(true), []);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact form:", err);
      setStatus("failed");
    }
  };

  return (
    <Section
      id="contact"
      index={5}
      title="Let's talk"
      intro="Have a project, a role, or an idea as odd as an invisible keyboard? Send me a message."
    >
      <div className="indent grid items-center gap-14 lg:grid-cols-12">
        <Reveal as="form" onSubmit={submit} className="space-y-8 lg:col-span-6">
          <div className="grid gap-8 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-lilac">Name</span>
              <input
                className="field"
                type="text"
                name="name"
                autoComplete="name"
                required
                value={form.name}
                onChange={update}
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-lilac">Email</span>
              <input
                className="field"
                type="email"
                name="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={update}
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-semibold text-lilac">Message</span>
            <textarea
              className="field resize-none"
              name="message"
              rows={5}
              required
              value={form.message}
              onChange={update}
              placeholder="What would you like to build?"
            />
          </label>

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-full bg-star px-8 py-3.5 text-lg font-semibold text-void shadow-[0_18px_50px_-18px_rgb(176_105_219/0.9)] transition-all hover:bg-lilac disabled:opacity-60"
            >
              {status === "sending" ? STATUS.sending : "Send message"}
            </button>
            <AnimatePresence mode="wait">
              {(status === "sent" || status === "failed") && (
                <motion.p
                  key={status}
                  role="status"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={status === "sent" ? "text-comet" : "text-[#ff9fcf]"}
                >
                  {STATUS[status]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        <div
          ref={sceneRef}
          className={`relative h-[380px] sm:h-[480px] lg:col-span-6 lg:-my-16 lg:h-[640px] ${sceneReady ? "cursor-grab active:cursor-grabbing" : ""}`}
          aria-hidden="true"
        >
          <div
            className={`absolute inset-[6%] transition-opacity duration-700 ${sceneReady ? "opacity-0" : "opacity-100"}`}
          >
            <PlanetFallback />
          </div>
          {webgl && nearScene && (
            <SceneBoundary>
              <Suspense fallback={null}>
                <div
                  className={`absolute inset-0 transition-opacity duration-1000 ${sceneReady ? "opacity-100" : "opacity-0"}`}
                >
                  <PlanetScene onReady={handleReady} />
                </div>
              </Suspense>
            </SceneBoundary>
          )}
        </div>
      </div>
    </Section>
  );
}
