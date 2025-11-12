import express from "express";
import Post from "../models/Post.js";
import { protect } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";

const router = express.Router();

// Get all posts
router.get("/", protect, async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// Create post
router.post("/", protect, authorize("Admin", "Editor"), async (req, res) => {
  const post = await Post.create({ ...req.body, authorId: req.user._id });
  res.json(post);
});

// Update post
router.put("/:id", protect, authorize("Admin", "Editor"), async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Not found" });
  if (req.user.role !== "Admin" && post.authorId.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Not allowed" });
  const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete post
router.delete("/:id", protect, authorize("Admin", "Editor"), async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Not found" });
  if (req.user.role !== "Admin" && post.authorId.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Not allowed" });
  await post.deleteOne();
  res.json({ message: "Deleted" });
});

export default router;
