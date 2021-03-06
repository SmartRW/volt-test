const host = '/api';

export default {
  getCustomersUrl: () => [host, 'customers'].join('/'),
  getCustomerUrl: customerId => [host, 'customers', customerId].join('/'),
  getProductsUrl: () => [host, 'products'].join('/'),
  getProductUrl: productId => [host, 'products', productId].join('/'),
  getInvoicesUrl: () => [host, 'invoices'].join('/'),
  getInvoiceUrl: invoiceId => [host, 'invoices', invoiceId].join('/'),
};
