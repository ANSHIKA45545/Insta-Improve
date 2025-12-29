const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: { type: String, required: false  },
  image: { type: String, required: true }, 
  author:{
    type:mongoose.Schema.Types.ObjectId, 
    ref:'User', required:true
  },
  likes: [{
    type:mongoose.Schema.Types.ObjectId, 
    ref:'User'
  }],
  comments: [{
    type:mongoose.Schema.Types.ObjectId, 
    ref:'Comment'
  }],

  category: {
    type: String,
    enum: ["Fitness", "Nature", "Food", "Travel", "Lifestyle"],
  },
});

const Post = new mongoose.model("Post", postSchema);
module.exports = Post;