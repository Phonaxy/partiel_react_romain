import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="desktop-nav">
            <a href="index.html"><i className="fas fa-film"></i></a>
            <ul>
                <li><Link to="/">Films</Link></li>
                <li><Link to="/">Séries</Link></li>
                <li><Link to="/">Populaires</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;