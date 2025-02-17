const LoadingSpinner = () => {
  return (
    <div
      className="fixed top-0 left-0 flex items-center justify-center h-screen w-full z-50 overflow-hidden"
      style={{ backgroundColor: "rgba(192, 192, 192, 0.5)" }}
    >
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
    </div>
  );
};

export default LoadingSpinner;
