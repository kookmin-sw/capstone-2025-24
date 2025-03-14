import React from 'react';
import hi from '@/assets/react.svg';

const test: React.FC = () => {
  return (
    <div>
      <h1>test test test Page</h1>
      <img src={hi} alt='안녕' />
    </div>
  );
};

export default test;