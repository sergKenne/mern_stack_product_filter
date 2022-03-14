import React, { createContext, useReducer } from 'react'

export const PRODUCTS_LIST_REQUEST = 'PRODUCTS_LIST_REQUEST';
export const PRODUCTS_LIST_SUCCESS = 'PRODUCTS_LIST_SUCCESS';
export const PRODUCTS_LIST_FAIL = 'PRODUCTS_LIST_FAIL';
export const PRODUCTS_LIST_ERROR = 'PRODUCTS_LIST_ERROR';
export const PRODUCTS_SIDEBAR_SUCCESS = 'PRODUCTS_SIDEBAR_SUCCESS';
export const ADD_PRODUCTS_IN_FILTER_BRAND = 'ADD_PRODUCTS_IN_FILTER_BRAND';
export const REMOVE_PRODUCTS_IN_FILTER_BRAND = 'REMOVE_PRODUCTS_IN_FILTER_BRAND';
export const ADD_PRODUCTS_IN_FILTER_RAM = 'ADD_PRODUCTS_IN_FILTER_RAM';
export const REMOVE_PRODUCTS_IN_FILTER_RAM = 'REMOVE_PRODUCTS_IN_FILTER_RAM';

const initialState = {
    products: [],
    productsSidebar: [],
    loading: false,
    error: false,
    arrayFiltering: [],
    tempFilter: []
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case PRODUCTS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.products,
            };

        case PRODUCTS_LIST_FAIL:
            return {
                ...state,
                error: action.error,
            };

        case PRODUCTS_SIDEBAR_SUCCESS:
            return {
                ...state,
                productsSidebar: action.products,
            };

        case ADD_PRODUCTS_IN_FILTER_BRAND:
            let prodFilter = [];
            state.productsSidebar.forEach((el) => {
                if (action.arrFilter.includes(el.brand)) prodFilter.push(el);
            });
            return {
                ...state,
                loading: false,
                products: prodFilter,
            };

        case REMOVE_PRODUCTS_IN_FILTER_BRAND:
            let item = [];
            state.products.forEach((el) => {
                if (action.arrFilter.includes(el.brand)) item.push(el);
                if (action.arrFilter.length === 0) {
                    item = state.productsSidebar;
                }
            });
            return {
                ...state,
                loading: false,
                products: item,
            };

        case ADD_PRODUCTS_IN_FILTER_RAM:
            //console.log('sidePro:', state.productsSidebar);
            let ramFilter = [];
            state.productsSidebar.forEach((el) => {
                if (action.arrRamFilter.includes(el.ram)) ramFilter.push(el);
            });
            return {
                ...state,
                loading: false,
                products: ramFilter,
            };
        case REMOVE_PRODUCTS_IN_FILTER_RAM:
            let prod = [];
            state.products.forEach((el) => {
                if (action.arrRamFilter.includes(el.ram)) prod.push(el);

                if (action.arrRamFilter.length === 0) {
                    prod = state.productsSidebar;
                }
            });
            return {
                ...state,
                loading: false,
                products: prod,
            };

        default:
            return state;
    }
};



export const productsContext = createContext();

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productsReducer, initialState);
  return (
      <productsContext.Provider value={{ state, dispatch }}>
        {children}
    </productsContext.Provider>
  )
}
