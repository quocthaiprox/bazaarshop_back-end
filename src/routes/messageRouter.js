const express = require("express");
const { verifyToken, verifyAdmin } = require("../utils/verify");
const messagesRouter = express.Router();
const messageController = require("../app/controllers/messageController");

messagesRouter.get("/",verifyToken,verifyAdmin,messageController.getMessages);
messagesRouter.delete("/:id",verifyToken,verifyAdmin,messageController.deleteMessage);
messagesRouter.post("/", messageController.createMessage);

module.exports = messagesRouter;
