import React from 'react';
import Song from './Song';
import axios from 'axios';

export default class SongList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
    };

    this.showSongs= this.showSongs.bind(this);
  }

  componentDidMount() {
    axios.get('/songList')
      .then((res) => {
        console.log("auth success! ", res);
        this.setState(songs: res);
      })
      .catch((err) => {
        console.log("auth error: ", err);
        this.setState({errorMessage: err});
    });
  }

  showSongs() {
    return this.state.songs.map(s => <Song songinfo={s} />)
  }

  render() {
    return (
      <div>
        Song List page!
        {this.showSongs()}
      </div>
    );
  }
}


// SampleTagList.propTypes = {
//   tags: React.PropTypes.array.isRequired,
// };

