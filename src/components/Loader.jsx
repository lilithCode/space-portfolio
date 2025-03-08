import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="loader-container">
        <div className="black-hole">
        </div>
        <p>Loading... {progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
};

export default Loader;
