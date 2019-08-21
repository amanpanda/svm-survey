import React from 'react';
import './Header.css';

const Header = (props) => {
  const { title } = props;
  return (
    <div className='header-container'>
      <h1 className='title-text'>
        {title}
      </h1>
    </div>
  )
}

export default Header;