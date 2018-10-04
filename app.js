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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    { id: 'ffas123', title: 'First server-side post', content: 'this is the first post\'s content' },
    { id: 'sdsa212', title: 'Second server-side post', content: 'this is the second post\'s content' },
    { id: 'asds312', title: 'Third server-side post', content: 'this is the third post\'s content' },
  ];
  res.status(200).json({
    message: 'Posts fetched successfully!',
    posts: posts
  });
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Posts added successfully!'
  });
});

module.exports = app;
