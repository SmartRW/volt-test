import React from 'react';
import {
  Container,
  Row,
  Table,
  Button,
  ButtonGroup,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import connect from '../utils/connect';
import DeleteItemModal from './DeleteItemModal';

const mapStateToProps = ({
  getInvoicesDataStatus,
  invoices,
  customers,
  currentlyEditedInvoiceId,
}) => ({
  getInvoicesDataStatus,
  invoices: Object.values(invoices),
  customers: Object.keys(customers)
    .reduce((acc, id) => ({ ...acc, [id]: customers[id].name }), {}),
  currentlyEditedInvoiceId,
});

@connect(mapStateToProps)
class Invoices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteInvoiceModal: false,
    };
  }

  handleShowDeleteInvoiceModal = id => () => {
    const { setCurrentlyEditedInvoiceId } = this.props;
    setCurrentlyEditedInvoiceId({ invoiceId: id });
    this.setState({ showDeleteInvoiceModal: true });
  }

  handleCloseDeleteInvoiceModal = () => {
    const { resetCurrentlyEditedInvoiceId } = this.props;
    resetCurrentlyEditedInvoiceId();
    this.setState({ showDeleteInvoiceModal: false });
  }

  componentDidMount = () => {
    const { getInvoicesData, getCustomersData } = this.props;
    document.title = 'Invoices';
    getInvoicesData();
    getCustomersData();
  }

  deleteInvoice = id => async () => {
    const { deleteInvoice } = this.props;
    await deleteInvoice({ invoiceId: id, handleClose: this.handleCloseDeleteInvoiceModal });
  }

  render = () => {
    const { invoices, customers, currentlyEditedInvoiceId } = this.props;
    const { showDeleteInvoiceModal } = this.state;

    return (
      <Container>
        <Row>
          <h1 className="h1 mr-auto">Invoices list</h1>

          <LinkContainer to="/invoices/create-invoice">
            <Button variant="light" className="d-flex align-items-center">
              Add new invoice
            </Button>
          </LinkContainer>

          {showDeleteInvoiceModal && (
            <DeleteItemModal
              onHide={this.handleCloseDeleteInvoiceModal}
              show={showDeleteInvoiceModal}
              deleteItem={this.deleteInvoice(currentlyEditedInvoiceId)}
              title="Delete invoice"
            />
          )}

          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Discount</th>
                <th>Total</th>
                <th>Created</th>
                <th>Last updated</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {invoices.map(({
                id,
                customer_id, // eslint-disable-line camelcase
                discount,
                total,
                createdAt,
                updatedAt,
              }, idx) => (
                <tr key={id}>
                  <td>{idx + 1}</td>
                  <td>{customers[customer_id]}</td>
                  <td>{discount}</td>
                  <td>{total}</td>
                  <td>{createdAt}</td>
                  <td>{updatedAt}</td>
                  <td>
                    <ButtonGroup>
                      <Button

                        variant="outline-warning"
                      >
                        <span className="glyphicon glyphicon-pencil" />
                      </Button>
                      <Button
                        onClick={this.handleShowDeleteInvoiceModal(id)}
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

        </Row>
      </Container>
    );
  }
}

export default Invoices;
