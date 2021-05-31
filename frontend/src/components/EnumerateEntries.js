import React, { Component } from 'react';
import '../App.css';
import './styling/mainSearchBox.css'
import axios from 'axios';
import Entry from './Entry';
import Login, { query } from './Login';

class EnumerateEntries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchInput: "",
      sortBy: "new",
      user: {}
    };
    this.getData = this.getData.bind(this);
    this.sortData = this.sortData.bind(this);
    this.searchInputChange = this.searchInputChange.bind(this);
    this.sortByChange = this.sortByChange.bind(this);
    this.filterPosts = this.filterPosts.bind(this);
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

  getData() {
    axios.get(`http://${window.BACKEND_URL}/api/submissions/`)
      .then(response => {
        console.log("HERE");
        this.setState({ data: this.sortData(response.data) })
      })
      .catch(err => {
        console.error(err);
      })
  }

  sortData(data) {
    if(this.state.sortBy === "new"){
      let sortedData = data.sort((a, b) => Date.parse(b.submission_date) - Date.parse(a.submission_date));
      return sortedData;
    }
    else if(this.state.sortBy === "likes"){
      let sortedData = data.sort(function(a,b){
        if(b.likes !== a.likes){
          return b.likes - a.likes;
        }
        else{
          return Date.parse(b.submission_date) - Date.parse(a.submission_date);
        }
      });
      return sortedData;
    }
    else if(this.state.sortBy === "relevance"){      
      let sortedData = data.sort(function(a,b){
        if(b.relevance !== a.relevance){
          return b.relevance - a.relevance;
        }
        else if(b.matches !== a.matches){
          return b.matches - a.matches;
        }
        else{
          return Date.parse(b.submission_date) - Date.parse(a.submission_date);
        }
      });
      return sortedData;
    }
  }

  searchInputChange(event){
    this.setState({searchInput: event.target.value});
    if(event.target.value === ""){
      this.setState({sortBy: "new"});
    }
  }

  sortByChange(event){
    this.setState({sortBy: event.target.value});
    this.getData();
  }

  filterPosts(data, input){
    // first remove comments, only include posts
    data = data.filter(function(curr){
      return curr.parent === '';
    });

    // below part is for the search function
    // eslint-disable-next-line
    const regexp = /[.,'\/#!$%\^&\*;:{}=\-_`~()@]/g;
    input = input.toLowerCase().replace(regexp,"");
    if(input !== ""){
      input = input.split(" ");
      input = input.filter(function(curr){
        return curr !== "";
      })
      data = data.filter(function(curr){
        curr.matches = 0;
        curr.relevance = (input.filter(function(word){
          var re = new RegExp(word,"g");
          var tempTitle = (curr.title ? curr.title : "");
          var wordMatches = (curr.content.toLowerCase().match(re) || []).length;
          wordMatches += (tempTitle.toLowerCase().match(re) || []).length
          curr.matches += wordMatches;
          return wordMatches > 0;
        })).length;
        return curr.relevance > 0;
      });
    }
    return data;
  }

  render() {
    query().then(data => {
      console.log(data);
      console.log(data.name);
    });
    const dataFromAPI = this.sortData(this.filterPosts(this.state.data,this.state.searchInput));
    var dataArr = dataFromAPI.map((submission, k) => <Entry submission={submission} key={k} />);
    return (
      <div id="header">
        <div style = {{display: 'flex', justifyContent: 'flex-end'}}><Login/></div>
        <h1 style={{fontSize:80}}>Mark It and Market</h1>
        <p style={{fontSize:40}}>Item exchanging, made easy.</p> {/*catchy slogan?*/}
        <p><input type="text" className="mainSearchBox" placeholder = "Search for posts" onChange = {this.searchInputChange}/></p>
        <p>Sort by: <select value = {this.state.sortBy} onChange = {this.sortByChange}>
          <option value="new">New</option>
          <option value="likes">Likes</option>
          {/*<option value="comments">Comments</option>*/}
          {this.state.searchInput !== "" && <option value="relevance">Relevance</option>}
        </select></p>
        <a href="/submit" style={{fontSize:25}}>Add your submission today!</a>
        <br></br>
        <a href="/maps" style={{fontSize:25}}>Browse Post Map!</a>
            {dataArr}
      </div>
    );
  }
}

export default EnumerateEntries;
