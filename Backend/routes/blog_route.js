const express = require('express');
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Create a new blog (protected route)
router.post('/', authMiddleware, async (req, res) => {
  const { title, content, topic, keywords } = req.body;

  try {
    const newBlog = new Blog({
      title,
      content,
      topic,
      keywords,
      author: req.user.id
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

//comments:
router.post('/comment/:blogId', authMiddleware, async (req, res) => {
  const { content } = req.body;
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const comment = new Comment({
      content,
      author: req.user.id,
      blog: blogId
    });

    await comment.save();

    blog.comments.push(comment._id);
    await blog.save();

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all blogs
router.get('/', async (req, res) => {
  try {
    // Find and sort blogs by the number of likes in descending order
    const blogs = await Blog.find()
      .sort({ likes: -1 }) // Sort by likes (descending)
      .limit(10) // Limit the results to 10
      .populate('author', 'username')
      .populate('comments');

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Get a single blog by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id)
      .populate('author', 'username')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username' } // Populate author for comments
      });

    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Like a blog (protected route)
router.put('/:id/like', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.likes.includes(req.user.id)) {
      // Unlike if already liked
      blog.likes = blog.likes.filter((like) => like.toString() !== req.user.id);
    } else {
      // Like the blog
      blog.likes.push(req.user.id);
    }

    await blog.save();
    res.json({ message: 'Like status updated', likes: blog.likes });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Search blogs by keyword or topic
router.get('/search', async (req, res) => {
  const { keyword } = req.query;

  try {
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { content: { $regex: keyword, $options: 'i' } },
        { keywords: { $regex: keyword, $options: 'i' } },
        { topic: { $regex: keyword, $options: 'i' } }
      ]
    }).populate('author', 'username');

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    // Check if blog exists
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if the logged-in user is the author of the blog
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this blog' });
    }

    // Delete the blog
    await blog.remove();

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a blog
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, content, topic, keywords } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);

    // Check if the blog exists
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if the logged-in user is the author of the blog
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to update this blog' });
    }

    // Update the blog fields
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.topic = topic || blog.topic;
    blog.keywords = keywords || blog.keywords;

    // Save the updated blog
    await blog.save();

    res.status(200).json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
