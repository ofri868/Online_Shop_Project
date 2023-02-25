import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectProducts, changeSelectedProduct, selectBrands, selectScales, searchProducts, selectSearchedProducts } from '../slicers/shopSlice';
import { addToCart, decreaseAmount, increaseAmount, selectCart } from '../slicers/cartSlice';
import { MYSERVER } from '../env';
import { Product } from '../models/Product';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

export function Shop() {
  const products = useAppSelector(selectProducts);
  const searchedProducts = useAppSelector(selectSearchedProducts)
  const brands = useAppSelector(selectBrands);
  const scales = useAppSelector(selectScales);
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [shownProducts, setShownProducts] = useState<Product[]>([])
  const [scale, setScale] = useState<string | undefined>('-1')
  const [brand, setBrand] = useState<string | undefined>('-1')


  useEffect(() => {
    if (products.length > 0) {
      dispatch(searchProducts(products))
    }
  }, [dispatch, products])

  useEffect(() => {
    setFilteredProducts(searchedProducts)
  }, [dispatch, searchedProducts])

  useEffect(() => {
    setShownProducts(filteredProducts.slice(0, 8))
  }, [dispatch, filteredProducts])

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

  const movePage = (event: React.ChangeEvent<unknown>, value: number) => {
    let temp: Product[] = []
    setPage(value)
    if (filteredProducts.length > 0) {
      if ((filteredProducts.length - ((value - 1) * 8)) < 8) {
        temp = filteredProducts.slice((value - 1) * 8)
      }
      else {
        temp = filteredProducts.slice((value - 1) * 8, ((value - 1) * 8) + 8)
      }
      setShownProducts(temp)
      const element = document.getElementById('shop')
      if (element) {
        console.log('first')
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  const handleSort = (sort: string) => {
    let temp: Product[] = [...searchedProducts]
    switch (sort) {
      case 'ascending':
        temp.sort(
          (prod1, prod2) => (prod1.price < prod2.price) ? -1 : 1
        )
        break;
      case 'descending':
        temp.sort(
          (prod1, prod2) => (prod1.price < prod2.price) ? 1 : -1
        )
        break;

      default:
        temp.sort(
          (prod1, prod2) => (prod1.id && prod2.id) && (prod1.id < prod2.id) ? -1 : 1
        )
        break;
    }
    dispatch(searchProducts(temp))
  }
  useEffect(() => {
    let temp: Product[] = []
    if (scale) {
      if (+scale === -1) {
        temp = searchedProducts
      }
      else {
        searchedProducts.forEach((prod) => {
          if (prod.scale === +scale) {
            temp.push(prod)
          }
        })
      }
    }
    let res: Product[] = []
    if (brand) {
      if (+brand === -1) {
        res = temp
      }
      else {
        temp.forEach((prod) => {
          if (prod.brand === +brand) {
            res.push(prod)
          }
        })
      }
    }
    setPage(1)
    setFilteredProducts(res)
  }, [scale, brand])


  return (
    <div>
      <div id='shop'></div>
      <h1 className='mb-3'>Shop</h1>
      <div className='d-flex justify-content-end align-items-center me-4 mb-3'>
        <div>{`Showing ${((page - 1) * 8) + 1}-${page === Math.ceil(filteredProducts.length / 8) ? filteredProducts.length : page * 8} of ${filteredProducts.length} results`}</div>
        <div className='ms-2'>
          <select onChange={(e) => handleSort(e.target.value)}>
            <option value='default'>Sort by Default</option>
            <option value='ascending'>Sort by Price: low to high</option>
            <option value='descending'>Sort by Price: high to low</option>
          </select>
        </div>
      </div>
      <div className='d-flex'>
        <div>
          <Card>
            <Card.Header>
              <span>Categories</span>
            </Card.Header>
            <Card.Body>
              <div>Sort by:</div>
              <div className='d-flex mb-2'>
                <span className='me-1'>Brand:</span>
                <select style={{width:'125px'}} id='brandFilter' onChange={(e) => setBrand(e.target.value)}>
                  <option value={-1}>All</option>
                  {brands.map((brand, ind) =>
                    <option key={ind} value={brand.id}>{brand.desc}</option>)}
                </select>
              </div>
              <div className='d-flex'>
                <span className='me-2'>Scale:</span>
                <select style={{width:'125px'}} id='scaleFilter' onChange={(e) => setScale(e.target.value)}>
                  <option value={-1}>All</option>
                  {scales.map((scale, ind) =>
                    <option key={ind} value={scale.id}>{scale.desc}</option>)}
                </select>
              </div>
            </Card.Body>
          </Card>
        </div>
        {shownProducts.length > 0 ?
          <div style={{ width: '100%' }} className="row row-cols-1 row-cols-md-4 g-4 me-1">
            {shownProducts.map((product: Product, ind: number) =>
              <div key={ind}>
                <div className="col mx-1">
                  <Card style={{ height: '340px', marginBottom: "20px" }}>
                    <Card.Body>
                      <Link to={'/shop/product#pageTop'} onClick={() => dispatch(changeSelectedProduct(product))}><img src={MYSERVER + product.image} style={{ height: '100px', width: '140px', marginBottom: '20px' }} alt='placeholder.png'></img></Link>
                      <div>{scales[product.scale - 1].desc + ' • ' + brands[product.brand - 1].desc}</div>
                      <h5 className="card-title">{product.title}</h5>
                      <div className="card-text">Price: ${product.price}</div>
                    </Card.Body>
                    <Card.Footer style={{ height: '55px' }}>
                      <div className='d-flex justify-content-center'>
                        {inCart(product) ?
                          <div className='d-flex justify-content-center align-items-center'>
                            <div className='me-1'>In cart:</div>
                            <Button className='d-flex justify-content-center align-items-center cart-button' variant='success' onClick={() => dispatch(increaseAmount(product))}>+</Button>
                            <input style={{ width: '40px' }} type="text" inputMode="numeric" onChange={(e) => handleCart(product, Number(e.target.value))} min={0} value={amountInCart(product)} />
                            <Button className='d-flex justify-content-center align-items-center cart-button' variant='danger' onClick={() => dispatch(decreaseAmount(product))}>-</Button>
                          </div>
                          :
                          <Button variant='success' onClick={() => dispatch(addToCart({ product, amount: 1 }))}>Add to cart</Button>}
                      </div>
                    </Card.Footer>
                  </Card>
                </div>
              </div>
            )}</div> :
          <div style={{marginLeft:'auto', marginRight:'auto'}}>No results matching your selection found</div>
        }

      </div>
      <div className='d-flex justify-content-center align-items'>
        <Stack spacing={2}>
          <Pagination count={Math.ceil(filteredProducts.length / 8)} page={page} onChange={movePage} color='primary'></Pagination>
        </Stack>
      </div>
    </div>
  );
}
