// src/components/HomePage.jsx
import React, { useEffect, useState } from "react";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";
import { useAuth } from "../store/auth";
import Posts from "./Posts";
import useGetAllPost from "./hooks/useGetAllPosts";
import Post from "./ui/Post";
import { useSelector } from "react-redux";

export default function HomePage() {
  useGetAllPost();
  const { user } = useAuth();
  const {authorizationToken} = useAuth();
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  
const currentUser = user || storedUser || { name: "" };
const name = currentUser.name;
const avatarLetter = name ? name.charAt(0).toUpperCase() : "";

const posts = useSelector((state) => state.post.posts);
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH POSTS ----------------
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/post/all", {
          headers: {
            Authorization: authorizationToken,
          },
        });

        const data = await res.json();

        if (res.ok) {
            setPosts(data.posts);
          } else {
           console.error(data.message);
          }
        
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex bg-white dark:bg-black text-black dark:text-white min-h-screen">

      {/* ------------- MAIN FEED ------------- */}
      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-xl p-4">

          {/* -------- LOGGED-IN USER SMALL BUBBLE -------- */}
          <div className="flex gap-4 py-4">
            <div className="flex flex-col items-center">
              {/* Avatar Initial (circle) */}
              <div className="w-16 h-16 rounded-full bg-pink-500 text-white 
                              flex justify-center items-center text-2xl font-bold">
                {avatarLetter}
              </div>
              <p className="text-xs mt-1 text-center">{name || "Loading..."}</p>
              
            
            </div>
          </div>

          {/* -------- SAMPLE FEED POST (Replace with real posts later) -------- */}

            {/* Post Header */}
            

            <div className="flex flex-col gap-6">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              No posts yet
            </p>
          ) : (
            posts.map((post) => (
              <Post key={post._id} post={post} />
            ))
          )}

</div>
          </div>


        {/* ----------- SUGGESTED USERS (DESKTOP ONLY) ----------- */}
        <aside className="hidden lg:block w-80 p-4 ml-6">
          <div className="flex items-center justify-between mb-4">

            {/* Logged-in user section */}
            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-full bg-blue-600 text-white 
                              flex justify-center items-center text-xl font-bold">
                {avatarLetter}
              </div>

              <div>
                <p className="font-semibold">{name}</p>
              </div>
            </div>

            <button className="text-blue-500 font-semibold">Switch</button>
          </div>

          <p className="mt-6 font-semibold text-gray-500">Suggested for you</p>

          <div className="mt-2 space-y-3">
            {["UserA", "UserB", "UserC"].map((name) => (
              <div key={name} className="flex items-center justify-between">

                {/* Suggested Avatar (initial only) */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-600 text-white 
                                  flex justify-center items-center font-bold">
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <p>{name}</p>
                </div>

                <button className="text-blue-500 font-semibold">Follow</button>
              </div>
            ))}
          </div>

        </aside>
      </main>

      {/* ----------- MOBILE BOTTOM NAVBAR ----------- */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-black 
                      border-t border-gray-300 dark:border-gray-700 
                      flex justify-around py-3 z-50">
        <Home size={28} />
        <Search size={28} />
        <PlusSquare size={28} />
        <Heart size={28} />
        <User size={28} />
      </nav>

      <div className="lg:hidden h-16"></div>
    </div>
  );
}
