import React from "react";
import StatusIndicator from "./StatusIndicator";

const MessageItem = ({ message, isOwn, isOnline }) => {
  const time = new Date(message.timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div
      className={`
        flex mb-3 animate-[slideIn_0.25s_ease-out]
        ${isOwn ? "justify-end" : "justify-start"}
      `}
    >
      <div
        className={`
          max-w-[70%] px-4 py-2 rounded-2xl shadow-md
          transition-all duration-200
          ${
            isOwn
              ? "bg-indigo-600 text-white rounded-br-md"
              : "bg-slate-800 text-slate-100 rounded-bl-md"
          }
        `}
      >
        <div className="text-[15px] leading-snug break-words mb-1">
          {message.text}
        </div>

        <div
          className={`
            flex items-center justify-end gap-1 text-[11px]
            ${isOwn ? "text-white/80" : "text-slate-400"}
          `}
        >
          <span>{time}</span>
          <StatusIndicator
            status={message.status}
            isOwn={isOwn}
            isOnline={isOnline}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
