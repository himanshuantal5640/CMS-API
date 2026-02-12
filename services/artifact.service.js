const Artifact = require("../models/artifact.js");
const cloudinary = require("../config/cloudinary.js");
const fs = require("fs");

const createArtifactService = async ({
  title,
  content,
  userId,
  filePath,
}) => {
  if (!title || !content) {
    throw new Error("Title and content are required");
  }
  
  let mediaUrl = null;

  if (filePath) {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: "cms-artifacts"
    });

    mediaUrl = uploadResult.secure_url;

 
    fs.unlinkSync(filePath);
  }

  console.log("MEDIA URL BEFORE SAVE:", mediaUrl);

  const artifact = await Artifact.create({
    title,
    content,
    author: userId,
    media: mediaUrl || null
  });

  return artifact;
};

const getArtifactsService = async ({ userId, role }) => {
  if (role === "ADMIN") {
 
    return await Artifact.find().populate("author", "name email role");
  }


  return await Artifact.find({ author: userId });
};

module.exports = { createArtifactService, getArtifactsService };
