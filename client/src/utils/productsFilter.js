
export const productsFilter = async (
    dispatch,
    data,
    rangeValue,
    objFilter,
    orderFilter,
    PRODUCTS_LIST_SUCCESS,
    PRODUCTS_LIST_REQUEST,
) => {
    try {
        dispatch({ type: PRODUCTS_LIST_REQUEST });
        //const { data } = await axios.get('/api/product');
        if (orderFilter.length === 0) {
            dispatch({ type: PRODUCTS_LIST_SUCCESS, products: data });
        } else if (orderFilter.length === 1) {
            let tempArr = [];
            if (orderFilter[0] === 'range') {
                tempArr = data
                    .filter(
                        (item) =>
                            item.price >= rangeValue.value.min &&
                            item.price <= rangeValue.value.max,
                    )
                    .sort((a, b) => a.price - b.price);
            } else {
                data.forEach((el) => {
                    if (objFilter[orderFilter[0]].includes(el[orderFilter[0]])) {
                        tempArr = [...tempArr, el];
                    }
                });
            }

            dispatch({ type: PRODUCTS_LIST_SUCCESS, products: tempArr });
        } else if (orderFilter.length === 2) {
            let tempArr = [];
            let temp2 = [];

            if (orderFilter[0] === 'range') {
                tempArr = data
                    .filter(
                        (item) =>
                            item.price >= rangeValue.value.min &&
                            item.price <= rangeValue.value.max,
                    )
                    .sort((a, b) => a.price - b.price);

                tempArr.forEach((el) => {
                    if (objFilter[orderFilter[1]].includes(el[orderFilter[1]])) {
                        temp2.push(el);
                    }
                });
            } else {
                data.forEach((el) => {
                    if (objFilter[orderFilter[0]].includes(el[orderFilter[0]])) {
                        tempArr = [...tempArr, el];
                    }
                });

                if (orderFilter[1] === 'range') {
                    temp2 = tempArr
                        .filter(
                            (item) =>
                                item.price >= rangeValue.value.min &&
                                item.price <= rangeValue.value.max,
                        )
                        .sort((a, b) => a.price - b.price);
                } else {
                    tempArr.forEach((el) => {
                        if (objFilter[orderFilter[1]].includes(el[orderFilter[1]])) {
                            temp2.push(el);
                        }
                    });
                }
            }

            dispatch({ type: PRODUCTS_LIST_SUCCESS, products: temp2 });
        } else if (orderFilter.length === 3) {
            let tempArr = [];
            let temp2 = [];
            let temp3 = [];

            if (orderFilter[0] === 'range') {
                tempArr = data
                    .filter(
                        (item) =>
                            item.price >= rangeValue.value.min &&
                            item.price <= rangeValue.value.max,
                    )
                    .sort((a, b) => a.price - b.price);

                tempArr.forEach((el) => {
                    if (objFilter[orderFilter[1]].includes(el[orderFilter[1]])) {
                        temp2.push(el);
                    }
                });
                temp2.forEach((el) => {
                    if (objFilter[orderFilter[2]].includes(el[orderFilter[2]])) {
                        temp3.push(el);
                    }
                });
            } else {
                data.forEach((el) => {
                    if (objFilter[orderFilter[0]].includes(el[orderFilter[0]])) {
                        tempArr = [...tempArr, el];
                    }
                });

                if (orderFilter[1] === 'range') {
                    temp2 = tempArr
                        .filter(
                            (item) =>
                                item.price >= rangeValue.value.min &&
                                item.price <= rangeValue.value.max,
                        )
                        .sort((a, b) => a.price - b.price);

                    temp2.forEach((el) => {
                        if (objFilter[orderFilter[2]].includes(el[orderFilter[2]])) {
                            temp3.push(el);
                        }
                    });
                } else {
                    tempArr.forEach((el) => {
                        if (objFilter[orderFilter[1]].includes(el[orderFilter[1]])) {
                            temp2.push(el);
                        }
                    });

                    if (orderFilter[2] === 'range') {
                        temp3 = temp2
                            .filter(
                                (item) =>
                                    item.price >= rangeValue.value.min &&
                                    item.price <= rangeValue.value.max,
                            )
                            .sort((a, b) => a.price - b.price);
                    } else {
                        temp2.forEach((el) => {
                            if (objFilter[orderFilter[2]].includes(el[orderFilter[2]])) {
                                temp3.push(el);
                            }
                        });
                    }
                }
            }
            dispatch({ type: PRODUCTS_LIST_SUCCESS, products: temp3 });
        } else if (orderFilter.length === 4) {
            let tempArr = [];
            let temp2 = [];
            let temp3 = [];
            let temp4 = [];

            if (orderFilter[0] === 'range') {
                tempArr = data
                    .filter(
                        (item) =>
                            item.price >= rangeValue.value.min &&
                            item.price <= rangeValue.value.max,
                    )
                    .sort((a, b) => a.price - b.price);
                tempArr.forEach((el) => {
                    if (objFilter[orderFilter[1]].includes(el[orderFilter[1]])) {
                        temp2.push(el);
                    }
                });
                temp2.forEach((el) => {
                    if (objFilter[orderFilter[2]].includes(el[orderFilter[2]])) {
                        temp3.push(el);
                    }
                });
                temp3.forEach((el) => {
                    if (objFilter[orderFilter[3]].includes(el[orderFilter[3]])) {
                        temp4.push(el);
                    }
                });
            } else {
                data.forEach((el) => {
                    if (objFilter[orderFilter[0]].includes(el[orderFilter[0]])) {
                        tempArr = [...tempArr, el];
                    }
                });

                if (orderFilter[1] === 'range') {
                    temp2 = tempArr
                        .filter(
                            (item) =>
                                item.price >= rangeValue.value.min &&
                                item.price <= rangeValue.value.max,
                        )
                        .sort((a, b) => a.price - b.price);

                    temp2.forEach((el) => {
                        if (objFilter[orderFilter[2]].includes(el[orderFilter[2]])) {
                            temp3.push(el);
                        }
                    });
                    temp3.forEach((el) => {
                        if (objFilter[orderFilter[3]].includes(el[orderFilter[3]])) {
                            temp4.push(el);
                        }
                    });
                } else {
                    tempArr.forEach((el) => {
                        if (objFilter[orderFilter[1]].includes(el[orderFilter[1]])) {
                            temp2.push(el);
                        }
                    });

                    if (orderFilter[2] === 'range') {
                        temp3 = temp2
                            .filter(
                                (item) =>
                                    item.price >= rangeValue.value.min &&
                                    item.price <= rangeValue.value.max,
                            )
                            .sort((a, b) => a.price - b.price);

                        temp3.forEach((el) => {
                            if (objFilter[orderFilter[3]].includes(el[orderFilter[3]])) {
                                temp4.push(el);
                            }
                        });
                    } else {
                        temp2.forEach((el) => {
                            if (objFilter[orderFilter[2]].includes(el[orderFilter[2]])) {
                                temp3.push(el);
                            }
                        });

                        if (orderFilter[2] === 'range') {
                            temp4 = temp3
                                .filter(
                                    (item) =>
                                        item.price >= rangeValue.value.min &&
                                        item.price <= rangeValue.value.max,
                                )
                                .sort((a, b) => a.price - b.price);

                            temp3.forEach((el) => {
                                if (objFilter[orderFilter[3]].includes(el[orderFilter[3]])) {
                                    temp4.push(el);
                                }
                            });
                        } else {
                            temp3.forEach((el) => {
                                if (objFilter[orderFilter[3]].includes(el[orderFilter[3]])) {
                                    temp4.push(el);
                                }
                            });
                        }
                    }
                }
            }

            dispatch({ type: PRODUCTS_LIST_SUCCESS, products: temp4 });
        }
    } catch (error) {
        dispatch({ type: error.message });
    }
};