import React from 'react';
import { Modal } from 'react-bootstrap';
import CustomerEditForm from './CustomerEditForm';

const NewCustomerModal = (props) => {
  const { onHide } = props;
  return (
    <Modal
      {...props}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>New customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustomerEditForm handleClose={onHide} />
      </Modal.Body>
    </Modal>
  );
};

export default NewCustomerModal;
