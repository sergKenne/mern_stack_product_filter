import React, { useState } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const App = () => {
    const [rangeValue, setRangeValue] = useState({
        value: { min: 1000, max: 15000 },
    });

    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <br />
                    <h2 align="center">Product Filters in REACT</h2>
                    <br />
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
                                onChange={(value) => setRangeValue({ value })}
                            />
                        </div>
                        <div className="list-group">
                            <h3>Brand</h3>
                            <div className="list-group-inner">
                                <div className="list-group-item checkbox">
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="common_selector brand"
                                            value=""
                                        />
                                        Philippe
                                    </label>
                                </div>
                                <div className="list-group-item checkbox">
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="common_selector brand"
                                            value=""
                                        />
                                        Sonic
                                    </label>
                                </div>
                                <div className="list-group-item checkbox">
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="common_selector brand"
                                            value=""
                                        />
                                        Panasonic
                                    </label>
                                </div>
                                <div className="list-group-item checkbox">
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="common_selector brand"
                                            value=""
                                        />
                                        Hard
                                    </label>
                                </div>
                                <div className="list-group-item checkbox">
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="common_selector brand"
                                            value=""
                                        />
                                        Tunre
                                    </label>
                                </div>
                                <div className="list-group-item checkbox">
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="common_selector brand"
                                            value=""
                                        />
                                    </label>
                                </div>
                                <div className="list-group-item checkbox">
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="common_selector brand"
                                            value=""
                                        />
                                    </label>
                                </div>
                                <div className="list-group-item checkbox">
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="common_selector brand"
                                            value=""
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="list-group">
                            <h3>RAM</h3>

                            <div className="list-group-item checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        className="common_selector ram"
                                        value=""
                                    />{' '}
                                    GB
                                </label>
                            </div>
                        </div>

                        <div className="list-group">
                            <h3>Internal Storage</h3>

                            <div className="list-group-item checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        className="common_selector storage"
                                        value=""
                                    />{' '}
                                    GB
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <br />
                        <div className="row filter_data">
                            <div className="col-md-3 px-2">
                                <div className="card">
                                    <img
                                        src="image/image-1.jpeg"
                                        className="card-img-top img-max-width "
                                        alt="..."
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Honor 9 Lite (Sapphire Blue, 64 GB) (4 GB RAM)
                                        </h5>
                                        <p className="card-text">Honor</p>
                                        <p className="card-text">$14499.00</p>
                                        <p className="card-text">49Gg</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card">
                                    <img
                                        src="image/image-1.jpeg"
                                        className="card-img-top img-max-width"
                                        alt="..."
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title mt-0">
                                            Honor 9 Lite (Sapphire Blue, 64 GB) (4 GB RAM)
                                        </h5>
                                        <p className="card-text">Honor</p>
                                        <p className="card-text">$14499.00</p>
                                        <p className="card-text">49Gg</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card">
                                    <img
                                        src="image/image-1.jpeg"
                                        className="card-img-top img-max-width"
                                        alt="..."
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title mt-0">
                                            Honor 9 Lite (Sapphire Blue, 64 GB) (4 GB RAM)
                                        </h5>
                                        <p className="card-text">Honor</p>
                                        <p className="card-text">$14499.00</p>
                                        <p className="card-text">49Gg</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card">
                                    <img
                                        src="image/image-1.jpeg"
                                        className="card-img-top img-max-width"
                                        alt="..."
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Honor 9 Lite (Sapphire Blue, 64 GB) (4 GB RAM)
                                        </h5>
                                        <p className="card-text">Honor</p>
                                        <p className="card-text">$14499.00</p>
                                        <p className="card-text">49Gg</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card">
                                    <img
                                        src="image/image-1.jpeg"
                                        className="card-img-top img-max-width"
                                        alt="..."
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Honor 9 Lite (Sapphire Blue, 64 GB) (4 GB RAM)
                                        </h5>
                                        <p className="card-text">Honor</p>
                                        <p className="card-text">$14499.00</p>
                                        <p className="card-text">49Gg</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 p-3">
                                <div className="card">
                                    <img
                                        src="image/image-1.jpeg"
                                        className="card-img-top img-max-width"
                                        alt="..."
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Honor 9 Lite (Sapphire Blue, 64 GB) (4 GB RAM)
                                        </h5>
                                        <p className="card-text">Honor</p>
                                        <p className="card-text">$14499.00</p>
                                        <p className="card-text">49Gg</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
