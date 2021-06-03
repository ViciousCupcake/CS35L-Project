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

// Posting comments
// endpoint: $BASE_URL/api/submissions/entry/ID
// method: POST
router.post('/entry/:id', (req,res) => {
  Submission.create(req.body)
    .then(response => res.json({ message: 'Success' }))
    .catch(error => res.status(500));
});

// Update a post
// endpoint: $BASE_URL/api/submissions/entry/update/ID
// method: POST
router.post('/entry/update/:id', (req,res) => {
  Submission.findByIdAndUpdate(req.params.id, req.body)
    .then(response => res.json({ message: 'Success' }))
    .catch(error => res.status(500));
});

// Delete a post
// endpoint: $BASE_URL/api/submissions/entry/delete/ID
// method: POST
router.post('/entry/delete/:id', (req,res) => {
  Submission.findByIdAndDelete(req.params.id, req.body)
    .then(response => res.json({ message: 'Success' }))
    .catch(error => res.status(500));
});

// Deliver the API key to frontend
// endpoint: $BASE_URL/api/submissions/api_key
// method: GET
router.get('/api_key', (req, res) => res.send(process.env.GOOGLE_MAPS_API_KEY));

// Delete all entries from mongoDB
// endpoint: $BASE_URL/api/submissions/delete/everything
// method: GET
router.get('/delete/everything', (req, res) => {
  Submission.deleteMany({}).then(response => res.send('success'))
})

module.exports = router;
