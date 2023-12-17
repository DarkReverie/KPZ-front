
import React from 'react';

import { Outlet, Link } from "react-router-dom";
import '../styles/homepage.css'
const HomePage = () => {


    return (
        <>
            <nav className="navbar">
                <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/Locker" className="nav-link">Go to Locker</Link>
                </li>
                <li className="nav-item">
                    <Link to="/Shopitem" className="nav-link">Go to Shop Item</Link>
                </li>
                </ul>
            </nav>
        <Outlet />
        </>
    );
};
export default HomePage;
