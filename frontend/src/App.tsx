import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import './App.css';
import { useAppDispatch } from './app/hooks';
import MyNavbar from './components/navbar';
import { getProfileAsync, getToken, selectToken } from './slicers/authSlice';
import { loadCart } from './slicers/cartSlice';

function App() {
  const dispatch = useAppDispatch();
  const myToken = useSelector(selectToken)
  useEffect(() => {
    dispatch(getToken())
    dispatch(loadCart())
  }, [dispatch])

  useEffect(() => {
    if(myToken){
      dispatch(getProfileAsync(myToken))
    }
  }, [dispatch, myToken])
  
  return (
    <div className="App">
      <MyNavbar/>
      <Outlet/>
      </div>
  );
}

export default App;
