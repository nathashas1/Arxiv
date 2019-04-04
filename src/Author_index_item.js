import React from 'react';
import { Link } from 'react-router-dom';


const AuthorIndexItem = ({authorName}) => {
  console.log("in author index")
  return (
    <Link to={{ pathname:`/author/${authorName}`,state: {authorName : authorName } }} className="linkitem">
      {authorName}
    </Link>
);
};

export default AuthorIndexItem;
