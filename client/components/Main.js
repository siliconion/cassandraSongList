import React from 'react';
import SongList from './SongList';
import SongForm from './SongForm';
import axios from 'axios';

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songList: []
    };

    this.addSong= this.addSong.bind(this);
    this.deleteSong= this.deleteSong.bind(this);
    this.updateSongList= this.updateSongList.bind(this);
  }

  updateSongList(songList){
    this.setState({songList})
  }

  isSameSong(song1, song2){
    return song1.artist_name === song2.artist_name &&
        song1.song_name === song2.song_name &&
        song1.album === song2.album
  }
  addSong(songInfo) {
    if(this.state.songList.filter(song => this.isSameSong(song, songInfo)).length > 0) {
      return Promise.reject("Song already exists")
    }

    return axios.post('/songList', {songInfo})
      .then((res) => {
        this.updateSongList(res.data);
        return Promise.resolve();
      })
      .catch((err) => {
        console.log("auth error: ", err);
        return Promise.reject(err)
    });
  }

  deleteSong(songInfo) {
    axios.post('/deleteSong', {songInfo})
      .then((res) => {
        this.updateSongList(res.data);
      })
      .catch((err) => {
        console.log("auth error: ", err);
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-9">
            <SongList 
              deleteSong={this.deleteSong} 
              updateSongList={this.updateSongList}
              songList={this.state.songList} />
          </div>
          <div className="col-xs-12 col-sm-3">
            <SongForm 
              addSong={this.addSong}/>
          </div>
        </div>
      </div>
    );
  }
}
