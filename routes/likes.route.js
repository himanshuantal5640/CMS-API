const express = require("express");
const { toggleLike, getLikeCount } = require("../controllers/likes.controller.js");
const { authMiddleware } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.post("/:id/like", authMiddleware, toggleLike);
router.get("/:id/likes", getLikeCount);

module.exports = router;
