import React, { Component} from 'react';
import axios from 'axios';

class SubmitComment extends Component {
  constructor(props){
    super(props);
    this.state = {
        id: this.props.id,
        first_name: '',
        content: '',
        showForm: false
    };
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  submitForm(event){
    event.preventDefault();
    const data = {
      first_name: this.state.first_name,
      submission_date: Date.now(),
      title: '',
      content: this.state.content,
      image: '',
      location: '',
      parent: this.state.id,
      likes: []
    };
    let JSONData = JSON.stringify(data);
    console.log(`Submitting Post Request to http://${window.BACKEND_URL}/api/submissions/entry/${this.state.id} with contents ${JSONData}`)

    axios
      .post(`http://${window.BACKEND_URL}/api/submissions/entry/${this.state.id}`, data)
      .then(res => {
        this.setState({
          first_name: '',
          content: ''
        })
      })
      .catch(err => {
        console.log(err);
      })

    if (this.props.update !== undefined)
      this.props.update();
  }
  
  showForm = () => {
    return (
      <div>
        <form id = "reply" onSubmit = {this.submitForm} method = "POST">
          <textarea
            type = 'text'
            style = {{width: "30vw", height: "50px", borderRadius: "10px", borderWidth: "0px", padding: "5px"}}
            placeholder = "Write a comment"
            value = {this.state.content}
            onChange = {this.onChange}
            name = "content"
            required
          /> <br/>
          <textarea
            type = 'text'
            style = {{width: "30vw", height: "20px", borderRadius: "10px", borderWidth: "0px", padding: "5px"}}
            placeholder = "Enter your name (optional)"
            value = {this.state.first_name}
            onChange = {this.onChange}
            name = "first_name"
          />
          <br/>
          <input type="submit"/>
        </form>
      </div>
    );
  }

  render(){
    return(
      <div className='SubmitComment'>
        <button onClick={() => this.setState({showForm: !this.state.showForm})} style={{marginBottom: "10px"}} >Reply</button>
        {this.state.showForm ? this.showForm() : null}
      </div>
    );
  }
}

export default SubmitComment;
