import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Button,
  Container,
  Table,
  ButtonGroup,
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import connect from '../utils/connect';
import checkForEmptyString from '../utils/validators';
import AddProductForm from './AddProductForm';
import RenderSelect from './RenderSelect';

/* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */

const mapStateToProps = ({
  invoices,
  currentlyEditedInvoiceId,
  customers,
  products,
}) => ({
  customers: Object.values(customers)
    .map(({ id, name }) => ({ label: name, value: id })),
  products: Object.values(products)
    .map(({ id, name }) => ({ label: name, value: id })),
  initialValues: invoices[currentlyEditedInvoiceId],
  currentlyEditedInvoiceId,
});

@connect(mapStateToProps)
@reduxForm({ form: 'editInvoice', enableReinitialize: true })
class EditInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToInvoicesListAfterSubmit: false,
      productsInCurrentInvoice: [],
    };
  }

  componentDidMount = () => {
    const { getProductsData, getCustomersData } = this.props;
    getCustomersData();
    getProductsData();
  }

  addProductToCurrentInvoice = ({ product }) => {
    const { productsInCurrentInvoice } = this.state;
    this.setState({ productsInCurrentInvoice: [...productsInCurrentInvoice, product] });
  }

  handleSubmit = async (values) => {
    const {
      addInvoice,
      editInvoice,
      currentlyEditedInvoiceId,
    } = this.props;

    if (currentlyEditedInvoiceId) {
      await editInvoice({ currentlyEditedInvoiceId, values });
    } else {
      await addInvoice({ values });
    }
    this.setState({ redirectToInvoicesListAfterSubmit: true });
  }


  render = () => {
    const { redirectToInvoicesListAfterSubmit, productsInCurrentInvoice } = this.state;
    const {
      handleSubmit,
      submitting,
      customers,
      products,
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
            />
          </div>
        </form>
        <AddProductForm onSubmit={this.addProductToCurrentInvoice} options={products} />
        <Button
          form="editInvoice"
          variant="light"
          type="submit"
          disabled={submitting}
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
            {productsInCurrentInvoice.map(({ value, label }, idx) => (
              <tr key={value}>
                <td>{idx + 1}</td>
                <td>{label}</td>
                <td>{value}</td>
                <td>1</td>
                <td>
                  <ButtonGroup>
                    <Button

                      variant="outline-warning"
                    >
                      <span className="glyphicon glyphicon-pencil" />
                    </Button>
                    <Button
                      variant="outline-danger"
                    >
                      <span className="glyphicon glyphicon-remove" />
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default EditInvoice;
