import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { MYSERVER } from '../env';
import { Product } from '../models/Product';
import { selectLogged, logOutAsync, selectProfile, selectToken, selectRefreshToken, selectAuthDetails } from '../slicers/authSlice';
import { clearCart, selectCart, showCart } from '../slicers/cartSlice';
import { searchProducts, selectProducts } from '../slicers/shopSlice';

function MyNavbar() {
  const logged = useAppSelector(selectLogged)
  const cart = useAppSelector(selectCart)
  const myToken = useAppSelector(selectToken)
  const refreshToken = useAppSelector(selectRefreshToken)
  const profile = useAppSelector(selectProfile)
  const authDetails = useAppSelector(selectAuthDetails)
  const products = useAppSelector(selectProducts)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const handleLogout = () => {
    dispatch(logOutAsync({ myToken, refreshToken }))
    dispatch(clearCart())
  }
  const handleSearch = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    let searchedProducts: Product[] = []
    products.forEach(
      (prod:Product) => {
        if (prod.desc.toLowerCase().includes(search.toLowerCase())) {
          searchedProducts.push(prod)
        }
      }
    )
    dispatch(searchProducts(searchedProducts))
    navigate('/shop')
  }
  return (
    <Navbar sticky="top" bg="lightgreen" expand="lg" style={{ padding: 0 }}>
      <Container style={{ backgroundColor: 'lightgreen', padding: '0.5rem' }} fluid>
        <Navbar.Brand as={Link} to="/">Ofri's Model Cars</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="align-items-center me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
            <Nav.Link as={Link} to="/checkout">Checkout</Nav.Link>
            <Nav>
              <Form onSubmit={handleSearch} className="d-flex">
                <div className='d-flex'>
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button className='rounded-circle search-button' style={{ height: '50px', width: '50px', position: 'absolute', left: '475px', top: '7px' }} onClick={handleSearch} variant='transparent'><SearchIcon /></Button>
                </div>
              </Form>
            </Nav>
          </Nav>
          <div className='d-flex'>
            {logged ?
              <div className="d-flex justify-content-center align-items-center">
                <NavDropdown title={"Welcome, " + (profile.created ? profile.first_name : authDetails.username)} id="navbarScrollingDropdown">
                  <NavDropdown.Item as={Link} to="/profile/view">
                    <div className="d-flex justify-content-center align-items-center"><img style={{ width: '5rem', height: '7rem', marginBottom: '0.5rem' }} src={MYSERVER + profile.image} alt='placeholder.png' /></div>
                    <div className="d-flex justify-content-center align-items-center" style={{ marginBottom: '0.5rem' }}>{profile.first_name} {profile.last_name}</div>
                    <div className="d-flex justify-content-center align-items-center">Your profile</div>
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/shop">
                    <div className="d-flex justify-content-center align-items-center" style={{ margin: 'auto' }}>
                      <Button variant='danger' onClick={() => handleLogout()}>Logout</Button>
                    </div>
                  </NavDropdown.Item>
                </NavDropdown>
                {authDetails.isAdmin && <Nav.Link className='ms-2' href={MYSERVER + 'admin/'}>Go to admin site</Nav.Link>}
              </div>
              :
              <div>
                <Link to="/login"><Button variant="outline-success" className='me-2' >Log in</Button></Link>
                <Link to="/register"><Button variant="outline-success">Sign up</Button></Link>
              </div>}
            <Button onClick={() => dispatch(showCart())} variant='outline-success' className='rounded-circle' style={{ height: '3rem', width: '3rem', marginLeft: '10px', position: 'relative' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="black">
                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
              </svg>
              {cart.length > 0 &&
                <div className='rounded-circle bg-danger d-flex justify-content-center align-items-center'
                  style={{
                    color: 'white',
                    width: '1.25rem',
                    height: '1.25rem',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    transform: 'translate(25%, 25%)',
                    fontSize: '.75rem'
                  }}>{cart.length}
                </div>
              }
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;