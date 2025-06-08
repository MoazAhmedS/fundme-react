// src/components/ui/Loader.jsx
const Loader = ({ size = 20, color = "white" }) => {
  return (
    <div
      className={`border-2 border-t-transparent rounded-full animate-spin`}
      style={{
        width: size,
        height: size,
        borderColor: color,
        borderTopColor: "transparent",
      }}
    ></div>
  );
};

export default Loader;
