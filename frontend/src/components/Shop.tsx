import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectProducts, changeSelectedProduct, selectBrands, selectScales, searchProducts, selectSearchedProducts } from '../slicers/shopSlice';
import { addToCart, decreaseAmount, increaseAmount, selectCart } from '../slicers/cartSlice';
import { MYSERVER } from '../env';
import { Product } from '../models/Product';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

export function Shop() {
  const products = useAppSelector(selectProducts);
  const searchedProducts = useAppSelector(selectSearchedProducts)
  const brands = useAppSelector(selectBrands);
  const scales = useAppSelector(selectScales);
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [shownProducts, setShownProducts] = useState<Product[]>([])

  useEffect(() => {
    if (products.length > 0) {
      dispatch(searchProducts(products))
    }
  }, [dispatch, products])

  useEffect(() => {
    if (searchedProducts.length > 0) {
      setShownProducts(searchedProducts.slice(0,8))
    }
  }, [dispatch, searchedProducts])

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
    if (products.length > 0) {
      if ((products.length - ((page - 1) * 8)) < 8) {
        temp = products.slice((page - 1) * 8)
      }
      else {
        temp = products.slice((page - 1) * 8, 8)
      }
      setShownProducts(temp)
      navigate('#shop')
    }
  }

  const handleSort=(sort:string)=>{
    let temp: Product[]=[...searchedProducts]
    if(sort === 'default'){
      temp.sort(
        (prod1,prod2)=> (prod1.id &&prod2.id) &&(prod1.id < prod2.id) ? -1 :1
      )
    }
    if(sort === 'ascending'){
      temp.sort(
        (prod1,prod2)=> (prod1.price < prod2.price) ? -1 :1
      )
    }
    if(sort === 'descending'){
      temp.sort(
        (prod1,prod2)=> (prod1.price < prod2.price) ? 1 :-1
      )
    }
    dispatch(searchProducts(temp))
  }

  return (
    <div>
      <h1 id='shop' className='mb-3'>Shop</h1>
      <div className='d-flex justify-content-end align-items-center me-4 mb-3'>
        <div>{`Showing ${page+((page-1)*8)}-${page === Math.ceil(searchedProducts.length / 8)? searchedProducts.length : page*8} of ${searchedProducts.length} results`}</div>
        <div className='ms-2'>
          
          <select onChange={(e)=>handleSort(e.target.value)}>
            <option value='default'>Sort by Default</option>
            <option value='ascending'>Sort by Price: low to high</option>
            <option value='descending'>Sort by Price: high to low</option>
          </select>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-4 g-4 mx-2">
        {shownProducts.map((product: Product, ind: number) =>
          <div key={ind}>
            <div className="col">
              <Card style={{ height: '340px', marginBottom: "20px" }}>
                <Card.Body>
                  <Link to={'/shop/product'} onClick={() => dispatch(changeSelectedProduct(product))}><img src={MYSERVER + product.image} style={{ height: '100px', width: '140px', marginBottom: '20px' }} alt='placeholder.png'></img></Link>
                  <div>{scales[product.scale - 1].desc + ' • ' + brands[product.brand - 1].desc}</div>
                  <h5 className="card-title">{product.title}</h5>
                  <div className="card-text">Price: ${product.price}</div>
                </Card.Body>
                <Card.Footer style={{height:'55px'}}>
                  <div className='d-flex justify-content-center'>
                    {inCart(product) ?
                      <div className='d-flex justify-content-center align-items-center'>
                        <div className='me-1'>In cart:</div>
                        <Button className='d-flex justify-content-center align-items-center' style={{ width: '25px', height: '25px', paddingTop: '4px' }} variant='success' onClick={() => dispatch(increaseAmount(product))}>+</Button>
                        <input style={{ width: '40px' }} type="text" inputMode="numeric" onChange={(e) => handleCart(product, Number(e.target.value))} min={0} value={amountInCart(product)} />
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
        <Button disabled={page === 1} href='#shop' className='d-flex justify-content-center align-items-center' style={{ width: '25px', height: '25px', paddingTop: '4px' }} onClick={() => movePage(page - 1)}>{'<'}</Button>
        <span>page {page} out of {Math.ceil(products.length / 8)}</span>
        <Button disabled={page >= Math.ceil(products.length / 8)} href='#shop' className='d-flex justify-content-center align-items-center' style={{ width: '25px', height: '25px', paddingTop: '4px' }} onClick={() => movePage(page + 1)}>{'>'}</Button>
      </div>
    </div>
  );
}
