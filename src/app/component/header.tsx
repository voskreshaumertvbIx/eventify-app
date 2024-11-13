'use client'
import React from 'react';
import { useTheme } from './ThemeProvider';
import { Button } from './reusable/Button';

const Header = () => {
  const { toggleTheme } = useTheme()
  return (
    <div className='dark:bg-black dark:text-white '>
      <Button onClick={toggleTheme} size={'default'}>theme</Button>
    </div>
  );
}

export default Header;
