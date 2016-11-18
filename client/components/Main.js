import React from 'react';
import SongList from './SongList';
import SongForm from './SongForm';

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songList: []
    };

    this.updateSongList= this.updateSongList.bind(this);
  }

  updateSongList(songList){
    console.log("main update songlist", songList)
    this.setState({songList})
  }

  componentDidMount() {
    console.log("main componentDidMount")
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-9">
            <SongList updateSongList={this.updateSongList} songList={this.state.songList} />
          </div>
          <div className="col-xs-12 col-sm-3">
            <SongForm updateSongList={this.updateSongList}/>
          </div>
        </div>
      </div>
    );
  }
}


// SampleTagList.propTypes = {
//   tags: React.PropTypes.array.isRequired,
// };
