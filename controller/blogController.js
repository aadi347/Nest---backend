import {Blog} from "../models/Blog.js";

export const createBlog = async (req, res) => {
    try {
        const {title, category, content} = req.body;
        const newBlog = new Blog({title, category, content});
        await newBlog.save();
        res.status(201).json({message: "Blog created successfully"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});

    }
}

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
}

export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.status(200).json(blog);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
}

