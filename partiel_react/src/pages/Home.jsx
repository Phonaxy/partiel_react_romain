import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/style.css';
import Navbar from "../components/Navbar.jsx";

function Home() {
    const [activeButton, setActiveButton] = useState('day');
// on va vérifier si l'utilisateur press le bouton par defaut les films sont trier par "aujourd'hui"
    return (
        <div>
            <Navbar /> {/*Appel de mon component Navbar*/}
            <nav className="nav-list-mobile" id="mobileNav">
                <a href="index.html"><i className="fas fa-film"></i></a>
                <div id="barr">
                    <div className="tt">
                        <div id="top-nav" className="bar"></div>
                        <div id="middle-nav" className="bar"></div>
                        <div id="bottom-nav" className="bar"></div>
                    </div>
                </div>
                <div className="mobile-nav-content" id="menu-nav">
                    <ul>
                        <li><Link to="/">Films</Link></li>
                        <li><Link to="/">Séries</Link></li>
                        <li><Link to="/">Populaires</Link></li>
                    </ul>
                </div>
            </nav>

            {/* Content */}
            <div className="search-container saveMe">
                <input type="text" placeholder="Rechercher un film" />
                <button type="submit"><i className="fas fa-search"></i></button>
            </div>

            <div className="wrapper">
                <div className="tendances-container container">
                    {/* Ici les films tendances */}
                    <div className="title-filter" id="title-tendances">
                        <h2>Tendances</h2>
                        <button
                            className={activeButton === 'day' ? 'active' : ''}
                            id="day"
                            onClick={() => setActiveButton('day')}
                        >
                            Aujourd'hui
                        </button>
                        <button
                            className={activeButton === 'week' ? 'active' : ''}
                            id="week"
                            onClick={() => setActiveButton('week')}
                        >
                            Cette semaine
                        </button>
                    </div>
                    <div className="grid-tendances" id="tendances"></div>
                </div>
            </div>

            <div className="wrapper-pop">
                <div className="populaires-container container">
                    {/* Ici les films/séries populaires */}
                    <div className="title-filter saveMe" id="title-category">
                        <h2>Séries TV</h2>
                        <button className="active" id="top_rated">Mieux notées</button>
                        <button id="popular">Populaires</button>
                    </div>
                    <div className="grid-tendances" id="populaires"></div>
                </div>
            </div>

            {/* Footer */}
            <footer>
                <p>Tous droits réservés</p>
            </footer>
        </div>
    );
}

export default Home;
