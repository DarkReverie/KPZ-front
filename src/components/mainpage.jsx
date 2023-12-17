import HomePage from './homepage';
import Login from './login';
import Locker from './locker'
import ShopItem from './shopitem';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from "react";
import '../styles/mainpage.css';
const MainPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState("");

    const handleLogin = (isAuthenticated) => {
        setIsAuthenticated(isAuthenticated);
    };
    // вказуємо при якій лінці віідкривається яка комопнента
    return (
        <div>
            {!isAuthenticated ? (
                <Login onLogin={handleLogin} />
        ) : (
            <div>
                <BrowserRouter>
                    <Routes>
                    <Route path="/" element={<HomePage />}>     
                        <Route path="Locker" element={<Locker />} />
                        <Route path="Shopitem" element={<ShopItem />} />
                    </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        )}
        </div>
    );
};

export default MainPage;