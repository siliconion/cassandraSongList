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
    this.handleLogout = this.handleLogout.bind(this);
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
    this.setState({
      username
    })
  }
  handleLogout(){
    axios.get('/logout')
      .then((res)=>{
        this.setState({
          username: null
        })
      })
      .catche((err)=>{
        console.log("songlist error: ", err);
      })
  }
  render() {
    return (
      <div className="app">
        <Nav
          username={this.state.username} 
          handleLogout={this.handleLogout}/>
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