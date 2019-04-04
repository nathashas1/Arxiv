import React from 'react';


const LinkDetails = (props) => {
  if (props.location.state){
  return (
  <div>
    {props.location.state.summary}
  </div>
)
} else {
  return(
  <div>Not Available</div>
)}

};

export default LinkDetails;
