import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    Timestamp: { type: Date, default: Date.now },
})

export const Blog = mongoose.model("Blog", blogSchema);