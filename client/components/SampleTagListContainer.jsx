import React from 'react';
import SampleTagList from './SampleTagList.jsx';
import axios from 'axios';

export default class SampleTagListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    };
  }
  componentDidMount() {
    // this.setState({ tags: ['a', 'b', 'c' ]});
    axios.get('/api/tags-example')
      .then((res) => {
        this.setState({ tags: res.data });
      })
      .catch((err) => {
        console.log('Error with GET to /api/tags-example: ', err);
      });
  }
  render() {
    return <SampleTagList tags={this.state.tags}/>;
  }
}
