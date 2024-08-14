const express = require('express');
const Blog = require('./models/blog');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware for protected routes

const router = express.Router();

// Create a new blog (protected route)
router.post('/', authMiddleware, async (req, res) => {
  const { title, content, keywords, topic } = req.body;

  try {
    const blog = await Blog.create({
      title,
      content,
      keywords,
      topic,
      author: req.user.id,
    });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all blogs or search by keyword/topic
router.get('/', async (req, res) => {
  const { keyword, topic } = req.query;

  try {
    const query = {};
    if (keyword) {
      query.keywords = { $regex: keyword, $options: 'i' };
    }
    if (topic) {
      query.topic = topic;
    }
    const blogs = await Blog.find(query).populate('author', 'username').sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username').populate('comments');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Like or unlike a blog (protected route)
router.put('/:id/like', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.likes.includes(req.user.id)) {
      blog.likes = blog.likes.filter((like) => like.toString() !== req.user.id.toString());
    } else {
      blog.likes.push(req.user.id);
    }

    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a blog (protected route)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.author.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    await blog.remove();
    res.json({ message: 'Blog removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
