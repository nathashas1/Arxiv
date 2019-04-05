import React from 'react';
import AuthorIndexItem from './Author_index_item';

const AuthorIndex = ({ entry }) => {
  let authors = Array.from(entry.author)
  let lastId = 0;
  const allAuthors = authors.map(author => {
     return (
       <AuthorIndexItem
         authorName={author.name}
         key={lastId++}/>
     );
   });
   const author = <AuthorIndexItem
     authorName={entry.author.name}
     key={lastId++}/>
  return (
    <div className='list'>
        {authors.length ? <div>{allAuthors}</div> : <div>{author}</div>}
    </div>

);
};

export default AuthorIndex;
