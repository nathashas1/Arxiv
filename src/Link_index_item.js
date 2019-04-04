import React from 'react';
import { Link } from 'react-router-dom';


const LinkIndexItem = ({ title,summary }) => {
  console.log("sum in index item", summary)
  return (
  <Link to={{ pathname:`/link/${title}`, state: {summary : summary }  }} className="linkitem">
    {title}
  </Link>
);
};

export default LinkIndexItem;
