import React, { Component } from 'react';
import axios from 'axios';
import './styling/SinglePagePost.css';
import '../App.css';


class PostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    axios.get(`http://${window.BACKEND_URL}/api/submissions/entry/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ data: response.data })
      })
      .catch(err => {
        console.error(err);
      })
  };
  
  render() {
    var alt_desc = 'No Image Was Submitted!';
    if (this.state.data.image){
      alt_desc = 'User Uploaded Image'
    }
    
    return (
      <div className="content-card">
        <h1> Post by {this.state.data.first_name} {/* TODO ADD A TITLE TAG */} </h1>
        {/* ignore screen reader warning */}
        {/* eslint-disable-next-line */}
        {this.state.data.image && <img src={this.state.data.image} alt={alt_desc}></img>}
        <p> {this.state.data.content} </p>


        <div className="contact">
          <h3>Contact Info:</h3>
          <p>
            {this.state.data.first_name} {this.state.data.last_name}
          </p>
        </div>

      </div>
    );
  }

}

export default PostPage;