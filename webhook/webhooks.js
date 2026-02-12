const express = require("express");

const router = express.Router();

router.post("/test", (req, res) => {
  console.log("Webhook Received");
  console.log(req.body);

  res.status(200).json({ received: true });
});

module.exports = router;



// webhooks trigger externally wihtout auth only with secrets