import React, { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { MYSERVER } from '../env'
import { Product } from '../models/Product'
import { getUserOrdersAsync, selectToken, selectUserOrders } from '../slicers/authSlice'
import { allowReview, changeSelectedProduct } from '../slicers/shopSlice'

const MyOrders = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const orders = useAppSelector(selectUserOrders)
    const myToken = useAppSelector(selectToken)
    useEffect(() => {
        if(orders.length === 0){
            dispatch(getUserOrdersAsync(myToken))
        }
    }, [dispatch, myToken])

    const handleReview=(product:Product)=>{
        dispatch(changeSelectedProduct(product))
        dispatch(allowReview())
        navigate('/review')
    }
    return (
        <div>
            <Card>
                <Card.Body>
                {orders.map((order, ind) =>
                    <div key={ind}>
                        <div className='d-flex justify-content-start'>
                            <div><img style={{width:'140px', height:'100px'}} src={MYSERVER + order.product.image} alt='placeholder.png'></img></div>
                            <div className='ms-2 me-auto'>
                                <div>{order.product.title}</div>
                                <div className='d-flex justify-content-start'>Order date: {order.createdTime}</div>
                            </div>
                            <div className='me-2'>${order.product.price}</div>
                            <div>
                                <div><Link to={'/shop/product#pageTop'}><Button onClick={() => dispatch(changeSelectedProduct(order.product))} style={{width:'170px', borderRadius: 0 }}>Go to product page</Button></Link></div>
                                <div  className='mt-2'><Button style={{width:'170px', borderRadius: 0 }} onClick={() => handleReview(order.product)} variant='outline-primary'>Write a review</Button></div>
                            </div>
                        </div>
                        {ind !== orders.length -1 && <hr />}
                    </div>
                )}
                </Card.Body>
            </Card>
        </div>
    )
}

export default MyOrders