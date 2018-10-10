// Importing Express Router
const router = require('express').Router();

// Importing Post model
const Post = require('../models/post');

// Middleware Import To Make Sure User is Logged to Add, Edit and Delete Posts
const isLoggedIn = require('../middleware/middleware').isLoggedIn;

// Get All Posts
router.get('/', (req, res) => {
    Post.find({})
    .then(posts => {
        res.render('post/index', { posts });
    })
    .catch(err => {
        req.flash('error','Failed to load posts.');
        res.redirect('/');
    });
});

// =================================================
//  POST ADD ROUTES
// =================================================

// Loads Add View
router.get('/add', (req, res) => {
    res.render('post/add');
});


// Handles Add Post
router.post('/', isLoggedIn, (req, res) => {
    const author = req.user.username;

    // Makes a new object that will be used to create post. Uses spread operator.
    const newPost = {
        ...req.body,
        author
    }

    Post.create(newPost)
    .then(post => {
        req.flash('success','Post created.');
        res.redirect('/posts');
    })
    .catch(err => {
        req.flash('error','Failed to create post.');
        res.redirect('/posts');
    });
});

// =================================================
//  POST SHOW ROUTE
// =================================================

// Loads And Displays A Single Post
router.get('/:id', (req, res) => {

    // Grabs in req.params.id
    const { id } = req.params;

    Post.findById(id)
    .then(post => {        
        res.render('post/show', { post, time: post.time.toDateString() });
    })
    .catch(err => {
        req.flash('error','Failed to load post.');
        res.redirect('/posts');
    });
});

// =================================================
//  EDIT POST ROUTES
// =================================================

// Loads Edit View
router.get('/:id/edit', isLoggedIn, (req, res) => {

    // Grabs in req.params.id
    const { id } = req.params;

    Post.findById(id)
    .then(post => {
        res.render('post/edit', { post });
    })
    .catch(err => {
        req.flash('error','Failed to load post for edit.');
        res.redirect(`/posts/${id}`);
    });
});

// Handles Update Post
router.put('/:id', isLoggedIn, (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
    .then(post => {
        req.flash('success','Post updated.');
        res.redirect('/posts');
    })
    .catch(err => {
        req.flash('error','Failed to update the post.');
        res.redirect(`/posts/${req.params.id}`);
    });
});

// =================================================
//  DELETE POST ROUTES
// =================================================

// Loads Delete View
router.get('/:id/delete', isLoggedIn, (req, res) => {
    
    // Grabs in req.params.id
    const { id } = req.params;

    Post.findById(id)
    .then(post => {
        res.render('post/delete', { post });
    })
    .catch(err => {
        req.flash('error','Failed to load post for delete.');
        res.redirect(`/posts/${id}`);
    });
});

// Handles Delete Post
router.delete('/:id', isLoggedIn, (req, res) => {
    Post.findByIdAndRemove(req.params.id)
    .then(() => {
        req.flash('success', 'Post deleted.');
        res.redirect('/posts');
    })
    .catch(err => {
        req.flash('error','Failed to delete post.');
        res.redirect(`/posts/${req.params.id}`);
    });
});

// Exports Our Post Routes
module.exports = router;