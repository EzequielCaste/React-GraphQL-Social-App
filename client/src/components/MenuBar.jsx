import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { ThemeContext } from '../context/theme';

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substring(1);
  const [activeItem, setActiveItem] = useState(path);
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const MenuStyle = isDarkTheme ? {
    inverted: true,
    pointing: false,
    secondary: false,
    size: 'massive',
  } : {
    inverted: false,
    pointing: true,
    secondary: true,
    size: 'massive',
    color: 'teal'
  }  

  const menuBar = user ? (
    (
      <Menu {...MenuStyle} >
        <Menu.Item
          name={user.username}
          active
          as={Link}
          to="/"
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            onClick={logout}
          />
          <Menu.Item
          name='theme'
          onClick={toggleTheme}          
        >
          <Icon name={isDarkTheme ? 'sun' : 'moon'} />
        </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  ) : (
    <Menu {...MenuStyle} >
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
        <Menu.Item
          name='theme'
          onClick={toggleTheme}
          
        >
          <Icon name={isDarkTheme ? 'sun' : 'moon'} />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
  return menuBar;
}

export default MenuBar;