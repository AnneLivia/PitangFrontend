import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import vaccineIcon from '../../assets/images/vaccine.png';

import { Link } from 'react-router-dom';

const CustomNavbar = ({ children }) => {
  return (
    <Navbar bg='light' expand='lg'>
      <Container fluid>
        <Navbar.Brand>
          <Link to='/'>
            <img
              src={vaccineIcon}
              width={30}
              height={30}
              className='d-inline-block align-top'
              alt='React Bootstrap logo'
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link className='nav-link' to='/'>
              Home
            </Link>
            <Link className='nav-link' to='/appointments'>
              Agendamentos
            </Link>
          </Nav>

          {children}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
