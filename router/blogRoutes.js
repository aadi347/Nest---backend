import { createBlog, getBlogById, getBlogs } from "../controller/blogController.js";
import express from "express";

const router = express.Router();

router.post("/createBlog", createBlog);
router.get("/getBlogs", getBlogs);
router.get("/getBlogById/:id", getBlogById);

export default router;