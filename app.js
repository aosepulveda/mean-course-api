const express = require('express');

const app = express();

app.use('/api/posts', (req, res, next) => {
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

module.exports = app;