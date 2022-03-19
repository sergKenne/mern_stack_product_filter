/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

import {
    productsContext,
    PRODUCTS_LIST_REQUEST,
    PRODUCTS_SIDEBAR_SUCCESS,
    ADD_PRODUCTS_IN_FILTER,
    REMOVE_PRODUCTS_IN_FILTER,
    FILTER_BY_PRICE,
} from '../context/ContextProvider';
import axios from 'axios';

const Filter = () => {
    const [rangeValue, setRangeValue] = useState({
        value: { min: 1000, max: 65000 },
    });

    const { dispatch } = useContext(productsContext);
    const { productsSidebar } = useContext(productsContext).state;
    //Array filter 
    const [arrFilter, setArrFilter] = useState([]);
    //check input brand
    const [check, setCheck] = useState(false);
    
    console.log('arrFilter:', arrFilter);

    const handleChange = (e) => {
        if (e.target.checked) {
            setArrFilter([...arrFilter, e.target.name]);
            setCheck(e.target.checked);
        } else {
            setArrFilter(arrFilter.filter((el) => el !== e.target.name));
            setCheck(e.target.checked);
        }
    };

    useEffect(() => {
        const items = productsSidebar.filter(item => (item.price >= rangeValue.value.min) && (item.price <= rangeValue.value.max)).sort((a,b) => a.price - b.price )
        dispatch({type: FILTER_BY_PRICE, payload: items})
    }, [rangeValue]);

    useEffect(() => {
        if (check) {
            dispatch({ type: PRODUCTS_LIST_REQUEST });
            dispatch({ type: ADD_PRODUCTS_IN_FILTER, arrFilter });
        } else {
            dispatch({ type: PRODUCTS_LIST_REQUEST });
            dispatch({ type: REMOVE_PRODUCTS_IN_FILTER, arrFilter });
        }
    }, [arrFilter, dispatch]);

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch({ type: PRODUCTS_LIST_REQUEST });
            try {
                const { data } = await axios.get('/api/product');
                dispatch({ type: PRODUCTS_SIDEBAR_SUCCESS, products: data });
            } catch (err) {
                dispatch({ type: err.message });
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="col-md-3">
            <div className="list-group">
                <h3>Price</h3>
                <p id="price_show">
                    {rangeValue.value.min} - {rangeValue.value.max}
                </p>
                <InputRange
                    maxValue={65000}
                    minValue={0}
                    value={rangeValue.value}
                    onChange={(value) => {
                        setRangeValue({ value });
                    }}
                />
            </div>
            <div className="list-group">
                <h3>Brand</h3>
                <div className="list-group-inner">
                    {[...new Set(productsSidebar.map((p) => p.brand))].map((brand) => (
                        <div className="list-group-item checkbox" key={brand}>
                            <label>
                                <input
                                    type="checkbox"
                                    className="common_selector brand"
                                    value=""
                                    name={brand}
                                    onChange={handleChange}
                                />
                                {brand}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="list-group">
                <h3>RAM</h3>
                {[...new Set(productsSidebar.map((p) => p.ram))]
                    .sort((a, b) => a - b)
                    .map((ram) => (
                        <div className="list-group-item checkbox" key={ram}>
                            <label>
                                <input
                                    onChange={handleChange}
                                    name={ram}
                                    type="checkbox"
                                    className="common_selector ram"
                                    value=""
                                />{' '}
                                {ram}GB
                            </label>
                        </div>
                    ))}
            </div>

            <div className="list-group">
                <h3>Internal Storage</h3>
                {[...new Set(productsSidebar.map((p) => p.storage))]
                    .sort((a, b) => a - b)
                    .map((storage) => (
                        <div className="list-group-item checkbox" key={storage}>
                            <label>
                                <input
                                    onChange={handleChange}
                                    name={storage}
                                    type="checkbox"
                                    className="common_selector ram"
                                    value=""
                                />{' '}
                                {storage} GB
                            </label>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Filter;
