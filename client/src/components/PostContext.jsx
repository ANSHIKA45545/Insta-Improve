import React, { createContext, useState } from "react";

// Create context
export const PostsContext = createContext();

// Provider component
export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]); // store all uploaded posts

  const addPost = (image) => {
    setPosts((prev) => [...prev, { image }]);
  };

  return (
    <PostsContext.Provider value={{ posts, addPost }}>
      {children}
    </PostsContext.Provider>
  );
};
