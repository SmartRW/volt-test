import React from 'react';
import connect from '../utils/connect';

const mapStateToProps = ({ getCustomersDataStatus }) => ({ getCustomersDataStatus });

@connect(mapStateToProps)
class Customers extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const { getCustomersData } = this.props;
    getCustomersData();
  }

  render = () => (<div>Customers component</div>);
}

export default Customers;
