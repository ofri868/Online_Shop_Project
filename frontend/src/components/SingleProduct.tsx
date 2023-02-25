import React, { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { MYSERVER } from '../env'
import { Product } from '../models/Product';
import { increaseAmount, decreaseAmount, addToCart, selectCart } from '../slicers/cartSlice'
import { getReviewsAsync, loadSelectedProduct, selectReviews, selectSingleProduct } from '../slicers/shopSlice';
import '../App.css'
import { Link } from 'react-router-dom';
import { Review } from '../models/Review';

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
  const calcRating = () => {
    let tempSum = 0
    reviews.forEach((review: Review) => {
      tempSum += review.rating
    }
    )
    return (tempSum / reviews.length)
  }

  const handleCart = (product: Product, amount: number) => {
    console.log(product)
    dispatch(addToCart({ product, amount }))
  }
  const element = document.getElementById('top')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <div id='top'>
      <Card>
        <Card.Body>
          <div style={{ width: '900px', margin: 'auto' }}>
            <h3 className="mb-4">{selectedProduct.title}</h3>
            <div className='d-flex justify-content-center mb-3'>
              <img src={MYSERVER + selectedProduct.image} style={{ height: '400px', width: '600px', marginRight: '50px' }} alt='placeholder.png' />
              <div>
                <div className='d-flex justify-content-left mb-3 fs-5'><strong>${selectedProduct.price}</strong></div>
                {/* add to cart */}
                <div className='d-flex justify-content-left mb-5'>
                  {inCart(selectedProduct) ?
                    <div className='d-flex justify-content-center align-items-center'>
                      <div className='me-1'>In your cart:</div>
                      <Button className='d-flex justify-content-center align-items-center cart-button' variant='success' onClick={() => dispatch(increaseAmount(selectedProduct))}>+</Button>
                      <input className='mx-1' style={{ width: '40px' }} type="text" inputMode="numeric" onChange={(e) => handleCart(selectedProduct, Number(e.target.value))} min={0} value={amountInCart(selectedProduct)} />
                      <Button className='d-flex justify-content-center align-items-center cart-button' variant='danger' onClick={() => dispatch(decreaseAmount(selectedProduct))}>-</Button>
                    </div>
                    :
                    <Button variant='success' onClick={() => dispatch(addToCart({product: selectedProduct, amount: 1 }))}>Add to cart</Button>
                  }
                </div>
                {/* Worldwide shipping */}
                <div className='d-flex justify-content-left mb-3'>
                  <div className='me-2'>
                    <svg enableBackground="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width="50px" height='50px'>
                      <path d="m476.158 231.363-13.259-53.035c3.625-.77 6.345-3.986 6.345-7.839v-8.551c0-18.566-15.105-33.67-33.67-33.67h-60.392v-17.638c0-9.136-7.432-16.568-16.568-16.568h-307.842c-9.136 0-16.568 7.432-16.568 16.568v145.37c0 4.427 3.589 8.017 8.017 8.017 4.427 0 8.017-3.589 8.017-8.017v-145.37c0-.295.239-.534.534-.534h307.841c.295 0 .534.239.534.534v145.372c0 4.427 3.589 8.017 8.017 8.017 4.427 0 8.017-3.589 8.017-8.017v-9.088h94.569c.008 0 .014.002.021.002.008 0 .015-.001.022-.001 11.637.008 21.518 7.646 24.912 18.171h-24.928c-4.427 0-8.017 3.589-8.017 8.017v17.102c0 13.851 11.268 25.119 25.119 25.119h9.086v35.273h-20.962c-6.886-19.883-25.787-34.205-47.982-34.205s-41.097 14.322-47.982 34.205h-3.86v-60.393c0-4.427-3.589-8.017-8.017-8.017-4.427 0-8.017 3.589-8.017 8.017v60.391h-166.328c-6.886-19.883-25.787-34.205-47.982-34.205s-41.097 14.322-47.982 34.205h-46.081c-.295 0-.534-.239-.534-.534v-17.637h34.739c4.427 0 8.017-3.589 8.017-8.017s-3.589-8.017-8.017-8.017h-76.96c-4.427 0-8.017 3.589-8.017 8.017s3.589 8.017 8.017 8.017h26.188v17.637c0 9.136 7.432 16.568 16.568 16.568h43.304c-.002.178-.014.355-.014.534 0 27.996 22.777 50.772 50.772 50.772s50.772-22.776 50.772-50.772c0-.18-.012-.356-.014-.534h180.67c-.002.178-.014.355-.014.534 0 27.996 22.777 50.772 50.772 50.772s50.772-22.776 50.772-50.772c0-.18-.012-.356-.014-.534h26.203c4.427 0 8.017-3.589 8.017-8.017v-85.511c.001-21.112-15.576-38.653-35.841-41.738zm-100.976-87.062h60.392c9.725 0 17.637 7.912 17.637 17.637v.534h-78.029zm0 86.58v-52.376h71.235l13.094 52.376zm-230.347 171.023c-19.155 0-34.739-15.583-34.739-34.739s15.584-34.739 34.739-34.739 34.739 15.583 34.739 34.739-15.584 34.739-34.739 34.739zm282.188 0c-19.155 0-34.739-15.583-34.739-34.739s15.584-34.739 34.739-34.739 34.739 15.583 34.739 34.739-15.584 34.739-34.739 34.739zm68.944-102.614h-9.086c-5.01 0-9.086-4.076-9.086-9.086v-9.086h18.171v18.172z"></path>
                      <path d="m144.835 350.597c-9.136 0-16.568 7.432-16.568 16.568s7.432 16.568 16.568 16.568 16.568-7.432 16.568-16.568-7.432-16.568-16.568-16.568z"></path>
                      <path d="m427.023 350.597c-9.136 0-16.568 7.432-16.568 16.568s7.432 16.568 16.568 16.568 16.568-7.432 16.568-16.568-7.432-16.568-16.568-16.568z"></path>
                      <path d="m332.96 316.393h-119.716c-4.427 0-8.017 3.589-8.017 8.017s3.589 8.017 8.017 8.017h119.716c4.427 0 8.017-3.589 8.017-8.017s-3.589-8.017-8.017-8.017z"></path>
                      <path d="m127.733 282.188h-102.614c-4.427 0-8.017 3.589-8.017 8.017s3.589 8.017 8.017 8.017h102.614c4.427 0 8.017-3.589 8.017-8.017s-3.59-8.017-8.017-8.017z"></path>
                      <path d="m278.771 173.37c-3.13-3.13-8.207-3.13-11.337.001l-71.292 71.291-37.087-37.087c-3.131-3.131-8.207-3.131-11.337 0-3.131 3.131-3.131 8.206 0 11.337l42.756 42.756c1.565 1.566 3.617 2.348 5.668 2.348s4.104-.782 5.668-2.348l76.96-76.96c3.131-3.132 3.131-8.207.001-11.338z"></path>
                    </svg>
                  </div>
                  <div>
                    <h5 className='d-flex justify-content-left'>
                      Worldwide Shipping!
                    </h5>
                    <div className='d-flex justify-content-left'>
                      From $9.90
                    </div>
                  </div>
                </div>
                {/* Secure Payment */}
                <div className='d-flex justify-content-left mb-3'>
                  <div className='me-2'>
                    <svg enableBackground="new 0 0 512.001 512.001" viewBox="0 0 512.001 512.001" xmlns="http://www.w3.org/2000/svg" width="50px" height='50px'>
                      <path d="m504 71.231c-.175-3.244-2.419-6.007-5.559-6.843l-240.697-64.135c-1.267-.337-2.599-.337-3.865 0l-240.322 64.136c-3.134.837-5.376 3.593-5.556 6.832-.167 3-3.758 74.526 24.369 164.954 16.531 53.146 40.663 101.67 71.727 144.226 38.858 53.234 88.698 97.185 148.134 130.636 1.141.642 2.409.964 3.678.964 1.208 0 2.417-.292 3.518-.876 59.536-31.624 109.459-74.46 148.38-127.319 31.099-42.237 55.258-90.903 71.806-144.648 28.142-91.403 24.554-164.844 24.387-167.927zm-38.88 164.019c-16.08 52.042-39.491 99.117-69.583 139.92-35.099 47.591-79.482 86.764-132.035 116.593v-38.585c68.129-43.011 119.511-103.897 152.726-181.048 27.349-63.523 36.261-123.823 38.921-163.223.242-3.58-2.085-6.83-5.553-7.753l-15.295-4.075c-4.001-1.066-8.112 1.313-9.179 5.317-1.066 4.002 1.313 8.113 5.317 9.179l9.287 2.475c-3.077 38.196-12.153 93.793-37.277 152.148-31.816 73.903-80.874 132.291-145.855 173.619-6.523-4.313-12.938-8.814-19.119-13.416-3.321-2.474-8.021-1.787-10.496 1.536-2.474 3.322-1.787 8.022 1.536 10.496 6.459 4.81 13.168 9.499 19.984 14v39.085c-52.577-31.452-96.972-71.664-132.082-119.684-30.083-41.145-53.485-88.108-69.557-139.584-23.133-74.096-24.264-136.558-24.024-154.811l225.663-60.224v34.259l-185.988 49.636c-3.476.928-5.804 4.193-5.548 7.782 1.937 27.106 7.389 69.279 22.368 116.268 24.763 77.682 66.353 142.489 123.614 192.622 1.423 1.246 3.184 1.857 4.939 1.857 2.087 0 4.163-.866 5.647-2.56 2.729-3.117 2.414-7.856-.703-10.584-55.176-48.306-95.282-110.849-119.204-185.89-13.438-42.155-18.972-80.313-21.213-106.608l183.413-48.948 142.195 37.889c4.003 1.065 8.113-1.313 9.179-5.317 1.066-4.002-1.313-8.113-5.317-9.179l-138.38-36.873v-34.257l225.661 60.13c.248 18.565-.834 82.7-24.042 157.808z"></path>
                      <path d="m368.849 175.256c-4.443-4.45-10.354-6.899-16.644-6.899-6.291 0-12.202 2.449-16.641 6.895l-95.597 95.593-52.19-52.186c-4.441-4.448-10.353-6.898-16.643-6.898-6.291 0-12.201 2.449-16.639 6.893-4.446 4.445-6.897 10.355-6.897 16.643s2.449 12.197 6.895 16.64l68.829 68.83c4.443 4.448 10.353 6.898 16.644 6.898s12.201-2.449 16.641-6.895l112.236-112.236c4.447-4.443 6.897-10.354 6.897-16.642s-2.449-12.198-6.891-16.636zm-10.612 22.668-112.241 112.241c-1.608 1.61-3.749 2.497-6.03 2.497s-4.422-.887-6.033-2.5l-68.834-68.835c-1.611-1.61-2.499-3.751-2.499-6.031s.888-4.42 2.504-6.037c1.608-1.61 3.75-2.497 6.03-2.497 2.279 0 4.42.887 6.033 2.5l57.497 57.493c2.929 2.929 7.679 2.928 10.607 0l100.905-100.901c1.608-1.61 3.75-2.497 6.03-2.497s4.42.887 6.034 2.502c1.611 1.61 2.499 3.752 2.499 6.031s-.889 4.422-2.502 6.034z"></path>
                    </svg>
                  </div>
                  <div>
                    <h5 className='d-flex justify-content-left'>
                      Secure Payment
                    </h5>
                    <div className='d-flex justify-content-left'>
                      With PayPal
                    </div>
                  </div>
                </div>
                {/* Rating */}
                <div>
                  {reviews[0] ?
                    <div className='d-flex justify-content-left'>
                      <div>
                        <div className='d-flex justify-content-left ms-3' style={{ fontSize: '50px' }}>{reviews[0] ? Math.round(calcRating() * 10) / 10 : ''}</div>
                        <div className='d-flex justify-content-left mb-1' style={{ position: 'relative', whiteSpace: 'nowrap', width: '100px', height: '25px' }}>
                          {[...Array(5)].map((star, ind) =>
                            <div key={ind}>
                              <svg style={{ fill: 'gold' }} viewBox="0 0 576 512" width="20px" height='20px'>
                                <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                              </svg>
                            </div>)}
                          <div className="cover" style={{ width: `${((5 - (Math.round(calcRating() * 10) / 10)) * 20)}px`, }}></div>
                        </div>
                        <div>According to <Link to={'#reviews'}>{reviews.length} reviews</Link></div>
                      </div>
                    </div>
                    :
                    <div className='d-flex justify-content-left'>No reviews yet</div>}
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'left' }}>
              {selectedProduct.desc.split("box.")[0]}box.
              <br/><br/>
              {selectedProduct.desc.split("box.").length > 0 && selectedProduct.desc.split("box.")[1]}

            </div>
          </div>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <h4 className='d-flex justify-content-left'>Ratings and Reviews</h4>
        </Card.Header>
        <Card.Body>
          {reviews.length > 0 ?
            <div>
              {reviews.map((review: Review, ind: number) =>
                <div className='d-flex align-items-top mb-4' key={ind}>
                  <div className='me-2'>
                    <div className='d-flex justify-content-left mb-1' style={{ position: 'relative', whiteSpace: 'nowrap', width: '100px' }}>
                      {[...Array(5)].map((star, ind) =>
                        <div key={ind}>
                          <svg style={{ fill: 'gold' }} viewBox="0 0 576 512" width="20px" height='20px'>
                            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                          </svg>
                        </div>)}
                      <div className="cover" style={{ width: `${((5 - review.rating) * 20)}px`, }}></div>
                    </div>
                    <div className='d-flex justify-content-left'>by&nbsp;<strong>{review.username}</strong></div>
                  </div>
                  <div>
                    <h5 className='d-flex justify-content-left'>{review.title}</h5>
                    <div className='d-flex justify-content-left'>{review.desc}</div>
                  </div>
                </div>
              )}
            </div> : <div className='d-flex justify-content-start'>No review yet</div>}

        </Card.Body>
      </Card>
    </div>
  )
}

export default SingleProduct