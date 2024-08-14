const express = require('express');
const Comment = require('.models/comment');
const Blog = require('./models/blog');
const authMiddleware = require('./middleware/authMiddleware');
const router = express.Router();

// Add a comment to a blog (protected route)
router.post('/:blogId', authMiddleware, async (req, res) => {
  const { content } = req.body;

  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const comment = await Comment.create({
      content,
      author: req.user.id,
      blog: req.params.blogId,
    });

    blog.comments.push(comment._id);
    await blog.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get comments for a specific blog
router.get('/:blogId', async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId }).populate('author', 'username');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
