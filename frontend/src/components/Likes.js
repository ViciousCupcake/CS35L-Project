import React, {Component} from 'react';
import axios from 'axios';
import { query } from './Login';

class Likes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.id,
      likes: Array.isArray(props.likes) ? props.likes : [],
      auth_id: null
    };
    this.incLikes = this.incLikes.bind(this);
  }

  render() {
    return (
      <button onClick = {this.incLikes}>{this.state.likes ? this.state.likes.length : 0} &#x2665;</button>
    )
  }

  getAuth() {
    query()
      .then(res => {
        if(res){
          this.setState({auth_id: res.googleID});
        }
      });
  }

  componentDidUpdate(oldProps){
    if(oldProps.likes !== this.props.likes){
      this.getAuth();
      this.setState({likes: Array.isArray(this.props.likes) ? this.props.likes : []})
    }
  }

  componentDidMount(){
    this.getAuth();
  }

  incLikes(event){
    event.preventDefault();
    if(!this.state.auth_id || (this.state.likes && this.state.likes.indexOf(this.state.auth_id) !== -1))
      return;
    const new_likes = this.state.likes ? this.state.likes.concat([this.state.auth_id]) : [this.state.auth_id];
    const data = {
      likes: new_likes
    };
    let JSONData = JSON.stringify(data);
    console.log(`Submitting Post Request to http://${window.BACKEND_URL}/api/submissions/entry/update/${this.state.id} with contents ${JSONData}`)

    axios
      .post(`http://${window.BACKEND_URL}/api/submissions/entry/update/${this.state.id}`, data)
      .then(res => {
        this.setState({
          likes: new_likes
        })
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default Likes;
