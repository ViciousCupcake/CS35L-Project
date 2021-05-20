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
  }
});

module.exports = Submission = mongoose.model('submission', SubmissionSchema);
