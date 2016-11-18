import React from 'react';
import axios from 'axios';

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: null
    };

    this.handleUsernameChange= this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.showError = this.showError.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleLogin() {
    let username = this.state.username;
    let password = this.state.password;
    this.state.errorMessage = null;
    axios.post('/login', {username, password})
      .then((res) => {
        console.log("auth success! ", res.data);
        this.props.handleLogin(res.data.username);
      })
      .catch((err) => {
        console.log("auth error: ", err.response.data);
        this.setState({errorMessage: err.response.data});
    });
  }

  handleSignup() {
    let username = this.state.username;
    let password = this.state.password;
    this.state.errorMessage = null;
    axios.post('/signup', {username, password})
      .then((res) => {
        console.log("auth success! ", res.data.username);
        this.props.handleLogin(res.data.username);
      })
      .catch((err) => {
        console.log("auth error: ", err);
        this.setState({errorMessage: err.response.data});
    });
  }

  showError(){
    if(this.state.errorMessage){
      return (
        <div className="alert alert-danger" role="alert">
          <strong>Error: </strong> {this.state.errorMessage}
        </div>
      )
    }
  }

  render() {
    return (
      <div className='auth container'>
        <h5 className="orline">Please log in or sign up</h5>
        <form>
          {this.showError()}
          <div className='form-group'>
            <input 
              type="text" 
              placeholder="username" 
              onChange={this.handleUsernameChange} 
              className="form-control" />
          </div>
          <div className='form-group'>
            <input 
              type="password" 
              placeholder="password" 
              onChange={this.handlePasswordChange} 
              className="form-control" />
          </div>
          <div className='row form-group'>
            <button type="button" className="btn btn-primary col-xs-12 col-sm-6" onClick={this.handleSignup} >Sign up</button>
            <button type="button" className="btn btn-primary col-xs-12 col-sm-6" onClick={this.handleLogin} >Log in</button>
          </div>
        </form>
      </div>
    );
  }
}
