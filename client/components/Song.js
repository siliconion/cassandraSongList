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
        <div className="col-xs-2 col-sm-2">{this.props.songinfo.artist_name}</div>
        <div className="col-xs-3 col-sm-3">{this.props.songinfo.album}</div>
        <div className="col-xs-6 col-sm-6">{this.props.songinfo.song_name}</div>
        <div className="col-xs-1 col-sm-1">{this.props.songinfo.track}</div>
      </div>
    );
  }
}


// SampleTagList.propTypes = {
//   tags: React.PropTypes.array.isRequired,
// };

