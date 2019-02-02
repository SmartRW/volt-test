import React from 'react';
import { Modal } from 'react-bootstrap';

const EditItemModal = (props) => {
  const { Form, ...rest } = props;
  const { title, onHide } = props;
  return (
    <Modal
      {...rest}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form handleClose={onHide} />
      </Modal.Body>
    </Modal>
  );
};

export default EditItemModal;
