import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import MyNavbar from './components/navbar';
import { getProfileAsync, getToken, selectAuthDetails, selectToken } from './slicers/authSlice';
import { clearCart, loadCart } from './slicers/cartSlice';

const App = () => {
  const dispatch = useAppDispatch();
  const myToken = useSelector(selectToken)
  const userAuthDetails = useAppSelector(selectAuthDetails)
  useEffect(() => {
    dispatch(getToken())
  }, [dispatch])

  //   useEffect(() => {
  //     if(myToken){
  //         dispatch(loadCart())
  //     }
  //     else{
  //         dispatch(clearCart())
  //     }
  // }, [dispatch, myToken])

  useEffect(() => {
    if (myToken) {
      dispatch(getProfileAsync(myToken))
      dispatch(loadCart())
    }
    
  }, [dispatch, myToken])

  return (
    <div className="App">
      <MyNavbar />
      <Outlet />
    </div>
  );
}

export default App;
