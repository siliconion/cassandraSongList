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
        <div className="row vertical-offset-100">
    	    <div className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3 ">
            {this.state.showLogin?(
              <Login 
                handleLogin={this.props.handleLogin}
                showSignup={this.showSignup} />
            ):(
              <Signup 
                showLogin={this.showLogin} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
