const express = require('express');
const Submission = require('../../models/submission');
const router = express.Router();
require('dotenv').config()

// for making sure we can access the backend
// endpoint: $BASE_URL/api/submissions/test
// method: GET
router.get('/test', (req, res) => res.send('Hello World!'));

// returns json of all submissions in DB
// endpoint: $BASE_URL/api/submissions
// method: GET
router.get('/', (req, res) => {
  Submission.find()
    .then(submissions => res.json(submissions))
    .catch(error => res.status(500));
});

// for making sure we can access the backend
// endpoint: $BASE_URL/api/submissions
// method: POST
router.post('/', (req, res) => {
  Submission.create(req.body)
    .then(response => res.json({ message: 'Success' }))
    .catch(error => res.status(500));
});

// To get a specific entry
// endpoint: $BASE_URL/api/submissions/entry/ID
// method: GET
router.get('/entry/:id', (req,res) => {
  Submission.findById(req.params.id)
  .then(response => res.json(response))
  .catch(error => res.status(500));
});

// Deliver the API key to frontend
// endpoint: $BASE_URL/api/submissions/api_key
// method: GET
router.get('/api_key', (req, res) => res.send(process.env.GOOGLE_MAPS_API_KEY));

module.exports = router;
