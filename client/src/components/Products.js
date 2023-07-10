import React, {useContext, useEffect, useState} from 'react'
import { productsContext, PRODUCTS_LIST_REQUEST, PRODUCTS_LIST_SUCCESS } from '../context/ContextProvider';
import axios from 'axios'
import { BASE_URL } from '../utils/base_url';
import Loading from './Loading'

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)
    const { products:data} = useContext(productsContext).state
    
    useEffect(() => {

        fetch(`${BASE_URL}/api/product`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false)
            })
            .catch(err => {
            console.log(err.message);
        })
    }, [])

    useEffect(() => {
        setProducts(data)
    },[data])
    
  return (
      <div className="col-md-9">
          <br />
          {loading ? (
              <Loading />
          ) : (
              <div className="row filter_data">
                  {products.length === 0 && (
                      <h1 style={{ textAlign: 'center' }}> No Product Found</h1>
                  )}
                  {products.map((prod) => (
                      <div className="col-sm-4 col-md-3 px-2" key={prod._id}>
                          <div className="card">
                              <img
                                  //src={`http://localhost:3000/${prod.image}`}
                                  src={`${BASE_URL}/${prod.image}`}
                                  className="card-img-top img-max-width "
                                  alt="..."
                              />
                              <div className="card-body">
                                  <h5 className="card-title">
                                      <strong>{prod.name}</strong>
                                  </h5>
                                  <p className="card-text card-text--price">{prod.price}</p>
                                  <p className="card-text">
                                      Camera: <span>{prod.camera}MP</span>{' '}
                                  </p>
                                  <p className="card-text">
                                      Brand: <span>{prod.brand}</span>
                                  </p>
                                  <p className="card-text">
                                      RAM: <span>{prod.ram}GB</span>
                                  </p>
                                  <p className="card-text">
                                      Storage: <span>{prod.storage}GB</span>
                                  </p>
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