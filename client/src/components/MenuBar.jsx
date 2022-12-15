import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon, Menu, Dropdown } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { ThemeContext } from '../context/theme';

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substring(1);
  const [activeItem, setActiveItem] = useState(path);
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  let navigate = useNavigate();

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const handleLogout = () => {
    logout()
    navigate('/')
  }

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

  const dropdownItems = []

  if (pathname.includes('/post') || pathname.includes('/user')) {
    dropdownItems.push(
      <Dropdown.Item key={dropdownItems.length} as={Link} to="/">
        Home
      </Dropdown.Item>
    )
  }

  if (!pathname.includes('/user')) {
    dropdownItems.push(
      <Dropdown.Item key={dropdownItems.length} as={Link} to={`/user/${user?.id}`}>
        {
          user?.username.substring(0, 1).toUpperCase() + user?.username.substring(1) + '\'s'
        } Profile
      </Dropdown.Item>
    )
  }

  const menuBar = user ? (
    (
      <Menu {...MenuStyle}>
        <Dropdown item icon="home" >
          <Dropdown.Menu>
            {
              dropdownItems
            }
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            onClick={handleLogout}
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