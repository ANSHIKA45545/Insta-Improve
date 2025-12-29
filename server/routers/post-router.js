const express= require("express");
const router = express.Router();
const {
  addNewPost,
  deletePost,
  DislikePost,
  getAllPost,
  getUserPost,
  likePost,
  addComment
} = require("../controllers/post-controller");
const isAuthenticated = require('../middleware/isAuthenticated');
const upload = require("../middleware/multer");


router.route('/addpost').post(isAuthenticated, upload.single('image'), addNewPost);
router.route('/all').get(isAuthenticated, getAllPost);
router.route('/userpost/all').get(isAuthenticated, getUserPost);
router.route('/:id/like').post(isAuthenticated, likePost);
router.route('/:id/dislike').post(isAuthenticated, DislikePost);
// router.route('/userpost/all').get(isAuthenticated, upload.single('image'), addNewPost);
router.route('/delete/:id').delete(isAuthenticated, deletePost);

module.exports= router;