import React from "react";

const HorizontalScrollbarPage = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex max-w-4xl overflow-x-auto items-center space-x-2 p-2 mx-2">
      {children}
    </div>
  );
};

export default HorizontalScrollbarPage;
