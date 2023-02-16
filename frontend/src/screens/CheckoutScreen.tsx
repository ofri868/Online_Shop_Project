import React, { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { MYSERVER } from '../env';
import { CartItem } from '../models/CartItem';
import { selectLogged, selectToken } from '../slicers/authSlice';
import { calcTotal, selectCart, selectSum, clearCart, increaseAmount, decreaseAmount, checkoutAsync, removeFromCart } from '../slicers/cartSlice';

const CheckoutScreen = () => {
    const logged = useAppSelector(selectLogged)
    const myToken = useAppSelector(selectToken)
    const cart = useAppSelector(selectCart);
    const sum = useAppSelector(selectSum)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(calcTotal())
    }, [cart, dispatch])

    const handleCheckout = (cart: CartItem[]) => {
        let order = []
        for (let i = 0; i < cart.length; i++) {
            order.push({ "product": cart[i].product.id, "amount": cart[i].amount })
        }
        dispatch(checkoutAsync({ order, myToken }))
    }
    return (
        <div>
            <Card style={{ width: '60%', margin: 'auto' }}>
                <Card.Header><h3>Your Cart:</h3></Card.Header>
                {logged ?
                    <div>{cart.length > 0 ?
                        <div>
                            {cart.map((item, ind) =>
                                <div key={ind} className='mb-2 d-flex align-items-center'>
                                    <img src={MYSERVER + item.product.image} style={{ height: '80px', width: '100px' }} alt='placeholder.png'></img>
                                    <div className='me-auto'>
                                        <span className='ms-2 my-2'>{item.product.title}</span>
                                        <div className='d-flex align-items-center justify-content-start ms-2'>
                                            <Button className='d-flex align-items-center justify-content-center' style={{ width: '1.5rem', height: '1.5rem' }} variant='success' onClick={() => dispatch(increaseAmount(item.product))}>+</Button>
                                            <span className='mx-2'>{item.amount}</span>
                                            <Button className='d-flex align-items-center justify-content-center' style={{ width: '1.5rem', height: '1.5rem' }} variant='danger' onClick={() => dispatch(decreaseAmount(item.product))}>-</Button>
                                        </div>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-center'>
                                        <span className='me-2'>Price: ${item.amount * item.product.price}</span>
                                        <Button variant='outline-danger' className='align-items-center justify-content-center' onClick={() => dispatch(removeFromCart(item.product.id))}>x</Button>
                                    </div>
                                </div>
                            )
                            }
                            <Card.Footer>
                                Total: ${sum}
                                <Button variant='outline-danger' className='mx-2' onClick={() => dispatch(clearCart())}>Clear Cart</Button>
                                <Button variant='primary' onClick={() => handleCheckout(cart)}>Checkout</Button>
                            </Card.Footer>
                        </div>
                        :
                        <div>
                            You have no items in your cart<br></br>
                            <Link to="/shop"><Button variant="primary" >Back to Shop</Button></Link>
                        </div>}
                    </div> :
                    <div>
                        You need to be logged in to checkout<br></br>
                        <Link to="/login"><Button variant="outline-success" >Log in</Button></Link>
                    </div>
                }
            </Card>
        </div >
    )
}

export default CheckoutScreen