/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

import {
    productsContext,
    ADD_PRODUCTS_IN_FILTER_BRAND,
    PRODUCTS_LIST_REQUEST,
    PRODUCTS_SIDEBAR_SUCCESS,
    REMOVE_PRODUCTS_IN_FILTER_BRAND,
    ADD_PRODUCTS_IN_FILTER_RAM,
    REMOVE_PRODUCTS_IN_FILTER_RAM,
} from '../context/ContextProvider';
import axios from 'axios';

const Filter = () => {
    const [rangeValue, setRangeValue] = useState({
        value: { min: 1000, max: 65000 },
    });

    const { dispatch } = useContext(productsContext);
    const { productsSidebar } = useContext(productsContext).state;
    //Array filter for brand
    const [arrFilter, setArrFilter] = useState([]);
    //Array filter for Ram
    const [arrRamFilter, setArrRamFilter] = useState([]);

    //check input brand
    const [checkBrand, setCheckBrand] = useState(false);
    //check input brand
    const [checkRam, setCheckRam] = useState(false);

    console.log('arrRamFilter:', arrRamFilter);

    const handleChange = (e) => {
        if (e.target.checked) {
            setArrFilter([...arrFilter, e.target.name]);
            setCheckBrand(e.target.checked);
        } else {
            setArrFilter(arrFilter.filter((el) => el !== e.target.name));
            setCheckBrand(e.target.checked);
        }
    };

    const handleRamChange = (e) => {
        if (e.target.checked) {
            setArrRamFilter([...arrRamFilter, e.target.name]);
            setCheckRam(e.target.checked);
        } else {
            setArrRamFilter(arrRamFilter.filter((el) => el !== e.target.name));
            setCheckRam(e.target.checked);
        }
    };

    useEffect(() => {
        if (checkBrand) {
            dispatch({ type: PRODUCTS_LIST_REQUEST });
            dispatch({ type: ADD_PRODUCTS_IN_FILTER_BRAND, arrFilter });
        } else {
            dispatch({ type: PRODUCTS_LIST_REQUEST });
            dispatch({ type: REMOVE_PRODUCTS_IN_FILTER_BRAND, arrFilter });
        }
    }, [arrFilter]);

    useEffect(() => {
        console.log("test");
        if (checkRam) {
            dispatch({ type: PRODUCTS_LIST_REQUEST });
            dispatch({ type: ADD_PRODUCTS_IN_FILTER_RAM, arrRamFilter });
        } else {
            dispatch({ type: PRODUCTS_LIST_REQUEST });
            dispatch({ type: REMOVE_PRODUCTS_IN_FILTER_RAM, arrRamFilter });
        }
    }, [arrRamFilter, dispatch]);

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch({ type: PRODUCTS_LIST_REQUEST });
            try {
                const { data } = await axios.get('/api/product');
                console.log('data', data);
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
                {/* <br /> */}
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
                                    onChange={handleRamChange}
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
                                <input type="checkbox" className="common_selector ram" value="" />{' '}
                                {storage} GB
                            </label>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Filter;
