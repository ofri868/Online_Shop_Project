import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectProducts, getProdsAsync, getCategoriesAsync, selectCategories } from '../slicers/shopSlice';
import { addToCart, decreaseAmount, increaseAmount, selectCart } from '../slicers/cartSlice';
import { MYSERVER } from '../env';
import { Product } from '../models/Product';
import axios from 'axios';
import { selectToken } from '../slicers/authSlice';

export function Shop() {
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories)
  const cart = useAppSelector(selectCart);
  const myToken = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProdsAsync())
    dispatch(getCategoriesAsync())
  }, [dispatch])

  const amountInCart = (item: Product) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product.desc === item.desc) {
        return cart[i].amount
      }
    }
  }

  const inCart = (item: Product) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product.desc === item.desc) {
        return true
      }
    }
    return false
  }


  return (
    <div>
      <h1>Shop</h1>
      <div className="row row-cols-1 row-cols-md-5 g-4">
        {products.map((product, ind) =>
          <div key={ind}>
            <div className="col">
              <div className="card" style={{ marginBottom: "20px" }}>
                <div className="card-body">
                  <img src={MYSERVER + product.image} style={{ height: '100px', width: '100px' }} alt='placeholder.png'></img>
                  <h3 className="card-title">{product.desc}</h3>
                  <p className="card-text">Price: {product.price}</p>
                  {inCart(product) ?
                    <div>In your cart:
                      <button className='btn btn-success' onClick={() => dispatch(increaseAmount(product))}>+</button>
                      {amountInCart(product)}
                      <button className='btn btn-danger' onClick={() => dispatch(decreaseAmount(product))}>-</button>
                    </div>
                    :
                    <button className='btn btn-success' onClick={() => dispatch(addToCart(product))}>Add to cart</button>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
