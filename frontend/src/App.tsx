import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Cart from './components/Cart';
import MyNavbar from './components/navbar';
import { getToken, loadAuthDetails, loadProfile, selectToken } from './slicers/authSlice';
import { loadCart } from './slicers/cartSlice';
import { getBrandsAsync, getInitDataAsync, getProdsAsync, getScalesAsync, selectMessage } from './slicers/shopSlice';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';

const App = () => {
  const dispatch = useAppDispatch();
  const myToken = useAppSelector(selectToken)
  const message = useAppSelector(selectMessage)
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
    const notify = ()=>{
      toast.success(message)
    }
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
      <Footer/>
    </div>
  );
}

export default App;
