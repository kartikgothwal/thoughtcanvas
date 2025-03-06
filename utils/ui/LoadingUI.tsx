const LoadingSpinner = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-300 bg-opacity-50"
      style={{ backgroundColor: "rgba(192, 192, 192, 0.5)" }}
    >
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
    </div>
  );
};
const ButtonLoading = () => {
  return (
    <div className="button-loader w-6 h-6 ease-linear rounded-full border-8 border-t-8 border-gray-200 "></div>
  );
};
export { LoadingSpinner, ButtonLoading };
