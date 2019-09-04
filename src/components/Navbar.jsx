import React, { useState } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
    //const [darkMode, setDarkMode] = useState(false);

    const [darkMode, setDarkMode] = useDarkMode();

    const toggleMode = e => {
        e.preventDefault();
        setDarkMode(!darkMode);
    };

    let color = darkMode ? 'white' : 'black';

    return (
        <nav className="navbar">
            <Link to="/" style={{ textDecoration: 'none', color: color }}>
                <h1>Crypto Tracker</h1>
            </Link>

            <div className="dark-mode__toggle">
                <div
                    onClick={toggleMode}
                    className={darkMode ? 'toggle toggled' : 'toggle'}
                />
            </div>
        </nav>
    );
};

export default Navbar;
