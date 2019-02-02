import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';
import connect from '../utils/connect';

/* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */

const mapStateToProps = ({
  products,
  currentlyEditedProductId,
}) => ({
  products: Object.values(products),
  initialValues: products[currentlyEditedProductId],
  currentlyEditedProductId,
});

@connect(mapStateToProps)
@reduxForm({ form: 'editProduct', enableReinitialize: true })
class ProductEditForm extends React.Component {
  handleSubmit = async (values) => {
    const {
      handleClose,
      addProduct,
      editProduct,
      currentlyEditedProductId,
    } = this.props;

    if (currentlyEditedProductId) {
      await editProduct({ currentlyEditedProductId, values, handleClose });
    } else {
      await addProduct({ values, handleClose });
    }
  }

  render = () => {
    const { handleSubmit, submitting } = this.props;
    return (
      <form className="form d-flex flex-column" onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <Field className="form-control" name="name" id="name" component="input" type="text" required disabled={submitting} />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <Field className="form-control" name="price" id="price" component="input" type="text" required disabled={submitting} />
        </div>
        <Button variant="light" type="submit" disabled={submitting}>Submit</Button>
      </form>
    );
  }
}

export default ProductEditForm;
