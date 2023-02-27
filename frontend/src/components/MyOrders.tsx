import React, { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { MYSERVER } from '../env'
import { Product } from '../models/Product'
import { getUserOrdersAsync, selectToken, selectUserOrders } from '../slicers/authSlice'
import { allowReview, changeSelectedProduct, setReviewedOrder } from '../slicers/shopSlice'

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

    const handleReview=(product:Product, order:number)=>{
        dispatch(changeSelectedProduct(product))
        dispatch(setReviewedOrder(order))
        dispatch(allowReview())
        navigate('/review')
    }
    return (
        <div>
            <h4 className='ms-3' style={{textAlign:'left'}}>Your Orders</h4>
            <Card>
                <Card.Body>
                {orders.map((order, ind) =>
                    <div key={ind}>
                        <div className='d-flex justify-content-start'>
                            <div><img style={{width:'140px', height:'100px'}} src={MYSERVER + order.product.image} alt='placeholder.png'></img></div>
                            <div className='ms-2 me-auto'>
                                <div style={{fontWeight:'bold', textAlign: 'left'}} className='fs-5 mb-2'>{order.product.title}</div>
                                <div className='d-flex justify-content-start '>Order date: {order.createdTime}</div>
                            </div>
                            <div className='me-2 pt-1'>${order.product.price}</div>
                            <div>
                                <div><Link to={'/shop/product#pageTop'}><Button onClick={() => dispatch(changeSelectedProduct(order.product))} style={{width:'100%', borderRadius: 0 }}>Go to product page</Button></Link></div>
                                {order.reviewed?<div  className='mt-2'><Button style={{width:'100%', borderRadius: 0 }} variant='outline-primary' disabled>Reviewed</Button></div> :<div  className='mt-2'><Button style={{width:'100%', borderRadius: 0 }} onClick={() => handleReview(order.product , order.id)} variant='outline-primary'>Write a review</Button></div> }
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