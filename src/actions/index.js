import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../utils/routes';

export const updateCustomersData = createAction('CUSTOMERS_DATA_UPDATE');

export const customersDataGettingSuccess = createAction('GET_CUSTOMERS_DATA_SUCCESS');

export const customersDataGettingRequest = createAction('GET_CUSTOMERS_DATA_REQUEST');

export const customersDataGettingFailure = createAction('GET_CUSTOMERS_DATA_FAILURE');

export const getCustomersData = () => async (dispatch) => {
  const url = routes.getCustomersUrl();
  try {
    dispatch(customersDataGettingRequest());
    const { data } = await axios.get(url);
    dispatch(updateCustomersData({ data }));
    dispatch(customersDataGettingSuccess());
  } catch (e) {
    dispatch(customersDataGettingFailure());
    console.error(e);
  }
};

export const editCustomerRequest = createAction('CUSTOMER_EDITING_REQUEST');
export const editCustomerSuccess = createAction('CUSTOMER_EDIT_SUCCESS');
export const editCustomerFailure = createAction('CUSTOMER_EDIT_FAILURE');

export const addingCustomer = createAction('CUSTOMER_ADD');

export const addCustomer = ({ values, handleClose }) => async (dispatch) => {
  const url = routes.getCustomersUrl();
  try {
    dispatch(editCustomerRequest());
    const { data } = await axios.post(url, values);
    dispatch(addingCustomer({ data }));
    handleClose();
    dispatch(editCustomerSuccess());
  } catch (e) {
    dispatch(editCustomerFailure());
    console.error(e);
  }
};

export const setCurrentlyEditedCustomerId = createAction('CURRENTLY_EDITED_CUSTOMER_ID_SET');
export const resetCurrentlyEditedCustomerId = createAction('CURRENTLY_EDITED_CUSTOMER_ID_RESET');

export const deletingCustomer = createAction('CUSTOMER_DELETE');

export const deleteCustomer = ({ customerId, handleClose }) => async (dispatch) => {
  const url = routes.getCustomerUrl(customerId);
  try {
    dispatch(editCustomerRequest());
    const { data } = await axios.delete(url, customerId);
    dispatch(deletingCustomer({ data }));
    handleClose();
    dispatch(editCustomerSuccess());
  } catch (e) {
    dispatch(editCustomerFailure());
    console.error(e);
  }
};

export const editingCustomer = createAction('CUSTOMER_EDIT');

export const editCustomer = ({
  currentlyEditedCustomerId,
  values,
  handleClose,
}) => async (dispatch) => {
  const url = routes.getCustomerUrl(currentlyEditedCustomerId);
  try {
    dispatch(editCustomerRequest());
    const { data } = await axios.put(url, values);
    dispatch(editingCustomer({ data }));
    handleClose();
    dispatch(editCustomerSuccess());
  } catch (e) {
    dispatch(editCustomerFailure());
    console.error(e);
  }
};
