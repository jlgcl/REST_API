const { v4: uuidv4 } = require("./node_modules/uuid/dist");
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});

router.get("/:messageId", (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]); //req.params.messageId is :messageId
});

router.post("/", (req, res) => {
  const id = uuidv4();
  const message = {
    //new message object
    id, //an identifier is assigned to every message
    text: req.body.text, //message text can be extracted from the req payload (req.body.text - uses express body-parser)
    userId: req.context.me.id, //in app.js, req.context.me.id is assigned user[1] - we mark it here to mark who created this new message
  };

  //REMEMBER: a message post is created using curl CLI (using -H & -d flags)

  req.context.models.messages[id] = message; //new id is generated from uuidv4(), then assigned to the new message, then the message is saved to the messages object.

  return res.send(message);
});

router.delete("/:messageId", (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

export default router;
