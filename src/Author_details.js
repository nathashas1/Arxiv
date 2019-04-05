import React, { Component } from 'react';
import LinkIndexItem from './Link_index_item';
import './App.css';
import './App.css';
import axios from 'axios';


class AuthorDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: [],
      authorName: props.match.params.authorName,
      validName: true,
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

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  async componentDidMount() {
    this.mounted = true;
    let allResults = []
    let authorNames = this.state.authorName.split(" ")
    let authorLastName = authorNames.pop()
    if (!(/^[a-zA-Z]+$/.test(authorLastName))) {
      this.setState({validName: false})
    }
    let api = `https://export.arxiv.org/api/query?search_query=au:${authorLastName}&start=0&max_results=10&sortBy=lastUpdatedDate`
    let result = await axios.get(api);
    let dom = new DOMParser().parseFromString(result.data, "text/xml");
    let json = this.xmlToJson(dom)
    if (json.feed.entry !== undefined && this.mounted){
      allResults.push(json)
      this.setState({result: allResults})
    }
    let totalResults = json.feed["opensearch:totalResults"]
    if (totalResults > 30000) totalResults = 30000
    if (totalResults > 10){
      for (let i = 10; i < totalResults && this.state.load; i++) {
        api = `https://export.arxiv.org/api/query?search_query=au:${authorLastName}&start=${i}&max_results=10&sortBy=lastUpdatedDate`;
        result = await axios.get(api);
        i += 10
        let dom = new DOMParser().parseFromString(result.data, "text/xml");
        let json = this.xmlToJson(dom)
        if (json.feed.entry !== undefined && this.mounted){
          allResults.push(json)
          this.setState({result: allResults})
        }
        await this.sleep(3000);
      }
    }
  }

  componentWillUnmount(){
    this.mounted = false;
  }



  render() {
    const links = this.state.result.map((item,index) =>
        {
          let entries = Array.from(item.feed.entry)
          if (entries.length > 0) {
            return(
              entries.map((entry) =>
                  <LinkIndexItem
                    entry={entry}
                    key={entry.id}
                    />
            ))
          } else {
            return (
              <LinkIndexItem
                entry={item.feed.entry}
                key={item.feed.entry.id}
                />
            )}
        })
      if(this.state.validName) {
          return (
            <div>
              <h2 className="text">Articles of {this.state.authorName}</h2>
              <ul>{links}</ul>
            </div>
          );
        } else {
          return (
            <h4 className="text">
              Name may contain special character
            </h4>
          );
      }
    }
}


export default AuthorDetails;
