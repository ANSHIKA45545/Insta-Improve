import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, currentUser, isOnline }) => {
  const messagesEndRef = useRef(null);
  const listRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center bg-slate-900 text-slate-400 text-base">
        <p>No messages yet. Start the conversation!</p>
      </div>
    );
  }

  return (
    <div
      ref={listRef}
      className="
        flex-1 overflow-y-auto p-5
        bg-slate-900
        bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.02)_2px,rgba(0,0,0,0.02)_4px)]
        scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-transparent
      "
    >
      {messages.map((message) => {
        const isOwn = message.from === currentUser;
        return (
          <MessageItem
            key={message.id}
            message={message}
            isOwn={isOwn}
            isOnline={isOnline}
          />
        );
      })}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
