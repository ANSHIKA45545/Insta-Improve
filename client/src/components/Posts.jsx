import { useSelector } from "react-redux";
import Post from "./ui/Post";

const Posts = () => {
    const posts = useSelector((store )=> store.post.posts);
    console.log("Redux posts:", posts);

    if (!Array.isArray(posts) || posts.length === 0) {
    return <p className="text-center text-gray-500">No posts yet</p>;
  }

    return (
        <div>
            {
                posts.map((post, index) => (
                post ? <Post key={post._id || index} post={post} /> : null
            ))
            }
        </div>
    )
}

export default Posts;