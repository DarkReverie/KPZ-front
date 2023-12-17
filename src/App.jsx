import React, { useState } from 'react';
import { BrowserRouter as BrowserRouter, Router, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';

import MainPage from './components/mainpage';



function App() {
  return(<>
    <MainPage/>
  </>)
}
  
export default App;