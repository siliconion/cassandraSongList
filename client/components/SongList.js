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
    console.log("songlist componentDidMount")
    axios.get('/songList')
      .then((res) => {
        console.log("songlist get success! ", res.data);
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
    return this.state.songList.sort((a,b)=>a.artist_name.localeCompare(b.artist_name))
      .map(s => <Song updateSongList={this.props.updateSongList} songInfo={s} />)
  }

  render() {
    return (
      <div>
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


