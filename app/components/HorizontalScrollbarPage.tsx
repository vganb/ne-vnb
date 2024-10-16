import React from "react";

const HorizontalScrollbarPage = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex max-w-4xl overflow-x-auto items-center space-x-2 p-4  border-2 border-red-300 m-4">
      {children}
    </div>
  );
};

export default HorizontalScrollbarPage;
