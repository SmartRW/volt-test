import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Button,
  Container,
  Table,
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import connect from '../utils/connect';
import checkForEmptyString from '../utils/validators';
import AddProductForm from './AddProductForm';
import RenderSelect from './RenderSelect';
import calculateTotal from '../utils/calculateTotal';

/* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */

const mapStateToProps = ({
  invoices,
  currentlyEditedInvoiceId,
  customers,
  products,
  currentInvoice,
  currentInvoiceProducts,
}) => ({
  customers: Object.values(customers)
    .map(({ id, name }) => ({ label: name, value: id })),
  productsForSelect: Object.values(products)
    .map(({ id, name }) => ({ label: name, value: id })),
  currentInvoiceProducts: Object.values(currentInvoiceProducts)
    .map(({ id, qty }) => ({
      id, qty, price: products[id].price, name: products[id].name,
    })),
  currentInvoice,
  initialValues: {
    ...Object.keys(products)
      .reduce((acc, id) => ({ ...acc, [`product-${id}`]: 1 }), {}),
    ...invoices[currentlyEditedInvoiceId],
  },
  currentlyEditedInvoiceId,
});

@connect(mapStateToProps)
@reduxForm({ form: 'editInvoice', enableReinitialize: true })
class EditInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToInvoicesListAfterSubmit: false,
    };
  }

  componentDidMount = () => {
    const { getProductsData, getCustomersData } = this.props;
    getCustomersData();
    getProductsData();
  }

  addProductToCurrentInvoice = ({ product: { value } }) => {
    const { addProductToCurrentInvoice } = this.props;
    const data = { id: value, qty: 1 };
    addProductToCurrentInvoice({ data });
  }

  changeDiscount = ({ target }) => {
    const { changeDiscount } = this.props;
    changeDiscount({ discount: target.value });
  };

  removeProduct = id => () => {
    const { removeProductFromCurrentInvoice } = this.props;
    const data = { id };
    removeProductFromCurrentInvoice({ data });
  }

  changeProductQty = id => ({ target }) => {
    const { changeProductQty } = this.props;
    changeProductQty({ id, qty: target.value });
  }

  handleSubmit = async (values) => {
    const {
      addInvoice,
      editInvoice,
      currentlyEditedInvoiceId,
      resetCurrentInvoice,
      resetCurrentInvoiceProducts,
    } = this.props;

    if (currentlyEditedInvoiceId) {
      await editInvoice({ currentlyEditedInvoiceId, values });
    } else {
      await addInvoice({ values });
    }
    resetCurrentInvoice();
    resetCurrentInvoiceProducts();
    this.setState({ redirectToInvoicesListAfterSubmit: true });
  }


  render = () => {
    const { redirectToInvoicesListAfterSubmit } = this.state;
    const {
      handleSubmit,
      submitting,
      customers,
      productsForSelect,
      currentInvoice,
      currentInvoiceProducts,
    } = this.props;

    return (
      <Container>
        <form
          id="editInvoice"
          className="form d-flex flex-column align-items-start"
          onSubmit={handleSubmit(this.handleSubmit)}
        >
          <div className="form-group align-self-stretch">
            <label htmlFor="customer">Customer</label>
            <Field
              className="form-control"
              name="customer"
              id="customer"
              component={RenderSelect}
              options={customers}
              disabled={submitting}
              validate={[checkForEmptyString]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="discount">Discount</label>
            <Field
              className="form-control"
              name="discount"
              id="discount"
              component="input"
              type="number"
              required
              disabled={submitting}
              onChange={this.changeDiscount}
              min="0"
              max="100"
            />
          </div>
        </form>
        <AddProductForm onSubmit={this.addProductToCurrentInvoice} options={productsForSelect} />
        <Button
          form="editInvoice"
          variant="light"
          type="submit"
          disabled={submitting || currentInvoiceProducts.length === 0}
        >
          Save invoice
        </Button>

        {redirectToInvoicesListAfterSubmit && <Redirect to="/invoices" />}
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {currentInvoiceProducts.map(({
              id, price, name,
            }, idx) => (
              <tr key={id}>
                <td>{idx + 1}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td>
                  <Field
                    name={`product-${id}`}
                    component="input"
                    type="number"
                    min="1"
                    max="100"
                    onChange={this.changeProductQty(id)}
                  />
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={this.removeProduct(id)}
                  >
                    <span className="glyphicon glyphicon-remove" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="display-4">
          Total:
          {calculateTotal(currentInvoiceProducts, currentInvoice.discount)}
        </div>
      </Container>
    );
  }
}

export default EditInvoice;
