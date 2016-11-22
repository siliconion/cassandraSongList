import React from 'react';
import Song from './Song';
import axios from 'axios';

export default class SongList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songList: [],
    };
    this.showSongs= this.showSongs.bind(this);
  }

  componentDidMount() {
    axios.get('/songList')
      .then((res) => {
        this.props.updateSongList(res.data);
      })
      .catch((err) => {
        console.log("songlist error: ", err);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({songList:nextProps.songList});
  }

  showSongs() {
    return this.state.songList.sort((a,b)=>{
      const artist = a.artist_name.localeCompare(b.artist_name);
      if(artist!==0) return artist*-1;
      const album = a.album.localeCompare(b.album);
      if(album!==0) return album*-1;
      return a.song_name.localeCompare(b.song_name);
    }).map(s => <Song deleteSong={this.props.deleteSong} songInfo={s} />)
  }

  render() {
    return (
      <div className="songList">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th className="">Artist</th>
              <th className="">Album</th>
              <th className="">Title</th>
              <th className="">Track</th>
              <th className=""><i className="fa fa-trash" aria-hidden="true"></i></th>
            </tr>
          </thead>
          <tbody>
            {this.showSongs()}
          </tbody>
        </table>
      </div>
    );
  }
}


