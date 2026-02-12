const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/auth.route.js");
const artifactRoutes = require("./routes/artifacts.route.js");
const likes = require("./routes/likes.route.js");
const comment = require("./routes/comment.route.js");
const cookieParser = require("cookie-parser");
const { testing } = require("./crons/testing.js");
const webhookRoutes = require("./webhook/webhooks.js");
const chatRoutes = require("./routes/chats.route.js");

const app = express();


app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));

testing();

app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CMS Backend is running"
  });
});

app.use("/webhooks", webhookRoutes);
app.use("/auth", authRoutes);
app.use("/artifacts", artifactRoutes);
app.use("/likes", likes);
app.use("/comments", comment);
app.use("/chats", chatRoutes);

module.exports = app;

