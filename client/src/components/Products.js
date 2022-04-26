import React, {useContext, useEffect} from 'react'
import { productsContext, PRODUCTS_LIST_REQUEST, PRODUCTS_LIST_SUCCESS } from '../context/ContextProvider';
import axios from 'axios'
import Loading from './Loading';

const Products = () => {
    
    const { products, loading} = useContext(productsContext).state
    const { dispatch } = useContext(productsContext);
    
    useEffect(() => {
        const fetchProducts = async () => {
            dispatch({ type: PRODUCTS_LIST_REQUEST })
            try {
                const { data } = await axios.get('/api/product');
                dispatch({ type: PRODUCTS_LIST_SUCCESS, products: data })
            } catch (err) {
                dispatch({type: err.message})
            } 
        }
        fetchProducts()
    }, [])
    
  return (
      <div className="col-md-9">
          <br />
          {loading ? (
              <Loading />
          ) : (
              <div className="row filter_data">
                  {products.length === 0 && <h1> No Data Found</h1>}
                  {products.map((prod) => (
                      <div className="col-md-3 px-2" key={prod._id}>
                          <div className="card">
                              <img
                                  src={`http://localhost:3000/${prod.image}`}
                                  className="card-img-top img-max-width "
                                  alt="..."
                              />
                              <div className="card-body">
                                  <h5 className="card-title">
                                      <strong>{prod.name}</strong>
                                  </h5>
                                  <p className="card-text card-text--price">{prod.price}</p>
                                  <p className="card-text">Camera: <span>{prod.camera}MP</span> </p>
                                  <p className="card-text">Brand: <span>{prod.brand}</span></p>
                                  <p className="card-text">RAM: <span>{prod.ram}GB</span></p>
                                  <p className="card-text">Storage: <span>{prod.storage}GB</span></p>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          )}
      </div>
  );
}

export default Products