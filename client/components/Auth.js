import React from 'react';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup';

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: true
    };

    this.showLogin = this.showLogin.bind(this);
    this.showSignup = this.showSignup.bind(this);
  }

  showLogin(event) {
    console.log("show login")
    this.setState({showLogin: true});
  }

  showSignup(event) {
    this.setState({showLogin: false});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <div className='auth container'>
        {this.state.showLogin?(
          <Login 
            handleLogin={this.props.handleLogin}
            showSignup={this.showSignup} />
        ):(
          <Signup 
            showLogin={this.showLogin} />
        )}
      </div>
    );
  }
}
