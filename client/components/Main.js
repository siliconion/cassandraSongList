import React from 'react';
import SongList from './SongList';
import SongForm from './SongForm';

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      responseMessage: null,
      errorMessage: null
    };

    // this.handleUsernameChange= this.handleUsernameChange.bind(this);
  }


  render() {
    return (
      <div>
        Main page!
        <div className="row">
          <div className="col-xs-12 col-sm-6">
           <SongList />
          </div>
          <div className="col-xs-12 col-sm-6">
            <SongForm />
          </div>
        </div>
      </div>
    );
  }
}


// SampleTagList.propTypes = {
//   tags: React.PropTypes.array.isRequired,
// };
