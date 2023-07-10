import React, { createContext, useReducer } from 'react'

export const PRODUCTS_LIST_REQUEST = 'PRODUCTS_LIST_REQUEST';
export const PRODUCTS_LIST_SUCCESS = 'PRODUCTS_LIST_SUCCESS';
export const PRODUCTS_LIST_FAIL = 'PRODUCTS_LIST_FAIL';
export const PRODUCTS_LIST_ERROR = 'PRODUCTS_LIST_ERROR';
export const PRODUCTS_SIDEBAR_SUCCESS = 'PRODUCTS_SIDEBAR_SUCCESS';
export const SET_PRODUTS_FILTER = 'SET_PRODUTS_FILTER';

const initialState = {
    products: [],
    productsSidebar: [],
    loading: true,
    error: false,
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
        case SET_PRODUTS_FILTER: 
            return {
                ...state,
                products: action.payload
            }

        case PRODUCTS_SIDEBAR_SUCCESS:
            return {
                ...state,
                productsSidebar: action.products,
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
