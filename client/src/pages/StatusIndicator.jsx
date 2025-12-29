import React from "react";

const StatusIndicator = ({ status, isOwn, isOnline }) => {
  // Don't show status for received messages
  if (!isOwn) return null;

  // Base styles (replaces .status-indicator)
  const baseClasses =
    "ml-1 text-[16px] font-semibold inline-flex items-center tracking-[-2px] transition-all duration-200";

  // Offline (greyed)
  if (!isOnline) {
    return (
      <span className={`${baseClasses} text-gray-400 opacity-60`}>
        {status === "sent" ? "✓" : "✓✓"}
      </span>
    );
  }

  // Online states
  switch (status) {
    case "sent":
      return (
        <span className={`${baseClasses} text-gray-300`}>
          ✓
        </span>
      );

    case "delivered":
      return (
        <span className={`${baseClasses} text-gray-300`}>
          ✓✓
        </span>
      );

    case "read":
      return (
        <span className={`${baseClasses} text-sky-400`}>
          ✓✓
        </span>
      );

    default:
      return (
        <span className={`${baseClasses} text-gray-300`}>
          ✓
        </span>
      );
  }
};

export default StatusIndicator;
