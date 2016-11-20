import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
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
        this.props.handleLogin(res.data.username);
      })
      .catch((err) => {
        if(err.response){
          this.setState({errorMessage: err.response.data});
        }
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
        <form>
          <div className="form-group">
            <h4>Welcome back! Please log in.</h4>
          </div>
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
          <div className='form-group'>
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={this.handleLogin} >Log in</button>
          </div>
          <div className="form-group">
            <h4>New here? Please <a onClick={this.props.showSignup}>Sign up</a></h4>
          </div>
        </form>
      </div>
    );
  }
}
