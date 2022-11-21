import React, { useState, createContext } from 'react';

export const ThemeContext = createContext({
  isDarkTheme: false,
  toggleTheme: () => {}
});

function ThemeProvider(props){
  const currentTheme = localStorage.getItem('isDarkTheme') === 'false' ? false : true;

  const [isDarkTheme, setIsDarkTheme] = useState(currentTheme);

  if(isDarkTheme) {
    document.body.classList.contains('dark') ? document.body.classList.toggle('dark') : document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }

  function toggleTheme() {
    setIsDarkTheme(!isDarkTheme)
    localStorage.setItem('isDarkTheme', !isDarkTheme)
  }

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }} 
    {...props}
    />
  )
}

export default ThemeProvider