const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  first_name: {
    type: String
  },
  submission_date: {
    type: Date
  },
  title: {
    type: String
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
    type: [String],
    default: []
  }
});

module.exports = Submission = mongoose.model('submission', SubmissionSchema);
