import React from 'react';

export default class SongForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: "",
      album:"",
      song:"",
      track:"",
      errorMessage:null
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
  addSong(){
    let artist_name = this.state.artist;
    let album = this.state.album;
    let song_name = this.state.song;
    let track = this.state.track;
    this.state.errorMessage = null;

    this.props.addSong({artist_name, album, song_name, track})
      .then(()=>{
        this.setState({
          artist: "",
          album:"",
          song:"",
          track:""
        })
      })
      .catch((err)=>{
        this.setState({
          artist: "",
          album:"",
          song:"",
          track:"",
          errorMessage:err
        })
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
      <div>
        <form>
          <div className="form-group">
            <h4>Add A Song</h4>
          </div>
          {this.showError()}
          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              value={this.state.artist} 
              onChange={this.handleArtistChange} 
              placeholder="Artist" />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              value={this.state.album} 
              onChange={this.handleAlbumChange} 
              placeholder="Album" />
          </div>
          <div className="form-group">
            <input type="text" 
              value={this.state.song} 
              className="form-control" 
              onChange={this.handleSongChange} 
              placeholder="Song Title" />
          </div>
          <div className="form-group">
            <input 
              type="number" 
              value={this.state.track} 
              className="form-control" 
              onChange={this.handleTrackChange} 
              placeholder="Track" />
          </div>
          <button type="button" className="btn btn-primary" onClick={this.addSong}>Add Song</button>
        </form>
      </div>
    );
  }
}