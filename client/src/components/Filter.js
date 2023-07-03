/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect, useRef } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

import {
    productsContext,
    PRODUCTS_LIST_REQUEST,
    PRODUCTS_LIST_SUCCESS,
    PRODUCTS_SIDEBAR_SUCCESS,
} from '../context/ContextProvider';
import axios from 'axios';
import { productsFilter } from '../utils/productsFilter';
import { BASE_URL } from '../utils/base_url';

const Filter = () => {



    








    
    const [rangeValue, setRangeValue] = useState({
        value: { min: 0, max: 65000 },
    });
    const rangeRef = useRef()
    const { dispatch } = useContext(productsContext);
    const { productsSidebar } = useContext(productsContext).state;
    
    const[data, setData] = useState([])
    const [objFilter, setObjFilter] = useState({});
    const [orderFilter, setOrderFilter] = useState([]);

    console.log('objFilter:', objFilter);
    console.log('orderFilter:', orderFilter);

    console.log('rangeValue:',  rangeValue.value.min, ":" , rangeValue.value.max);
   
    const handleChange = async (e) => {
        let category = e.target.dataset.filter;
        if (e.target.checked) {
            if (objFilter[category]) {
                setObjFilter({
                    ...objFilter,
                    [category]:[...objFilter[category],e.target.name]
                }); 
            } else {
                setObjFilter({
                    ...objFilter,
                    [category]: [e.target.name],
                });
                setOrderFilter([...orderFilter, category]);
            }

        } else {
            objFilter[category] = objFilter[category].filter((el) => el !== e.target.name);
            setObjFilter({
                ...objFilter,
                [category]: objFilter[category].filter((el) => el !== e.target.name),
            });

            if (objFilter[category].length < 1) {
                delete objFilter[category];
                setObjFilter({
                    ...objFilter,
                });
                const ind = orderFilter.indexOf(category);
                orderFilter.splice(ind, 1);
                setOrderFilter(orderFilter);
            }
        }
    };

    useEffect(() => {

        if (objFilter["range"]) {
            setObjFilter({
                ...objFilter,
                range: {
                    min: rangeValue.value.min,
                    max: rangeValue.value.max
                },
            });
        } else {
            setObjFilter({
                ...objFilter,
                range: {
                    min: rangeValue.value.min,
                    max: rangeValue.value.max,
                },
            });
            setOrderFilter([...orderFilter, "range"]);
        }
        if (rangeValue.value.min === 0 && rangeValue.value.max === 65000) {
            delete objFilter["range"];
            setObjFilter({
                ...objFilter,
            });
            const ind = orderFilter.indexOf("range");
            orderFilter.splice(ind, 1);
            setOrderFilter(orderFilter);
        }

    }, [rangeValue]);

    useEffect(() => {
        productsFilter(
            dispatch,
            data,
            rangeValue,
            objFilter,
            orderFilter,
            PRODUCTS_LIST_SUCCESS,
            PRODUCTS_LIST_REQUEST,
        );
        
    }, [objFilter, orderFilter]);


    useEffect(() => {
        const fetchProducts = async () => {
            dispatch({ type: PRODUCTS_LIST_REQUEST });
            try {
                //const { data } = await axios.get('/api/product');
                const { data } = await axios.get(`${BASE_URL}/api/product`); //for deployement
                console.log(data);
                dispatch({ type: PRODUCTS_SIDEBAR_SUCCESS, products: data });
                setData(data)
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
                    ref={rangeRef}
                    data-filter="range"
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
                                    data-filter="brand"
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
                                    data-filter="ram"
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
                                    data-filter="storage"
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
