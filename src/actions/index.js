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

export const editCustomerRequest = createAction('CUSTOMER_EDIT_REQUEST');
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

export const updateProductsData = createAction('PRODUCTS_DATA_UPDATE');

export const productsDataGettingSuccess = createAction('GET_PRODUCTS_DATA_SUCCESS');

export const productsDataGettingRequest = createAction('GET_PRODUCTS_DATA_REQUEST');

export const productsDataGettingFailure = createAction('GET_PRODUCTS_DATA_FAILURE');

export const getProductsData = () => async (dispatch) => {
  const url = routes.getProductsUrl();
  try {
    dispatch(productsDataGettingRequest());
    const { data } = await axios.get(url);
    dispatch(updateProductsData({ data }));
    dispatch(productsDataGettingSuccess());
  } catch (e) {
    dispatch(productsDataGettingFailure());
    console.error(e);
  }
};

export const editProductRequest = createAction('PRODUCT_EDIT_REQUEST');
export const editProductSuccess = createAction('PRODUCT_EDIT_SUCCESS');
export const editProductFailure = createAction('PRODUCT_EDIT_FAILURE');

export const addingProduct = createAction('PRODUCT_ADD');

export const addProduct = ({ values, handleClose }) => async (dispatch) => {
  const url = routes.getProductsUrl();
  try {
    dispatch(editProductRequest());
    const { data } = await axios.post(url, values);
    dispatch(addingProduct({ data }));
    handleClose();
    dispatch(editProductSuccess());
  } catch (e) {
    dispatch(editProductFailure());
    console.error(e);
  }
};

export const setCurrentlyEditedProductId = createAction('CURRENTLY_EDITED_PRODUCT_ID_SET');
export const resetCurrentlyEditedProductId = createAction('CURRENTLY_EDITED_PRODUCT_ID_RESET');

export const deletingProduct = createAction('PRODUCT_DELETE');

export const deleteProduct = ({ productId, handleClose }) => async (dispatch) => {
  const url = routes.getProductUrl(productId);
  try {
    dispatch(editProductRequest());
    const { data } = await axios.delete(url, productId);
    dispatch(deletingProduct({ data }));
    handleClose();
    dispatch(editProductSuccess());
  } catch (e) {
    dispatch(editProductFailure());
    console.error(e);
  }
};

export const editingProduct = createAction('PRODUCT_EDIT');

export const editProduct = ({
  currentlyEditedProductId,
  values,
  handleClose,
}) => async (dispatch) => {
  const url = routes.getProductUrl(currentlyEditedProductId);
  try {
    dispatch(editProductRequest());
    const { data } = await axios.put(url, values);
    dispatch(editingProduct({ data }));
    handleClose();
    dispatch(editProductSuccess());
  } catch (e) {
    dispatch(editProductFailure());
    console.error(e);
  }
};

export const updateInvoicesData = createAction('INVOICES_DATA_UPDATE');

export const invoicesDataGettingSuccess = createAction('GET_INVOICES_DATA_SUCCESS');

export const invoicesDataGettingRequest = createAction('GET_INVOICES_DATA_REQUEST');

export const invoicesDataGettingFailure = createAction('GET_INVOICES_DATA_FAILURE');

export const getInvoicesData = () => async (dispatch) => {
  const url = routes.getInvoicesUrl();
  try {
    dispatch(invoicesDataGettingRequest());
    const { data } = await axios.get(url);
    dispatch(updateInvoicesData({ data }));
    dispatch(invoicesDataGettingSuccess());
  } catch (e) {
    dispatch(invoicesDataGettingFailure());
    console.error(e);
  }
};

export const editInvoiceRequest = createAction('INVOICE_EDIT_REQUEST');
export const editInvoiceSuccess = createAction('INVOICE_EDIT_SUCCESS');
export const editInvoiceFailure = createAction('INVOICE_EDIT_FAILURE');

export const addingInvoice = createAction('INVOICE_ADD');

export const addInvoice = ({ customer, discount, total }) => async (dispatch) => {
  const url = routes.getInvoicesUrl();
  const normalizedValues = { customer_id: customer.value, discount, total };
  try {
    dispatch(editInvoiceRequest());
    const { data } = await axios.post(url, normalizedValues);
    dispatch(addingInvoice({ data }));
    dispatch(editInvoiceSuccess());
  } catch (e) {
    dispatch(editInvoiceFailure());
    console.error(e);
  }
};

export const setCurrentlyEditedInvoiceId = createAction('CURRENTLY_EDITED_INVOICE_ID_SET');
export const resetCurrentlyEditedInvoiceId = createAction('CURRENTLY_EDITED_INVOICE_ID_RESET');

export const deletingInvoice = createAction('INVOICE_DELETE');

export const deleteInvoice = ({ invoiceId, handleClose }) => async (dispatch) => {
  const url = routes.getInvoiceUrl(invoiceId);
  try {
    dispatch(editInvoiceRequest());
    const { data } = await axios.delete(url, invoiceId);
    dispatch(deletingInvoice({ data }));
    handleClose();
    dispatch(editInvoiceSuccess());
  } catch (e) {
    dispatch(editInvoiceFailure());
    console.error(e);
  }
};

export const editingInvoice = createAction('INVOICE_EDIT');

export const editInvoice = ({
  currentlyEditedInvoiceId,
  values,
  handleClose,
}) => async (dispatch) => {
  const url = routes.getInvoiceUrl(currentlyEditedInvoiceId);
  try {
    dispatch(editInvoiceRequest());
    const { data } = await axios.put(url, values);
    dispatch(editingInvoice({ data }));
    handleClose();
    dispatch(editInvoiceSuccess());
  } catch (e) {
    dispatch(editInvoiceFailure());
    console.error(e);
  }
};

export const addProductToCurrentInvoice = createAction('CURRENT_INVOICE_PRODUCT_ADD');
export const resetCurrentInvoiceProducts = createAction('CURRENT_INVOICE_PRODUCTS_RESET');
export const removeProductFromCurrentInvoice = createAction('CURRENT_INVOICE_PRODUCT_REMOVE');

export const changeDiscount = createAction('DISCOUNT_CHANGE');
export const resetCurrentInvoice = createAction('CURRENT_INVOICE_RESET');

export const changeProductQty = createAction('PRODUCT_QTY_CHANGE');
