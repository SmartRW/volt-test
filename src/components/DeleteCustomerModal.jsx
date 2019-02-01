import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteCustomerModal = (props) => {
  const { onHide, deleteCustomer } = props;
  return (
    <Modal
      {...props}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure? This cannot be undone!
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button onClick={deleteCustomer} variant="danger">Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCustomerModal;
