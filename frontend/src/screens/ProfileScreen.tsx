import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ViewProfile from '../components/ViewProfile'
import { selectLogged, selectProfile } from '../slicers/authSlice'

const ProfileScreen = () => {
    const logged = useSelector(selectLogged)
    const profile = useSelector(selectProfile)
  return (
    <div>
        {logged? <ViewProfile/>: <div>"You must be logged in to view your profile"<Link to="/login">Log in</Link></div>}
    </div>
  )
}

export default ProfileScreen