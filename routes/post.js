const router = require('express').Router();

// Importing Post model
const Post = require('../models/post');

// Middleware to make sure user is logged it to post
const isLoggedIn = require('../middleware/middleware').isLoggedIn;

// Get all posts
router.get('/', (req, res) => {
    Post.find({})
    .then(posts => {
        res.render('post/index', { posts });
    })
    .catch(err => {
        if(err)
        throw err;
    });
});

// Add post routes
router.get('/add', (req, res) => {
    res.render('post/add');
});

router.post('/', isLoggedIn, (req, res) => {
    const author = req.user.username;

    const newPost = {
        ...req.body,
        author
    }

    Post.create(newPost)
    .then(post => {
        res.redirect('/posts');
    })
    .catch(err => {
        if(err)
        throw err;
    })
});

// Show post routes
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Post.findById(id)
    .then(post => {
        post.time = post.time.toDateString();

        res.render('post/show', { post, time: post.time.toDateString() });
    })
    .catch(err => {
        if(err)
        throw err;
    });
});

// Edit post routes
router.get('/:id/edit', isLoggedIn, (req, res) => {
    const { id } = req.params;

    Post.findById(id)
    .then(post => {
        res.render('post/edit', { post });
    })
    .catch(err => {
        if(err)
        throw err;
    });
});

router.put('/:id', isLoggedIn, (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
    .then(post => {
        res.redirect('/posts');
    })
    .catch(err => {
        if(err)
        throw err;
    })
});

// Delete post routes
router.get('/:id/delete', isLoggedIn, (req, res) => {
    const { id } = req.params;

    Post.findById(id)
    .then(post => {
        res.render('post/delete', { post });
    })
    .catch(err => {
        if(err)
        throw err;
    });
});

router.delete('/:id', isLoggedIn, (req, res) => {
    Post.findByIdAndRemove(req.params.id)
    .then(() => {
        res.redirect('/posts');
    })
    .catch(err => {
        if(err)
        throw err;
    })
});

module.exports = router;