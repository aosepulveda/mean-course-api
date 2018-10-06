const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();
require('dotenv').config();

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.error('Unable to connect to database!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.get('/api/posts', (req, res, next) => {
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

app.get('/api/posts/:id', (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post not found'});
      }
    })
});

app.post('/api/posts', (req, res, next) => {
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

app.put('/api/posts/:id', (req, res, next) => {
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

app.delete('/api/posts/:id', (req, res, next) => {
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

module.exports = app;
