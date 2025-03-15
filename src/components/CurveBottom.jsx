const CurveBottom = () => {
  return (
    <div className=" w-full h-[140px] overflow-hidden bg-transparent">
      <svg
        viewBox="0 0 5740 200"
        className=" left-0 w-full h-full max-w-full "
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#d6b3ec", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#2b0344", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <path
          fill="url(#purpleGradient)"
          d="M0,200 Q2870,-100 5740,200 L5740,200 L0,200 Z"
        />
      </svg>
    </div>
  );
};

export default CurveBottom;
