import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white font-Exo2">
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-black to-transparent overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-20 h-20 -mt-10 -ml-10 border-8 border-t-8 border-t-[#B069DB] border-white rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-lg animate-pulse space-text">
          Loading...{progress.toFixed(0)}%
        </p>
      </div>
    </Html>
  );
};

export default Loader;
