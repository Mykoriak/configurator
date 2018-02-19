import { getIsFetching } from '../reducers/products';
import * as api from '../api';
import { getActiveLocaleID } from '../reducers/locales';

export const fetchProducts = () => (dispatch, getState) => {  
  if(getIsFetching(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_PRODUCTS_REQUEST'
  });

  return api.fetchProducts().then(
    response => {
      dispatch({
        type: 'FETCH_PRODUCTS_SUCCESS',
        response: response
      });
    },
    error => {
      dispatch({
        type: 'FETCH_PRODUCTS_FAILURE',
        message: error.message || 'Something went wrong.'
      });
    }
  );
};

export const addProduct = (baseConfigID, productID, accessory = false) => (dispatch, getState) => 
  api.getProductByID(productID, getActiveLocaleID(getState())).then(
    response => {
      if (accessory) {
        dispatch({
          type: 'ADD_ACCESSORY_PRODUCT',
          baseConfigID,
          product: response,
        });
      } else {
        dispatch({
          type: 'ADD_BASE_CONFIG_PRODUCT',
          baseConfigID,
          product: response,
        });
      }
    }
  );

export const removeProduct = (baseConfigID, productID, accessory = false) => (dispatch, getState) => {
  if (accessory) {
    dispatch({
      type: 'REMOVE_ACCESSORY_PRODUCT',
      baseConfigID,
      productID,
    });
  } else {
    dispatch({
      type: 'REMOVE_BASE_CONFIG_PRODUCT',
      baseConfigID,
      productID,
    });
  }
};

export const changeProductTitle = (baseConfigID, productID, text, accessory = false) => (dispatch, getState) => {
  if (accessory) {
    dispatch({
      type: 'CHANGE_ACCESSORY_PRODUCT_TITLE',
      baseConfigID,
      productID,
      text
    });
  } else {
    dispatch({
      type: 'CHANGE_BASE_CONFIG_PRODUCT_TITLE',
      baseConfigID,
      productID,
      text
    });
  }
};

export const changeProductShortTitle = (baseConfigID, productID, text, accessory = false) => (dispatch, getState) => {
  if (accessory) {
    dispatch({
      type: 'CHANGE_ACCESSORY_PRODUCT_SHORT_TITLE',
      baseConfigID,
      productID,
      text
    });
  } else {
    dispatch({
      type: 'CHANGE_BASE_CONFIG_PRODUCT_SHORT_TITLE',
      baseConfigID,
      productID,
      text
    });
  }
};

export const changeProductDescription = (baseConfigID, productID, text, accessory = false) => (dispatch, getState) => {
  if (accessory) {
    dispatch({
      type: 'CHANGE_ACCESSORY_PRODUCT_DESCRIPTION',
      baseConfigID,
      productID,
      text
    });
  } else {
    dispatch({
      type: 'CHANGE_BASE_CONFIG_PRODUCT_DESCRIPTION',
      baseConfigID,
      productID,
      text
    });
  }
};

export const refreshProduct = (baseConfigID, productID, accessory = false) => (dispatch, getState) => 
  api.getProductByID(productID, getActiveLocaleID(getState())).then(
    response => {
      if (accessory) {
        dispatch({
          type: 'REFRESH_ACCESSORY_PRODUCT',
          baseConfigID,
          product: response
        });
      } else {
        dispatch({
          type: 'REFRESH_BASE_CONFIG_PRODUCT',
          baseConfigID,
          product: response
        });
      }
    }
  );