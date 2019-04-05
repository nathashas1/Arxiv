import React from 'react';
import AuthorIndex from './Author_index';

const LinkDetails = (props) => {
  if (props.location.state){
      return (
      <div className="summary">
        <h2>Summary</h2>
        {props.location.state.entry.summary}
        <h4>Authors</h4>
        <AuthorIndex entry={props.location.state.entry}
                      />
      </div>
  )} else {
      return(
        <h2 className="text">Summary Not Available</h2>
  )}
};

export default LinkDetails;
