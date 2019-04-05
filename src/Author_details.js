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
      filterResult: [],
      authorName: props.match.params.authorName,
      validName: true,
    };
  }

  //Source: https://gist.github.com/demircancelebi/f0a9c7e1f48be4ea91ca7ad81134459d
  // Convert XML to json
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

//Filter Results so that it displays only last 30 days of data.
  filterResults(array){
    let filteredArray = []
    let allValues = []
    let dateFrom;
    let dateTo;
    if (array[0].feed.entry.length > 1) {
       dateFrom = new Date(array[0].feed.entry[0].published)
       dateTo = new Date(array[0].feed.entry[0].published)
    } else {
       dateFrom = new Date(array[0].feed.entry.published)
       dateTo = new Date(array[0].feed.entry.published)
    }
    dateTo.setDate(dateTo.getDate()-30)
    dateTo = new Date(dateTo)
    allValues.push(array[0].feed.entry)
    if (allValues[0].length > 1) {
      for (let i = 0; i < allValues[0].length; i++) {
        let checkDate = new Date(allValues[0][i].published)
        if(checkDate <= dateFrom && checkDate >= dateTo) {
            filteredArray.push(allValues[0][i])
        }
      }
    } else {
      for (let i = 0; i < allValues.length; i++) {
        let checkDate = new Date(allValues[0].published)
        if(checkDate <= dateFrom && checkDate >= dateTo) {
            filteredArray.push(allValues[i])
        }
      }
    }
    this.setState({filterResult: filteredArray})
  }

  //Fetch articles of the particular author.
  async componentDidMount() {
    this.mounted = true;
    let allResults = []
    let authorNames = this.state.authorName.split(" ")
    let authorLastName = authorNames.pop()
    //Names with special characters are not supported by the api.So they are eliminated
    if (!(/^[a-zA-Z]+$/.test(authorLastName))) {
      authorLastName = authorNames[0]
      if (!(/^[a-zA-Z]+$/.test(authorLastName))) {
        this.setState({validName: false})
      }
    }
    let api = `https://export.arxiv.org/api/query?search_query=au:${authorLastName}&start=0&max_results=10&sortBy=lastUpdatedDate`
    let result = await axios.get(api);
    let dom = new DOMParser().parseFromString(result.data, "text/xml");
    let json = this.xmlToJson(dom)
    if (json.feed.entry !== undefined && this.mounted){
      allResults.push(json)
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
        }
        await this.sleep(3000);
      }
    }
    if (allResults.length > 0) this.filterResults(allResults)
  }

  //Stop Api calls when component unmounts
  componentWillUnmount(){
    this.mounted = false;
  }



  render() {
        let authorlinks;
        if (this.state.validName) {
          authorlinks = this.state.filterResult.map(item => {
           return (
             <LinkIndexItem
               key={item.id}
               entry={item} />
           );
        }); } else {
           authorlinks = <h4>Special Character names are not supported.</h4>
        }
        return (
            <div>
              <h2 className="text">Articles of {this.state.authorName}</h2>
              <ul>{authorlinks}</ul>
            </div>
        );
  }
}


export default AuthorDetails;
