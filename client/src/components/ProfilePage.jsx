import React, { useState, useContext, useEffect } from "react";
import { Grid, PlayCircle, Tag } from "lucide-react";
import { PostsContext } from "./PostContext";
import { useAuth } from "../store/auth";
import Post from "./ui/Post";
import classifyPost from "@/redux/classifyPost";
import ProfilePost from "./ProfilePost";



export default function ProfilePage() {
  const { user } = useAuth();
  const storedUser = JSON.parse(localStorage.getItem("user")); 
  const [classifyMode, setClassifyMode] = useState(false);

  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState([]);



  const currentUser = user || storedUser || { name: "" };
const username = currentUser.name;
const avatarLetter = username ? username.charAt(0).toUpperCase() : "";
const token = localStorage.getItem("token");



useEffect(() => {
  const fetchAndClassifyPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/post/userpost/all", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        // Classify each post using the new function
        const postsWithCategory = await Promise.all(
          data.posts.map(async (post) => {
            const category = await classifyPost(post);
            return { ...post, category };
          })
        );
        setPosts(postsWithCategory);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  fetchAndClassifyPosts();
}, []);





const groupedPosts = posts.reduce((acc, post) => {
  const category = post.category || "Uncategorized";
  if (!acc[category]) acc[category] = [];
  acc[category].push(post);
  return acc;
}, {});





  return (
    <div className="flex bg-white dark:bg-black text-black dark:text-white min-h-screen">

      {/* ---------- MAIN PROFILE ---------- */}
      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-4xl p-4">

          {/* PROFILE HEADER */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 mb-6">

  {/* Avatar as initial */}
  <div className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-700 
                  bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
    {avatarLetter}
  </div>

  <div className="flex-1 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full">
    <div>
      <h2 className="text-2xl font-semibold">{username || "Loading..."}</h2>
      <div className="flex gap-4 mt-2 text-sm">
        <span><strong>{posts.length}</strong> posts</span>
        <span><strong>120</strong> followers</span>
        <span><strong>80</strong> following</span>
      </div>
    </div>

    <button className="mt-2 lg:mt-0 px-4 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
      Edit Profile
    </button>
  </div>
</div>


          {/* BIO */}
          <div className="mb-6">
            <p className="font-semibold">{username}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is your bio. You can write something about yourself here.
            </p>


            <button
            onClick={() => setClassifyMode(!classifyMode)}
            className="border px-4 py-1 rounded-md"
            >
              {classifyMode ? "Show All Posts" : "Classify Posts"}
            </button>

          </div>

          {/* TABS */}
          <div className="flex border-t border-gray-300 dark:border-gray-700 mb-4">
            <button
              className={`flex-1 py-3 flex justify-center items-center gap-2 ${
                activeTab === "posts" ? "border-t-2 border-black dark:border-white font-semibold" : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("posts")}
            >
              <Grid size={20} /> Posts
            </button>
            <button
              className={`flex-1 py-3 flex justify-center items-center gap-2 ${
                activeTab === "reels" ? "border-t-2 border-black dark:border-white font-semibold" : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("reels")}
            >
              <PlayCircle size={20} /> Reels
            </button>
            
          </div>

          {/* POSTS GRID */}

          {activeTab === "posts" && (
  <div className="mt-4">

    {/* 🔥 CLASSIFIED VIEW */}
    {classifyMode ? (
  Object.keys(groupedPosts).map((category) => (
    <div key={category}>
      <h3 className="text-lg font-bold mt-6">{category}</h3>
      <div className="grid grid-cols-3 gap-1">
        {groupedPosts[category].map((post) => (
        <ProfilePost key={post._id} post={post} />
      ))}
      </div>
    </div>
  ))
    ) : (
      /* 🔥 NORMAL VIEW */
      <div className="grid grid-cols-3 gap-1">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 mt-10 col-span-full">
            No posts yet
          </p>
        ) : (
          posts.map((post) => (
            <ProfilePost key={post._id} post={post} />
          ))
        )}
      </div>
    )}
  </div>
)}



          {/* Placeholder for reels/tagged */}
          {activeTab === "reels" && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-20">
              Reels content goes here.
            </div>
          )}
          {activeTab === "tagged" && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-20">
              Tagged posts content goes here.
            </div>
          )}
        </div>
      </main>

      {/* MOBILE BOTTOM NAVBAR (for reference) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-black border-t border-gray-300 dark:border-gray-700 flex justify-around py-3 z-50">
        {/* Use your navbar icons here */}
      </div>

      {/* Extra padding for mobile */}
      <div className="lg:hidden h-16"></div>
    </div>
  );
}
