import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteItemModal = (props) => {
  const {
    title,
    onHide,
    deleteItem,
    ...rest
  } = props;
  return (
    <Modal
      {...rest}
      onHide={onHide}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure? This cannot be undone!
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button onClick={deleteItem} variant="danger">Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteItemModal;
