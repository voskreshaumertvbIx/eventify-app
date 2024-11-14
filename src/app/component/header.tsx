'use client'
import React from 'react';
import { useTheme } from './ThemeProvider';
import { Button } from './reusable/Button';
import {  useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import { clearUser } from '../redux/slices/userSlice';

const Header = () => {
  const { toggleTheme } = useTheme()
  
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
  };
  return (
    <div className='dark:bg-black dark:text-white '>
          {user ? <p>{user?.username}</p> : "plz login"}
         <Button onClick={handleLogout}>log OUT</Button> 
      <Button onClick={toggleTheme} size={'default'}>theme</Button>
    </div>
  );
}

export default Header;
