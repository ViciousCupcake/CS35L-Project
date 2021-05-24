import React, { Component } from 'react';
import axios from 'axios';
import './styling/SinglePagePost.css';
import '../App.css';
import Likes from './Likes'

import SubmitComment from './SubmitComment'
import CommentTree from './CommentTree'

class PostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      googleMapsAPIKey: "",
      comments: [],
      entireData: []
    };

    this.sortData = this.sortData.bind(this);
    this.getComments = this.getComments.bind(this);
    this.getEntireData = this.getEntireData.bind(this);
    //this.displayComments = this.displayComments.bind(this);
  }

  componentDidMount() {
    axios.get(`http://${window.BACKEND_URL}/api/submissions/entry/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ data: response.data });
        this.getEntireData();
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
      });
  };

  sortData(data) {
    let sortedData = data.sort((a, b) => Date.parse(a.submission_date) - Date.parse(b.submission_date));
    return sortedData;
  }

  getEntireData() {
    axios.get(`http://${window.BACKEND_URL}/api/submissions/`)
      .then(response => {
        this.setState({ entireData: this.sortData(response.data) })
      })
      .catch(err => {
        console.error(err);
      })
  }

  getComments(id) {
    let currData = this.state.entireData.slice();
    currData = currData.filter(function (curr) {
      return curr.parent === id;
    });
    return currData; // array containing the comments
  }

  /*displayComments(){

  }*/

  render() {
    var alt_desc = 'No Image Was Submitted!';
    if (this.state.data.image) {
      alt_desc = 'User Uploaded Image'
    }
    //console.log(this.state.googleMapsAPIKey);

    var commentsArr = this.getComments(this.props.match.params.id);
    //commentsArr = commentsArr.map((submission, k) => <Entry submission={submission} key={k} />);

    return (
      <div>
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

          <Likes likes = {this.state.data.likes} id = {this.props.match.params.id} />

        </div>
        <SubmitComment id={this.props.match.params.id} />
        <CommentTree arr={commentsArr} parentPost={this.props.match.params.id}/>
      </div>
    );
  }// <br/>{commentsArr.length}
}

export default PostPage;
