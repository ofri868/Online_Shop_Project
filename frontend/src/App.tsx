import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Cart from './components/Cart';
import MyNavbar from './components/navbar';
import { getToken, loadAuthDetails, loadProfile, selectAuthDetails, selectProfile, selectToken } from './slicers/authSlice';
import { loadCart } from './slicers/cartSlice';
import { selectMessage } from './slicers/shopSlice';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useAppDispatch();
  const myToken = useAppSelector(selectToken)
  const authDetails = useAppSelector(selectAuthDetails)
  const profile = useAppSelector(selectProfile)
  const message = useAppSelector(selectMessage)
  useEffect(() => {
    dispatch(getToken())
  }, [dispatch])
  const notify = ()=>{
    toast.success(message)
  }
  useEffect(() => {
    if (myToken) {
      dispatch(loadProfile())
      dispatch(loadAuthDetails())
      dispatch(loadCart())
    }
  }, [dispatch, myToken])

  useEffect(() => {
    if(message){
      notify()
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
      
    </div>
  );
}

export default App;
