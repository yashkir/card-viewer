var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

const USER_ID_OFFSET = 100;
const FAKE_TOKEN = 'fe635';

router.get('/cards/:id', async function(req, res, next) {
  try {
    let response;

    response = await fetch(`https://jsonplaceholder.typicode.com/photos/${req.params.id}`);
    let image = await response.json();

    response = await fetch(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`);
    let post = await response.json();

    const userPhotoId = post.userId + USER_ID_OFFSET;
    response = await fetch(`https://jsonplaceholder.typicode.com/photos/${userPhotoId}`);
    let avatar = await response.json();


    const card = {
      avatar,
      image,
      post,
    };

    return res.send(card);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/posts/', async function(req, res, next) {
  try {
    // If we have middleware, use the req.user
    const userId = req.user ? req.user.id : 1;

    let payload = {
      title: req.body.title,
      body: req.body.body,
      userId
    }

    response = await fetch(`https://jsonplaceholder.typicode.com/posts/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + FAKE_TOKEN,
      },
      body: JSON.stringify(payload),
    });

    let responseContent = await response.json(); 
    return res.send(responseContent);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/posts/:id', async function(req, res, next) {
  try {
    // If we have middleware, use the req.user
    const userId = req.user ? req.user.id : 1;

    let payload = {
      title: req.body.title,
      body: req.body.body,
      userId
    }

    response = await fetch(`https://jsonplaceholder.typicode.com/posts/`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + FAKE_TOKEN,
      },
      body: JSON.stringify(payload),
    });

    let responseContent = await response.json(); 
    return res.send(responseContent);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
