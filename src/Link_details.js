import React from 'react';
import { Link } from 'react-router-dom';
import AuthorIndex from './Author_index';

const LinkDetails = (props) => {
  if (props.location.state){
  return (
  <div>
    {props.location.state.entry.summary}
    <AuthorIndex entry={props.location.state.entry}/>
  </div>
)
} else {
  return(
  <div>Not Available</div>
)}

};

export default LinkDetails;
