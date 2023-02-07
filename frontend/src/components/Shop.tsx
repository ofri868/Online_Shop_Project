import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectProducts, getProdsAsync, getCategoriesAsync, changeSelectedProduct } from '../slicers/shopSlice';
import { addToCart, decreaseAmount, increaseAmount, selectCart } from '../slicers/cartSlice';
import { MYSERVER } from '../env';
import { Product } from '../models/Product';
import { useNavigate } from 'react-router-dom';

export function Shop() {
  const products = useAppSelector(selectProducts);
  const navigate = useNavigate()
  // const categories = useAppSelector(selectCategories)
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProdsAsync())
    dispatch(getCategoriesAsync())
  }, [dispatch])

  // const amountInCart = (item: Product) => {
  //   for (let i = 0; i < cart.length; i++) {
  //     if (cart[i].product.desc === item.desc) {
  //       return cart[i].amount
  //     }
  //   }
  // }

  const inCart = (item: Product) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product.desc === item.desc) {
        return true
      }
    }
    return false
  }

  const handleCart = (product: Product,amount:number)=>{
    dispatch(addToCart({product, amount}))
  }

  const goToProduct = (product:Product)=>{
    dispatch(changeSelectedProduct(product))
    navigate('/shop/product')
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
                  <button onClick={()=>goToProduct(product)}><img src={MYSERVER + product.image} style={{ height: '100px', width: '100px' }} alt='placeholder.png'></img></button>
                  <h3 className="card-title">{product.desc}</h3>
                  <p className="card-text">Price: {product.price}</p>
                  {inCart(product) ?
                    <div>In cart:
                      <button className='btn btn-success' onClick={() => dispatch(increaseAmount(product))}>+</button>
                      <input style={{width:'40px'}} type='number' onChange={(e)=>handleCart(product,Number(e.target.value))} defaultValue='1'/>
                      
                      <button className='btn btn-danger' onClick={() => dispatch(decreaseAmount(product))}>-</button>
                    </div>
                    :
                    <button className='btn btn-success' onClick={() => dispatch(addToCart({product, amount:1}))}>Add to cart</button>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
