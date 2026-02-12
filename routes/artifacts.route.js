const express = require("express");
const { createArtifact, getArtifacts } = require("../controllers/artifact.controller.js");
const { authMiddleware } = require("../middlewares/auth.middleware.js");
const { authorizeRoles } = require("../middlewares/role.middleware.js");
const { upload } = require("../middlewares/uploads.middleware.js");
const { apiLimiter } = require("../middlewares/rateLimiter.middleware.js");

const router = express.Router();
router.post("/", authMiddleware, upload.single("file"), createArtifact);
router.get("/", apiLimiter, authMiddleware, authorizeRoles("ADMIN"), getArtifacts);

module.exports = router;
