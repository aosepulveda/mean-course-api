const express = require('express');
const router = express.Router();

const Post = require('../models/post');

router.get('', (req, res, next) => {
  Post.find()
    .then((documents) => {
      res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: documents
      });
    })
    .catch((e) => {
      console.error(e);
      res.status(404).json({
        message: 'Posts can\'t be fetched!'
      });
    });
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post not found'});
      }
    })
});

router.post('', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save()
    .then((createdPost) => {
      res.status(201).json({
        message: 'Posts added successfully!',
        postId: createdPost._id
      });
    })
    .catch(() => {
      res.status(404).json({
        message: 'Post can\'t be saved!'
      });
    });
});

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id}, post)
    .then(result => {
      res.status(200).json({
        message: 'Post updated successfully!'
      });
    })
    .catch((e) => {
      res.status(404).json({
        message: 'Post can\'t be edited!',
        error: e
      });
    });
});

router.delete('/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: 'Post deleted!' });
    })
    .catch((e) => {
      console.error(e);
      res.status(404).json({
        message: 'Post can\'t be deleted!',
        error: e
      });
    });
});

module.exports = router;
