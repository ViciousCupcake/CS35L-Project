const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  first_name: {
    type: String
  },
  submission_date: {
    type: Date
  },
  content: {
    type: String
  },
  image: {
    type: String
  },
  location: {
    type: String,
    default: ""
  },
  parent: {
    type: String,
    default: "" // empty string as parent = post, nonempty = comment
  },
  likes: {
    type: Number,
    default: 0
  }
});

module.exports = Submission = mongoose.model('submission', SubmissionSchema);
