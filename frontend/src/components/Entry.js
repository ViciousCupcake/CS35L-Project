import React from 'react';

function Entry(props) {
  return (
    <tr>
      <td>{props.submission.first_name}</td>
      <td>{props.submission.submission_date}</td>
      <td>{props.submission.content}</td>
    </tr>
  )
};

export default Entry;
