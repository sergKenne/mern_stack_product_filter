import React, {useState, useEffect} from 'react';
import { Routes, Route, } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import Home from './components/Home';


const App = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = () => {
            fetch('/api/product')
            .then(res => res.json())
            .then(products => {
                setProducts(products);
                console.log(products);
            })
            .catch((err) => console.log(err));
        }

        fetchData()
        
    },[])
   
    return (
        <div className="App">
            <div className="container">
                <Routes>
                    <Route exact path="/" element={<Home products={products} />} />
                    <Route path="/create" element={<AddProduct />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
