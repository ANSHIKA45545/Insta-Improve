const express= require("express");
const router= express.Router();
const authController =require("../controllers/auth-controller");
const {signupSchema, loginSchema}=require("../validators/auth-validators");
const validate=require("../middleware/validate-middleware");
const authMiddleware = require("../middleware/auth-middleware")
const isAuthenticated = require('../middleware/isAuthenticated');


router.route("/").get(authController.home);
router.route("/register").post(validate(signupSchema),authController.register);
router.route("/login").post(validate(loginSchema),authController.login);

router.route("/user").get(authMiddleware,authController.user);

// router.route("/:id/profile").get(authMiddleware,authController.getProfile);
router.route('/:id/profile').get(isAuthenticated, authController.getProfile);

module.exports= router;