import React from 'react';
import { Link } from 'react-router-dom';


const AuthorIndexItem = ({authorName}) => {
  console.log("in author index")
  return (
    <div>
    <Link to={{ pathname:`/author/${authorName}` }} className="linkitem">
      {authorName}
    </Link>
  <div>{authorName}</div>
  </div>
);
};

export default AuthorIndexItem;
