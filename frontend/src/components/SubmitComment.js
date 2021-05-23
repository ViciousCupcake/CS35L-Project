import React, { Component} from 'react';
import axios from 'axios';

class SubmitComment extends Component {
  constructor(props){
    super(props);
    this.state = {
        id: this.props.id,
        content: '',
    };
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(event){
    this.setState({content: event.target.value});
  }

  submitForm(event){
    event.preventDefault();
    const data = {
      first_name: '',
      submission_date: Date.now(),
      content: this.state.content,
      image: '',
      location: '',
      parent: this.state.id
    };
    let JSONData = JSON.stringify(data);
    console.log(`Submitting Post Request to http://${window.BACKEND_URL}/api/submissions/entry/${this.state.id} with contents ${JSONData}`)

    axios
      .post(`http://${window.BACKEND_URL}/api/submissions/entry/${this.state.id}`, data)
      .then(res => {
        this.setState({
          content: ''
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render(){
    return(
      <div>
        <form onSubmit = {this.submitForm} method = "POST">
          <h4>Write a comment:</h4>
          <textarea
            type = 'text'
            value = {this.state.content}
            onChange = {this.onChange}
            required
          />
          <input type="submit"/>
        </form>

      </div>
    );
  }
}

export default SubmitComment;