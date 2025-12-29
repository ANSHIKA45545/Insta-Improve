const sharp = require('sharp');
const User = require('../model/user-model');
const Comment = require('../model/comment-model');  
const Post = require('../model/post-model');
const cloudinary = require('../utils/cloudinary');


const addNewPost = async(req, res) => {
    try{
        const {caption} = req.body;
        const image = req.file;
        const authorId = req.id;

        if(!image) return res.status(400).json({message:'Image required'});

        const optimizedImageBuffer = await sharp(image.buffer)
        .resize({width:800, height:800, fit:'inside'})
        .toFormat('jpg', {quality:80})
        .toBuffer();

        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);
        const post = await Post.create({
            caption,
            image:cloudResponse.secure_url,
            author:authorId
        });
        console.log("Caption:", caption);
console.log("File:", req.file);
console.log("AuthorId:", req.id);


const user = await User.findById(authorId);
console.log("User:", user);

        await User.updateOne(
    { _id: authorId },           // Find the user by ID
    { $push: { posts: post._id } } // Push the new post ID into posts array
);


        await post.populate({path:'author', select: '-password'});
        return res.status(201).json({
            message: "New Post added",post,
            success:true,
        })


    }catch(error){
        console.log(error);
    }
}


const getAllPost = async(req, res) => {
    try{
        const post = await Post.find().sort({createdAt:-1})
        .populate({path: 'author', select:'username profilePicture'})
        .populate({
            path:'comments',
            sort:{createdAt:-1},
            populate:{
                path:'author',
                select:'username',
            }
        });

        console.log('Sample post author after populate:', post[0]?.author);

        return res.status(200).json({
            post,
            success:true
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: 'Error fetching posts',
            success: false
        });
    }
}

const getUserPost = async(req, res) => {
    try{
        const authorId = req.id;
        const posts = await Post.find({author:authorId}).sort({createdAt:-1}).populate({
            path:'author',
            select:'username, profilePicture'
        }).populate({
            path:'comments',
            sort:{createdAt:-1},
            populate:{
            path:'author',
            select:'username, profilePicture',
            }
        })
        return res.status(200).json({
            posts,
            success:true
        })
    }catch(error){
        console.log(error);
    }
}

const likePost = async(req, res) => {
    try{
        const likeUserId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message:'Page not found', success:false});

        await post.updateOne({$addToSet:{likes:likeUserId}});
        await post.save();

        return res.status(200).json({message:'Post liked', success:true});
    }catch(error){
        console.log(error);
    }
}

const DislikePost = async(req, res) => {
    try{
        const likeUserId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message:'Page not found', success:false});

        await post.updateOne({$pull:{likes:likeUserId}});
        await post.save();

        return res.status(200).json({message:'Post disliked', success:true});
    }catch(error){
        console.log(error);
    }
}

const addComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const commentUserId = req.id;

        const {text} = req.body;
        const post = await Post.findById(postId);
        if(!text) return res.status(400).json({message: 'text is required', success:false});

        let comment = await Comment.create({
            text,
            author:commentUserId,
            post:postId
        });
        comment = await comment.populate({
            path:'author',
            select:"username, profilePicture"
        });

        post.comments.push(comment._id);
        await post.save();

        return res.status(201).json({
            message:"Comment Added",
            comment,
            success:true
        })

        
    } catch (error) {
        console.log(error);
    }
};

const deletePost = async(req, res) => {
    try {
        const postId = req.params.is;
        const authorId = req.id;

        const post = await Post.findById(postId);
        if(!post) return res.status(400).json({message: 'Page not found', success:false});

        if(post.author.toString() != authorId) return res.status(403).json({message:'Unauthorized'});

        await Post.findByIdAndDelete(postId);

        let user = await User.findById(authorId);
        user.posts = user.posts.filter(id => id.toString() != postId);
        await user.save();

        await Comment.deleteMany({post:postId});

        return res.status(200).json({
            success:true,
            message:'Post deleted'
        })
    } catch (error) {
        console.log(error);
    }
}


const createPost = async (req, res) => {
  const { caption, image } = req.body;

  const category = await classifyPost(caption, image);

  const post = await Post.create({
    caption,
    image,
    category,     // 👈 ML added
    author: req.id,
  });

  res.status(201).json({ success: true, post });
};

module.exports= {addNewPost, deletePost, addComment, DislikePost, likePost, getUserPost, getAllPost, createPost};