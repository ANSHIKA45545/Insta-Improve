import { useState } from "react";
import { Send } from "lucide-react";

const ChatWindow = ({ selectedUser }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a user to start chatting
      </div>
    );
  }

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages(prev => [...prev, { text: message, self: true }]);
    setMessage("");
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-gray-50">

      {/* 🔵 Header */}
      <div className="h-14 px-4 flex items-center border-b bg-white font-semibold">
        {selectedUser.username}
      </div>

      {/* 🟢 Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <p className="text-center text-gray-400">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-xs px-3 py-2 rounded-lg text-sm
                ${msg.self
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-white border"
                }`}
            >
              {msg.text}
            </div>
          ))
        )}
      </div>

      {/* 🟣 Message Input */}
      <div className="h-16 border-t bg-white px-4 flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 p-3 rounded-full text-white flex items-center justify-center"
        >
          <Send size={18} />
        </button>
      </div>

    </div>
  );
};

export default ChatWindow;
