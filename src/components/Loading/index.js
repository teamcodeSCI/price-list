import React from 'react';
import './loading.scss';
const Loading = ({ size, borderTopColor, borderColor }) => {
  return (
    <div
      className='loading'
      style={{ width: size, height: size, borderColor: borderColor, borderTop: `4px solid ${borderTopColor}` }}
    ></div>
  );
};

export default Loading;
