import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const CustomNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" >
      <Navbar.Brand style={{ fontSize: '40px', padding: '10px', paddingLeft: '20px' }} as={Link} to="/">読書記録</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/booklist">本の一覧</Nav.Link>
        <Nav.Link as={Link} to="/bookrecord">本の記録</Nav.Link>
        <Nav.Link as={Link} to="/booksearch">本の検索</Nav.Link>
        <Nav.Link as={Link} to="/folder">フォルダ一覧</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export {CustomNavbar}// export default Navbar;

