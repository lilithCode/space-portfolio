import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Project from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ParticleBackground from "./components/ParticleBackground"; // Import here

function App() {
  return (
    <>
      <div className="fixed inset-0 -z-20">
        <ParticleBackground />
      </div>

      <main>
        <Home />
        <About />
        <Project />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;
