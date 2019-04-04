import React, { Component } from 'react';
import LinkIndexItem from './Link_index_item';
import './App.css';
import './App.css';
import axios from 'axios';


class AuthorDetails extends Component {

  constructor(props) {
    super(props);
    console.log("props",props.match.params.authorName)
    this.state = {
      result: [],
      isLoading: false,
      error: null,
      authorName: props.match.params.authorName
    };
  }

//https://gist.github.com/demircancelebi/f0a9c7e1f48be4ea91ca7ad81134459d
  xmlToJson(xml) {
    // Create the return object
    let obj = {};

    if (xml.nodeType === 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
        obj['attributes'] = {};
        for (let j = 0; j < xml.attributes.length; j += 1) {
          const attribute = xml.attributes.item(j);
          obj['attributes'][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) { // text
      obj = xml.nodeValue;
    }

    // do children
    // If just one text node inside
    if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
      obj = xml.childNodes[0].nodeValue;
    } else if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i += 1) {
        const item = xml.childNodes.item(i);
        const nodeName = item.nodeName;
        if (typeof (obj[nodeName]) === 'undefined') {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof (obj[nodeName].push) === 'undefined') {
            const old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(this.xmlToJson(item));
        }
      }
    }
    return obj;
  }


async componentDidMount() {
  const authorNames = this.state.authorName.split(" ")
  const authorLastName = authorNames.pop()
  console.log("last name",authorLastName)
  const api = `http://export.arxiv.org/api/query?search_query=au:${authorLastName}&max_results=10&sortBy=lastUpdatedDate`;
  const result = await axios.get(api);

  let dom = new DOMParser().parseFromString(result.data, "text/xml");
  let json = this.xmlToJson(dom)
  let allResults = [json]
  this.setState({result: allResults})
  console.log("all result in json author details",this.state.result.feed)

}


render() {
  const links = this.state.result.map((item,index) =>
      {
        let entries = Array.from(item.feed.entry)
        console.log("auth",entries)
        console.log("auth",item.feed.entry)
        if (entries.length > 0) {
        return(
        entries.map((entry) =>
            <LinkIndexItem
              entry={entry}
              />
                  ))
        } else {
          return (
          <LinkIndexItem
            entry={item.feed.entry}
            />
        )}
      })

  return (
    <div>
    <h2 className="text">Articles of {this.state.authorName}</h2>
      <ul>{links}</ul>
    </div>
  );
}
}


export default AuthorDetails;
