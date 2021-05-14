import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Entry from './Entry';

class EnumerateEntries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios.get(`http://${window.BACKEND_URL}/api/submissions/`)
      .then(response => {
        this.setState({data: response.data})
      })
      .catch(err => {
        console.error(err);
      })
  };


  render() {
    const dataFromAPI = this.state.data;
    var dataArr = dataFromAPI.map((submission, k) => <Entry submission={submission} key={k} />);
    return (
      <div>
        { /* graphic design is my passion */}
        <h3>Homepage</h3>
        <a href="/submit">Make a submission</a>
        <table>
          <tbody>
            <tr>
              <td style={{ width: '250px' }}><b>Name:</b></td>
              <td style={{ width: '250px' }}><b>Date:</b></td>
              <td style={{ width: '250px' }}><b>Post:</b></td>
            </tr>
            {dataArr}
          </tbody>
        </table>
      </div>
    );
  }
}

export default EnumerateEntries;
