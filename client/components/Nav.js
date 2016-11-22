import React from 'react';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header ">
            <div className="navbar-brand">
              <img className="navbar-img" src="/img/favicon.svg" alt="C*" />
              Cassandra Song List
            </div>
          </div>
          {
            this.props.username? (
              <ul  className="nav navbar-nav navbar-right">
                <li className="navbar-text">{"Welcome, " + this.props.username + "!" }</li>
                <li className="">
                  <button 
                    className="btn btn-default" 
                    onClick={this.props.handleLogout}> 
                    Logout 
                  </button>
                </li>
              </ul> 
            ):null
          }
        </div>
      </nav>
    );
  }
}
