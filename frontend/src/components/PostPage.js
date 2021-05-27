import React, { Component } from 'react';
import axios from 'axios';
import './styling/SinglePagePost.css';
import '../App.css';
import './styling/popup.css'
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
      entireData: [],
      enabled: false
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
        console.log("HERE");
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

  handleBoxChange = event => {
    //alert(this.state.value)
    if(event.target.value == "password"){
      this.setState({enabled : true})
    }
    else{
      this.setState({enabled : false})
    }

    console.log(event.target.value)
  }
  handleButtonChange = () => {
    const data = {}

    axios
      .post(`http://${window.BACKEND_URL}/api/submissions/entry/delete/${this.state.data._id}`, data)
      .then( res => {
        window.location = '/';
        alert("Post Successfully Deleted")
      })
  }
  /*displayComments(){

  }*/

  render() {
    var alt_desc = 'No Image Was Submitted!';
    if (this.state.data.image) {
      alt_desc = 'User Uploaded Image'
    }
    //console.log(this.state.googleMapsAPIKey);

    //var commentsArr = this.getComments(this.props.match.params.id);
    //console.log(commentsArr);
    //commentsArr = commentsArr.map((submission, k) => <Entry submission={submission} key={k} />);

    console.log(this.state.entireData.slice());
    return (
      <div>
        <a href='/'>Return to Homepage</a>
        <button className="adminButton" onClick={() => {this.setState({popupVisible: !this.state.popupVisible})}}>Admin Panel</button>
        { this.state.popupVisible ? 
        <div className="popup">
          <div className="popupContent popupCenter">
            <button className="popupExit" onClick={() => {this.setState({popupVisible: !this.state.popupVisible})}}>&#120;</button>
            <h1 className="popupCenter">
              Admin Panel
            </h1>
            <h3 className="popupCenter">Are you sure you want to delete this post?</h3>
            <h5>This action is <span style={{color: 'red'}}>irreversible</span></h5>
            <p className="popupPara">Enter the Admin Password to continue</p>
            <input
              type="password"
              onChange={this.handleBoxChange}
              placeholder="Password"
              className="popupTextBox"
            />
            <br />
            <button className="popupButton" disabled={!this.state.enabled} onClick={this.handleButtonChange}>Delete This Post
            </button>
          </div>
        </div>:null }


        <div className="content-card">
          <h1> {this.state.data.title} </h1>
          <h3> Post by {this.state.data.first_name} </h3>
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
        
        <p id="desc">Start a new comment thread:</p>
        <div className="replyButton">
        <SubmitComment id={this.props.match.params.id}  update={this.getEntireData}/>
        </div>

        <p id="desc">Or, reply to an existing discussion:</p>
        <CommentTree arr={this.state.entireData.slice()} parentPost={this.props.match.params.id} update={this.getEntireData}/>
      </div>
    );
  }// <br/>{commentsArr.length}
}

export default PostPage;
