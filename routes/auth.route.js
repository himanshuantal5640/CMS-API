const express = require("express");
const {
  initiateSignup,
  verifySignupOtp,
  login
} = require("../controllers/auth.controller.js");
const { apiLimiter } = require("../middlewares/rateLimiter.middleware.js");

const router = express.Router();


router.post("/signup/initiate", apiLimiter, initiateSignup);


router.post("/signup/verify", verifySignupOtp);
router.post("/login", login);

module.exports = router;
