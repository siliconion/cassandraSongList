import React from 'react';

export default class SongForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };

    // this.handleUsernameChange= this.handleUsernameChange.bind(this);
  }


  render() {
    return (
      <div>
        Add A Song
        <form>
          <div className="form-group">
            <input type="text" className="form-control" onChange={this.handle} placeholder="Artist" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" onChange={this.handle} placeholder="Album" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" onChange={this.handle} placeholder="Song Title" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" onChange={this.handle} placeholder="Track" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}


// SampleTagList.propTypes = {
//   tags: React.PropTypes.array.isRequired,
// };
