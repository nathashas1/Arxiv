import React from 'react';
import { Link } from 'react-router-dom';


const LinkIndexItem = ({ title }) => {
  return (
  <Link to={`/links/${title}`} className="linkitem">
    {title}
  </Link>
);
};

export default LinkIndexItem;
