<<<<<<< HEAD
import { useLocation } from "react-router-dom";
import { useNavigation } from "./NavigationContext";

const Navbar = () => {
  const location = useLocation();
  const { navigate } = useNavigation();

  if (location.pathname === "/") return null;

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white p-4 shadow-md flex justify-between items-center z-50">
      <button
        onClick={() => navigate("/")}
        className="text-xl font-bold ml-6 cursor-pointer"
      >
        <img src="/logo.svg" alt="Logo" className="h-10 w-auto sm:h-8" />
      </button>
      <div className="flex gap-6 mr-6 text-2xl sm:text-xl">
        {["about", "projects", "skills", "contact"].map((page) => (
          <button
            key={page}
            onClick={() => navigate(`/${page}`)}
=======
import {  useNavigate } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="fixed top-0 h-20 left-0 w-full bg-gray-900 text-white p-4 shadow-md flex justify-between items-center z-50">
      <button
        onClick={() => window.location.href = "/"}
        className="text-xl font-bold ml-6 cursor-pointer"
      >
        <img src="/logo.svg" alt="Logo" className="h-10 w-auto sm:h-15" />
      </button>
      <div className="flex gap-6 mr-6 text-xl sm:text-2xl">
        {["about", "projects", "skills", "contact"].map((page) => (
          <button
            key={page}
            onClick={() => handleScroll(page)}
>>>>>>> f2d5575 (Initial commit)
            className="hover:text-[#B069DB] cursor-pointer"
            aria-label={`Go to ${page}`}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </button>
        ))}
      </div>
    </nav>
  );
};

<<<<<<< HEAD
export default Navbar;
=======
const handleScroll = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

export default Navbar;

>>>>>>> f2d5575 (Initial commit)
