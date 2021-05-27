import React, { Component } from 'react';
import '../App.css';
import './styling/submission.css'
import './styling/homepageButton.css'
import axios from 'axios';

class CreateSubmission extends Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      title: '',
      content: '',
      image: '',
      location: '',
      parent: '',
      likes: 0
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
      title: this.state.title,
      content: this.state.content,
      image: this.state.image,
      location: this.state.location,
      parent: '',
      likes: 0
    };
    let JSONData = JSON.stringify(data);
    console.log(`Submitting Post Request to http://${window.BACKEND_URL}/api/submissions with contents ${JSONData}`);

    axios
      .post(`http://${window.BACKEND_URL}/api/submissions`, data)
      .then(res => {
        this.setState({
          first_name: '',
          title: '',
          content: '',
          image: '',
          location: '',
          parent: '', 
          likes: 0
        })
      })
      .catch(err => {
        console.log(err);
      })
  };

  render() {
    return (
      <div id="submission" className="bg">
        <button onClick={() => {window.location = '/'}} className="returnHomeButton">Return to Homepage</button>

        <div className="submissionPanel">
          <h1>Submission Page</h1>
          <p>Fields marked with an asterisk (*) are required.</p>

          <form onSubmit={this.submitForm} method="POST">
            <h4>Enter your name*</h4>
            <input
              type='text' 
              name='first_name'
              value={this.state.first_name}
              onChange={this.onChange}
              required
              className="textbox"
              placeholder="John Doe"
            />
            <h4>Enter your post title*</h4>
            <textarea
              style={{width: "370px"}}
              type='text'
              name='title'
              value={this.state.title}
              onChange={this.onChange}
              required
              className="textbox"
              placeholder="Fresh Tomatoes for Sale!"

            />
            <h4>Enter your post*</h4>
            <textarea 
              style={{width: "370px"}}
              type='text'
              name='content'
              value={this.state.content}
              onChange={this.onChange}
              required
              className="textbox"
              placeholder="I grew too many tomatoes... anyone want some?"

            />
            <h4>Enter a link to your image (optional)</h4>
            <input
              type='text'
              name='image'
              value={this.state.image}
              onChange={this.onChange}
              className="textbox"
              placeholder="https://farmerjohn.com/assets/tomatoes.png"
            />
            <h4>Enter your location (optional)</h4>
            <input
              type='text'
              name='location'
              value={this.state.location}
              onChange={this.onChange}
              className="textbox"
              placeholder="UCLA Boelter Hall"

            />
            <br />
            <input className="submit" type="submit" />
          </form>
        </div >
      </div>
    );
  }
}

export default CreateSubmission;
