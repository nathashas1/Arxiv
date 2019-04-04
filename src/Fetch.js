import React, { Component } from 'react';
import axios from 'axios';

const API = 'http://export.arxiv.org/api/query?search_query=';
const DEFAULT_QUERY = 'all:electron';

class Fetch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    axios.get(API + DEFAULT_QUERY)
      .then(result => this.setState({
        hits: result,
        isLoading: false
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }
}

export default Fetch;
