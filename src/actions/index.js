import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../utils/routes';

export const updateCustomersData = createAction('CUSTOMERS_DATA_UPDATE');

export const customersDataGettingSuccess = createAction('GET_CUSTOMERS_DATA_SUCCESS');

export const customersDataGettingPending = createAction('GET_CUSTOMERS_DATA_PENDING');

export const customersDataGettingFailure = createAction('GET_CUSTOMERS_DATA_FAILURE');

export const getCustomersData = () => async (dispatch) => {
  const url = routes.getCustomersUrl();
  try {
    dispatch(customersDataGettingPending());
    const response = await axios.get(url);
    const customers = response.data;
    console.dir(customers);
    dispatch(updateCustomersData({ data: customers }));
    dispatch(customersDataGettingSuccess());
  } catch (e) {
    dispatch(customersDataGettingFailure());
    console.error(e);
  }
};
