import React from 'react'
import { Button, Card, Carousel } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { MYSERVER } from '../env'
import { Product } from '../models/Product'
import { changeSelectedProduct, selectBrands, selectNewProducts, selectScales } from '../slicers/shopSlice'


const HomeScreen = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const newProducts = useAppSelector(selectNewProducts)
  const brands = useAppSelector(selectBrands);
  const scales = useAppSelector(selectScales);

  return (
    <div>
      <div style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
        <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={process.env.PUBLIC_URL + '/homescreen_photo.jpg'}></img>
        <div className='homescreen-text-on-image'>Find all your model cars right here.</div>
        <div className='homescreen-button'><Button style={{ borderRadius: 0 }} size='lg' onClick={() => navigate('/shop')}>Shop now</Button></div>
      </div>
      <div className='mt-5'>
        <div className='mb-4'>
          <h3>New models in stock</h3>
        </div>
        <div>
          {/* New models crousel */}
          <Carousel interval={null} variant="dark">
            <Carousel.Item>
              <div style={{width:'80%', margin:'auto'}} className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                {newProducts.slice(0, 3).map((product: Product, ind: number) =>
                  <div key={ind}>
                    <div className="col">
                      <Card style={{ height: '300px', marginBottom: "20px" }}>
                        <Card.Body>
                          <Link to={'/shop/product'} onClick={() => dispatch(changeSelectedProduct(product))}><img src={MYSERVER + product.image} style={{ height: '100px', width: '140px', marginBottom: '20px' }} alt='placeholder.png'></img></Link>
                          <div>{scales[product.scale - 1].desc + ' • ' + brands[product.brand - 1].desc}</div>
                          <h5 className="card-title">{product.title}</h5>
                          <div className="card-text">Price: ${product.price}</div>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div style={{width:'80%', margin:'auto'}} className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                {newProducts.slice(3,6).map((product: Product, ind: number) =>
                  <div key={ind}>
                    <div className="col">
                      <Card style={{ height: '300px', marginBottom: "20px" }}>
                        <Card.Body>
                          <Link to={'/shop/product'} onClick={() => dispatch(changeSelectedProduct(product))}><img src={MYSERVER + product.image} style={{ height: '100px', width: '140px', marginBottom: '20px' }} alt='placeholder.png'></img></Link>
                          <div>{scales[product.scale - 1].desc + ' • ' + brands[product.brand - 1].desc}</div>
                          <h5 className="card-title">{product.title}</h5>
                          <div className="card-text">Price: ${product.price}</div>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div style={{width:'80%', margin:'auto'}} className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                {newProducts.slice(6,9).map((product: Product, ind: number) =>
                  <div key={ind}>
                    <div className="col">
                      <Card style={{ height: '300px', marginBottom: "20px" }}>
                        <Card.Body>
                          <Link to={'/shop/product'} onClick={() => dispatch(changeSelectedProduct(product))}><img src={MYSERVER + product.image} style={{ height: '100px', width: '140px', marginBottom: '20px' }} alt='placeholder.png'></img></Link>
                          <div>{scales[product.scale - 1].desc + ' • ' + brands[product.brand - 1].desc}</div>
                          <h5 className="card-title">{product.title}</h5>
                          <div className="card-text">Price: ${product.price}</div>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default HomeScreen