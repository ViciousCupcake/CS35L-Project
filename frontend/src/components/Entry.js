import React from 'react';

function Entry(props) {
  var date = new Date(props.submission.submission_date);
  // terrible date formatting hack from stack overflow lol
  date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
  return (
    <tr>
      <td>{props.submission.first_name}</td>
      <td>{date}</td>
      <td>{props.submission.content}</td>
    </tr>
  )
};

export default Entry;
