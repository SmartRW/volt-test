import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import { omit } from 'lodash';
import * as actions from '../actions';

const getCustomersDataStatus = handleActions({
  [actions.customersDataGettingRequest]: () => 'requested',
  [actions.customersDataGettingSuccess]: () => 'succeeded',
  [actions.customersDataGettingFailure]: () => 'failed',
}, '');

const editCustomerStatus = handleActions({
  [actions.editCustomerRequest]: () => 'requested',
  [actions.editCustomerSuccess]: () => 'succeeded',
  [actions.editCustomerFailure]: () => 'failed',
}, '');

const customers = handleActions({
  [actions.updateCustomersData]: (state, { payload: { data } }) => data
    .reduce((acc, customer) => ({ ...acc, [customer.id]: customer }), {}),
  [actions.addingCustomer]: (state, { payload: { data } }) => ({
    ...state,
    [data.id]: data,
  }),
  [actions.deletingCustomer]: (state, { payload: { data } }) => omit(state, data.id),
  [actions.editingCustomer]: (state, { payload: { data } }) => ({
    ...state,
    [data.id]: data,
  }),
}, {});

const currentlyEditedCustomerId = handleActions({
  [actions.setCurrentlyEditedCustomerId]: (state, { payload: { customerId } }) => customerId,
  [actions.resetCurrentlyEditedCustomerId]: () => null,
}, null);

const getProductsDataStatus = handleActions({
  [actions.productsDataGettingRequest]: () => 'requested',
  [actions.productsDataGettingSuccess]: () => 'succeeded',
  [actions.productsDataGettingFailure]: () => 'failed',
}, '');

const products = handleActions({
  [actions.updateProductsData]: (state, { payload: { data } }) => data
    .reduce((acc, product) => ({ ...acc, [product.id]: product }), {}),
  [actions.addingProduct]: (state, { payload: { data } }) => ({
    ...state,
    [data.id]: data,
  }),
  [actions.deletingProduct]: (state, { payload: { data } }) => omit(state, data.id),
  [actions.editingProduct]: (state, { payload: { data } }) => ({
    ...state,
    [data.id]: data,
  }),
}, {});

const currentlyEditedProductId = handleActions({
  [actions.setCurrentlyEditedProductId]: (state, { payload: { productId } }) => productId,
  [actions.resetCurrentlyEditedProductId]: () => null,
}, null);

const getInvoicesDataStatus = handleActions({
  [actions.invoicesDataGettingRequest]: () => 'requested',
  [actions.invoicesDataGettingSuccess]: () => 'succeeded',
  [actions.invoicesDataGettingFailure]: () => 'failed',
}, '');

const invoices = handleActions({
  [actions.updateInvoicesData]: (state, { payload: { data } }) => data
    .reduce((acc, invoice) => ({ ...acc, [invoice.id]: invoice }), {}),
  [actions.addingInvoice]: (state, { payload: { data } }) => ({
    ...state,
    [data.id]: data,
  }),
  [actions.deletingInvoice]: (state, { payload: { data } }) => omit(state, data.id),
  [actions.editingInvoice]: (state, { payload: { data } }) => ({
    ...state,
    [data.id]: data,
  }),
}, {});

const currentlyEditedInvoiceId = handleActions({
  [actions.setCurrentlyEditedInvoiceId]: (state, { payload: { invoiceId } }) => invoiceId,
  [actions.resetCurrentlyEditedInvoiceId]: () => null,
}, null);

const currentInvoice = handleActions({
  [actions.addProductToCurrentInvoice]: (state, { payload: { data } }) => ({
    ...state,
    [data.id]: { ...data, qty: data.qty },
  }),
  [actions.resetCurrentInvoice]: () => ({}),
}, {});

export default combineReducers({
  getCustomersDataStatus,
  editCustomerStatus,
  customers,
  currentlyEditedCustomerId,
  getProductsDataStatus,
  products,
  currentlyEditedProductId,
  getInvoicesDataStatus,
  invoices,
  currentlyEditedInvoiceId,
  currentInvoice,
  form: formReducer,
});
