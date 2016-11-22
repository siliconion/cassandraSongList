import React from 'react';
import axios from 'axios';
import Auth from './Auth';
import Main from './Main';
import Nav from './Nav';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    axios.get('/isAuth')
      .then((res) => {
        this.setState({username: res.data});
      })
      .catch((err) => {
        console.log("songlist error: ", err);
        this.setState({username: null});
    });
  }

  handleLogin(username){
    localStorage.setItem("username", username);
    this.setState({
      username
    })
  }
  handleLogout(){
    localStorage.removeItem("username");
  }
  render() {
    return (
      <div className="app">
        <Nav
          username={this.state.username} />
        <br/>
        {this.state.username?
          (
            <Main />
          ):(
            <Auth handleLogin={this.handleLogin} />
          )
        }
      </div>
    )
  };
};