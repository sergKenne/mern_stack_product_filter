import React from 'react';
import Filter from './Filter';
import Products from './Products';


const Home = () => {

    return (
        <>
            <div className="row">
                <br />
                <h2 align="center">Product Filters in REACT</h2>
                <br />
                <div>
                    <Filter />
                    <Products />
                </div>
            </div>
        </>
    );
};

export default Home;
