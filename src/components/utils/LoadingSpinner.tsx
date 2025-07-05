const LoadingSpinner = () => {
  return (
    <>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-300 border-solid mb-4"></div>
      <div className="text-lg text-pink-400 font-semibold">
        Generating your letter...
      </div>
    </>
  );
};

export default LoadingSpinner;
