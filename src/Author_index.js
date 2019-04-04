import React from 'react';
import AuthorIndexItem from './Author_index_item';

const AuthorIndex = ({ entry }) => {
  console.log("in author index", entry)
  let authors = Array.from(entry.author)
  const allAuthors = authors.map(author => {
     return (
       <AuthorIndexItem
         authorName={author.name} />
     );
   });
  return (
  <div>{allAuthors}</div>
);
};

export default AuthorIndex;
