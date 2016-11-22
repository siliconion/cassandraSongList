import React from 'react';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.deleteSong= this.deleteSong.bind(this);
  }

  deleteSong() {
    this.props.deleteSong(this.props.songInfo);
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <div className="navbar-brand">
              <img src="/img/favicon.svg" alt="C*" />
            </div>
            <div className="nav navbar-nav">
              <h3>Cassandra Song List</h3>
            </div>
          <div>
            {this.props.username? (
              "Welcome, " + this.props.username + "!"
            ):null
          }
          </div> 
          </div>
        </div>
      </nav>
    );
  }
}
