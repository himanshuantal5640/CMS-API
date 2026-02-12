const express = require("express");
const { getChatsByThread, sendChat } = require("../controllers/chats.controller.js");
const { authMiddleware } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.get("/:threadId", authMiddleware, getChatsByThread);
router.post("/", authMiddleware, sendChat);

module.exports = router;
