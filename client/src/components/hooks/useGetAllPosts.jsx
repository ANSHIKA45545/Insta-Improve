import { setPosts } from "@/redux/postSlice";
import { useAuth } from "@/store/auth";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllPost = () => {
    const dispatch = useDispatch();
    const { authorizationToken } = useAuth(); // Ensure this includes "Bearer " (fix in useAuth if needed)

    useEffect(() => {
        const fetchAllPost = async () => {
            if (!authorizationToken) {
                console.warn("No authorization token available");
                return; // Skip if no token
            }

            try {
                const res = await axios.get("http://localhost:5000/api/post/all", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: authorizationToken, // Must be "Bearer <token>"
                    },
                });
                console.log("API Response:", res.data);

                if (res.data.success) {
                    // Change to res.data.posts (based on your API structure)
                    dispatch(setPosts(res.data.post || [])); // Fallback to empty array
                } else {
                    console.error("API response not successful:", res.data);
                }
            } catch (error) {
                console.error("Error fetching posts:", error.response?.data || error.message);
            }
        };

        fetchAllPost();
    }, [authorizationToken, dispatch]); // Add dependencies to re-run on token change
};

export default useGetAllPost;