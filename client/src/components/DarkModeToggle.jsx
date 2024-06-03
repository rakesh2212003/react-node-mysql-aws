// DarkModeToggle.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { toggleDarkMode } from '../context/actions/darkModeActions.js'

const DarkModeToggle = () => {

    const darkMode = useSelector(state => state.darkMode);

    return (
        <button onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
};

export default DarkModeToggle