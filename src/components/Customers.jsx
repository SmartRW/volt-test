import React from 'react';
import {
  Container,
  Row,
  Table,
  Button,
  ButtonGroup,
} from 'react-bootstrap';
import connect from '../utils/connect';
import NewCustomerModal from './NewCustomerModal';
import DeleteCustomerModal from './DeleteCustomerModal';

const mapStateToProps = ({
  getCustomersDataStatus,
  customers,
  currentlyEditedCustomerId,
}) => ({
  getCustomersDataStatus,
  customers: Object.values(customers),
  currentlyEditedCustomerId,
});

@connect(mapStateToProps)
class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewCustomerModal: false,
      showDeleteCustomerModal: false,
    };
  }

  handleShowDeleteCustomerModal = id => () => {
    const { setCurrentlyEditedCustomerId } = this.props;
    setCurrentlyEditedCustomerId({ customerId: id });
    this.setState({ showDeleteCustomerModal: true });
  }

  handleCloseDeleteCustomerModal = () => {
    const { resetCurrentlyEditedCustomerId } = this.props;
    resetCurrentlyEditedCustomerId();
    this.setState({ showDeleteCustomerModal: false });
  }

  handleShowEditCustomerModal = id => () => {
    const { setCurrentlyEditedCustomerId } = this.props;
    setCurrentlyEditedCustomerId({ customerId: id });
    this.setState({ showNewCustomerModal: true });
  }

  handleCloseEditCustomerModal = () => {
    const { resetCurrentlyEditedCustomerId } = this.props;
    resetCurrentlyEditedCustomerId();
    this.setState({ showNewCustomerModal: false });
  }

  componentDidMount = () => {
    const { getCustomersData } = this.props;
    getCustomersData();
  }

  deleteCustomer = id => async () => {
    const { deleteCustomer } = this.props;
    await deleteCustomer({ customerId: id, handleClose: this.handleCloseDeleteCustomerModal });
  }

  render = () => {
    const { customers, currentlyEditedCustomerId } = this.props;
    const { showNewCustomerModal, showDeleteCustomerModal } = this.state;

    return (
      <Container>
        <Row>
          <h1 className="h1 mr-auto">Customers list</h1>

          <Button
            onClick={this.handleShowEditCustomerModal(null)}
            variant="light"
          >
            Create new customer
          </Button>

          {showNewCustomerModal && (
            <NewCustomerModal
              onHide={this.handleCloseEditCustomerModal}
              show={showNewCustomerModal}
            />
          )}

          {showDeleteCustomerModal && (
            <DeleteCustomerModal
              onHide={this.handleCloseDeleteCustomerModal}
              show={showDeleteCustomerModal}
              deleteCustomer={this.deleteCustomer(currentlyEditedCustomerId)}
            />
          )}

          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Created</th>
                <th>Last updated</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {customers.map(({
                id,
                name,
                address,
                phone,
                createdAt,
                updatedAt,
              }, idx) => (
                <tr key={id}>
                  <td>{idx + 1}</td>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{phone}</td>
                  <td>{createdAt}</td>
                  <td>{updatedAt}</td>
                  <td>
                    <ButtonGroup>
                      <Button
                        onClick={this.handleShowEditCustomerModal(id)}
                        variant="outline-warning"
                      >
                        <span className="glyphicon glyphicon-pencil" />
                      </Button>
                      <Button
                        onClick={this.handleShowDeleteCustomerModal(id)}
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

export default Customers;
