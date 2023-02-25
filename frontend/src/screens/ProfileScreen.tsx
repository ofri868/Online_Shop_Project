import React from 'react'
import { Card, Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { selectLogged, selectProfile } from '../slicers/authSlice'

const ProfileScreen = () => {
  const logged = useSelector(selectLogged)
  const profile = useSelector(selectProfile)
  return (
    <div>
      {logged ?
        <div className='mx-3 pt-3'>
          <h2 style={{textAlign:'left'}}>My Profile</h2>
          <hr/>
          <div className='d-flex'>
            <div>
              <Nav defaultActiveKey="home" className="flex-column pe-3" style={{width:'200px'}}>
                <Nav.Link as={Link} to='/profile/view' eventKey="home">My Profile</Nav.Link>
                <hr className='my-1'/>
                <Nav.Link as={Link} to='/profile/view' eventKey="link-1">My Order</Nav.Link>
                <hr className='my-1'/>
                <Nav.Link as={Link} to='/profile/view' eventKey="link-2">Link</Nav.Link>
                <hr className='my-1'/>
              </Nav>
            </div>
            <div style={{width:'100%'}}>
              <Outlet />
            </div>
          </div>
        </div>
        :
        <div>You must be logged in to view your profile<Link to="/login">Log in</Link></div>}
    </div>
  )
}

export default ProfileScreen