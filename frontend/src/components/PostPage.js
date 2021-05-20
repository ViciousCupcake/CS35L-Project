import React, { Component } from 'react';
import axios from 'axios';
import './styling/SinglePagePost.css';
import '../App.css';


class PostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      googleMapsAPIKey: ""
    };
  }
  componentDidMount() {
    axios.get(`http://${window.BACKEND_URL}/api/submissions/entry/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ data: response.data })
      })
      .catch(err => {
        console.error(err);
      });
    axios.get(`http://${window.BACKEND_URL}/api/submissions/api_key`)
      .then(response => {
        this.setState({ googleMapsAPIKey: response.data })
      })
      .catch(err => {
        console.error(err);
      })
  };

  render() {
    var alt_desc = 'No Image Was Submitted!';
    if (this.state.data.image) {
      alt_desc = 'User Uploaded Image'
    }
    console.log(this.state.googleMapsAPIKey);

    return (
      <div className="content-card">
        <h1> Post by {this.state.data.first_name} {/* TODO ADD A TITLE TAG */} </h1>
        {/* ignore screen reader warning */}
        {this.state.data.image && <img src={this.state.data.image} alt={alt_desc}></img>}
        {this.state.data.location && this.state.googleMapsAPIKey &&
          <iframe loading="lazy" allowfullscreen title="Google Maps Embed"
            src={`https://www.google.com/maps/embed/v1/place?q=${this.state.data.location}&key=${this.state.googleMapsAPIKey}`}></iframe>
        }
        <p> {this.state.data.content} </p>

        <div className="contact">
          <h3>Contact Info:</h3>
          {this.state.data.first_name && <p>Name: {this.state.data.first_name}</p>}
          {this.state.data.location && <p>Location: {this.state.data.location}</p>}

        </div>

      </div>
    );
  }

}

export default PostPage;