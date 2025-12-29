import React from "react";

const NetworkStatus = ({ isOnline }) => {
  if (isOnline) return null;

  return (
    <div className="flex h-[50px] items-center justify-center bg-orange-500 px-5 text-sm font-medium text-white z-50">
      <span className="mr-2 text-lg">⚠️</span>
      <span className="text-center flex-1">
        You're offline. Messages will be sent when connection is restored.
      </span>
    </div>
  );
};

export default NetworkStatus;
