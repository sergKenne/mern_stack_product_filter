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
        // async function fetchFilter() {
        //     try {
        //         dispatch({ type: PRODUCTS_LIST_REQUEST });
        //         //const { data } = await axios.get('/api/product');
        //         if (orderFilter.length === 0) {
        //             dispatch({ type: PRODUCTS_LIST_SUCCESS, products: data });

        //         } else if (orderFilter.length === 1) {
        //             let tempArr = [];
        //             if (orderFilter[0] === "range") {
        //                 tempArr= data.filter(item => (item.price >= rangeValue.value.min) && (item.price <= rangeValue.value.max)).sort((a,b) => a.price - b.price )
        //             } else {
        //                 data.forEach((el) => {
        //                     if (objFilter[orderFilter[0]].includes(el[orderFilter[0]])) {
        //                         tempArr = [...tempArr, el];
        //                     }
        //                 });
        //             }
                        
                   
        //             dispatch({ type: PRODUCTS_LIST_SUCCESS, products: tempArr });

        //         } else if (orderFilter.length === 2) {
        //             let tempArr = [];
        //             let temp2 = [];

        //             if (orderFilter[0] === 'range') {

        //                 tempArr = data.filter((item) => item.price >= rangeValue.value.min && item.price <= rangeValue.value.max).sort((a, b) => a.price - b.price);
                        
        //                 tempArr.forEach((el) => {
        //                     if (objFilter[orderFilter[1]].includes(el[orderFilter[1]])) {
        //                         temp2.push(el);
        //                     }
        //                 });

        //             } else {

        //                 data.forEach((el) => {
        //                     if (objFilter[orderFilter[0]].includes(el[orderFilter[0]])) {
        //                         tempArr = [...tempArr, el];
        //                     }
        //                 });

        //                 if (orderFilter[1] === 'range') { 
        //                     temp2 = tempArr
        //                         .filter(
        //                             (item) =>
        //                                 item.price >= rangeValue.value.min &&
        //                                 item.price <= rangeValue.value.max,
        //                         )
        //                         .sort((a, b) => a.price - b.price);
        //                 } else {
        //                    tempArr.forEach((el) => {
        //                         if (objFilter[orderFilter[1]].includes(el[orderFilter[1]])) {
        //                             temp2.push(el);
        //                         }
        //                     }); 
        //                 }

                        
        //             }

        //             dispatch({ type: PRODUCTS_LIST_SUCCESS, products: temp2 });

        //         } else if (orderFilter.length === 3) {
        //             let tempArr = [];
        //             let temp2 = [];
        //             let temp3 = [];

        //             if (orderFilter[0] === 'range') {
        //                 tempArr = data
        //                     .filter(
        //                         (item) =>
        //                             item.price >= rangeValue.value.min &&
        //                             item.price <= rangeValue.value.max,
        //                     )
        //                     .sort((a, b) => a.price - b.price);
                        
        //                 tempArr.forEach((el) => {
        //                     if (objFilter[orderFilter[1]].includes(el[orderFilter[1]])) {
        //                         temp2.push(el);
        //                     }
        //                 });
        //                 temp2.forEach((el) => {
        //                     if (objFilter[orderFilter[2]].includes(el[orderFilter[2]])) {
        //                         temp3.push(el);
        //                     }
        //                 });
        //             } else {
        //                 data.forEach((el) => {
        //                     if (objFilter[orderFilter[0]].includes(el[orderFilter[0]])) {
        //                         tempArr = [...tempArr, el];
        //                     }
        //                 });

        //                 if (orderFilter[1] === 'range') {
        //                     temp2 = tempArr
        //                         .filter(
        //                             (item) =>
        //                                 item.price >= rangeValue.value.min &&
        //                                 item.price <= rangeValue.value.max,
        //                         )
        //                         .sort((a, b) => a.price - b.price);
                            
        //                     temp2.forEach((el) => {
        //                         if (objFilter[orderFilter[2]].includes(el[orderFilter[2]])) {
        //                             temp3.push(el);
        //                         }
        //                     });
        //                 } else {
        //                     tempArr.forEach((el) => {
        //                         if (objFilter[orderFilter[1]].includes(el[orderFilter[1]])) {
        //                             temp2.push(el);
        //                         }
        //                     });

        //                     if (orderFilter[2] === 'range') {
        //                         temp3 = temp2
        //                             .filter(
        //                                 (item) =>
        //                                     item.price >= rangeValue.value.min &&
        //                                     item.price <= rangeValue.value.max,
        //                             )
        //                             .sort((a, b) => a.price - b.price);
        //                     } else {
        //                         temp2.forEach((el) => {
        //                             if (objFilter[orderFilter[2]].includes(el[orderFilter[2]])) {
        //                                 temp3.push(el);
        //                             }
        //                         });
        //                     }
        //                 }
        //             }
        //             dispatch({ type: PRODUCTS_LIST_SUCCESS, products: temp3 });

        //         } else if (orderFilter.length === 4) {
        //             let tempArr = [];
        //             let temp2 = [];
        //             let temp3 = [];
        //             let temp4 = [];

        //             if (orderFilter[0] === 'range') {
        //                 tempArr = data
        //                     .filter(
        //                         (item) =>
        //                             item.price >= rangeValue.value.min &&
        //                             item.price <= rangeValue.value.max,
        //                     )
        //                     .sort((a, b) => a.price - b.price);
        //                  tempArr.forEach((el) => {
        //                      if (objFilter[orderFilter[1]].includes(el[orderFilter[1]])) {
        //                          temp2.push(el);
        //                      }
        //                  });
        //                  temp2.forEach((el) => {
        //                      if (objFilter[orderFilter[2]].includes(el[orderFilter[2]])) {
        //                          temp3.push(el);
        //                      }
        //                  });
        //                  temp3.forEach((el) => {
        //                      if (objFilter[orderFilter[3]].includes(el[orderFilter[3]])) {
        //                          temp4.push(el);
        //                      }
        //                  });
        //             } else {
        //                 data.forEach((el) => {
        //                     if (objFilter[orderFilter[0]].includes(el[orderFilter[0]])) {
        //                         tempArr = [...tempArr, el];
        //                     }
        //                 });

        //                 if (orderFilter[1] === 'range') {
        //                     temp2 = tempArr
        //                         .filter(
        //                             (item) =>
        //                                 item.price >= rangeValue.value.min &&
        //                                 item.price <= rangeValue.value.max,
        //                         )
        //                         .sort((a, b) => a.price - b.price);
                            
        //                      temp2.forEach((el) => {
        //                          if (objFilter[orderFilter[2]].includes(el[orderFilter[2]])) {
        //                              temp3.push(el);
        //                          }
        //                      });
        //                      temp3.forEach((el) => {
        //                          if (objFilter[orderFilter[3]].includes(el[orderFilter[3]])) {
        //                              temp4.push(el);
        //                          }
        //                      });
                            
        //                 } else {

        //                     tempArr.forEach((el) => {
        //                         if (objFilter[orderFilter[1]].includes(el[orderFilter[1]])) {
        //                             temp2.push(el);
        //                         }
        //                     });

        //                     if (orderFilter[2] === 'range') {
        //                         temp3 = temp2
        //                             .filter(
        //                                 (item) =>
        //                                     item.price >= rangeValue.value.min &&
        //                                     item.price <= rangeValue.value.max,
        //                             )
        //                             .sort((a, b) => a.price - b.price);
                                
        //                         temp3.forEach((el) => {
        //                             if (objFilter[orderFilter[3]].includes(el[orderFilter[3]])) {
        //                                 temp4.push(el);
        //                             }
        //                         });
        //                     } else {
        //                         temp2.forEach((el) => {
        //                             if (objFilter[orderFilter[2]].includes(el[orderFilter[2]])) {
        //                                 temp3.push(el);
        //                             }
        //                         });


        //                         if (orderFilter[2] === 'range') {
        //                             temp4 = temp3
        //                                 .filter(
        //                                     (item) =>
        //                                         item.price >= rangeValue.value.min &&
        //                                         item.price <= rangeValue.value.max,
        //                                 )
        //                                 .sort((a, b) => a.price - b.price);

        //                             temp3.forEach((el) => {
        //                                 if (
        //                                     objFilter[orderFilter[3]].includes(el[orderFilter[3]])
        //                                 ) {
        //                                     temp4.push(el);
        //                                 }
        //                             });
        //                         } else {
        //                             temp3.forEach((el) => {
        //                                 if (
        //                                     objFilter[orderFilter[3]].includes(el[orderFilter[3]])
        //                                 ) {
        //                                     temp4.push(el);
        //                                 }
        //                             });
        //                         }
        //                     }
        //                 }
        //             }

        //             dispatch({ type: PRODUCTS_LIST_SUCCESS, products: temp4 });
        //         }

        //     } catch (error) {
        //         dispatch({ type: error.message });    
        //     }
        // }

        //fetchFilter()
    }, [objFilter, orderFilter]);


    useEffect(() => {
        const fetchProducts = async () => {
            dispatch({ type: PRODUCTS_LIST_REQUEST });
            try {
                const { data } = await axios.get('/api/product');
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
