const router = require('express').Router();

// Importing Post model
const Post = require('../models/post');

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

router.get('/add', (req, res) => {
    res.render('post/add');
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Post.findById(id)
    .then(post => {
        res.render('post/show', { post });
    })
    .catch(err => {
        if(err)
        throw err;
    });
});

router.get('/:id/edit', (req, res) => {
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

router.get('/:id/delete', (req, res) => {
    const { id } = req.params;

    Post.findById(id)
    .then(post => {
        res.render('post/show', { post });
    })
    .catch(err => {
        if(err)
        throw err;
    });
});

module.exports = router;