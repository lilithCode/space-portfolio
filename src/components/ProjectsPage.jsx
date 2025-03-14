import React from "react";
import Navbar from "./Navbar";
import ParticleBackground from "./Stars2D";
import projectsData from "./projectsData";
import { useNavigation } from "./NavigationContext";

const ProjectsPage = () => {
  const { navigate } = useNavigation();

  return (
    
    <div className="relative text-white min-h-screen">
      <div className="absolute inset-0 -z-10">
        <ParticleBackground />
      </div>
      <Navbar onNavigate={navigate} />
      <div className="flex flex-col mt-32 mb-8 mx-auto items-center">
        <h1 className="relative text-6xl md:text-7xl font-bold tracking-wide text-center ">
          Projects
          <span className="absolute -z-10 left-[220px] transform -translate-x-1/2 bottom-[-10px] block w-50 h-10 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></span>
        </h1>
      </div>
      <section className="container mx-auto py-32 px-16 md:px-16">
        <div className="space-y-20 md:space-y-28">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className={`flex flex-col md:flex-col lg:flex-row gap-12 md:gap-16 ${
                index % 2 === 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="relative w-full ">
                <div className="absolute flex flex-col md:flex-col lg:flex-col top-4 left-4 md:top-8 md:left-8 bg-[#B069DB] w-full h-full rounded-lg" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="relative w-full max-w-full rounded-lg shadow-lg h-full"
                />
              </div>

              <div className="w-full  text-center md:text-left">
                <h3 className="text-6xl font-semibold mb-4">{project.title}</h3>
                <p className="text-xl font-semibold mb-4">
                  {project.description}
                </p>
                <div className="flex flex-col gap-3 w-50 m-auto">
                  <a
                    href={project.link}
                    className="text-center inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white font-medium py-2 px-6 rounded-lg transition hover:from-blue-500 hover:via-purple-600 hover:to-pink-600"
                  >
                    Learn More
                  </a>
                  {project.liveLink && (
                    <a
                      href={project.link}
                      className="text-center inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white font-medium py-2 px-6 rounded-lg transition hover:from-blue-500 hover:via-purple-600 hover:to-pink-600"
                    >
                      Live app
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
