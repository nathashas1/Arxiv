import React from 'react';
import { Link } from 'react-router-dom';


const AuthorIndexItem = ({authorName}) => {
  if (authorName) {
    return (
      <Link to={{ pathname:`/author/${authorName}` }} className="linkitem">
        {authorName}
      </Link>
    );
  } else {
    return (
      <div> Author data not available</div>
    );
  }
};

export default AuthorIndexItem;
