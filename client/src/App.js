import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import Home from './components/Home';

const App = () => {
    return (
        <div className="App">
            <div className="container">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/create" element={<AddProduct />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
