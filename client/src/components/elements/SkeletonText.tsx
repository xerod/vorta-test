import React from "react";

interface Props {
  loading?: boolean;
}

const SkeletonText: React.FC<Props> = ({ children, loading }) => {
  return (
    <>
      <div
        className={
          loading
            ? "relative z-10 min-w-full h-4 bg-gray-400 rounded animate-pulse mb-1"
            : "hidden"
        }
      ></div>
      <div className="relative z-0">{children}</div>
    </>
  );
};

export default SkeletonText;
