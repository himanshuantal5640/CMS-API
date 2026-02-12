const rateLimit = require("express-rate-limit");
const { createArtifactService, getArtifactsService } = require("../services/artifact.service.js");
const { apiLimiter } = require("../middlewares/rateLimiter.middleware.js");

const createArtifact = async (req, res) => {
  try {
    const artifact = await createArtifactService({
      title: req.body.title,
      content: req.body.content,
      userId: req.user.id, // injected by auth middleware
      filePath: req.file?.path
    });

    res.status(201).json({
      success: true,
      message: "Artifact created successfully",
      artifact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const getArtifacts = async (req, res) => {
  try {
    const artifacts = await getArtifactsService({
      userId: req.user.id,
      role: req.user.role
    });

    res.status(200).json({
      success: true,
      artifacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { createArtifact, getArtifacts };
