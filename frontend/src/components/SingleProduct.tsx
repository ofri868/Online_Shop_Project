import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { MYSERVER } from '../env'
import { Product } from '../models/Product';
import { increaseAmount, decreaseAmount, addToCart, selectCart } from '../slicers/cartSlice'
import { getReviewsAsync, loadSelectedProduct, selectReviews, selectSingleProduct } from '../slicers/shopSlice';
import '../App.css'

const SingleProduct = () => {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(selectSingleProduct)
  const cart = useAppSelector(selectCart)
  const reviews = useAppSelector(selectReviews)

  useEffect(() => {
    dispatch(loadSelectedProduct())
  }, [dispatch])

  useEffect(() => {
    if (selectedProduct.id !== -1) {
      dispatch(getReviewsAsync(selectedProduct.id || -1))
    }
  }, [dispatch, selectedProduct])


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

  const handleCart = (product: Product, amount: number) => {
    dispatch(addToCart({ product, amount }))
  }
  return (
    <div>
      <Card style={{ width: '60%', margin: 'auto' }}>
        <Card.Body>
          <img src={MYSERVER + selectedProduct.image} style={{ height: '100px', width: '100px' }} alt='placeholder.png' />
          <h3 className="card-title">{selectedProduct.desc}</h3>
          <p className="card-text">Price: {selectedProduct.price}</p>
          {inCart(selectedProduct) ?
            <div>In your cart:
              <button className='btn btn-success' onClick={() => dispatch(increaseAmount(selectedProduct))}>+</button>
              <input style={{ width: '40px' }} type='number' onChange={(e) => handleCart(selectedProduct, Number(e.target.value))} min={0} value={amountInCart(selectedProduct)} />

              <button className='btn btn-danger' onClick={() => dispatch(decreaseAmount(selectedProduct))}>-</button>
            </div>
            :
            <button className='btn btn-success' onClick={() => dispatch(addToCart({ selectedProduct, amount: 1 }))}>Add to cart</button>}
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <h4 className='d-flex justify-content-left'>Ratings and Reviews</h4>
        </Card.Header>
        <Card.Body>
          {reviews.map((review, ind) =>
            <div key={ind}>
              {review.username}
              {review.title}
              {review.desc}
              <div className='d-flex justify-content-left' style={{ position: 'relative', whiteSpace: 'nowrap', width: '8%' }}>
                {[...Array(5)].map((star, ind) =>
                  <div key={ind}>
                    <svg style={{ fill: 'gold' }} viewBox="0 0 576 512" width="20px" height='20px'>
                      <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                    </svg>
                  </div>)}
                <div className="cover" style={{ width: `${((5-review.rating)*20)}%` }}></div>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

export default SingleProduct