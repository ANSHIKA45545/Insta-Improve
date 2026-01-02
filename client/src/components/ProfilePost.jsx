import { useSelector } from "react-redux";
import Post from "./ui/Post";

const ProfilePost = ({ post }) => {
    if (!post) {
        return null;
    }


    return (
        <div className="my-3 w-full max-w-sm mx-auto border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black p-3">
            

            {/* Post Image */}
            <img 
                className="rounded-sm my-2 w-full aspect-square object-cover"
                src={
                    post.image && post.image.startsWith("http")
                        ? post.image
                        : `http://localhost:5000/${post.image}`
                }
                alt="post_img" 
            />

            {/* Icons */}
            <div className="flex items-center justify-between my-2">
                
            </div>

            {post?.caption?.trim() && (
        <p>
          <span className="font-medium mr-2">caption:</span>
          {post.caption}
        </p>
      )}
        </div>
    
    );

}

export default ProfilePost;