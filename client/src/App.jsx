import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

import HomePage from "./components/HomePage";
import SearchPage from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import CreatePage from "./components/CreatePage";
import ProfilePage from "./components/ProfilePage";
import ChatPage from "./pages/ChatPage";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [lastSeenMap, setLastSeenMap] = useState({});

  // Socket connection (once)
  const socket = io("http://localhost:5000");


  const [users, setUsers] = useState([
  { username: "alice" },
  { username: "bob" },
  { username: "charlie" }
]);


  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const LogoutUser = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <BrowserRouter>
        <Layout user={user} LogoutUser={LogoutUser}>
          <div className="lg:ml-64 h-[calc(100vh-4px)]">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/login"
                element={<Login setUser={setUser} setToken={setToken} />}
              />
              <Route path="/register" element={<Register />} />

              {/* Chat route */}
              <Route
  path="/message"
  element={
    <ChatPage
      socket={socket}
      currentUser={user?.username}
      users={users}                 // 👈 REQUIRED
      onlineUsers={onlineUsers}
      isOnline={isOnline}
      lastSeenMap={lastSeenMap}
    />
  }
/>

              <Route path="/search" element={<SearchPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/create" element={<CreatePage />} />
            </Routes>
          </div>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
