// src/components/ui/Post.jsx
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Bookmark, HeartIcon, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar } from "./avatar";
import { useState } from "react";

const Post = ({ post }) => {
    if (!post) {
        return null;
    }

    const username = post?.author?.username || "Unknown"; // Primary check for author.name
    const avatarLetter = username.charAt(0).toUpperCase();

    return (
        <div className="my-3 w-full max-w-sm mx-auto border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black p-3">
            {/* Post Header - First letter and username above the image */}
            <div className="flex items-center gap-3 mb-2">
                {/* User Avatar (First Letter) */}
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white 
                                flex justify-center items-center text-lg font-bold">
                    {avatarLetter}
                </div>
                <p className="font-semibold">{username}</p>
            </div>

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
                <div className="flex items-center gap-3">
                    <HeartIcon size={'22px'} />
                    <MessageCircle className="cursor-pointer hover:text-gray-600" />
                    <Send className="cursor-pointer hover:text-gray-600" />
                </div>
                <Bookmark />
            </div>

            {/* Caption below the image */}
            <p>
                <span className="font-medium mr-2">{username}</span>
                {post?.caption}
            </p>
        </div>
    );
};

export default Post;