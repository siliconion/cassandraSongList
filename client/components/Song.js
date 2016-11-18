import React from 'react';

export default class Song extends React.Component {
  constructor(props) {
    super(props);
    this.deleteSong= this.deleteSong.bind(this);
  }

  deleteSong(){
    console.log("delete song")
  }

  render() {
    console.log(this.props)
    return (
      <tr className="">
        <td className="">{this.props.songInfo.artist_name}</td>
        <td className="">{this.props.songInfo.album}</td>
        <td className="">{this.props.songInfo.song_name}</td>
        <td className="">{this.props.songInfo.track}</td>
        <td className="" onClick={this.props.deleteSong}> X </td>
      </tr>
    );
  }
}


// SampleTagList.propTypes = {
//   tags: React.PropTypes.array.isRequired,
// };

