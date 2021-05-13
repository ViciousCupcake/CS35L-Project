const express = require('express');
const Submission = require('../../models/submission');
const router = express.Router();

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

module.exports = router;
