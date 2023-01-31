import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectLogged, logOutAsync, selectProfile } from '../slicers/authSlice';

function MyNavbar() {
  const logged = useAppSelector(selectLogged)
  const profile = useAppSelector(selectProfile)
  const dispatch = useAppDispatch()

  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/shop">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
            {logged ?
            <div>Welcome, {profile.created ? profile.firstName:"no name"} <Link to="/profile/view"><Button variant="outline-success" >Your profile</Button></Link> <Button onClick={()=> dispatch(logOutAsync())}>Logout</Button></div>
            :
            <div>
              <Link to="/login"><Button variant="outline-success" >Log in</Button></Link>
              <Link to="/register"><Button variant="outline-success">Sign up</Button></Link>
            </div>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;