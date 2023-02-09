import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectLogged, logOutAsync, selectProfile, selectToken, selectRefreshToken } from '../slicers/authSlice';
import { clearCart, selectCart, showCart } from '../slicers/cartSlice';

function MyNavbar() {
  const logged = useAppSelector(selectLogged)
  const cart = useAppSelector(selectCart)
  const myToken = useAppSelector(selectToken)
  const refreshToken = useAppSelector(selectRefreshToken)
  const profile = useAppSelector(selectProfile)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logOutAsync({ myToken, refreshToken }))
    dispatch(clearCart())
  }
  return (
    <Navbar sticky="top" bg="lightgreen" expand="lg" style={{ padding: 0 }}>
      <Container style={{ backgroundColor: 'lightgreen', padding: '0.5rem' }} fluid>
        <Navbar.Brand as={Link} to="/shop">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link as={Link} to="/shop">Home</Nav.Link>
            <Nav.Link as={Link} to="/checkout">Checkout</Nav.Link>
          </Nav>
          <div className='d-flex justify-content-center align-items-center'>
            {logged ?
              <div className="d-flex justify-content-center align-items-center">
                <NavDropdown title={"Welcome, " + (profile.created ? profile.first_name : "no name")} id="navbarScrollingDropdown">
                  <NavDropdown.Item as={Link} to="/profile/view">
                    <Button >Your profile</Button>
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/shop">
                    <Button variant='danger' onClick={() => handleLogout()}>Logout</Button>
                  </NavDropdown.Item>
                </NavDropdown>

              </div>
              :
              <div>
                <Link to="/login"><Button variant="outline-success" className='me-2' >Log in</Button></Link>
                <Link to="/register"><Button variant="outline-success">Sign up</Button></Link>
              </div>}
            <Button onClick={() => dispatch(showCart())} variant='outline-success' className='rounded-circle' style={{ height: '3rem', width: '3rem', marginLeft: '1rem', position: 'relative' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="black">
                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
              </svg>
              {cart.length > 0 && <div className='rounded-circle bg-danger d-flex justify-content-center align-items-center'
                style={{
                  color: 'white',
                  width: '1.25rem',
                  height: '1.25rem',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  transform: 'translate(25%, 25%)',
                  fontSize: '.75rem'
                }}>{cart.length}</div>}
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;