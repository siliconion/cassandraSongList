import React from 'react';
import Auth from './Auth';
import Main from './Main';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.channelInfo = [];
  }
  render() {
    return (
      <div className="app container">
        <h3>Welcome To Song List</h3>
        {!this.state.user?(<Main></Main>):(<Auth></Auth>)}
      </div>
    )
  };
};