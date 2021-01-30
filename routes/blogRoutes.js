/*

    // Blog routes

*/
const express = require('express');

const blogController = require('../controllers/blogController');

const router = express.Router();

// Post blog from the form 
router.post('/', blogController.blog_create_post);

//  Create a new blog
router.get('/create', blogController.blog_create_get)

// Get single blog based on _id 
router.get('/:id', blogController.blog_details);

  // Delete blog from frontend 
router.delete('/:id', blogController.blog_delete);

// Get all blogs
router.get('/', blogController.blog_index);

module.exports = router;