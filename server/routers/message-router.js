
const express= require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();
const {sendMessage, getMessage} = require('../controllers/message.controller')

router.route('/send/:id').post(isAuthenticated, sendMessage);
router.route('/all/:id').get(isAuthenticated, getMessage);
// router.route('/:id/profile').get(isAuthenticated, getProfile);
// router.route('/profile/edit').post(isAuthenticated, upload.single('profilePicture'), editProfile);


module.exports= router;
