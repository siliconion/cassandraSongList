import React from 'react';
import Auth from './Auth';
import Main from './Main';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(username){
    this.setState({
      username
    })
  }
  render() {
    return (
      <div className="app container">
        <h3>Welcome To Song List{this.state.username?(", "+this.state.username):null } !</h3>
        <br/>
        {this.state.username?
          (
            <Main ></Main>
          ):(
            <Auth handleLogin={this.handleLogin}></Auth>
          )
        }
      </div>
    )
  };
};