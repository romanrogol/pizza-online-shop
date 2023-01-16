import logo from './logo.svg';
import './scss/app.scss';
import Header from './components/Header';
import React from 'react';
import Home from './pages/Home';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom'



function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
          <Routes>
            <Route path = '/' element = {<Home />} />
            <Route path = '/Cart' element = {<Cart/>} />
            <Route path = '/pizza/:id' element = {<FullPizza/>} />
            <Route path = '*' element = {<NotFound />} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
