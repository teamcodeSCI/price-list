import React from 'react';
import './extensionItem.scss';

const ExtensionItem = (props) => {
  return (
    <div className='extensionItem'>
      <div className='extensionItem__text'>{props.startDate}</div>
      <div className='extensionItem__text'>{props.endDate}</div>
    </div>
  );
};

export default ExtensionItem;
