import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import { Shop } from './components/Shop';
import RegisterScreen from './screens/RegisterScreen';
import ViewProfile from './components/ViewProfile';
import EditProfile from './components/EditProfile';
import SingleProduct from './components/SingleProduct';
import CheckoutScreen from './screens/CheckoutScreen';
import ReviewScreen from './screens/ReviewScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import MyOrders from './components/MyOrders';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/checkout" element={<CheckoutScreen />} />
            <Route path="/shop/product" element={<SingleProduct />} />
            <Route path="/profile" element={<ProfileScreen />}>
              <Route path="/profile/view" element={<ViewProfile />} />
              <Route path="/profile/orders" element={<MyOrders />} />
              <Route path="/profile/edit" element={<EditProfile />} />
            </Route>
            <Route path="/review" element={<ReviewScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
