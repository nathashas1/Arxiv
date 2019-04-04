import React, { Component } from 'react';
import LinkIndexItem from './Link_index_item';
import './App.css';
import './App.css';
import axios from 'axios';

// const DEFAULT_QUERY = 'all:electron';
class LinkIndex extends Component {

  constructor(props) {
    super(props);

    this.state = {
      result: [],
      isLoading: false,
      error: null,
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
  const api1 = 'http://export.arxiv.org/api/query?search_query=psychiatry&max_results=10&sortBy=lastUpdatedDate';
  const api2 = 'http://export.arxiv.org/api/query?search_query=therapy&max_results=10&sortBy=lastUpdatedDate';
  const api3 = 'http://export.arxiv.org/api/query?search_query=data science&max_results=10&sortBy=lastUpdatedDate';
  const api4 = 'http://export.arxiv.org/api/query?search_query=machine learning&max_results=10&sortBy=lastUpdatedDate';
  const allResults = []
  const result1 = await axios.get(api1);
  const result2 = await axios.get(api2);
  const result3 = await axios.get(api3);
  const result4 = await axios.get(api4);

  let dom = new DOMParser().parseFromString(result1.data, "text/xml");
  let json = this.xmlToJson(dom)
  allResults.push(json)
  console.log("in link_index",json)
  dom = new DOMParser().parseFromString(result2.data, "text/xml");
  json = this.xmlToJson(dom)
    console.log("in link_index",json)
  allResults.push(json)

  dom = new DOMParser().parseFromString(result3.data, "text/xml");
  json = this.xmlToJson(dom)
    console.log("in link_index",json)
  allResults.push(json)

  dom = new DOMParser().parseFromString(result4.data, "text/xml");
  json = this.xmlToJson(dom)
  allResults.push(json)
  this.setState({result: allResults})
  console.log("in link_index",json)
  console.log("all result in json",this.state.result)

}


  render() {
    const links = this.state.result.map((item,index) =>
        {
          let entries = Array.from(item.feed.entry)
          return(
          entries.map((entry) =>
              <LinkIndexItem
                entry={entry}
                />
                    ))
        })
    return (
      <div>
        <ul>{links}</ul>
      </div>
    );
  }
}


export default LinkIndex;
