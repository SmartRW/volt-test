import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
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
  [actions.updateCustomersData]: (state, { payload: { data } }) => ({
    ...state,
    ...data.reduce((acc, customer) => ({ ...acc, [customer.id]: customer }), {}),
  }),
  [actions.addingCustomer]: (state, { payload: { data } }) => ({
    ...state,
    [data.id]: data,
  }),
}, {});

export default combineReducers({
  getCustomersDataStatus,
  editCustomerStatus,
  customers,
  form: formReducer,
});
