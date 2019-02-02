import React from 'react';
import {
  Container,
  Row,
  Table,
  Button,
  ButtonGroup,
} from 'react-bootstrap';
import connect from '../utils/connect';
import EditItemModal from './EditItemModal';
import DeleteItemModal from './DeleteItemModal';
import ProductEditForm from './ProductEditForm';

const mapStateToProps = ({
  getProductsDataStatus,
  products,
  currentlyEditedProductId,
}) => ({
  getProductsDataStatus,
  products: Object.values(products),
  currentlyEditedProductId,
});

@connect(mapStateToProps)
class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditProductModal: false,
      showDeleteProductModal: false,
    };
  }

  handleShowDeleteProductModal = id => () => {
    const { setCurrentlyEditedProductId } = this.props;
    setCurrentlyEditedProductId({ productId: id });
    this.setState({ showDeleteProductModal: true });
  }

  handleCloseDeleteProductModal = () => {
    const { resetCurrentlyEditedProductId } = this.props;
    resetCurrentlyEditedProductId();
    this.setState({ showDeleteProductModal: false });
  }

  handleShowEditProductModal = id => () => {
    const { setCurrentlyEditedProductId } = this.props;
    setCurrentlyEditedProductId({ productId: id });
    this.setState({ showEditProductModal: true });
  }

  handleCloseEditProductModal = () => {
    const { resetCurrentlyEditedProductId } = this.props;
    resetCurrentlyEditedProductId();
    this.setState({ showEditProductModal: false });
  }

  componentDidMount = () => {
    const { getProductsData } = this.props;
    getProductsData();
  }

  deleteProduct = id => async () => {
    const { deleteProduct } = this.props;
    await deleteProduct({ productId: id, handleClose: this.handleCloseDeleteProductModal });
  }

  render = () => {
    const { products, currentlyEditedProductId } = this.props;
    const { showEditProductModal, showDeleteProductModal } = this.state;

    return (
      <Container>
        <Row>
          <h1 className="h1 mr-auto">Products list</h1>

          <Button
            onClick={this.handleShowEditProductModal(null)}
            variant="light"
          >
            Add new product
          </Button>

          {showEditProductModal && (
            <EditItemModal
              onHide={this.handleCloseEditProductModal}
              show={showEditProductModal}
              title={currentlyEditedProductId ? 'Edit product' : 'Add new product'}
              Form={ProductEditForm}
            />
          )}

          {showDeleteProductModal && (
            <DeleteItemModal
              onHide={this.handleCloseDeleteProductModal}
              show={showDeleteProductModal}
              deleteItem={this.deleteProduct(currentlyEditedProductId)}
              title="Delete product"
            />
          )}

          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Created</th>
                <th>Last updated</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {products.map(({
                id,
                name,
                price,
                createdAt,
                updatedAt,
              }, idx) => (
                <tr key={id}>
                  <td>{idx + 1}</td>
                  <td>{name}</td>
                  <td>{price}</td>
                  <td>{createdAt}</td>
                  <td>{updatedAt}</td>
                  <td>
                    <ButtonGroup>
                      <Button
                        onClick={this.handleShowEditProductModal(id)}
                        variant="outline-warning"
                      >
                        <span className="glyphicon glyphicon-pencil" />
                      </Button>
                      <Button
                        onClick={this.handleShowDeleteProductModal(id)}
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
