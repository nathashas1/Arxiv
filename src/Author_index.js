import React from 'react';
import AuthorIndexItem from './Author_index_item';

const AuthorIndex = ({ entry }) => {
  let authors = Array.from(entry.author)
  console.log("author error",entry.author)
  console.log("author error y null",authors,typeof(entry.author))
  const allAuthors = authors.map(author => {
     return (
       <AuthorIndexItem
         authorName={author.name} />
     );
   });
   const author = <AuthorIndexItem
     authorName={entry.author.name} />
  return (
    <div className='list'>
        {authors.length ? <div>{allAuthors}</div> : <div>{author}</div>}
    </div>

);
};

export default AuthorIndex;
