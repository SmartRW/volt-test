import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const getCustomersDataStatus = handleActions({
  [actions.customersDataGettingSuccess]: () => 'success',
  [actions.customersDataGettingPending]: () => 'pending',
  [actions.customersDataGettingFailure]: () => 'failure',
}, '');

const customers = handleActions({
  [actions.updateCustomersData]: (state, { payload: { data } }) => ({
    ...state,
    ...data.reduce((acc, customer) => ({ ...acc, [customer.id]: customer }), {}),
  }),
}, {});

export default combineReducers({
  getCustomersDataStatus,
  customers,
  form: formReducer,
});
