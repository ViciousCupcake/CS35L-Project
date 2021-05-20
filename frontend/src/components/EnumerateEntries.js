import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Entry from './Entry';

class EnumerateEntries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchInput: ""
    };
    this.sortData = this.sortData.bind(this);
    this.searchInputChange = this.searchInputChange.bind(this);
    this.filterPosts = this.filterPosts.bind(this);
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

  searchInputChange(event){
    this.setState({searchInput: event.target.value});
  }

  filterPosts(data, input){
    // eslint-disable-next-line
    const regexp = /[.,'\/#!$%\^&\*;:{}=\-_`~()@]/g;
    input = input.toLowerCase().replace(regexp,"");
    if(input !== ""){
      input = input.split(" ");
      input = input.filter(function(curr){
        return curr !== "";
      })
      data = data.filter(function(curr){
        return (input.some(function(word){
          return (curr.content.toLowerCase().includes(word) || 
                  curr.first_name.toLowerCase().includes(word));
        }));
      });
    }
    return data;
  }

  render() {
    const dataFromAPI = this.filterPosts(this.sortData(this.state.data),this.state.searchInput);
    var dataArr = dataFromAPI.map((submission, k) => <Entry submission={submission} key={k} />);
    //console.log(dataArr)
    return (
      <div id="header">
        <h1 style={{fontSize:80}}>Site Name Placeholder</h1>
        <p style={{fontSize:40}}>Item exchanging, made easy.</p> {/*catchy slogan?*/}
        <p><input type="text" placeholder = "Search for posts" onChange = {this.searchInputChange}/></p>
        <a href="/submit" style={{fontSize:25}}>Add your submission today!</a>
            {dataArr}
      </div>
    );
  }
}

export default EnumerateEntries;
