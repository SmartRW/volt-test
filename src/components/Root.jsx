import React from 'react';
import {
  Navbar,
  Nav,
} from 'react-bootstrap';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Customers from './Customers';

const Root = () => (
  <Router>
    <div>
      <Navbar bg="light" expand="lg">
        <Link to="/">
          <Navbar.Brand>
            Invoice App
          </Navbar.Brand>
        </Link>
        <Nav>
          <Link to="/invoices/" className="nav-link" role="button">
            Invoices
          </Link>
          <Link to="/products/" className="nav-link" role="button">
            Products
          </Link>
          <Link to="/customers/" className="nav-link" role="button">
            Customers
          </Link>
        </Nav>
      </Navbar>
      <Route path="/customers/" component={Customers} />
    </div>
  </Router>
);

export default Root;
