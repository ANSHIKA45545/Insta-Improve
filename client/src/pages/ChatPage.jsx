import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import UserList from "../pages/UserList";
import ChatWindow from "../pages/ChatWindow";

// Initialize socket outside the component to avoid multiple connections
const socket = io("http://localhost:5000");

const ChatPage = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Fetch all users from the server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/userList");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to load users", err);
      }
    };

    fetchUsers();
  }, []);

  // Emit that current user is online
  useEffect(() => {
    if (currentUser?.username) {
      socket.emit("user:online", currentUser.username);
    }
  }, [currentUser?.username]);

  // Listen for online users from server
  useEffect(() => {
  socket.on("users:online", (onlineUsernames) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => ({
        ...user,
        isOnline: onlineUsernames.includes(user.username),
      }))
    );
  });

  return () => {
    socket.off("users:online");
  };
}, [users]);

  // Filter out the current user from the list
  const visibleUsers = users.filter((u) => u.username !== currentUser?.username);

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* LEFT USER LIST */}
      <div className="w-72 border-r bg-white">
        <UserList
          users={visibleUsers}
          currentUser={currentUser?.username}
          selectedUser={selectedUser}
          onSelectUser={setSelectedUser}
          onlineUsers={onlineUsers} // pass online info to UserList
        />
      </div>

      {/* RIGHT CHAT */}
      <div className="flex-1">
        <ChatWindow selectedUser={selectedUser} currentUser={currentUser} socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
