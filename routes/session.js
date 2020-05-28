const express = require("express");
const router = express.Router();

//sends information about the user in the current session.
router.get("/", (req, res) => {
  return res.send(req.context.models.users[req.context.me.id]);
});

export default router;
