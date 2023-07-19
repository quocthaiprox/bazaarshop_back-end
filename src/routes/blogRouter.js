const express = require("express");
const { verifyToken, verifyAdmin } = require("../utils/verify");
const blogsRouter = express.Router();
const blogController = require("../app/controllers/blogController");

blogsRouter.get("/", blogController.getSomeBlog);
blogsRouter.post("/", verifyToken, blogController.createBlog);
blogsRouter.post("/:id", verifyToken, blogController.updateBlog);
blogsRouter.delete("/:id", verifyToken, blogController.deleteBlog);

module.exports = blogsRouter;
