import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-centerr">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-500"></div>
    </div>
  );
};

export default LoadingSpinner;
