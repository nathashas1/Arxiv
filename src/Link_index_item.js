import React from 'react';
import { Link } from 'react-router-dom';


const LinkIndexItem = ({ entry }) => {
  return (
  <Link to={{ pathname:`/link/${entry.title}`, state: {entry : entry }  }} className="linkitem">
    {entry.title}
  </Link>
);
};

export default LinkIndexItem;
