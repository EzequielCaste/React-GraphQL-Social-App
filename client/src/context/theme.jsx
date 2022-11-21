import React, { useState, createContext } from 'react';

export const ThemeContext = createContext({
  isDarkTheme: false,
  toggleTheme: () => {}
});

function ThemeProvider(props){
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    localStorage.setItem('isDarkTheme', !isDarkTheme);
    document.body.classList.toggle('dark')
    setIsDarkTheme(!isDarkTheme)
  }

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }} 
    {...props}
    />
  )
}

export default ThemeProvider