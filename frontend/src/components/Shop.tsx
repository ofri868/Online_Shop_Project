import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectProducts, getProdsAsync, getBrandsAsync, changeSelectedProduct } from '../slicers/shopSlice';
import { addToCart, decreaseAmount, increaseAmount, selectCart } from '../slicers/cartSlice';
import { MYSERVER } from '../env';
import { Product } from '../models/Product';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

export function Shop() {
  const products = useAppSelector(selectProducts);
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1)
  const [shownProducts, setShownProducts] = useState<Product[]>([])
  useEffect(() => {
    dispatch(getProdsAsync())
    dispatch(getBrandsAsync())
  }, [dispatch])

  useEffect(() => {

    if (products.length > 0) {
      setShownProducts(products.slice(0, 8))
      console.log(shownProducts)
    }
  }, [products])

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

  const movePage = (page: number) => {
    let temp: Product[] = []
    setPage(page)
    console.log(page)
    if (products.length > 0) {
      if ((products.length - ((page - 1) * 8)) < 8) {
        temp = products.slice((page - 1) * 8)
        setShownProducts(temp)
      }
      else {
        temp = products.slice((page - 1) * 8, 8)
        setShownProducts(temp)
      }

    }

  }

  return (
    <div>
      <h1>Shop</h1>
      <div className="row row-cols-1 row-cols-md-4 g-4 mx-2">
        {shownProducts.map((product: Product, ind: number) =>
          <div key={ind}>
            <div className="col">
              <Card style={{ height: '320px', marginBottom: "20px" }}>
                <Card.Body>
                  <Link to={'/shop/product'} onClick={() => dispatch(changeSelectedProduct(product))}><img src={MYSERVER + product.image} style={{ height: '100px', width: '150px', marginBottom: '20px' }} alt='placeholder.png'></img></Link>
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">Price: ${product.price}</p>
                </Card.Body>
                <Card.Footer>
                  <div className='d-flex justify-content-center'>
                    {inCart(product) ?
                      <div className='d-flex justify-content-center align-items-center'>In cart:
                        <Button className='d-flex justify-content-center align-items-center' style={{ width: '25px', height: '25px', paddingTop: '4px' }} variant='success' onClick={() => dispatch(increaseAmount(product))}>+</Button>
                        <input style={{ width: '40px' }} type='number' onChange={(e) => handleCart(product, Number(e.target.value))} min={0} value={amountInCart(product)} />
                        <Button className='d-flex justify-content-center align-items-center' style={{ width: '25px', height: '25px', paddingTop: '4px' }} variant='danger' onClick={() => dispatch(decreaseAmount(product))}>-</Button>
                      </div>
                      :
                      <Button variant='success' onClick={() => dispatch(addToCart({ product, amount: 1 }))}>Add to cart</Button>}
                  </div>
                </Card.Footer>
              </Card>
            </div>
          </div>
        )}
      </div>
      <div className='d-flex justify-content-center align-items'>
        <Button className='d-flex justify-content-center align-items-center' style={{ width: '25px', height: '25px', paddingTop: '4px' }} onClick={() => movePage(page - 1)}>{'<'}</Button>
        <span>page {page} out of {Math.ceil(products.length / 8)}</span>
        <Button className='d-flex justify-content-center align-items-center' style={{ width: '25px', height: '25px', paddingTop: '4px' }} onClick={() => movePage(page + 1)}>{'>'}</Button>
      </div>
    </div>
  );
}
