import React from 'react';
import { Navbar, NavDropdown, Nav} from 'react-bootstrap';

function NavegationBar() {

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Melonn Challenge</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/orders">Order list</Nav.Link>
            <Nav.Link href="/orders/create">Create order</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  export default NavegationBar;
