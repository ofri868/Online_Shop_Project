import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { MYSERVER } from '../env'
import { Product } from '../models/Product';
import { increaseAmount, decreaseAmount, addToCart, selectCart } from '../slicers/cartSlice'
import { selectSingleProduct } from '../slicers/shopSlice';

const SingleProduct = () => {
    const dispatch = useAppDispatch();
    const selectedProduct = useAppSelector(selectSingleProduct)
    const cart = useAppSelector(selectCart)

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
    return (
        <div>
            <div>
                <div className="col">
                    <div className="card" style={{ marginBottom: "20px" }}>
                        <div className="card-body">
                            <img src={MYSERVER + selectedProduct.image} style={{ height: '100px', width: '100px' }} alt='placeholder.png'></img>
                            <h3 className="card-title">{selectedProduct.desc}</h3>
                            <p className="card-text">Price: {selectedProduct.price}</p>
                            {inCart(selectedProduct) ?
                                <div>In your cart:
                                    <button className='btn btn-success' onClick={() => dispatch(increaseAmount(selectedProduct))}>+</button>
                                    <input style={{ width: '40px' }} type='number' onChange={(e) => handleCart(selectedProduct, Number(e.target.value))} defaultValue='1' />

                                    <button className='btn btn-danger' onClick={() => dispatch(decreaseAmount(selectedProduct))}>-</button>
                                </div>
                                :
                                <button className='btn btn-success' onClick={() => dispatch(addToCart({ selectedProduct, amount: 1 }))}>Add to cart</button>}
                        </div>
                    </div>
                </div>
            </div></div>
    )
}

export default SingleProduct