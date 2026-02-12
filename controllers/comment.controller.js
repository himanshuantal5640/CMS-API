const {
  addCommentService,
  getCommentsService
} = require("../services/comment.service.js");

const addComment = async (req, res) => {
  try {
    const comment = await addCommentService({
      artifactId: req.params.id,
      userId: req.user.id,
      text: req.body.text
    });

    res.status(201).json({
      success: true,
      comment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const getComments = async (req, res) => {
  const comments = await getCommentsService(req.params.id);

  res.status(200).json({
    success: true,
    comments
  });
};

module.exports = { addComment, getComments };
