import React, { useState, useRef } from "react";
import axios from "axios";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "@/store/auth";
import { addPost, setPosts } from "@/redux/postSlice";
import { useDispatch } from "react-redux";
import Posts from "./Posts";

// Utility to convert file to Data URL for preview
const readFileAsDataURL = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });

const CreatePage = () => {
  const { authorizationToken } = useAuth(); // token from context
  const dispatch = useDispatch();

  const imageRef = useRef();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle image selection and preview
  const fileChangeHandler = async (e) => {
    try {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        setFile(selectedFile);
        const preview = await readFileAsDataURL(selectedFile);
        setImagePreview(preview);
      }
    } catch (err) {
      console.error("Error reading file:", err);
      toast.error("Failed to load image");
    }
  };

  // Create post handler
  const createPostHandler = async () => {
    if (!caption && !file) {
      toast.error("Please add a caption or image");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    if (imagePreview) formData.append("image", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/post/addpost",
        formData,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: authorizationToken, // Send token in header
          },
        }
      );

      if (res.data.success) {
        dispatch(addPost([ res.data.post]));
        toast.success(res.data.message);
        // setCaption("");
        // setFile(null);
        // setImagePreview("");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-center font-semibold text-lg mb-4">
        Create New Post
      </h2>

      <Textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Write a caption..."
        id="caption"
        name="caption"
      />

      <input
        ref={imageRef}
        type="file"
        className="hidden"
        onChange={fileChangeHandler}
        id="image"
        name="image"
      />

      <Button
        onClick={() => imageRef.current.click()}
        className="mt-3 text-blue-600 font-medium"
      >
        Select Image
      </Button>

      {imagePreview && (
        <div className="my-4">
          <img
            src={imagePreview}
            alt="preview"
            className="w-full h-64 object-cover rounded-md"
          />
        </div>
      )}

      <Button
        onClick={createPostHandler}
        disabled={loading}
        className="w-full mt-4 flex justify-center items-center gap-2 bg-blue-600 text-white py-2 rounded-md"
      >
        {loading ? <Loader2 className="animate-spin" /> : "Post"}
      </Button>
    </div>
  );
};

export default CreatePage;

