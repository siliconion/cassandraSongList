import React from 'react';
import axios from 'axios';

export default class SongForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: "",
      album:"",
      song:"",
      track:""
    };

    this.handleArtistChange= this.handleArtistChange.bind(this);
    this.handleAlbumChange= this.handleAlbumChange.bind(this);
    this.handleSongChange= this.handleSongChange.bind(this);
    this.handleTrackChange= this.handleTrackChange.bind(this);
    this.addSong= this.addSong.bind(this);
  }
  handleArtistChange(event) {
    this.setState({artist: event.target.value});
  }
  handleAlbumChange(event) {
    this.setState({album: event.target.value});
  }
  handleSongChange(event) {
    this.setState({song: event.target.value});
  }
  handleTrackChange(event) {
    this.setState({track: event.target.value});
  }
  addSong() {
    let artist = this.state.artist;
    let album = this.state.album;
    let song = this.state.song;
    let track = this.state.track;
    this.state.errorMessage = null;
    axios.post('/songList', {artist, album, song, track})
      .then((res) => {
        console.log("auth success! ", res.data.songList);
        this.props.handleLogin(res.data.songList);
      })
      .catch((err) => {
        console.log("auth error: ", err);
    });
  }

  render() {
    return (
      <div>
        Add A Song
        <form>
          <div className="form-group">
            <input type="text" className="form-control" onChange={this.handleArtistChange} placeholder="Artist" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" onChange={this.handleAlbumChange} placeholder="Album" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" onChange={this.handleSongChange} placeholder="Song Title" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" onChange={this.handleTrackChange} placeholder="Track" />
          </div>
          <button type="button" className="btn btn-primary" onClick={this.addSong}>Add Song</button>
        </form>
      </div>
    );
  }
}


// SampleTagList.propTypes = {
//   tags: React.PropTypes.array.isRequired,
// };
