import React from 'react';

export default class Song extends React.Component {
  constructor(props) {
    super(props);
    this.showSongs= this.showSongs.bind(this);
  }

  showSongs() {
    return this.state.songs.map(s => <Song songinfo={s} />)
  }

  render() {
    return (
      <div className="row">
        {this.props.songinfo.name}
      </div>
    );
  }
}


// SampleTagList.propTypes = {
//   tags: React.PropTypes.array.isRequired,
// };

