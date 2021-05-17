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
    this.sortData = this.sortData.bind(this);
  }

  componentDidMount() {
    axios.get(`http://${window.BACKEND_URL}/api/submissions/`)
      .then(response => {
        this.setState({data: this.sortData(response.data)})
      })
      .catch(err => {
        console.error(err);
      })
  };

  sortData(data) {
    let sortedData = data.sort((a, b) => Date.parse(a.submission_date) - Date.parse(b.submission_date)).reverse();
    return sortedData;
  }

  render() {
    const dataFromAPI = this.sortData(this.state.data);
    var dataArr = dataFromAPI.map((submission, k) => <Entry submission={submission} key={k} />);
    console.log(dataArr)
    return (
      <div id="header">
        <h1 style={{fontSize:80}}>Site Name Placeholder</h1>
        <p style={{fontSize:40}}>Item exchanging, made easy.</p> {/*catchy slogan?*/}
        <a href="/submit" style={{fontSize:25}}>Add your submission today!</a>
            {dataArr}
      </div>
    );
  }
}

export default EnumerateEntries;
