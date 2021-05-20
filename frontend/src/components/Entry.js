import React from 'react';
import './styling/Entry.css';

function Entry(props) {
  var date = new Date(props.submission.submission_date);
  var altdescription = 'no image submitted';
  if (props.submission.image){
    altdescription = 'image was submitted'
  }
  // terrible date formatting hack from stack overflow lol
  date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
  return (
    <div className="content-card">
      <h2>{props.submission.first_name}</h2>
      <h5>{date}</h5>
      <p>{props.submission.content}</p>
      {props.submission.image && 
        <img src = {props.submission.image} alt = {altdescription} width = '200' height = '200'></img>}

      
      <p>
        <a href={`/post/${props.submission._id}`}> See more info</a>
      </p>
    </div>
  )
};

export default Entry;
