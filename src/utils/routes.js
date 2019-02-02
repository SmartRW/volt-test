const host = '/api';

export default {
  getCustomersUrl: () => [host, 'customers'].join('/'),
  getCustomerUrl: customerId => [host, 'customers', customerId].join('/'),
};
