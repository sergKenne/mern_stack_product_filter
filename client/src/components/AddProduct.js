import React, { useEffect, useState } from 'react';

const AddProduct = () => {
   const [product, setProduct] = useState({
        name: '',
        brand: '',
        price: '',
        ram: '',
        storage: '',
        camera: '',
        quantity: '',
        status: '',
        image: null,
    });

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value,
        });
    };

    const postProduct = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('image', product.image);
        formData.append('name', product.name);
        formData.append('brand', product.brand);
        formData.append('price', product.price);
        formData.append('ram', product.ram);
        formData.append('storage', product.storage);
        formData.append('camera', product.camera);
        formData.append('quantity', product.quantity);
        formData.append('status', product.status);

        console.log('product:', product);
        console.log('formData:', formData);

        fetch('/api/product', {
            method: 'POST',
            body: formData,
        })
            .then((data) => data.json())
            .then((response) => {
                console.log('product', response);
                window.location = '/';
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <div className="container">
                <br />
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <br />
                        <h2 align="center">Add new product</h2>
                        <br />
                        <form onSubmit={postProduct} method="post" encType="multipart/form-data">
                            <div className="form-group col-md-6">
                                <label className='' htmlFor="name">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Enter name"
                                    value={product.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="brand">Brand</label>
                                <input
                                    name="brand"
                                    type="text"
                                    className="form-control"
                                    id="brand"
                                    placeholder="Enter brand"
                                    value={product.brand}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="price">Price</label>
                                <input
                                    name="price"
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    placeholder="Enter price"
                                    value={product.price}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="ram">Ram</label>
                                <input
                                    name="ram"
                                    type="text"
                                    className="form-control"
                                    id="ram"
                                    placeholder="Enter ram"
                                    value={product.ram}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="storage">Storage</label>
                                <input
                                    name="storage"
                                    type="text"
                                    className="form-control"
                                    id="storage"
                                    placeholder="Enter storage"
                                    value={product.storage}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="camera">Camera</label>
                                <input
                                    name="camera"
                                    type="text"
                                    className="form-control"
                                    id="camera"
                                    placeholder="Enter camera"
                                    value={product.camera}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="quantity">Quantity</label>
                                <input
                                    name="quantity"
                                    type="number"
                                    className="form-control"
                                    id="quantity"
                                    placeholder="Enter quantity"
                                    value={product.quantity}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="status">Status</label>
                                <input
                                    name="status"
                                    type="number"
                                    className="form-control"
                                    id="status"
                                    placeholder="Enter status"
                                    value={product.staus}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="image">Image</label>
                                <input
                                    onChange={handleChange}
                                    type="file"
                                    name="image"
                                    className="form-control"
                                    id="image"
                                    placeholder="Choose image"
                                />
                            </div>
                            <div className="form-group col-md-12">
                                <br />
                                <button type="submit" className="btn btn-primary py-4">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
