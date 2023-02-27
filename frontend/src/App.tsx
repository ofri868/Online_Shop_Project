import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Cart from './components/Cart';
import MyNavbar from './components/navbar';
import { getToken, loadAuthDetails, loadProfile, selectAuthMessage, selectToken } from './slicers/authSlice';
import { loadCart, selectCartMessage } from './slicers/cartSlice';
import { getInitDataAsync, selectShopMessage } from './slicers/shopSlice';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';

const App = () => {
  const dispatch = useAppDispatch();
  const myToken = useAppSelector(selectToken)
  const shopMessage = useAppSelector(selectShopMessage)
  const authMessage = useAppSelector(selectAuthMessage)
  const cartMessage = useAppSelector(selectCartMessage)
  const [message, setMessage] = useState('')
  useEffect(() => {
    dispatch(getToken())
    dispatch(getInitDataAsync())
  }, [dispatch])
  
  useEffect(() => {
    if (myToken) {
      dispatch(loadProfile())
      dispatch(loadAuthDetails())
      dispatch(loadCart())
    }
  }, [dispatch, myToken])

  useEffect(() => {
    if(shopMessage){
    setMessage(shopMessage)}
  }, [shopMessage])

  useEffect(() => {
    if(cartMessage){
    setMessage(cartMessage)}
  }, [cartMessage])
  
  useEffect(() => {
    if(authMessage){
    setMessage(authMessage)}
  }, [authMessage])
  
  useEffect(() => {
    const notify = ()=>{
      toast.success(message)
    }
    if(message){
      notify()
      setMessage('')
    }
  }, [message])
  

  return (
    <div className="App">
      <MyNavbar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Cart />
      <Outlet />
      <Footer/>
    </div>
  );
}

export default App;
