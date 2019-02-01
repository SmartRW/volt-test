import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';
import connect from '../utils/connect';

/* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */

const mapStateToProps = ({ customers }) => ({
  customers: Object.values(customers),
});

@connect(mapStateToProps)
@reduxForm({ form: 'editCustomer' })
class CustomerEditForm extends React.Component {
  handleSubmit = async (values) => {
    const { handleClose, addCustomer } = this.props;
    await addCustomer({ values, handleClose });
  }

  render = () => {
    const { handleSubmit } = this.props;
    return (
      <form className="form d-flex flex-column" onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <Field className="form-control" name="name" id="name" component="input" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <Field className="form-control" name="phone" id="phone" component="input" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <Field className="form-control" name="address" id="address" component="input" type="text" />
        </div>
        <Button variant="light" type="submit">Submit</Button>
      </form>
    );
  }
}

export default CustomerEditForm;
