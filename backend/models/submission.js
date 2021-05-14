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
  }
});

module.exports = Submission = mongoose.model('submission', SubmissionSchema);
