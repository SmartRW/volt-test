import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';
import RenderSelect from './RenderSelect';
import checkForEmptyString from '../utils/validators';

/* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */

@reduxForm({ form: 'addProduct' })
class AddProductForm extends React.Component {
  render = () => {
    const {
      options,
      onSubmit,
      submitting,
      handleSubmit,
    } = this.props;

    return (
      <form
        className="form d-flex flex-column align-items-start mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-group align-self-stretch">
          <label htmlFor="product">Add product</label>
          <Field
            className="form-control"
            name="product"
            id="product"
            component={RenderSelect}
            options={options}
            disabled={submitting}
            validate={checkForEmptyString}
          />
        </div>
        <Button
          variant="light"
          type="submit"
          disabled={submitting}
        >
        Add product
        </Button>
      </form>
    );
  }
}

export default AddProductForm;
