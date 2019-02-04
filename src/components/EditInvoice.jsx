import React from 'react';
import Select from 'react-select';
import { Field, reduxForm } from 'redux-form';
import { Button, Container } from 'react-bootstrap';
import connect from '../utils/connect';

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
  componentDidMount = () => {
    const { getProductsData, getCustomersData } = this.props;
    getCustomersData();
    getProductsData();
  }

  handleSubmit = async (values) => {
    const {
      handleClose,
      addInvoice,
      editInvoice,
      currentlyEditedInvoiceId,
    } = this.props;

    if (currentlyEditedInvoiceId) {
      await editInvoice({ currentlyEditedInvoiceId, values, handleClose });
    } else {
      await addInvoice({ values, handleClose });
    }
  }

  render = () => {
    const {
      handleSubmit,
      submitting,
      customers,
      products,
    } = this.props;
    const renderSelect = options => (props) => {
      const { input } = props;
      const { value, onBlur } = input;
      return (
        <Select
          {...input}
          onBlur={() => onBlur(value)}
          options={options}
        />
      );
    };

    return (
      <Container>
        <form className="form d-flex flex-column align-items-start" onSubmit={handleSubmit(this.handleSubmit)}>
          <div className="form-group align-self-stretch">
            <label htmlFor="customer">Customer</label>
            <Field className="form-control" name="customer" id="customer" component={renderSelect(customers)} required disabled={submitting} />
          </div>
          <div className="form-group">
            <label htmlFor="discount">Discount</label>
            <Field className="form-control" name="discount" id="discount" component="input" type="text" required disabled={submitting} />
          </div>
          <div className="form-group align-self-stretch">
            <label htmlFor="product">Add product</label>
            <Field className="form-control" name="product" id="product" component={renderSelect(products)} required disabled={submitting} />
          </div>
          <Button variant="light" type="submit" disabled={submitting}>Submit</Button>
        </form>
      </Container>
    );
  }
}

export default EditInvoice;