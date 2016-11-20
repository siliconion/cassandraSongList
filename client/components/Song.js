import React from 'react';
import axios from 'axios';

export default class Song extends React.Component {
  constructor(props) {
    super(props);
    this.deleteSong= this.deleteSong.bind(this);
  }

  deleteSong() {
    this.props.deleteSong(this.props.songInfo);
  }

  render() {
    console.log(this.props)
    return (
      <tr className="">
        <td className="">{this.props.songInfo.artist_name}</td>
        <td className="">{this.props.songInfo.album}</td>
        <td className="">{this.props.songInfo.song_name}</td>
        <td className="">{this.props.songInfo.track}</td>
        <td className="" onClick={this.deleteSong}><i className="fa fa-trash" aria-hidden="true"></i></td>
      </tr>
    );
  }
}
