const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  first_name: {
    type: String
  },
  submission_date: {
    type: Date
  }
});

module.exports = Submission = mongoose.model('submission', SubmissionSchema);
