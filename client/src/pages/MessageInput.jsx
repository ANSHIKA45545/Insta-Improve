import React, { useState, useRef, useEffect } from "react";

const MessageInput = ({ onSendMessage, onTyping, isOnline }) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setMessage(value);

    if (value.trim() && !isTyping) {
      setIsTyping(true);
      onTyping(true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      onTyping(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || !isOnline) return;

    onSendMessage(message.trim());
    setMessage("");
    setIsTyping(false);
    onTyping(false);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-slate-700 bg-slate-900 p-4">
      {!isOnline && (
        <div className="mb-2 text-sm text-yellow-400">
          ⚠️ You&apos;re offline. Messages will be sent when connection is restored.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3"
      >
        <input
          type="text"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={!isOnline}
          placeholder={
            isOnline ? "Type a message..." : "Offline – Cannot send messages"
          }
          className="
            flex-1 rounded-xl bg-slate-800 px-4 py-3
            text-slate-100 placeholder-slate-400
            outline-none transition
            focus:ring-2 focus:ring-indigo-500
            disabled:cursor-not-allowed disabled:opacity-60
          "
        />

        <button
          type="submit"
          disabled={!message.trim() || !isOnline}
          className="
            flex h-11 w-11 items-center justify-center
            rounded-full bg-indigo-600 text-white
            transition
            hover:bg-indigo-500
            disabled:bg-slate-700 disabled:cursor-not-allowed
          "
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
