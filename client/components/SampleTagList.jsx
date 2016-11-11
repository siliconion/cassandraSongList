import React from 'react';

export default function SampleTagList (props) {
  return (
    <div className='tag-list'>
      <ul>
        { props.tags.map(tag => <li key={tag}>{ tag }</li>) }
      </ul>
    </div>
  );
}

SampleTagList.propTypes = {
  tags: React.PropTypes.array.isRequired,
};
