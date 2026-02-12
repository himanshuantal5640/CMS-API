const express = require("express");
const { addComment, getComments } = require("../controllers/comment.controller.js");
const { authMiddleware } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.post("/:id/comments", authMiddleware, addComment);
router.get("/:id/comments", getComments);

module.exports = router;
