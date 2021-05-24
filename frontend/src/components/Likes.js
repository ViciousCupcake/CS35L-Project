import React, {Component} from 'react';
import axios from 'axios';

class Likes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.id,
      likes: props.likes
    };
    this.incLikes = this.incLikes.bind(this);
  }

  render() {
    return (
      <button onClick = {this.incLikes}>{this.state.likes} ♥</button>
    )
  }

  componentDidUpdate(oldProps){
    if(oldProps.likes !== this.props.likes)
      this.setState({likes: this.props.likes})
  }

  incLikes(event){
    event.preventDefault();
    const data = {
      likes: this.state.likes + 1
    };
    let JSONData = JSON.stringify(data);
    console.log(`Submitting Post Request to http://${window.BACKEND_URL}/api/submissions/entry/update/${this.state.id} with contents ${JSONData}`)

    axios
      .post(`http://${window.BACKEND_URL}/api/submissions/entry/update/${this.state.id}`, data)
      .then(res => {
        this.setState({
          likes: this.state.likes + 1
        })
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default Likes;
