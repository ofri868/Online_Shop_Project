import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CartSvg from '../static/images/cart-svgrepo-com.svg'
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectLogged, logOutAsync, selectProfile, selectToken, selectRefreshToken } from '../slicers/authSlice';
import { clearCart, selectCart } from '../slicers/cartSlice';

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
    <Navbar sticky="top" bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/shop">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link as={Link} to="/shop">Home</Nav.Link>
            <Nav.Link as={Link} to="/checkout">Checkout</Nav.Link>
          </Nav>
          {logged ?
            <div className="d-flex">
              <NavDropdown  title={"Welcome, " + (profile.created ? profile.first_name : "no name")} id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/profile/view">
                 <Button >Your profile</Button>
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/shop">
                  <Button variant='danger' onClick={() => handleLogout()}>Logout</Button>
                </NavDropdown.Item>
              </NavDropdown>
              <div className='showCart'>
                <img className='' style={{ height: '30px', width: '30px', marginLeft: '15px' }} src={CartSvg} alt='cart' />
              </div>
            </div>
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