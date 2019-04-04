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
// const links = this.state.result.map((item,index) =>
//     {
//       let entries = Array.from(item.feed.entry)
//       return(
//       entries.map((entry) =>
//           <LinkIndexItem
//             entry={entry}
//             />
//                 ))
//     })
//
// const AuthorIndex = ({ entry }) => {
//   const authors = entry.author.map((author) =>
//   return (
//
// );
// };
