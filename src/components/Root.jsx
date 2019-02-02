import React from 'react';
import {
  Navbar,
  Nav,
  Container,
} from 'react-bootstrap';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Index from './Index';
import Invoices from './Invoices';
import Products from './Products';
import Customers from './Customers';

const Root = () => (
  <Router>
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
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
        </Container>
      </Navbar>
      <Route path="/" exact component={Index} />
      <Route path="/invoices/" exact component={Invoices} />
      <Route path="/customers/" component={Customers} />
      <Route path="/products/" component={Products} />
    </div>
  </Router>
);

export default Root;
