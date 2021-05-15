import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

class CreateSubmission extends Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      content: ''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm = e => {
    e.preventDefault();

    const data = {
      first_name: this.state.first_name,
      submission_date: Date.now(),
      content: this.state.content
    };
    let JSONData = JSON.stringify(data);
    console.log(`Submitting Post Request to http://${window.BACKEND_URL}/api/submissions with contents ${JSONData}`);

    axios
      .post(`http://${window.BACKEND_URL}/api/submissions`, data)
      .then(res => {
        this.setState({
          first_name: '',
          content: ''
        })
      })
      .catch(err => {
        console.log(err);
      })
  };

  render() {
    return (
      <div>
        <h3>Submission Page</h3>
        <a href="./">Return to Homepage</a>

        <form onSubmit={this.submitForm} method="POST">
          <h6>Enter your name</h6>
          <input
            type='text'
            name='first_name'
            value={this.state.first_name}
            onChange={this.onChange}
          />
          <h6>Enter your post</h6>
          <input
            type='text'
            name='content'
            value={this.state.content}
            onChange={this.onChange}
          />
          <br />
          <input type="submit" />
        </form>
      </div >
    );
  }
}

export default CreateSubmission;
