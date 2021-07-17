import React from "react";

interface Props {}

const NoMatch = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <p className="font-bold text-8xl">404</p>
      <p className="text-xl">Oops, there's nothing here</p>
    </div>
  );
};

export default NoMatch;
